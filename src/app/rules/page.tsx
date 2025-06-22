'use client';

import Link from 'next/link';

export default function RulesPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-center bg-cover">
      <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-md gamer-font">Ajua Rules</h1>
      <div className="bg-white/10 p-8 rounded-xl shadow-lg text-white max-w-2xl">
        <ol className="list-decimal pl-6 space-y-2 gamer-font">
          <li>The board has 16 holes and 2 banks. Each hole starts with 3 pebbles.</li>
          <li>Players take turns picking a hole on their side and sowing its pebbles counterclockwise.</li>
          <li>If the last pebble lands in your bank, you play again.</li>
          <li>If the last pebble lands in an opponents hole and that hole now has 2 or 3 pebbles, you capture them.</li>
          <li>The game ends when one side is empty. The other player collects all remaining pebbles on their side.</li>
          <li>The player with the most pebbles in their bank wins!</li>
        </ol>
        <Link href="/" className="block mt-6 text-blue-300 underline gamer-font">Back to Home</Link>
      </div>
    </main>
  );
}