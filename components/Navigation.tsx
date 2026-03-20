'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CITIES } from '@/lib/cities';

export default function Navigation() {
  const pathname = usePathname();

  // パスから市スラッグを取得（例: /tsukubamirai/calendar → 'tsukubamirai'）
  const currentCity = CITIES.find((c) => pathname.startsWith(`/${c.slug}`));

  const navItems = currentCity
    ? [
        { href: '/', label: 'トップ', icon: '🏠' },
        { href: `/${currentCity.slug}`, label: currentCity.name, icon: currentCity.emoji },
        { href: `/${currentCity.slug}/calendar`, label: 'カレンダー', icon: '📅' },
        { href: `/${currentCity.slug}/search`, label: '検索', icon: '🔍' },
      ]
    : [
        { href: '/', label: 'トップ', icon: '🏠' },
        { href: '/about', label: 'このアプリについて', icon: 'ℹ️' },
      ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="nav-title text-base sm:text-xl font-bold text-primary-600">
            <span className="hidden sm:inline">🍽️ きゅうしょくなにかな</span>
            <span className="sm:hidden">🍽️ きゅうしょく</span>
          </Link>
          <div className="flex gap-1 sm:gap-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2 sm:px-3 py-2 rounded-lg transition-colors text-sm ${
                    isActive
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
