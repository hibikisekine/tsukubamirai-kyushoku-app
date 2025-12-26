import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';
import dynamicImport from 'next/dynamic';
import type { Metadata } from 'next';
import AdBanner from '@/components/AdBanner';
import { getKondateList, Kondate } from '@/lib/data';

export const metadata: Metadata = {
  title: 'きゅうしょくなにかな | つくばみらい市給食献立（陽光台小学校・小絹小学校など）',
  description: 'つくばみらい市の学校給食献立を毎日確認できるアプリ。陽光台小学校、小絹小学校、伊奈小学校、谷和原小学校、福岡小学校、富士見ヶ丘小学校、小張小学校、豊小学校、伊奈東小学校など、つくばみらい市の全小中学校の給食献立を確認できます。今日と明日の献立を簡単にチェックできます。',
  keywords: [
    'つくばみらい市 給食', 'つくばみらい市 献立', 'つくばみらい市 陽光台', '陽光台小学校 給食',
    '小絹小学校 給食', '伊奈小学校 給食', '谷和原小学校 給食', '福岡小学校 給食',
    '富士見ヶ丘小学校 給食', '小張小学校 給食', '豊小学校 給食', '伊奈東小学校 給食',
    'わかくさ幼稚園 給食', 'すみれ幼稚園 給食', '谷和原幼稚園 給食',
    '伊奈中学校 給食', '伊奈東中学校 給食', '谷和原中学校 給食', '小絹中学校 給食'
  ],
  alternates: {
    canonical: 'https://kyushoku.site/',
  },
  openGraph: {
    title: 'きゅうしょくなにかな | つくばみらい市給食献立（陽光台小学校・小絹小学校など）',
    description: 'つくばみらい市の学校給食献立を毎日確認できるアプリ。陽光台小学校、小絹小学校、伊奈小学校など、つくばみらい市の全小中学校の給食献立を確認できます。',
    type: 'website',
    url: 'https://kyushoku.site/',
  },
};

// const TypeSelector = dynamicImport(() => import('@/components/TypeSelector'), {
//   ssr: false,
//   loading: () => <div className="flex gap-2"><div className="w-20 h-10 bg-gray-200 rounded-lg animate-pulse" /><div className="w-20 h-10 bg-gray-200 rounded-lg animate-pulse" /></div>
// });

// LikeButtonを一時的に完全に無効化
// const LikeButton = dynamicImport(() => import('@/components/LikeButton'), {
//   ssr: false,
//   loading: () => <div className="w-24 h-10 bg-gray-200 rounded-lg animate-pulse" />
// });

