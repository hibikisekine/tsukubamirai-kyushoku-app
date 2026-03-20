import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';
import type { Metadata } from 'next';
import AdBanner from '@/components/AdBanner';
import { getKondateByDateAndCity } from '@/lib/data';
import { getCityBySlug } from '@/lib/cities';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: { city: string; date: string };
  searchParams: { center?: string };
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const cityConfig = getCityBySlug(params.city);
  if (!cityConfig) return { title: 'ページが見つかりません' };

  const dateObj = new Date(params.date);
  if (isNaN(dateObj.getTime())) return { title: 'ページが見つかりません' };

  const formattedDate = format(dateObj, 'yyyy年M月d日(E)', { locale: ja });
  const selectedCenter = searchParams.center || cityConfig.centers[0]?.id || '';

  const kondateList = await getKondateByDateAndCity(params.date, cityConfig.name);
  const kondate = kondateList.find((k) => k.type === selectedCenter);
  const menuPreview = kondate?.menu?.split('\n').slice(0, 2).join('、') || '給食献立';

  return {
    title: `${formattedDate}の献立 | ${cityConfig.name}給食`,
    description: `${formattedDate}の${cityConfig.name}学校給食（${selectedCenter}）: ${menuPreview}`,
    alternates: {
      canonical: `https://kyushoku.site/${params.city}/${params.date}?center=${selectedCenter}`,
    },
  };
}

export default async function CityDatePage({ params, searchParams }: PageProps) {
  const cityConfig = getCityBySlug(params.city);
  if (!cityConfig) notFound();

  const dateObj = new Date(params.date);
  if (isNaN(dateObj.getTime())) notFound();

  const kondateList = await getKondateByDateAndCity(params.date, cityConfig.name);
  if (kondateList.length === 0) notFound();

  const selectedCenter = searchParams.center || cityConfig.centers[0]?.id || '';
  const kondate = kondateList.find((k) => k.type === selectedCenter) || kondateList[0];
  const formattedDate = format(dateObj, 'yyyy年M月d日(E)', { locale: ja });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href={`/${params.city}`}
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        ← {cityConfig.name}に戻る
      </Link>

      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1">
          {cityConfig.emoji} {formattedDate}の献立
        </h1>
        <p className="text-gray-500 text-sm">{cityConfig.name}</p>

        {cityConfig.centers.length > 1 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {cityConfig.centers.map((c) => (
              <Link
                key={c.id}
                href={`/${params.city}/${params.date}?center=${c.id}`}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
                  selectedCenter === c.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {c.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {kondate && <AdBanner />}

      {kondate ? (
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{kondate.type}</h2>
            {kondate.weekday && (
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                {kondate.weekday}
              </span>
            )}
          </div>
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {kondate.menu}
          </p>
          {kondate.notes && (
            <p className="mt-4 text-sm text-gray-500">{kondate.notes}</p>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center text-gray-500">
          <p>この日のデータはありません</p>
        </div>
      )}

      {kondate && <AdBanner position="bottom" />}
    </div>
  );
}
