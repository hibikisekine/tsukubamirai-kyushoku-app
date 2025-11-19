'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

interface Kondate {
  date: string;
  weekday: string;
  menu: string;
  notes?: string;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Kondate[]>([]);
  const [loading, setLoading] = useState(false);
  const [allKondate, setAllKondate] = useState<Kondate[]>([]);

  // 全献立データを取得
  useEffect(() => {
    async function fetchKondate() {
      try {
        const response = await fetch('/api/kondate');
        const data = await response.json();
        if (data.success) {
          setAllKondate(data.data || []);
        }
      } catch (error) {
        console.error('Error fetching kondate:', error);
      }
    }
    fetchKondate();
  }, []);

  // 検索実行
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setLoading(true);

    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    // 検索ロジック（メニュー名、食材で検索）
    const filtered = allKondate.filter((kondate) => {
      const searchLower = query.toLowerCase();
      const menuLower = kondate.menu.toLowerCase();
      const weekdayLower = kondate.weekday.toLowerCase();
      
      return (
        menuLower.includes(searchLower) ||
        weekdayLower.includes(searchLower) ||
        kondate.date.includes(query)
      );
    });

    setResults(filtered);
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          ← トップに戻る
        </Link>
        <h1 className="text-3xl font-bold text-primary-600 mb-2">
          🔍 献立検索
        </h1>
        <p className="text-gray-600">
          メニュー名、食材、日付などで検索できます
        </p>
      </header>

      {/* 検索結果がある場合のみ広告を表示 */}
      {(searchQuery && results.length > 0) && <AdBanner />}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              const query = e.target.value;
              handleSearch(query);
            }}
            placeholder="例: カレー、パン、2024-01-15"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {loading && (
          <div className="mt-4 text-center text-gray-500">検索中...</div>
        )}

        {!loading && searchQuery && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-4">
              {results.length}件の結果が見つかりました
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {results.length > 0 ? (
          results.map((kondate) => {
            const kondateDate = new Date(kondate.date);
            return (
              <Link
                key={kondate.date}
                href={`/${kondate.date}`}
                className="block kondate-card"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-semibold text-gray-800">
                        {format(kondateDate, 'yyyy年M月d日', { locale: ja })}
                      </span>
                      <span className="text-sm text-gray-600">
                        ({kondate.weekday})
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {kondate.menu}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : searchQuery ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
            <p>検索結果が見つかりませんでした</p>
            <p className="text-sm mt-2">
              別のキーワードで検索してみてください
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
            <p>検索キーワードを入力してください</p>
          </div>
        )}
      </div>

      {/* 検索結果がある場合のみ広告を表示 */}
      {(searchQuery && results.length > 0) && <AdBanner position="bottom" />}
    </div>
  );
}

