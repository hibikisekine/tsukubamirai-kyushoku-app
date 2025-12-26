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
  type?: 'A' | 'B';
  notes?: string;
}

// 学校名と献立タイプのマッピング
const schoolTypeMap: Record<string, 'A' | 'B'> = {
  // A献立の学校
  'わかくさ幼稚園': 'A',
  'すみれ幼稚園': 'A',
  '谷和原幼稚園': 'A',
  '小絹小学校': 'A',
  '伊奈東小学校': 'A',
  '伊奈中学校': 'A',
  '伊奈東中学校': 'A',
  '谷和原中学校': 'A',
  '小絹中学校': 'A',
  // B献立の学校
  '小張小学校': 'B',
  '伊奈小学校': 'B',
  '豊小学校': 'B',
  '谷和原小学校': 'B',
  '福岡小学校': 'B',
  '陽光台小学校': 'B',
  '富士見ヶ丘小学校': 'B',
  // 部分一致用のキーワード
  'わかくさ': 'A',
  'すみれ': 'A',
  '小絹': 'A',
  '伊奈東': 'A',
  '伊奈中': 'A',
  '谷和原中': 'A',
  '小張': 'B',
  '伊奈小': 'B',
  '豊小': 'B',
  '谷和原小': 'B',
  '福岡': 'B',
  '陽光台': 'B',
  '富士見ヶ丘': 'B',
  '富士見': 'B',
};

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
    const queryOriginal = searchQuery.trim();
    
    // 学校名で検索する場合の献立タイプを特定
    let targetType: 'A' | 'B' | null = null;
    for (const [schoolName, type] of Object.entries(schoolTypeMap)) {
      if (queryOriginal.includes(schoolName) || schoolName.toLowerCase().includes(query)) {
        targetType = type;
        break;
      }
    }
    
    const filtered = allKondate.filter((kondate) => {
      // 学校名で検索している場合、献立タイプでフィルタリング
      if (targetType && kondate.type !== targetType) {
        return false;
      }
      
      // 通常の検索（メニュー名、日付、曜日）
      return (
        kondate.menu.toLowerCase().includes(query) ||
        kondate.date.includes(query) ||
        kondate.weekday.toLowerCase().includes(query) ||
        (kondate.type && kondate.type.toLowerCase() === query)
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
          メニュー名、日付、曜日、学校名で検索できます
        </p>
      </header>

      {/* 検索結果がある場合のみ広告を表示 */}
      {searchQuery && results.length > 0 && <AdBanner />}

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="例: カレー、2024-01-20、月曜日、陽光台"
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
                key={`${kondate.date}-${kondate.type || 'A'}`}
                href={`/${kondate.date}${kondate.type ? `?type=${kondate.type}` : ''}`}
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
                      {kondate.type && (
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          kondate.type === 'A' 
                            ? 'bg-primary-100 text-primary-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {kondate.type}献立
                        </span>
                      )}
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
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-lg font-semibold text-gray-700 mb-2">検索結果が見つかりませんでした</p>
            <p className="text-sm text-gray-600 mb-4">
              別のキーワードで検索してみてください
            </p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>💡 検索のヒント：</p>
              <ul className="list-disc list-inside text-left max-w-md mx-auto space-y-1">
                <li>メニュー名（例：カレー、ハンバーグ）</li>
                <li>日付（例：2024-01-20）</li>
                <li>曜日（例：月曜日）</li>
                <li>学校名（例：陽光台、小絹、伊奈）</li>
              </ul>
            </div>
            <div className="mt-6">
              <Link
                href="/calendar"
                className="inline-block px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
              >
                📅 カレンダーで見る
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center text-gray-500 mb-4">
              <p className="text-lg font-semibold mb-2">検索キーワードを入力してください</p>
              <p className="text-sm text-gray-600 mb-4">
                メニュー名、日付、曜日、学校名で検索できます
              </p>
            </div>
            <div className="bg-primary-50 rounded-lg p-6 border-2 border-primary-200">
              <h3 className="font-semibold text-gray-800 mb-3">🔍 検索の使い方</h3>
              <div className="text-sm text-gray-700 space-y-3 text-left">
                <div>
                  <p className="font-semibold text-primary-700 mb-1">📝 メニュー名で検索</p>
                  <p className="text-gray-600">例：カレー、ハンバーグ、みそ汁、サラダ</p>
                  <p className="text-xs text-gray-500 mt-1">メニュー名の一部でも検索できます</p>
                </div>
                <div>
                  <p className="font-semibold text-primary-700 mb-1">📅 日付で検索</p>
                  <p className="text-gray-600">例：2024-01-20、2024-01</p>
                  <p className="text-xs text-gray-500 mt-1">年月だけでも検索できます</p>
                </div>
                <div>
                  <p className="font-semibold text-primary-700 mb-1">🗓️ 曜日で検索</p>
                  <p className="text-gray-600">例：月曜日、火曜日</p>
                  <p className="text-xs text-gray-500 mt-1">特定の曜日の献立を確認できます</p>
                </div>
                <div>
                  <p className="font-semibold text-primary-700 mb-1">🏫 学校名で検索</p>
                  <p className="text-gray-600">例：陽光台、小絹、伊奈、つくばみらい市 陽光台</p>
                  <p className="text-xs text-gray-500 mt-1">学校名で検索すると、その学校の献立タイプ（A/B）の献立が表示されます</p>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/calendar"
                className="inline-block px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm mr-2"
              >
                📅 カレンダーで見る
              </Link>
              <Link
                href="/"
                className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                🏠 トップページ
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 検索結果がある場合のみ広告を表示 */}
      {searchQuery && results.length > 0 && <AdBanner position="bottom" />}
    </div>
  );
}
