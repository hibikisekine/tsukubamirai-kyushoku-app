import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { ja } from 'date-fns/locale';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getKondateList } from '@/lib/data';
import AdBanner from '@/components/AdBanner';

// 動的レンダリングを強制（データが更新されたら即座に反映）
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'カレンダーで見る',
  description: 'つくばみらい市の学校給食献立をカレンダー形式で確認できます。月ごとに献立を一覧表示。',
  alternates: {
    canonical: 'https://kyushoku.site/calendar',
  },
  openGraph: {
    title: '給食献立カレンダー | きゅうしょくなにかな',
    description: 'つくばみらい市の学校給食献立をカレンダー形式で確認できます。月ごとに献立を一覧表示。',
    type: 'website',
    url: 'https://kyushoku.site/calendar',
  },
};

interface CalendarPageProps {
  searchParams: {
    year?: string;
    month?: string;
    type?: string;
  };
}

export default async function CalendarPage({ searchParams }: CalendarPageProps) {
  const today = new Date();
  const year = searchParams.year ? parseInt(searchParams.year) : today.getFullYear();
  const month = searchParams.month ? parseInt(searchParams.month) - 1 : today.getMonth();
  const selectedType = (searchParams.type?.toUpperCase() || 'A') as 'A' | 'B';
  
  const targetDate = new Date(year, month, 1);
  const monthStart = startOfMonth(targetDate);
  const monthEnd = endOfMonth(targetDate);
  
  // カレンダー表示用の日付リスト（前後の月の日付も含む）
  const calendarStart = new Date(monthStart);
  calendarStart.setDate(calendarStart.getDate() - calendarStart.getDay()); // 週の最初の日（日曜日）
  
  const calendarEnd = new Date(monthEnd);
  const daysToAdd = 6 - monthEnd.getDay();
  calendarEnd.setDate(calendarEnd.getDate() + daysToAdd); // 週の最後の日（土曜日）
  
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });
  
  // 献立データを取得（選択されたタイプのみ）
  const kondateList = await getKondateList();
  const filteredList = kondateList.filter((k) => k.type === selectedType);
  const kondateMap = new Map(
    filteredList.map((k) => [k.date, k])
  );
  
  // A/B両方の献立がある日付を取得（表示用）
  const allKondateMap = new Map(
    kondateList.map((k) => [`${k.date}_${k.type}`, k])
  );
  
  // 前後の月のリンク
  const prevMonth = new Date(year, month - 1, 1);
  const nextMonth = new Date(year, month + 1, 1);
  
  // 平日のみ表示（月〜金）
  const weekDays = ['月', '火', '水', '木', '金'];
  
  // 平日のみの日付をフィルタリング
  const weekdayCalendarDays = calendarDays.filter((day) => {
    const dayOfWeek = day.getDay();
    return dayOfWeek >= 1 && dayOfWeek <= 5; // 月曜日(1)〜金曜日(5)
  });
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            ← トップに戻る
          </Link>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-4">
              <Link
                href={`/calendar?year=${prevMonth.getFullYear()}&month=${prevMonth.getMonth() + 1}&type=${selectedType}`}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                ← 前月
              </Link>
              <h1 className="text-3xl font-bold text-primary-600">
                {format(targetDate, 'yyyy年M月', { locale: ja })}
              </h1>
              <Link
                href={`/calendar?year=${nextMonth.getFullYear()}&month=${nextMonth.getMonth() + 1}&type=${selectedType}`}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                次月 →
              </Link>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/calendar?year=${year}&month=${month + 1}&type=A`}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedType === 'A'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                A献立
              </Link>
              <Link
                href={`/calendar?year=${year}&month=${month + 1}&type=B`}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedType === 'B'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                B献立
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* カレンダーページは有用なコンテンツがあるため広告を表示 */}
      <AdBanner />

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4 text-sm text-gray-600">
          <p className="mb-2">
            カレンダー形式で給食献立を確認できます。各日付をクリックすると詳細ページに移動します。
          </p>
          <p>
            平日（月〜金）のみ表示されます。土日祝日は給食がないため表示されません。
          </p>
        </div>
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {/* 曜日ヘッダー（平日のみ） */}
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center font-semibold py-2 text-gray-700"
            >
              {day}
            </div>
          ))}
          
          {/* カレンダーの日付（平日のみ） */}
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
                <div className="flex flex-col h-full">
                  <div className="text-sm font-semibold mb-2 text-gray-700">
                    {format(day, 'd')}
                  </div>
                  {kondate && isCurrentMonth ? (
                    <Link
                      href={`/${dayStr}?type=${selectedType}`}
                      className="flex-1 text-xs sm:text-sm text-gray-700 hover:text-primary-600 transition-colors line-clamp-3 sm:line-clamp-4"
                      title={kondate.menu}
                    >
                      {kondate.menu.split(',').slice(0, 3).join(', ')}
                      {kondate.menu.split(',').length > 3 && '...'}
                    </Link>
                  ) : isCurrentMonth ? (
                    <div className="flex-1 text-xs sm:text-sm text-gray-400">-</div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 凡例 */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="font-semibold mb-2 text-gray-800">凡例</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary-500 rounded"></div>
            <span>今日</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-50 rounded"></div>
            <span>前後の月</span>
          </div>
        </div>
      </div>

      <AdBanner position="bottom" />
    </div>
  );
}

