// Hole.tsx
import React from 'react';
import { Pebble } from './Pebble';

interface HoleProps {
  index: number;
  pebbles: number;
  onClick: (index: number) => void;
  isActive: boolean;
}

export const Hole: React.FC<HoleProps> = ({ index, pebbles, onClick, isActive }) => {
  return (
    <div
      onClick={isActive ? () => onClick(index) : undefined}
      className={`w-16 h-16 rounded-full flex flex-wrap items-center justify-center 
        border-4 border-[#5c4033] bg-gradient-to-b from-[#8b5e3c] to-[#5c4033] 
        shadow-inner overflow-hidden cursor-pointer transition-transform 
        ${isActive ? 'ring-4 ring-yellow-400 scale-105' : ''}`}
    >
      {Array.from({ length: pebbles }).map((_, i) => (
        <Pebble key={i} />
      ))}
    </div>
  );
};
