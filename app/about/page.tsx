import Link from 'next/link';
import type { Metadata } from 'next';
import { CITIES } from '@/lib/cities';

export const metadata: Metadata = {
  title: 'このアプリについて | きゅうしょくなにかな',
  description: 'きゅうしょくなにかなは、茨城県つくば地域（つくばみらい市・つくば市・守谷市・取手市・龍ケ崎市）の学校給食献立を毎日確認できるアプリです。',
  alternates: {
    canonical: 'https://kyushoku.site/about',
  },
  openGraph: {
    title: 'このアプリについて | きゅうしょくなにかな',
    description: 'きゅうしょくなにかなは、茨城県つくば地域の学校給食献立を毎日確認できるアプリです。',
    type: 'website',
    url: 'https://kyushoku.site/about',
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
        ← トップに戻る
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary-600 mb-2">
          「きゅうしょくなにかな」とは
        </h1>
        <p className="text-gray-600">
          茨城県つくば地域の学校給食献立を毎日確認できる無料アプリです。
          各市の公式情報をもとに献立を掲載しています。
        </p>
      </header>

      {/* 対応市一覧 */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">🗺️ 対応エリア</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-primary-400 hover:bg-primary-50 transition-colors"
            >
              <span className="text-2xl">{city.emoji}</span>
              <div>
                <div className="font-semibold text-gray-800">{city.name}</div>
                <div className="text-xs text-gray-500">{city.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* フィードバック */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          💬 ご意見をお聞かせください
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          ご意見・ご要望・バグ報告など、お気軽にお聞かせください。
        </p>
        <div className="bg-primary-50 rounded-lg p-6 border-2 border-primary-200">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeG-8tjDfWWkkLNAANW0sGrDp-CbM8aIGhgW4jDIyXODv1aNA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
          >
            <span>📝</span>
            <span>フィードバックフォームを開く</span>
            <span className="text-sm">↗</span>
          </a>
        </div>
      </div>

      {/* 運営者情報 */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">🏠 運営者情報</h2>
        <dl className="space-y-3 text-gray-700">
          <div className="flex gap-4">
            <dt className="font-semibold w-28 shrink-0">サイト名</dt>
            <dd>きゅうしょくなにかな</dd>
          </div>
          <div className="flex gap-4">
            <dt className="font-semibold w-28 shrink-0">運営者</dt>
            <dd>個人（茨城県在住）</dd>
          </div>
          <div className="flex gap-4">
            <dt className="font-semibold w-28 shrink-0">サイトURL</dt>
            <dd>https://kyushoku.site</dd>
          </div>
          <div className="flex gap-4">
            <dt className="font-semibold w-28 shrink-0">お問い合わせ</dt>
            <dd>下記フォームよりお願いします</dd>
          </div>
          <div className="flex gap-4">
            <dt className="font-semibold w-28 shrink-0">広告について</dt>
            <dd>
              当サイトはGoogle AdSenseを利用しています。
              詳しくは
              <Link href="/privacy" className="text-primary-600 hover:underline ml-1">プライバシーポリシー</Link>
              をご確認ください。
            </dd>
          </div>
        </dl>
      </div>

      {/* 導入案内 */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-400 rounded-2xl shadow-lg p-8 mb-6 text-white">
        <h2 className="text-2xl font-bold mb-3">
          🏫 他の自治体・学校でも導入できます
        </h2>
        <p className="leading-relaxed mb-6 text-orange-50">
          「きゅうしょくなにかな」のシステムは、他の自治体・学校でもご利用いただけます。
          PDFの献立表をスマホで見やすく変換し、保護者への情報提供をサポートします。
        </p>
        <Link
          href="/lp"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-500 rounded-xl font-bold hover:bg-orange-50 transition-colors shadow"
        >
          <span>📋</span>
          <span>導入について詳しく見る</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
