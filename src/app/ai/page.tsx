'use client';
import { useState } from 'react';
import { AjuaGame } from '../../components/AjuaGame';

export default function AIPage() {
  const [name, setName] = useState('Player');
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
            Your Name:
            <input
              className="ml-2 px-2 py-1 rounded"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded gamer-font"
          >
            Start Game
          </button>
        </form>
      ) : (
        <AjuaGame mode="ai" playerNames={[name, "AI"]} />
      )}
    </main>
  );
}