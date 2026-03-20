import type { Metadata } from 'next';
import Link from 'next/link';
import { CITIES } from '@/lib/cities';

export const metadata: Metadata = {
  title: 'きゅうしょくなにかな | 茨城県給食献立アプリ',
  description: 'つくばみらい市・つくば市・守谷市・取手市・龍ケ崎市の学校給食献立を毎日確認できるアプリ。今日と明日の献立をスマホで簡単チェック。',
  keywords: [
    'つくばみらい市 給食', 'つくば市 給食', '守谷市 給食', '取手市 給食', '龍ケ崎市 給食',
    '茨城県 給食', '給食献立', 'きゅうしょく',
  ],
  alternates: {
    canonical: 'https://kyushoku.site/',
  },
  openGraph: {
    title: 'きゅうしょくなにかな | 茨城県給食献立アプリ',
    description: 'つくばみらい市・つくば市・守谷市・取手市・龍ケ崎市の学校給食献立を確認できます。',
    type: 'website',
    url: 'https://kyushoku.site/',
  },
};

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <header className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-600 mb-3">
          🍽️ きゅうしょくなにかな
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          市を選んで、今日の給食を確認しよう！
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CITIES.map((city) => (
          <Link
            key={city.slug}
            href={`/${city.slug}`}
            className="block bg-white rounded-xl shadow-md p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{city.emoji}</span>
              <h2 className="text-xl font-bold text-gray-800">{city.name}</h2>
            </div>
            <p className="text-sm text-gray-500">{city.description}</p>
          </Link>
        ))}
      </div>

      <footer className="mt-12 text-center text-xs text-gray-400 space-y-1">
        <p>給食献立データは各市の公式情報をもとに更新されます。</p>
        <p>対応エリア：茨城県つくば地域</p>
      </footer>
    </div>
  );
}
