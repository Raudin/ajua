import React from 'react';

interface PebbleProps {
  gradient: string;
  offsetX: number;
  offsetY: number;
}

export const Pebble: React.FC<PebbleProps> = ({ gradient, offsetX, offsetY }) => (
  <div
    className={`
      w-3 h-3 
      bg-gradient-to-br ${gradient} 
      rounded-full 
      shadow-[0_0_4px_rgba(0,0,0,0.3),_0_0_8px_rgba(0,0,0,0.2)] 
      ring-1 ring-white/30
      animate-pebble-pulse
    `}
    style={{ 
      transform: `translate(${offsetX}px, ${offsetY}px)` 
    }}
  />
);