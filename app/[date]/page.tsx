import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';
import type { Metadata } from 'next';
import AdBanner from '@/components/AdBanner';
import AffiliateLink from '@/components/AffiliateLink';
import { getKondateByDateBoth, KondateType } from '@/lib/data';

// 動的レンダリングを強制（データが更新されたら即座に反映）
export const dynamic = 'force-dynamic';

// 動的メタデータを生成
export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { date } = params;
  const selectedType = (searchParams.type?.toUpperCase() || 'A') as KondateType;
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return {
      title: 'ページが見つかりません',
    };
  }

  const { A: kondateA, B: kondateB } = await getKondateByDateBoth(date);
  const kondate = selectedType === 'A' ? kondateA : kondateB;

  const formattedDate = format(dateObj, 'yyyy年M月d日(E)', { locale: ja });
  const menuPreview = kondate?.menu?.split('\n').slice(0, 2).join('、') || '給食献立';

  const canonicalUrl = `https://kyushoku.site/${date}?type=${selectedType}`;

  return {
    title: `${formattedDate}の${selectedType}献立`,
    description: `${formattedDate}のつくばみらい市学校給食${selectedType}献立: ${menuPreview}`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${formattedDate}の${selectedType}献立 | きゅうしょくなにかな`,
      description: `${formattedDate}のつくばみらい市学校給食${selectedType}献立: ${menuPreview}`,
      type: 'article',
      publishedTime: date,
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary',
      title: `${formattedDate}の${selectedType}献立`,
      description: `${formattedDate}のつくばみらい市学校給食${selectedType}献立: ${menuPreview}`,
    },
  };
}

interface PageProps {
  params: {
    date: string;
  };
  searchParams: {
    type?: string;
  };
}

export default async function DatePage({ params, searchParams }: PageProps) {
  const { date } = params;
  const selectedType = (searchParams.type?.toUpperCase() || 'A') as KondateType;
  
  // 日付の妥当性チェック
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    notFound();
  }

  // A/B両方の献立を取得
  const { A: kondateA, B: kondateB } = await getKondateByDateBoth(date);

  // 選択されたタイプの献立を取得
  const kondate = selectedType === 'A' ? kondateA : kondateB;

  if (!kondateA && !kondateB) {
    notFound();
  }

  const formattedDate = format(dateObj, 'yyyy年M月d日(E)', { locale: ja });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href="/"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        ← 一覧に戻る
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary-600 mb-2">
          {formattedDate}の献立
        </h1>
        <div className="flex gap-2 mt-4">
          <Link
            href={`/${date}?type=A`}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              selectedType === 'A'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            A献立
          </Link>
          <Link
            href={`/${date}?type=B`}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              selectedType === 'B'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            B献立
          </Link>
        </div>
      </header>

      {/* 献立データがある場合のみ広告を表示 */}
      {kondate && <AdBanner />}

      {kondate ? (
        <>
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedType}献立
              </h2>
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                {kondate.weekday}
              </span>
            </div>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {kondate.menu}
              </p>
            </div>
          </div>

          {/* もう一方の献立も表示（存在する場合） */}
          {selectedType === 'A' && kondateB && (
            <div className="bg-gray-50 rounded-lg shadow-md p-6 mb-6 border-2 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                B献立も見る
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {kondateB.menu.split(',').slice(0, 3).join(', ')}...
              </p>
              <Link
                href={`/${date}?type=B`}
                className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
              >
                B献立の詳細を見る →
              </Link>
            </div>
          )}
          {selectedType === 'B' && kondateA && (
            <div className="bg-gray-50 rounded-lg shadow-md p-6 mb-6 border-2 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                A献立も見る
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {kondateA.menu.split(',').slice(0, 3).join(', ')}...
              </p>
              <Link
                href={`/${date}?type=A`}
                className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
              >
                A献立の詳細を見る →
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="text-center text-gray-500 mb-4">
            <p className="text-lg font-semibold mb-2">{selectedType}献立のデータがありません</p>
            <p className="text-sm text-gray-600 mb-4">
              この日付の{selectedType}献立データは登録されていません。
            </p>
            {selectedType === 'A' && kondateB && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">B献立のデータはあります：</p>
                <Link
                  href={`/${date}?type=B`}
                  className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
                >
                  B献立を見る →
                </Link>
              </div>
            )}
            {selectedType === 'B' && kondateA && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">A献立のデータはあります：</p>
                <Link
                  href={`/${date}?type=A`}
                  className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
                >
                  A献立を見る →
                </Link>
              </div>
            )}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">他のページもご利用ください：</p>
              <div className="flex gap-2 justify-center flex-wrap">
                <Link
                  href="/"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                >
                  🏠 トップページ
                </Link>
                <Link
                  href="/calendar"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                >
                  📅 カレンダー
                </Link>
                <Link
                  href="/search"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                >
                  🔍 検索
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* アフィリエイトリンクセクション（例） */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          🛒 給食関連商品
        </h2>
        <div className="space-y-2 text-sm">
          <p>
            <AffiliateLink
              href="https://www.amazon.co.jp/s?k=ランチボックス"
              title="ランチボックス"
            >
              ランチボックス
            </AffiliateLink>
            や
            <AffiliateLink
              href="https://www.amazon.co.jp/s?k=水筒"
              title="水筒"
            >
              水筒
            </AffiliateLink>
            など、給食に便利なアイテムをチェック！
          </p>
        </div>
      </div>

      {/* 献立データがある場合のみ広告を表示 */}
      {kondate && <AdBanner position="bottom" />}
    </div>
  );
}
