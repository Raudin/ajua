import React, { useReducer } from 'react';
import { Hole } from './Hole';
import { Bank } from './Bank';
import { gameReducer, initialState } from '../utils/gameReducer';
import { getAIMove} from '../utils/aiPlayer';

interface AjuaGameProps {
  mode: 'multiplayer' | 'ai';
  playerNames?: [string, string];
}

export const AjuaGame: React.FC<AjuaGameProps> = ({ mode, playerNames }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const handleSow = (holeIndex: number) => {
    dispatch({ type: 'sow', holeIndex });
  };

  const player1 = playerNames?.[0] || "Player 1";
const player2 = playerNames?.[1] || "Player 2";
// Use player1 and player2 in your status and UI

  React.useEffect(() => {
    if (mode === 'ai' && !state.gameOver && state.currentPlayer === 1) {
      const aiMove = getAIMove(state, 1);
      if (aiMove !== null) {
        setTimeout(() => dispatch({ type: 'sow', holeIndex: aiMove }), 500);
      }
    }
  }, [state, mode]);

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-4xl font-extrabold text-white drop-shadow-md">AJUA</h1>
      <div className="text-lg text-white font-medium">
        {state.status.replace("Player 1", player1).replace("Player 2", player2)}
      </div>

      {/* 🪵 Board Container */}
      <div
        className="bg-[url('/wood-pattern.png')] bg-cover bg-center rounded-3xl shadow-2xl p-6 flex items-center gap-6"
        style={{ minWidth: '850px' }}
      >
        {/* Left Bank */}
        <Bank pebbles={state.banks[1]} player={1} />

        {/* Holes */}
        <div className="flex flex-col gap-4">
          {/* Top row (Player 2) */}
          <div className="flex flex-row-reverse gap-2">
            {state.holes.slice(8, 16).map((pebbles, i) => (
              <Hole
                key={i + 8}
                index={i + 8}
                pebbles={pebbles}
                onClick={handleSow}
                isActive={state.currentPlayer === 1 && !state.gameOver}
              />
            ))}
          </div>

          {/* Bottom row (Player 1) */}
          <div className="flex gap-2">
            {state.holes.slice(0, 8).map((pebbles, i) => (
              <Hole
                key={i}
                index={i}
                pebbles={pebbles}
                onClick={handleSow}
                isActive={state.currentPlayer === 0 && !state.gameOver}
              />
            ))}
          </div>
        </div>

        {/* Right Bank */}
        <Bank pebbles={state.banks[0]} player={0} />
      </div>

      {/* Game Over Button */}
      {state.gameOver && (
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md"
        >
          New Game
        </button>
      )}
    </div>
  );
};