// 動的レンダリングを強制（データが更新されたら即座に反映）
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface HomePageProps {
  searchParams: {
    type?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  let today: Date;
  let todayStr: string;
  let selectedType: 'A' | 'B';
  let kondateList: Kondate[] = [];
  let thisWeekKondate: Kondate[] = [];

  try {
    // JST（日本標準時）で今日の日付を取得
    const now = new Date();
    // UTC+9時間（JST）に調整
    const jstOffset = 9 * 60; // 分単位
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    today = new Date(utc + (jstOffset * 60000));
    todayStr = format(today, 'yyyy-MM-dd');
    selectedType = (searchParams.type?.toUpperCase() || 'A') as 'A' | 'B';
    
    // 今週の献立を取得（選択されたタイプのみ、重複を避ける）
    try {
      kondateList = await getKondateList();
    } catch (error) {
      console.error('Error fetching kondate list:', error);
      kondateList = [];
    }
    
    // 日付のみで比較するため、時刻を0:00:00に設定
    const todayStart = new Date(today);
    todayStart.setHours(0, 0, 0, 0);
    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);
    
    thisWeekKondate = kondateList
      .filter((k) => {
        if (!k || !k.date || !k.type) return false;
        try {
          // 日付文字列を直接比較（時刻を含めない）
          const kondateDateStr = k.date;
          if (!kondateDateStr || kondateDateStr.length < 10) return false;
          
          // 日付文字列をDateオブジェクトに変換（時刻を0:00:00に設定）
          const kondateDate = new Date(kondateDateStr);
          if (isNaN(kondateDate.getTime())) return false;
          kondateDate.setHours(0, 0, 0, 0);
          
          // 今日と明日のみを表示
          return kondateDate >= todayStart && kondateDate <= tomorrowStart && k.type === selectedType;
        } catch (error) {
          console.error('Error filtering kondate:', error);
          return false;
        }
      })
      .sort((a, b) => {
        try {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0;
          return dateA.getTime() - dateB.getTime();
        } catch (error) {
          return 0;
        }
      })
      .slice(0, 7);
  } catch (error) {
    console.error('Critical error in HomePage:', error);
    // エラーが発生してもデフォルト値を設定（JSTで）
    const now = new Date();
    const jstOffset = 9 * 60;
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    today = new Date(utc + (jstOffset * 60000));
    todayStr = format(today, 'yyyy-MM-dd');
    selectedType = 'A';
    kondateList = [];
    thisWeekKondate = [];
  }

  // 構造化データ（JSON-LD）
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'きゅうしょくなにかな',
    description: 'つくばみらい市の学校給食献立を毎日確認できるアプリ。陽光台小学校、小絹小学校、伊奈小学校、谷和原小学校、福岡小学校、富士見ヶ丘小学校、小張小学校、豊小学校、伊奈東小学校など、つくばみらい市の全小中学校の給食献立を確認できます。',
    url: 'https://kyushoku.site',
    applicationCategory: 'FoodApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'JPY',
    },
    about: {
      '@type': 'EducationalOrganization',
      name: 'つくばみらい市教育委員会',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'つくばみらい市',
        addressRegion: '茨城県',
        addressCountry: 'JP',
      },
    },
    keywords: 'つくばみらい市 給食, つくばみらい市 献立, 陽光台小学校 給食, 小絹小学校 給食, 伊奈小学校 給食, 谷和原小学校 給食, 福岡小学校 給食, 富士見ヶ丘小学校 給食, 小張小学校 給食, 豊小学校 給食, 伊奈東小学校 給食',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2 break-keep">
            🍽️ きゅうしょくなにかな
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {format(today, 'yyyy年M月d日(E)', { locale: ja })}
          </p>
        </header>

      {/* 献立データがある場合のみ広告を表示 */}
      {thisWeekKondate.length > 0 && <AdBanner />}

      {/* A/B献立の選択 */}
      {/* <div className="mb-6 flex justify-center">
        <TypeSelector currentType={selectedType} basePath="/" />
      </div> */}
      <div className="mb-6 flex justify-center gap-2">
        <Link
          href="/?type=A"
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            selectedType === 'A'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          A献立
        </Link>
        <Link
          href="/?type=B"
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            selectedType === 'B'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          B献立
        </Link>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          今日と明日の献立
        </h2>
        <div className="grid gap-4">
          {thisWeekKondate.length > 0 ? (
            thisWeekKondate.map((kondate) => {
              try {
                if (!kondate.date) return null;
                const kondateDate = new Date(kondate.date);
                if (isNaN(kondateDate.getTime())) return null;
                const isToday = format(kondateDate, 'yyyy-MM-dd') === todayStr;
                
                return (
                  <div
                    key={`${kondate.date}-${kondate.type}`}
                    className={`kondate-card ${isToday ? 'ring-2 ring-primary-500' : ''}`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <Link
                        href={`/${format(kondateDate, 'yyyy-MM-dd')}?type=${kondate.type || 'A'}`}
                        className="flex-1"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg font-semibold text-gray-800">
                              {format(kondateDate, 'M月d日', { locale: ja })}
                            </span>
                            {kondate.weekday && (
                              <span className="text-sm text-gray-600">
                                ({kondate.weekday})
                              </span>
                            )}
                            <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded font-semibold">
                              {kondate.type || 'A'}献立
                            </span>
                            {isToday && (
                              <span className="px-2 py-1 bg-primary-500 text-white text-xs rounded">
                                今日
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {kondate.menu || 'メニュー情報なし'}
                          </p>
                        </div>
                      </Link>
                      {/* LikeButtonを一時的に完全に無効化 */}
                      {/* {kondate.date && kondate.type && (
                        <div onClick={(e) => e.stopPropagation()}>
                          <LikeButton date={kondate.date} type={kondate.type} />
                        </div>
                      )} */}
                    </div>
                  </div>
                );
              } catch (error) {
                console.error('Error rendering kondate card:', error, kondate);
                return null;
              }
            }).filter(Boolean)
          ) : (
            <div className="kondate-card text-center text-gray-500">
              <p className="mb-4">今日と明日の献立データがありません</p>
              <div className="text-sm text-gray-600 space-y-2">
                <p>献立データは通常、平日の給食日に更新されます。</p>
                <p>カレンダーページや検索ページから過去の献立を確認できます。</p>
                <div className="mt-4 flex gap-2 justify-center">
                  <Link
                    href="/calendar"
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
                  >
                    📅 カレンダーで見る
                  </Link>
                  <Link
                    href="/search"
                    className="px-4 py-2 bg-white text-primary-600 border-2 border-primary-500 rounded-lg hover:bg-primary-50 transition-colors text-sm"
                  >
                    🔍 献立を検索
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/calendar"
          className="block text-center py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
        >
          📅 カレンダーで見る
        </Link>
        <Link
          href="/search"
          className="block text-center py-3 bg-white text-primary-600 border-2 border-primary-500 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
        >
          🔍 献立を検索
        </Link>
      </section>

      {/* サイトの説明と使い方 */}
      <section className="mb-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          🍽️ きゅうしょくなにかなについて
        </h2>
        <div className="text-gray-700 space-y-3">
          <p>
            「きゅうしょくなにかな」は、つくばみらい市の学校給食献立を毎日確認できる無料のアプリです。
            今日と明日の献立を簡単にチェックできるほか、カレンダー形式での確認や検索機能もご利用いただけます。
          </p>
          <div className="bg-primary-50 rounded-lg p-4 border-2 border-primary-200">
            <h3 className="font-semibold text-primary-800 mb-2">✨ 主な機能</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>今日と明日の給食献立を確認</li>
              <li>カレンダー形式で月ごとの献立を一覧表示</li>
              <li>メニュー名、日付、学校名で検索</li>
              <li>A献立とB献立の両方に対応</li>
              <li>スマートフォンでも快適にご利用いただけます</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SEO用：学校名リスト */}
      <section className="mb-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          📚 対応している学校
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h3 className="font-semibold text-primary-600 mb-2">A献立の学校</h3>
            <ul className="space-y-1">
              <li>わかくさ幼稚園、すみれ幼稚園、谷和原幼稚園</li>
              <li>小絹小学校、伊奈東小学校</li>
              <li>伊奈中学校、伊奈東中学校、谷和原中学校、小絹中学校</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-600 mb-2">B献立の学校</h3>
            <ul className="space-y-1">
              <li>小張小学校、伊奈小学校、豊小学校</li>
              <li>谷和原小学校、福岡小学校、陽光台小学校、富士見ヶ丘小学校</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          「つくばみらい市 陽光台」「つくばみらい市 小絹」など、学校名で検索して給食献立を確認できます。
        </p>
      </section>

      {/* 給食についての情報 */}
      <section className="mb-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          📖 つくばみらい市の給食について
        </h2>
        <div className="text-gray-700 space-y-3 text-sm">
          <p>
            つくばみらい市の学校給食は、栄養バランスの取れた食事を提供し、子どもたちの健康な成長をサポートしています。
            給食だよりやレシピも公開されており、ご家庭でも給食メニューを再現できます。
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="https://www.city.tsukubamirai.lg.jp/edu-board/kyuushoku/page006623.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
            >
              📰 給食だよりを見る
            </a>
            <a
              href="https://cookpad.com/search/つくばみらい市"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white text-primary-600 border-2 border-primary-500 rounded-lg hover:bg-primary-50 transition-colors text-sm"
            >
              🍳 給食レシピを見る
            </a>
          </div>
        </div>
      </section>

      {/* 献立データがある場合のみ広告を表示 */}
      {thisWeekKondate.length > 0 && <AdBanner position="bottom" />}
      </div>
    </>
  );
}


