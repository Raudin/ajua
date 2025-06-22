'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/ai', label: 'AI Mode' },
  { href: '/multiplayer', label: 'Multiplayer' },
  { href: '/rules', label: 'Rules' },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50
        bg-[#23272e]/90 backdrop-blur-md rounded-2xl shadow-lg
        flex items-center px-6 py-2 gap-2 border border-white/10"
      style={{ minWidth: 400, maxWidth: 700 }}
    >
      {navItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-4 py-1 rounded-lg font-semibold transition
            gamer-font
            ${pathname === item.href
              ? 'bg-white/20 text-yellow-300'
              : 'text-white hover:bg-white/10 hover:text-yellow-200'
            }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}