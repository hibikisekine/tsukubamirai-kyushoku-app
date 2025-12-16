import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '利用規約',
  description: 'きゅうしょくなにかなの利用規約です。',
  alternates: {
    canonical: 'https://kyushoku.site/terms',
  },
  openGraph: {
    title: '利用規約 | きゅうしょくなにかな',
    description: 'きゅうしょくなにかなの利用規約です。',
    type: 'website',
    url: 'https://kyushoku.site/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary-600 mb-2">
          利用規約
        </h1>
        <p className="text-gray-600">
          最終更新日: 2024年11月21日
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            1. はじめに
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            本利用規約（以下「本規約」）は、きゅうしょくなにかな（以下「当アプリ」）の利用条件を定めるものです。
            当アプリをご利用いただく際には、本規約に同意していただく必要があります。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            2. サービスの内容
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当アプリは、つくばみらい市の学校給食献立情報を提供するサービスです。
            以下の機能を提供しています：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>今日と明日の給食献立の表示</li>
            <li>カレンダー形式での献立確認</li>
            <li>献立の検索機能</li>
            <li>日付別の献立詳細表示</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            3. 利用規約の同意
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当アプリをご利用いただくことで、本規約に同意したものとみなされます。
            本規約に同意できない場合は、当アプリの利用を中止してください。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            4. 利用目的
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当アプリは、つくばみらい市の学校給食献立情報を確認する目的でのみご利用ください。
            以下の行為は禁止されています：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>当アプリの内容を無断で複製、転載、配布すること</li>
            <li>当アプリの運営を妨害する行為</li>
            <li>不正アクセスやシステムへの攻撃</li>
            <li>その他、法令または公序良俗に反する行為</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            5. 情報の正確性
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当アプリに掲載されている給食献立情報は、つくばみらい市教育委員会が公開している情報に基づいています。
            ただし、実際の給食内容と異なる場合がありますので、正確な情報については各学校またはつくばみらい市教育委員会にご確認ください。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            6. 免責事項
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当アプリは以下の事項について責任を負いません：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>当アプリに掲載されている情報の正確性、完全性、有用性</li>
            <li>当アプリの利用により生じた損害</li>
            <li>当アプリの一時的な停止、中断、終了</li>
            <li>システムの不具合や障害</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            7. 広告について
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当アプリでは、Google AdSenseによる広告を掲載しています。
            広告の内容は、当アプリが管理するものではなく、広告主が責任を負います。
            広告のクリックにより生じた損害について、当アプリは責任を負いません。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            8. 知的財産権
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当アプリのコンテンツ（テキスト、画像、デザインなど）の知的財産権は、当アプリまたは正当な権利者に帰属します。
            無断で複製、転載、配布することは禁止されています。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            9. 利用規約の変更
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当アプリは、必要に応じて本規約を変更する場合があります。
            変更があった場合は、本ページに掲載します。
            変更後の規約は、本ページに掲載した時点から効力を生じます。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            10. お問い合わせ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            利用規約に関するお問い合わせは、以下のページからお願いします：
          </p>
          <Link
            href="/about"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            このアプリについて
          </Link>
        </section>
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
        >
          トップページに戻る
        </Link>
      </div>
    </div>
  );
}

