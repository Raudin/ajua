'use client';
import { useState } from 'react';
import { AjuaGame } from '../../components/AjuaGame';

export default function MultiplayerPage() {
  const [names, setNames] = useState(['Player 1', 'Player 2']);
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-center bg-cover">
      {!submitted ? (
        <form
          className="flex flex-col gap-4 bg-white/10 p-8 rounded-xl shadow-lg"
          onSubmit={e => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <label className="text-white gamer-font">
            Player 1 Name:
            <input
              className="ml-2 px-2 py-1 rounded"
              value={names[0]}
              onChange={e => setNames([e.target.value, names[1]])}
              required
            />
          </label>
          <label className="text-white gamer-font">
            Player 2 Name:
            <input
              className="ml-2 px-2 py-1 rounded"
              value={names[1]}
              onChange={e => setNames([names[0], e.target.value])}
              required
            />
          </label>
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded gamer-font"
          >
            Start Game
          </button>
        </form>
      ) : (
        <AjuaGame mode="multiplayer" playerNames={names as [string, string]} />
      )}
    </main>
  );
}