import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';
import { getKondateList } from '@/lib/data';
import AdBanner from '@/components/AdBanner';

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
  
  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
  
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

      <AdBanner />

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-7 gap-2">
          {/* 曜日ヘッダー */}
          {weekDays.map((day) => (
            <div
              key={day}
              className={`text-center font-semibold py-2 ${
                day === '日' ? 'text-red-600' : day === '土' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              {day}
            </div>
          ))}
          
          {/* カレンダーの日付 */}
          {calendarDays.map((day) => {
            const dayStr = format(day, 'yyyy-MM-dd');
            const kondate = kondateMap.get(dayStr);
            const isCurrentMonth = isSameMonth(day, targetDate);
            const isToday = isSameDay(day, today);
            const isWeekend = day.getDay() === 0 || day.getDay() === 6;
            
            return (
              <div
                key={dayStr}
                className={`min-h-[80px] sm:min-h-[100px] border rounded-lg p-1 sm:p-2 ${
                  !isCurrentMonth ? 'bg-gray-50 opacity-50' : 'bg-white'
                } ${isToday ? 'ring-2 ring-primary-500' : ''} ${
                  isWeekend ? 'bg-orange-50' : ''
                }`}
              >
                <div className="flex flex-col h-full">
                  <div
                    className={`text-sm font-semibold mb-1 ${
                      day.getDay() === 0
                        ? 'text-red-600'
                        : day.getDay() === 6
                        ? 'text-blue-600'
                        : 'text-gray-700'
                    }`}
                  >
                    {format(day, 'd')}
                  </div>
                  {kondate && isCurrentMonth ? (
                    <Link
                      href={`/${dayStr}?type=${selectedType}`}
                      className="flex-1 text-[10px] sm:text-xs text-gray-700 hover:text-primary-600 transition-colors line-clamp-2 sm:line-clamp-3"
                      title={kondate.menu}
                    >
                      <span className="hidden sm:inline">
                        {kondate.menu.split(',').slice(0, 2).join(', ')}
                        {kondate.menu.split(',').length > 2 && '...'}
                      </span>
                      <span className="sm:hidden">
                        {kondate.menu.split(',')[0]}
                        {kondate.menu.split(',').length > 1 && '...'}
                      </span>
                    </Link>
                  ) : isCurrentMonth ? (
                    <div className="flex-1 text-[10px] sm:text-xs text-gray-400">-</div>
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
            <div className="w-4 h-4 bg-orange-50 rounded"></div>
            <span>週末</span>
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

