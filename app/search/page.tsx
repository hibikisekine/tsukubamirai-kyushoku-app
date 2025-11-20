'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';
import type { Metadata } from 'next';
import AdBanner from '@/components/AdBanner';

// メタデータはクライアントコンポーネントでは直接定義できないため、
// layout.tsxまたは別のサーバーコンポーネントで定義する必要があります
// ここではコメントとして残します

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

  // 検索処理
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const query = searchQuery.toLowerCase();
    
    const filtered = allKondate.filter((kondate) => {
      return (
        kondate.menu.toLowerCase().includes(query) ||
        kondate.date.includes(query) ||
        kondate.weekday.toLowerCase().includes(query)
      );
    });

    // 日付でソート（新しい順）
    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    setResults(filtered);
    setLoading(false);
  };

  // Enterキーで検索
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary-600 mb-2">
          🔍 献立を検索
        </h1>
        <p className="text-gray-600">
          メニュー名、日付、曜日で検索できます
        </p>
      </header>

      <AdBanner />

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="例: カレー、2024-01-20、月曜日"
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

      {loading && (
        <div className="text-center text-gray-500 py-8">
          <p>検索中...</p>
        </div>
      )}

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
