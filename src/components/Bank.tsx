// Bank.tsx
import React from 'react';
import { Pebble } from './Pebble';

interface BankProps {
  pebbles: number;
  player: number;
}

export const Bank: React.FC<BankProps> = ({ pebbles, player }) => {
  return (
    <div className="w-20 h-40 rounded-full flex flex-col items-center justify-between 
      border-4 border-[#5c4033] bg-gradient-to-b from-[#8b5e3c] to-[#5c4033] 
      shadow-inner p-2 text-white font-bold text-sm">
      <div>Player {player + 1}</div>
      <div className="flex flex-wrap items-center justify-center flex-grow">
        {Array.from({ length: pebbles }).map((_, i) => (
          <Pebble key={i} />
        ))}
      </div>
      <div>Score: {pebbles}</div>
    </div>
  );
};
