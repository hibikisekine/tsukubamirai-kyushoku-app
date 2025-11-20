import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'きゅうしょくなにかなのプライバシーポリシーです。',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary-600 mb-2">
          プライバシーポリシー
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
            きゅうしょくなにかな（以下「当アプリ」）は、ユーザーの個人情報の保護を重要視しています。
            本プライバシーポリシーは、当アプリがどのように個人情報を収集、使用、保護するかを説明します。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            2. 収集する情報
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当アプリは、以下の情報を収集する場合があります：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>アクセスログ（IPアドレス、ブラウザ情報、アクセス日時など）</li>
            <li>Google Analyticsによる利用状況データ</li>
            <li>「食べたい」ボタンのクリック数（個人を特定できない形式）</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            3. 情報の使用目的
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            収集した情報は、以下の目的で使用します：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>サービスの提供と改善</li>
            <li>利用状況の分析</li>
            <li>広告の配信（Google AdSense）</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            4. 第三者への提供
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当アプリは、以下の場合を除き、個人情報を第三者に提供することはありません：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Google Analytics（利用状況の分析）</li>
            <li>Google AdSense（広告の配信）</li>
            <li>法的な要求がある場合</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            5. Cookieについて
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当アプリは、Google AnalyticsとGoogle AdSenseのCookieを使用しています。
            これらのCookieは、利用状況の分析と広告の配信に使用されます。
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            6. お問い合わせ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            プライバシーポリシーに関するお問い合わせは、以下のページからお願いします：
          </p>
          <Link
            href="/about"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            このアプリについて
          </Link>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            7. プライバシーポリシーの変更
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当アプリは、必要に応じて本プライバシーポリシーを変更する場合があります。
            変更があった場合は、本ページに掲載します。
          </p>
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
