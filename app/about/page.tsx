import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'このアプリについて',
  description: 'きゅうしょくなにかなは、つくばみらい市の学校給食献立を毎日確認できるアプリです。A献立とB献立に対応しています。',
  alternates: {
    canonical: 'https://kyushoku.site/about',
  },
  openGraph: {
    title: 'このアプリについて | きゅうしょくなにかな',
    description: 'きゅうしょくなにかなは、つくばみらい市の学校給食献立を毎日確認できるアプリです。A献立とB献立に対応しています。',
    type: 'website',
    url: 'https://kyushoku.site/about',
  },
};

export default function AboutPage() {
  const aSchools = [
    'わかくさ幼稚園',
    'すみれ幼稚園',
    '谷和原幼稚園',
    '小絹小学校',
    '伊奈東小学校',
    '伊奈中学校',
    '伊奈東中学校',
    '谷和原中学校',
    '小絹中学校',
  ];

  const bSchools = [
    '小張小学校',
    '伊奈小学校',
    '豊小学校',
    '谷和原小学校',
    '福岡小学校',
    '陽光台小学校',
    '富士見ヶ丘小学校',
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href="/"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        ← トップに戻る
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary-600 mb-2">
          「きゅうしょくなにかな」とは
        </h1>
        <p className="text-gray-600">
          つくばみらい市の学校給食献立を毎日確認できるアプリです。A献立とB献立に対応し、カレンダー表示や検索機能もご利用いただけます。
        </p>
      </header>

      {/* Aboutページはナビゲーションページのため広告を表示しない */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          このアプリはつくばみらい市が提供している献立情報をもとに情報を掲載しています。
        </p>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              📰 給食だより
            </h2>
            <p className="text-gray-600 mb-2">
              つくばみらい市の給食だよりは以下のリンクからご確認いただけます。
            </p>
            <a
              href="https://www.city.tsukubamirai.lg.jp/edu-board/kyuushoku/page006623.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 underline"
            >
              → つくばみらい市 給食だより
            </a>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              🍳 クックパッド（つくばみらい市）
            </h2>
            <p className="text-gray-600 mb-2">
              つくばみらい市の給食レシピをクックパッドで公開しています。
            </p>
            <a
              href="https://cookpad.com/search/つくばみらい市"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 underline"
            >
              → クックパッドでつくばみらい市の給食レシピを見る
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          献立の区分について
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* A献立 */}
          <div className="border-2 border-primary-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-4 py-2 bg-primary-500 text-white rounded-lg font-bold text-lg">
                A献立
              </span>
            </div>
            <ul className="space-y-2">
              {aSchools.map((school, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <span className="text-primary-500">●</span>
                  <span>{school}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* B献立 */}
          <div className="border-2 border-blue-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold text-lg">
                B献立
              </span>
            </div>
            <ul className="space-y-2">
              {bSchools.map((school, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <span className="text-blue-500">●</span>
                  <span>{school}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          💬 このアプリへのご意見をお聞かせください
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          このアプリに関するご意見・ご要望がございましたら、お気軽にお聞かせください。
        </p>
        <div className="bg-primary-50 rounded-lg p-6 border-2 border-primary-200">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeG-8tjDfWWkkLNAANW0sGrDp-CbM8aIGhgW4jDIyXODv1aNA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
          >
            <span>📝</span>
            <span>フィードバックフォームを開く</span>
            <span className="text-sm">↗</span>
          </a>
          <p className="text-sm text-gray-600 mt-3">
            ご意見・ご要望・バグ報告など、お気軽にお聞かせください。
          </p>
        </div>
      </div>
    </div>
  );
}

