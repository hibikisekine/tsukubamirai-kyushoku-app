import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '利用規約 | きゅうしょくなにかな',
  description: 'きゅうしょくなにかなの利用規約です。',
  alternates: {
    canonical: 'https://kyushoku.site/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
        ← トップに戻る
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary-600 mb-2">
          利用規約
        </h1>
        <p className="text-gray-600">最終更新日: 2026年3月21日</p>
      </header>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8 space-y-8">

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">1. はじめに</h2>
          <p className="text-gray-700 leading-relaxed">
            本利用規約（以下「本規約」）は、きゅうしょくなにかな（以下「当サイト」）の利用条件を定めるものです。
            当サイトをご利用いただくことで、本規約に同意したものとみなされます。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">2. サービスの内容</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            当サイトは、茨城県内の市区町村（つくばみらい市・つくば市・守谷市・取手市・龍ケ崎市）の
            学校給食献立情報を提供する無料の情報サービスです。
            以下の機能を提供しています：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
            <li>今日・明日の給食献立の表示</li>
            <li>カレンダー形式での月別献立確認</li>
            <li>献立の検索機能</li>
            <li>日付別の献立詳細表示</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">3. 情報の正確性</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトに掲載されている給食献立情報は、各市区町村の教育委員会が公開している公式情報をもとに作成しています。
            ただし、献立変更・食材変更・給食中止などにより、実際の給食内容と異なる場合があります。
            正確な最新情報については、各学校または各市教育委員会の公式情報をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">4. 禁止事項</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            当サイトの利用にあたり、以下の行為を禁止します：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
            <li>当サイトのコンテンツを無断で複製・転載・配布すること</li>
            <li>当サイトの運営を妨害する行為</li>
            <li>不正アクセスやシステムへの攻撃</li>
            <li>その他、法令または公序良俗に反する行為</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">5. 広告について</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトでは、Google AdSenseによる広告を掲載しています。
            広告の内容は広告主が管理するものであり、当サイトはその内容について責任を負いません。
            広告に関するデータの取り扱いについては、
            <Link href="/privacy" className="text-primary-600 hover:underline">プライバシーポリシー</Link>
            をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">6. 免責事項</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            当サイトは以下の事項について責任を負いません：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
            <li>当サイトに掲載されている情報の正確性・完全性・有用性</li>
            <li>当サイトの利用により生じた損害</li>
            <li>当サイトの一時的な停止・中断・終了</li>
            <li>システムの不具合や障害</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">7. 知的財産権</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトのデザイン・構成・プログラムなどの知的財産権は当サイト運営者に帰属します。
            各市区町村の給食献立情報は各自治体に権利が帰属します。
            無断での複製・転載・配布は禁止されています。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">8. 利用規約の変更</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトは、必要に応じて本規約を変更する場合があります。
            変更後の規約は本ページへの掲載をもって効力を生じます。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">9. お問い合わせ</h2>
          <p className="text-gray-700 leading-relaxed">
            本規約に関するお問い合わせは、
            <Link href="/about" className="text-primary-600 hover:underline">
              このサイトについて
            </Link>
            ページのフォームよりお願いします。
          </p>
        </section>

      </div>

      <div className="flex gap-4 justify-center">
        <Link
          href="/privacy"
          className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
        >
          プライバシーポリシー
        </Link>
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
