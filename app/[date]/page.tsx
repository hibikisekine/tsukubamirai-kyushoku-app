import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import AffiliateLink from '@/components/AffiliateLink';
import NinjaAdMax from '@/components/NinjaAdMax';
import LikeButton from '@/components/LikeButton';
import { getKondateByDateBoth, KondateType } from '@/lib/data';

// 動的レンダリングを強制（データが更新されたら即座に反映）
export const dynamic = 'force-dynamic';

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

      <AdBanner />

      {kondate ? (
        <>
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedType}献立
                </h2>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                  {kondate.weekday}
                </span>
              </div>
              <LikeButton date={date} type={selectedType} />
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
        <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center text-gray-500">
          <p>{selectedType}献立のデータがありません</p>
          {selectedType === 'A' && kondateB && (
            <Link
              href={`/${date}?type=B`}
              className="mt-4 inline-block text-primary-600 hover:text-primary-700 font-semibold"
            >
              B献立を見る →
            </Link>
          )}
          {selectedType === 'B' && kondateA && (
            <Link
              href={`/${date}?type=A`}
              className="mt-4 inline-block text-primary-600 hover:text-primary-700 font-semibold"
            >
              A献立を見る →
            </Link>
          )}
        </div>
      )}

      {/* 忍者AdMax広告 */}
      <NinjaAdMax position="middle" />

      {/* アフィリエイトリンクセクション */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          🛒 給食関連商品
        </h2>
        <div className="space-y-3 text-sm">
          <p className="text-gray-700">
            ランチボックスや水筒など、給食に便利なアイテムをチェック！
          </p>
          <p className="text-xs text-gray-500 italic">
            ※ 以下のリンクはアフィリエイトリンクです。購入時に手数料が発生する場合があります。
          </p>
          <div className="flex flex-wrap gap-2">
            <AffiliateLink
              href="https://amzn.to/44d5r5t"
              title="Amazonで給食関連商品"
              className="inline-block px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold no-underline"
            >
              🛒 Amazonで見る
            </AffiliateLink>
            {/* A8.netの商品リンク */}
            <AffiliateLink
              href="https://px.a8.net/svt/ejp?a8mat=45ICTC+BNQM9E+4SVM+BXQOI"
              title="ZIPTOP公式オンラインストア - ランチボックス"
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold no-underline"
            >
              🍱 ランチボックス・保存容器を見る
            </AffiliateLink>
            <AffiliateLink
              href="https://px.a8.net/svt/ejp?a8mat=45ICTC+BNQM9E+4SVM+BWVTE"
              title="ZIPTOP公式オンラインストア - 保存容器"
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold no-underline"
            >
              🥡 繰り返し使える保存容器
            </AffiliateLink>
          </div>
        </div>
      </div>

      <AdBanner position="bottom" />
    </div>
  );
}
