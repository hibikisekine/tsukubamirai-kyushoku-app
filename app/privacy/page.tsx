import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | きゅうしょくなにかな',
  description: 'きゅうしょくなにかなのプライバシーポリシーです。',
  alternates: {
    canonical: 'https://kyushoku.site/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
        ← トップに戻る
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary-600 mb-2">
          プライバシーポリシー
        </h1>
        <p className="text-gray-600">最終更新日: 2026年3月21日</p>
      </header>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8 space-y-8">

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">1. はじめに</h2>
          <p className="text-gray-700 leading-relaxed">
            きゅうしょくなにかな（以下「当サイト」）は、ユーザーの個人情報の保護を重要視しています。
            本プライバシーポリシーは、当サイトにおける個人情報の取り扱いについて説明します。
            当サイトをご利用いただくことで、本ポリシーに同意したものとみなされます。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">2. 運営者情報</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトは個人が運営する非営利の情報提供サービスです。
            お問い合わせは<Link href="/about" className="text-primary-600 hover:underline">こちらのフォーム</Link>からお願いします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">3. 収集する情報</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            当サイトでは、以下の情報を収集する場合があります：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
            <li>アクセスログ（IPアドレス、ブラウザ情報、アクセス日時など）</li>
            <li>Google Analyticsによる利用状況データ（匿名）</li>
            <li>Google AdSenseによる広告配信のための情報</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-3">
            当サイトは、氏名・住所・電話番号などの個人を直接特定できる情報は収集しません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Cookieおよび広告について</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            当サイトは、<strong>Google AdSense</strong>を利用して広告を掲載しています。
            Google AdSenseは、ユーザーの興味に基づいた広告を表示するため、Cookieを使用します。
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2 mb-4">
            <li>
              Google はユーザーのブラウザに Cookie を保存し、広告配信の最適化に利用します。
            </li>
            <li>
              Cookie を無効化したい場合は、ブラウザの設定で無効にすることができます。
            </li>
            <li>
              Google による広告のパーソナライズを無効にしたい場合は、
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Google の広告設定ページ
              </a>
              から設定できます。
            </li>
            <li>
              また、
              <a
                href="https://optout.aboutads.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                aboutads.info
              </a>
              から第三者配信事業者による広告のオプトアウトも可能です。
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Google のプライバシーポリシーおよび利用規約については、
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              Google プライバシーポリシー
            </a>
            をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">5. アクセス解析について</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトでは、<strong>Google Analytics</strong>を利用してアクセス状況を分析しています。
            Google Analytics はトラフィックデータの収集のために Cookie を使用しています。
            収集されるデータは匿名であり、個人を特定するものではありません。
            Google Analytics の利用規約については、
            <a
              href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              こちら
            </a>
            をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">6. 第三者へのデータ提供</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトは、以下の場合を除き、収集した情報を第三者に提供しません：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2 mt-2">
            <li>Google Analytics（アクセス解析）</li>
            <li>Google AdSense（広告配信）</li>
            <li>法令に基づく開示要求がある場合</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">7. 免責事項</h2>
          <p className="text-gray-700 leading-relaxed">
            当サイトに掲載している給食献立情報は、各市区町村の公式情報をもとに提供しています。
            情報の正確性・完全性については保証しかねます。
            実際の給食内容については、各学校または各市教育委員会の公式情報をご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">8. お問い合わせ</h2>
          <p className="text-gray-700 leading-relaxed">
            プライバシーポリシーに関するお問い合わせは、
            <Link href="/about" className="text-primary-600 hover:underline">
              このアプリについて
            </Link>
            ページのフォームよりお願いします。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">9. プライバシーポリシーの変更</h2>
          <p className="text-gray-700 leading-relaxed">
            本ポリシーは、必要に応じて変更する場合があります。
            変更後のポリシーは本ページへの掲載をもって効力を生じます。
          </p>
        </section>

      </div>

      <div className="flex gap-4 justify-center">
        <Link
          href="/terms"
          className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
        >
          利用規約
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
