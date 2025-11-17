import Link from 'next/link';
import { getKondateList } from '@/lib/data';

export default async function AdminPage() {
  const kondateList = await getKondateList();
  const totalCount = kondateList.length;
  
  // 最新の更新日を取得
  const latestDate = kondateList.length > 0
    ? kondateList[kondateList.length - 1].date
    : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          ← トップに戻る
        </Link>
        <h1 className="text-3xl font-bold text-primary-600 mb-2">
          🔧 管理者ダッシュボード
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            総献立件数
          </h2>
          <p className="text-3xl font-bold text-primary-600">{totalCount}件</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            最新更新日
          </h2>
          <p className="text-2xl font-bold text-primary-600">
            {latestDate || 'データなし'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          管理機能
        </h2>
        <div className="space-y-4">
          <Link
            href="/admin/upload"
            className="block w-full py-3 px-6 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold text-center"
          >
            📤 CSVファイルをアップロード
          </Link>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="font-semibold text-blue-900 mb-2">📝 CSV形式について</h2>
        <p className="text-sm text-blue-800 mb-2">
          CSVファイルは以下の形式で作成してください：
        </p>
        <pre className="bg-white p-4 rounded text-sm overflow-x-auto">
          {`日付,曜日,献立
2024-01-15,月曜日,ごはん,味噌汁,鮭の塩焼き,ほうれん草のお浸し,牛乳
2024-01-16,火曜日,パン,スープ,ハンバーグ,サラダ,牛乳`}
        </pre>
        <p className="text-xs text-blue-700 mt-2">
          ※ 日付は YYYY-MM-DD 形式または YYYY/MM/DD 形式で入力してください
        </p>
      </div>
    </div>
  );
}

