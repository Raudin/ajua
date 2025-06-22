import { GameState, GameAction } from '../types/game';

export const initialState: GameState = {
  holes: Array(16).fill(3),
  banks: [0, 0],
  currentPlayer: 0,
  gameOver: false,
  winner: null,
  status: "Player 1's turn"
};

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

export function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === 'sow') {
    const { holeIndex } = action;
    const player = state.currentPlayer;
    const playerHoles = player === 0 ? [0, 7] : [8, 15];
    
    if (holeIndex < playerHoles[0] || holeIndex > playerHoles[1] || state.holes[holeIndex] === 0) {
      return state;
    }    let newHoles = [...state.holes];
    const newBanks = [...state.banks];
    const pebbles = newHoles[holeIndex];
    newHoles[holeIndex] = 0;
    let current: number | string = holeIndex;

    // Sowing pebbles
    for (let i = 0; i < pebbles; i++) {
  current = getNextPosition(current, player);
  if (typeof current === 'string' && current === 'bank' + player) {
    newBanks[player]++;
  } else {
    newHoles[current as number]++;
  }
}

let nextPlayer = player === 0 ? 1 : 0;
let newStatus = `Player ${nextPlayer + 1}'s turn`;

// Check if last pebble landed in player's bank
if (typeof current === 'string' && current === 'bank' + player) {
  nextPlayer = player;
  newStatus = `Player ${player + 1}'s turn (again)`;
}

// Check for capture
if (!(typeof current === 'string' && (current === 'bank' + player || current === 'bank' + (1 - player)))) {
  const isOpponentHole = player === 0
    ? (typeof current === 'number' && current >= 8)
    : (typeof current === 'number' && current <= 7);
  if (isOpponentHole && (newHoles[current as number] === 2 || newHoles[current as number] === 3)) {
    newBanks[player] += newHoles[current as number];
    newHoles[current as number] = 0;
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
        banks: [newBanks[0], newBanks[1]],
        gameOver: true,
        winner,
        status: winner !== null ? `Player ${winner + 1} wins!` : "It's a tie!"
      };
    }

    return {
      ...state,
      holes: newHoles,
      banks: [newBanks[0], newBanks[1]],
      currentPlayer: nextPlayer,
      status: newStatus
    };
  }
  return state;
} 