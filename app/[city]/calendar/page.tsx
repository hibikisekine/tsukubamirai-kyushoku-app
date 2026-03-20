import {
  format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay,
} from 'date-fns';
import { ja } from 'date-fns/locale';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getKondateList } from '@/lib/data';
import { getCityBySlug, CITIES } from '@/lib/cities';
import AdBanner from '@/components/AdBanner';

export const dynamic = 'force-dynamic';

interface CityCalendarPageProps {
  params: { city: string };
  searchParams: { year?: string; month?: string; center?: string };
}

export async function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: CityCalendarPageProps): Promise<Metadata> {
  const cityConfig = getCityBySlug(params.city);
  if (!cityConfig) return {};
  return {
    title: `${cityConfig.name}の給食カレンダー | きゅうしょくなにかな`,
    description: `${cityConfig.name}の給食献立をカレンダー形式で確認できます。`,
    alternates: { canonical: `https://kyushoku.site/${params.city}/calendar` },
  };
}

export default async function CityCalendarPage({ params, searchParams }: CityCalendarPageProps) {
  const cityConfig = getCityBySlug(params.city);
  if (!cityConfig) notFound();

  const today = new Date();
  const year = searchParams.year ? parseInt(searchParams.year) : today.getFullYear();
  const month = searchParams.month ? parseInt(searchParams.month) - 1 : today.getMonth();
  const selectedCenter = searchParams.center || cityConfig.centers[0].id;
  const centerConfig = cityConfig.centers.find((c) => c.id === selectedCenter)
    ?? cityConfig.centers[0];

  const targetDate = new Date(year, month, 1);
  const monthStart = startOfMonth(targetDate);
  const monthEnd = endOfMonth(targetDate);

  const calendarStart = new Date(monthStart);
  calendarStart.setDate(calendarStart.getDate() - calendarStart.getDay());
  const calendarEnd = new Date(monthEnd);
  calendarEnd.setDate(calendarEnd.getDate() + (6 - monthEnd.getDay()));

  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekdayCalendarDays = calendarDays.filter((d) => d.getDay() >= 1 && d.getDay() <= 5);

  const kondateList = await getKondateList(cityConfig.name);
  const filteredList = kondateList.filter((k) => k.type === selectedCenter);
  const kondateMap = new Map(filteredList.map((k) => [k.date, k]));

  const hasDataInCurrentMonth = filteredList.some((k) =>
    isSameMonth(new Date(k.date), targetDate)
  );

  const prevMonth = new Date(year, month - 1, 1);
  const nextMonth = new Date(year, month + 1, 1);

  const baseUrl = `/${params.city}/calendar`;
  const centerParam = encodeURIComponent(selectedCenter);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Link href={`/${params.city}`} className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
            ← {cityConfig.emoji} {cityConfig.name}に戻る
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={`${baseUrl}?year=${prevMonth.getFullYear()}&month=${prevMonth.getMonth() + 1}&center=${centerParam}`}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >← 前月</Link>
            <h1 className="text-3xl font-bold text-primary-600">
              {format(targetDate, 'yyyy年M月', { locale: ja })}
            </h1>
            <Link
              href={`${baseUrl}?year=${nextMonth.getFullYear()}&month=${nextMonth.getMonth() + 1}&center=${centerParam}`}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >次月 →</Link>
          </div>

          {/* センター切り替え */}
          {cityConfig.centers.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {cityConfig.centers.map((c) => (
                <Link
                  key={c.id}
                  href={`${baseUrl}?year=${year}&month=${month + 1}&center=${encodeURIComponent(c.id)}`}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-sm transition-colors ${
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
        </div>
      </header>

      {hasDataInCurrentMonth && <AdBanner />}

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <p className="text-sm text-gray-500 mb-4">
          <strong>{cityConfig.name}</strong>・{centerConfig.label}の給食献立カレンダーです。日付をクリックすると詳細が確認できます。
        </p>
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {['月', '火', '水', '木', '金'].map((d) => (
            <div key={d} className="text-center font-semibold py-2 text-gray-700">{d}</div>
          ))}
          {weekdayCalendarDays.map((day) => {
            const dayStr = format(day, 'yyyy-MM-dd');
            const kondate = kondateMap.get(dayStr);
            const isCurrentMonth = isSameMonth(day, targetDate);
            const isToday = isSameDay(day, today);

            return (
              <div
                key={dayStr}
                className={`min-h-[100px] sm:min-h-[120px] border rounded-lg p-2 sm:p-3 ${
                  !isCurrentMonth ? 'bg-gray-50 opacity-50' : 'bg-white'
                } ${isToday ? 'ring-2 ring-primary-500' : ''}`}
              >
                <div className="text-sm font-semibold mb-2 text-gray-700">{format(day, 'd')}</div>
                {kondate && isCurrentMonth ? (
                  <Link
                    href={`/${params.city}/${dayStr}?center=${centerParam}`}
                    className="text-xs sm:text-sm text-gray-700 hover:text-primary-600 transition-colors line-clamp-3 sm:line-clamp-4"
                    title={kondate.menu}
                  >
                    {kondate.menu.split(/[,、\n]/).slice(0, 3).join('、')}
                    {kondate.menu.split(/[,、\n]/).length > 3 && '…'}
                  </Link>
                ) : isCurrentMonth ? (
                  <div className="text-xs sm:text-sm text-gray-400">-</div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {hasDataInCurrentMonth && <AdBanner position="bottom" />}
    </div>
  );
}
