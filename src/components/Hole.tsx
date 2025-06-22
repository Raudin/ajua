// Hole.tsx
import React from 'react';
import { Pebble } from './Pebble';

interface HoleProps {
  index: number;
  pebbles: number;
  onClick: (index: number) => void;
  isActive: boolean;
}

// ...existing code...
export const Hole: React.FC<HoleProps> = ({ index, pebbles, onClick, isActive }) => {
  const gradientOptions = [
    'from-pink-500 via-red-500 to-yellow-500',
    'from-purple-500 via-indigo-500 to-blue-500',
    'from-green-400 via-teal-500 to-cyan-500',
    'from-yellow-400 via-orange-500 to-red-500',
  ];

  // Simple deterministic pseudo-random function
  function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  return (
    <div
      onClick={isActive ? () => onClick(index) : undefined}
      className={`w-16 h-16 rounded-full flex flex-wrap items-center justify-center 
        border-4 border-[#5c4033] bg-gradient-to-b from-[#8b5e3c] to-[#5c4033] 
        shadow-inner overflow-hidden cursor-pointer transition-transform 
        ${isActive ? 'ring-4 ring-yellow-400 scale-105' : ''}`}
    >
      {Array.from({ length: pebbles }).map((_, i) => {
        const seed = index * 100 + i;
        const gradient = gradientOptions[Math.floor(seededRandom(seed) * gradientOptions.length)];
        const offsetX = (seededRandom(seed + 1) - 0.5) * 4;
        const offsetY = (seededRandom(seed + 2) - 0.5) * 4;
        return (
          <Pebble
            key={i}
            gradient={gradient}
            offsetX={offsetX}
            offsetY={offsetY}
          />
        );
      })}
    </div>
  );
};
