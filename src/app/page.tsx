'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-center bg-cover">
      <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-md gamer-font">AJUA</h1>
      <p className="text-lg text-white mb-10 max-w-xl text-center gamer-font">
        Ajua is a traditional African board game of strategy and skill. Choose a mode to start playing!
      </p>
      <div className="flex gap-8">
        <Link href="/multiplayer">
          <div className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg p-8 w-64 cursor-pointer transition-transform hover:scale-105 flex flex-col items-center">
            <span className="text-3xl mb-2">👥</span>
            <h2 className="text-2xl font-bold mb-2 gamer-font">Multiplayer</h2>
            <p className='gamer-font'>Play with a friend on the same device.</p>
          </div>
        </Link>
        <Link href="/ai">
          <div className="bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg p-8 w-64 cursor-pointer transition-transform hover:scale-105 flex flex-col items-center">
            <span className="text-3xl mb-2">🤖</span>
            <h2 className="text-2xl font-bold mb-2 gamer-font">AI Mode</h2>
            <p className='gamer-font'>Challenge the computer and test your skills.</p>
          </div>
        </Link>
      </div>
    </main>
  );
}