import { GameState } from '../types/game';

// Evaluation function to score the game state
function evaluateGameState(state: GameState, aiPlayer: number): number {
  if (state.gameOver) {
    if (state.winner === aiPlayer) return 1000;
    if (state.winner === (1 - aiPlayer)) return -1000;
    return 0; // tie
  }

  const humanPlayer = 1 - aiPlayer;
  const scoreDiff = state.banks[aiPlayer] - state.banks[humanPlayer];
  
  // Additional heuristics
  const aiHoles = aiPlayer === 0 ? state.holes.slice(0, 8) : state.holes.slice(8, 16);
  const humanHoles = humanPlayer === 0 ? state.holes.slice(0, 8) : state.holes.slice(8, 16);
  
  const aiPebbles = aiHoles.reduce((sum, pebbles) => sum + pebbles, 0);
  const humanPebbles = humanHoles.reduce((sum, pebbles) => sum + pebbles, 0);
  
  // Prefer having more pebbles in play and favor positions closer to capturing
  const mobilityScore = aiPebbles - humanPebbles;
  const captureOpportunities = aiHoles.filter(pebbles => pebbles === 1).length * 2; // Holes that can capture
  
  return scoreDiff * 10 + mobilityScore * 2 + captureOpportunities;
}

// Get valid moves for a player
function getValidMoves(state: GameState, player: number): number[] {
  const playerHoles = player === 0 ? [0, 7] : [8, 15];
  const moves: number[] = [];
  
  for (let i = playerHoles[0]; i <= playerHoles[1]; i++) {
    if (state.holes[i] > 0) {
      moves.push(i);
    }
  }
  
  return moves;
}

// Simulate a move and return new game state
function simulateMove(state: GameState, holeIndex: number): GameState {
  const player = state.currentPlayer;
  const playerHoles = player === 0 ? [0, 7] : [8, 15];
  
  if (holeIndex < playerHoles[0] || holeIndex > playerHoles[1] || state.holes[holeIndex] === 0) {
    return state;
  }

  let newHoles = [...state.holes];
  let newBanks = [...state.banks];
  let pebbles = newHoles[holeIndex];
  newHoles[holeIndex] = 0;
  let current = holeIndex;

  // Helper function to get next position (same as in gameReducer)
  function getNextPosition(current: number | string, player: number): number | string {
    if (player === 0) {
      if (current === 7) return 'bank0';
      if (current === 'bank0') return 8;
      if (current === 15) return 0;
      return (current as number + 1) % 16;
    } else {
      if (current === 15) return 'bank1';
      if (current === 'bank1') return 0;
      if (current === 7) return 8;
      return (current as number + 1) % 16;
    }
  }

  // Sowing pebbles
  for (let i = 0; i < pebbles; i++) {
    current = getNextPosition(current, player) as number;
    if (current === 'bank' + player) {
      newBanks[player]++;
    } else {
      newHoles[current]++;
    }
  }

  let nextPlayer = player === 0 ? 1 : 0;
  let newStatus = `Player ${nextPlayer + 1}'s turn`;

  // Check if last pebble landed in player's bank (play again)
  if (current === 'bank' + player) {
    nextPlayer = player;
    newStatus = `Player ${player + 1}'s turn (again)`;
  }

  // Check for capture
  if (current !== 'bank' + player && current !== 'bank' + (1 - player)) {
    const isOpponentHole = player === 0 ? current >= 8 : current <= 7;
    if (isOpponentHole && (newHoles[current] === 2 || newHoles[current] === 3)) {
      newBanks[player] += newHoles[current];
      newHoles[current] = 0;
    }
  }

  // Check game end
  const player0Empty = newHoles.slice(0, 8).every(h => h === 0);
  const player1Empty = newHoles.slice(8, 16).every(h => h === 0);

  if (player0Empty || player1Empty) {
    const remaining = player0Empty ? newHoles.slice(8, 16) : newHoles.slice(0, 8);
    const capturingPlayer = player0Empty ? 1 : 0;
    newBanks[capturingPlayer] += remaining.reduce((a, b) => a + b, 0);
    newHoles = newHoles.map((h, i) => (player0Empty && i >= 8) || (player1Empty && i <= 7) ? 0 : h);
    const winner = newBanks[0] > newBanks[1] ? 0 : newBanks[1] > newBanks[0] ? 1 : null;

    return {
      ...state,
      holes: newHoles,
      banks: newBanks,
      gameOver: true,
      winner,
      status: winner !== null ? `Player ${winner + 1} wins!` : "It's a tie!",
      currentPlayer: nextPlayer
    };
  }

  return {
    ...state,
    holes: newHoles,
    banks: newBanks,
    currentPlayer: nextPlayer,
    status: newStatus
  };
}

// Minimax algorithm with alpha-beta pruning
function minimax(
  state: GameState,
  depth: number,
  isMaximizing: boolean,
  aiPlayer: number,
  alpha: number = -Infinity,
  beta: number = Infinity
): { score: number; move: number | null } {
  
  // Base case: terminal node or max depth reached
  if (depth === 0 || state.gameOver) {
    return { score: evaluateGameState(state, aiPlayer), move: null };
  }

  const currentPlayer = isMaximizing ? aiPlayer : (1 - aiPlayer);
  const validMoves = getValidMoves(state, currentPlayer);

  if (validMoves.length === 0) {
    return { score: evaluateGameState(state, aiPlayer), move: null };
  }

  let bestMove: number | null = null;

  if (isMaximizing) {
    let maxScore = -Infinity;
    
    for (const move of validMoves) {
      const newState = simulateMove({ ...state, currentPlayer }, move);
      
      // If the AI gets to play again, continue maximizing
      const nextIsMaximizing = newState.currentPlayer === aiPlayer;
      const result = minimax(newState, depth - 1, nextIsMaximizing, aiPlayer, alpha, beta);
      
      if (result.score > maxScore) {
        maxScore = result.score;
        bestMove = move;
      }
      
      alpha = Math.max(alpha, result.score);
      if (beta <= alpha) break; // Alpha-beta pruning
    }
    
    return { score: maxScore, move: bestMove };
  } else {
    let minScore = Infinity;
    
    for (const move of validMoves) {
      const newState = simulateMove({ ...state, currentPlayer }, move);
      
      // If the human gets to play again, continue minimizing
      const nextIsMaximizing = newState.currentPlayer === aiPlayer;
      const result = minimax(newState, depth - 1, nextIsMaximizing, aiPlayer, alpha, beta);
      
      if (result.score < minScore) {
        minScore = result.score;
        bestMove = move;
      }
      
      beta = Math.min(beta, result.score);
      if (beta <= alpha) break; // Alpha-beta pruning
    }
    
    return { score: minScore, move: bestMove };
  }
}

// Main AI function to get the best move
export function getAIMove(state: GameState, aiPlayer: number): number | null {
  if (state.gameOver || state.currentPlayer !== aiPlayer) {
    return null;
  }

  const validMoves = getValidMoves(state, aiPlayer);
  
  if (validMoves.length === 0) {
    return null;
  }

  // Use different difficulty levels based on game state
  const totalPebbles = state.holes.reduce((sum, pebbles) => sum + pebbles, 0);
  const depth = totalPebbles > 30 ? 4 : totalPebbles > 15 ? 5 : 6; // Adaptive depth

  const result = minimax(state, depth, true, aiPlayer);
  
  // Fallback to random valid move if minimax fails
  return result.move !== null ? result.move : validMoves[Math.floor(Math.random() * validMoves.length)];
}