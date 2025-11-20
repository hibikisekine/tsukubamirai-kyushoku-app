import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';
import dynamicImport from 'next/dynamic';
import type { Metadata } from 'next';
import AdBanner from '@/components/AdBanner';
import { getKondateList, Kondate } from '@/lib/data';

export const metadata: Metadata = {
  title: 'きゅうしょくなにかな',
  description: 'つくばみらい市の学校給食献立を毎日確認できるアプリ。今日と明日の献立を簡単にチェックできます。',
  openGraph: {
    title: 'きゅうしょくなにかな | つくばみらい市給食献立',
    description: 'つくばみらい市の学校給食献立を毎日確認できるアプリ。今日と明日の献立を簡単にチェックできます。',
    type: 'website',
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
    description: 'つくばみらい市の学校給食献立を毎日確認できるアプリ',
    url: 'https://kyushoku.site',
    applicationCategory: 'FoodApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'JPY',
    },
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

      <AdBanner />

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
              <p>今日と明日の献立データがありません</p>
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

      <AdBanner position="bottom" />
      </div>
    </>
  );
}


