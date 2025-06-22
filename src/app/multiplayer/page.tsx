'use client';

import { AjuaGame } from '../../components/AjuaGame';

export default function MultiplayerPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-center bg-cover">
      <AjuaGame mode="multiplayer" />
    </main>
  );
}