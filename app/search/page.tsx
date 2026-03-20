import Link from 'next/link';
import type { Metadata } from 'next';
import { CITIES } from '@/lib/cities';

export const metadata: Metadata = {
  title: '献立を検索 | きゅうしょくなにかな',
  description: '市を選んで給食献立を検索できます。',
};

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
        ← トップに戻る
      </Link>

      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">
          🔍 献立を検索
        </h1>
        <p className="text-gray-600">
          検索したい市を選んでください
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CITIES.map((city) => (
          <Link
            key={city.slug}
            href={`/${city.slug}/search`}
            className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100 hover:border-primary-300 hover:bg-primary-50 transition-all"
          >
            <span className="text-3xl">{city.emoji}</span>
            <div>
              <div className="font-bold text-gray-800">{city.name}</div>
              <div className="text-sm text-primary-600 mt-0.5">献立を検索する →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
