'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getCityBySlug } from '@/lib/cities';

interface Kondate {
  date: string;
  weekday: string;
  menu: string;
  type: string;
  city: string;
  notes?: string;
}

export default function CitySearchPage() {
  const params = useParams();
  const citySlug = params.city as string;
  const cityConfig = getCityBySlug(citySlug);

  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Kondate[]>([]);
  const [loading, setLoading] = useState(false);
  const [allKondate, setAllKondate] = useState<Kondate[]>([]);

  useEffect(() => {
    if (!cityConfig) return;
    async function fetchKondate() {
      try {
        const response = await fetch(`/api/kondate?city=${encodeURIComponent(cityConfig!.name)}`);
        const data = await response.json();
        if (data.success) {
          setAllKondate(data.data || []);
        }
      } catch (error) {
        console.error('Error fetching kondate:', error);
      }
    }
    fetchKondate();
  }, [cityConfig]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const query = searchQuery.toLowerCase();

    const filtered = allKondate.filter((k) =>
      k.menu.toLowerCase().includes(query) ||
      k.date.includes(query) ||
      k.weekday.toLowerCase().includes(query) ||
      k.type.toLowerCase().includes(query)
    );

    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setResults(filtered);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  if (!cityConfig) {
    return <div className="container mx-auto px-4 py-8">市が見つかりません</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href={`/${citySlug}`} className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
        ← {cityConfig.name}に戻る
      </Link>

      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1">
          🔍 献立を検索
        </h1>
        <p className="text-gray-500 text-sm">{cityConfig.emoji} {cityConfig.name}</p>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="例: カレー、2026-03-10、月曜日"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold disabled:opacity-50"
          >
            {loading ? '検索中...' : '検索'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {results.length > 0 ? (
          results.map((kondate) => {
            const kondateDate = new Date(kondate.date);
            const centerConfig = cityConfig.centers.find((c) => c.id === kondate.type);
            return (
              <Link
                key={`${kondate.date}-${kondate.type}`}
                href={`/${citySlug}/${kondate.date}?center=${kondate.type}`}
                className="block kondate-card"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800">
                        {format(kondateDate, 'yyyy年M月d日', { locale: ja })}
                      </span>
                      <span className="text-sm text-gray-500">({kondate.weekday})</span>
                      <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded font-semibold">
                        {centerConfig?.label ?? kondate.type}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                      {kondate.menu.replace(/\n/g, '、')}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : searchQuery ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
            <p className="font-semibold mb-2">検索結果が見つかりませんでした</p>
            <p className="text-sm">別のキーワードで試してみてください</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500 text-sm">
            メニュー名、日付、曜日{cityConfig.centers.length > 1 ? '、センター名' : ''}で検索できます
          </div>
        )}
      </div>
    </div>
  );
}
