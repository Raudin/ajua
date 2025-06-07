import React from 'react';

export const Pebble: React.FC = () => {
  const gradientOptions = [
    'from-pink-500 via-red-500 to-yellow-500',
    'from-purple-500 via-indigo-500 to-blue-500',
    'from-green-400 via-teal-500 to-cyan-500',
    'from-yellow-400 via-orange-500 to-red-500',
  ];
  const gradient = gradientOptions[Math.floor(Math.random() * gradientOptions.length)];

  const offsetX = (Math.random() - 0.5) * 4;
  const offsetY = (Math.random() - 0.5) * 4;

  return (
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
};
