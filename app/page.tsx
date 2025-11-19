import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import { getKondateList } from '@/lib/data';
import TypeSelector from '@/components/TypeSelector';

// 動的レンダリングを強制（データが更新されたら即座に反映）
export const dynamic = 'force-dynamic';

interface HomePageProps {
  searchParams: {
    type?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const selectedType = (searchParams.type?.toUpperCase() || 'A') as 'A' | 'B';
  
  // 今週の献立を取得（選択されたタイプのみ、重複を避ける）
  const kondateList = await getKondateList();
  const thisWeekKondate = kondateList
    .filter((k) => {
      const kondateDate = new Date(k.date);
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return kondateDate >= weekAgo && kondateDate <= today && k.type === selectedType;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 7);

  return (
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
      <div className="mb-6 flex justify-center">
        <TypeSelector currentType={selectedType} basePath="/" />
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          今週の献立
        </h2>
        <div className="grid gap-4">
          {thisWeekKondate.length > 0 ? (
            thisWeekKondate.map((kondate) => {
              const kondateDate = new Date(kondate.date);
              const isToday = format(kondateDate, 'yyyy-MM-dd') === todayStr;
              
              return (
                <Link
                  key={`${kondate.date}-${kondate.type}`}
                  href={`/${format(kondateDate, 'yyyy-MM-dd')}?type=${kondate.type}`}
                  className={`kondate-card ${isToday ? 'ring-2 ring-primary-500' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-semibold text-gray-800">
                          {format(kondateDate, 'M月d日', { locale: ja })}
                        </span>
                        <span className="text-sm text-gray-600">
                          ({kondate.weekday})
                        </span>
                        <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded font-semibold">
                          {kondate.type}献立
                        </span>
                        {isToday && (
                          <span className="px-2 py-1 bg-primary-500 text-white text-xs rounded">
                            今日
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
          ) : (
            <div className="kondate-card text-center text-gray-500">
              <p>今週の献立データがありません</p>
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
  );
}

