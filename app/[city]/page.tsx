import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getKondateList, Kondate } from '@/lib/data';
import { getCityBySlug, CITIES } from '@/lib/cities';
import AdBanner from '@/components/AdBanner';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface CityPageProps {
  params: { city: string };
  searchParams: { center?: string };
}

export async function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const cityConfig = getCityBySlug(params.city);
  if (!cityConfig) return {};
  return {
    title: `${cityConfig.name}の給食献立 | きゅうしょくなにかな`,
    description: `${cityConfig.name}の学校給食献立を毎日確認できます。${cityConfig.description}`,
    alternates: { canonical: `https://kyushoku.site/${params.city}` },
    openGraph: {
      title: `${cityConfig.name}の給食献立 | きゅうしょくなにかな`,
      description: `${cityConfig.name}の学校給食献立を毎日確認できます。`,
      type: 'website',
      url: `https://kyushoku.site/${params.city}`,
    },
  };
}

export default async function CityPage({ params, searchParams }: CityPageProps) {
  const cityConfig = getCityBySlug(params.city);
  if (!cityConfig) notFound();

  // デフォルトセンターは最初のもの
  const selectedCenter = searchParams.center || cityConfig.centers[0].id;
  const centerConfig = cityConfig.centers.find((c) => c.id === selectedCenter)
    ?? cityConfig.centers[0];

  // JST で今日の日付を取得
  const now = new Date();
  const jstOffset = 9 * 60;
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const today = new Date(utc + jstOffset * 60000);
  const todayStr = format(today, 'yyyy-MM-dd');

  const todayStart = new Date(today);
  todayStart.setHours(0, 0, 0, 0);
  const tomorrowStart = new Date(todayStart);
  tomorrowStart.setDate(tomorrowStart.getDate() + 1);
  const dayAfterTomorrow = new Date(tomorrowStart);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

  let kondateList: Kondate[] = [];
  try {
    kondateList = await getKondateList(cityConfig.name);
  } catch {
    kondateList = [];
  }

  const todayKondate = kondateList.find(
    (k) => k.date === todayStr && k.type === selectedCenter
  ) ?? null;
  const tomorrowKondate = kondateList.find((k) => {
    const d = new Date(k.date);
    d.setHours(0, 0, 0, 0);
    return d >= tomorrowStart && d < dayAfterTomorrow && k.type === selectedCenter;
  }) ?? null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* ヘッダー */}
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Link href="/" className="text-gray-500 hover:text-primary-600 text-sm">
            ← 市を選び直す
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-primary-600">
          {cityConfig.emoji} {cityConfig.name}の給食献立
        </h1>
        <p className="text-gray-500 text-sm mt-1">{cityConfig.description}</p>
      </header>

      {/* ナビ */}
      <nav className="flex gap-2 mb-4 text-sm">
        <Link href={`/${params.city}`} className="px-3 py-1 bg-primary-500 text-white rounded-full">
          🏠 今日・明日
        </Link>
        <Link href={`/${params.city}/calendar`} className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300">
          📅 カレンダー
        </Link>
      </nav>

      {/* センター選択 */}
      {cityConfig.centers.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {cityConfig.centers.map((c) => (
            <Link
              key={c.id}
              href={`/${params.city}?center=${encodeURIComponent(c.id)}`}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                c.id === selectedCenter
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>
      )}

      <p className="text-lg font-semibold text-gray-700 mb-4">
        {format(today, 'yyyy年M月d日(E)', { locale: ja })}
      </p>

      <AdBanner />

      {/* 今日・明日の献立 */}
      {todayKondate || tomorrowKondate ? (
        <div className="space-y-6">
          {todayKondate && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-primary-600 mb-3">
                🍽️ 今日の献立（{centerConfig.label}）
              </h2>
              <ul className="space-y-1">
                {todayKondate.menu.split(/[,、\n]/).map((item, i) => (
                  <li key={i} className="text-gray-800">{item.trim()}</li>
                ))}
              </ul>
            </div>
          )}
          {tomorrowKondate && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-primary-600 mb-3">
                🍱 明日の献立（{centerConfig.label}）
              </h2>
              <ul className="space-y-1">
                {tomorrowKondate.menu.split(/[,、\n]/).map((item, i) => (
                  <li key={i} className="text-gray-800">{item.trim()}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
          <p className="text-xl mb-2">今日と明日の献立データがありません</p>
          <p className="text-sm mb-4">献立データは通常、平日の給食日に更新されます。</p>
          <Link
            href={`/${params.city}/calendar`}
            className="inline-block px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            📅 カレンダーで確認
          </Link>
        </div>
      )}

      <AdBanner position="bottom" />
    </div>
  );
}
