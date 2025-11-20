import Link from 'next/link';

export default function PrivacyPage() {
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
          🔒 プライバシーポリシー
        </h1>
        <p className="text-gray-600">
          最終更新日: 2024年1月1日
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            1. はじめに
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            「きゅうしょくなにかな」（以下「本アプリ」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。
            本プライバシーポリシーは、本アプリがどのように個人情報を収集、使用、保護するかについて説明します。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            2. 収集する情報
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            本アプリは、以下の情報を収集する場合があります：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>アクセスログ（IPアドレス、アクセス日時、閲覧ページなど）</li>
            <li>ブラウザ情報（ユーザーエージェント、画面解像度など）</li>
            <li>Cookie情報（サイトの利用状況を分析するため）</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            本アプリは、ユーザーが明示的に入力した個人情報（氏名、メールアドレスなど）は収集しません。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            3. 情報の使用目的
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            収集した情報は、以下の目的で使用します：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>本アプリのサービス提供および改善</li>
            <li>サイトの利用状況の分析</li>
            <li>不正アクセスの防止</li>
            <li>広告の配信（Google AdSenseなど）</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            4. 第三者への情報提供
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            本アプリは、以下の場合を除き、収集した情報を第三者に提供することはありません：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>法令に基づく場合</li>
            <li>ユーザーの同意がある場合</li>
            <li>広告配信サービス（Google AdSenseなど）への提供（匿名化された情報）</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            5. 広告について
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            本アプリでは、以下の広告サービスを使用しています：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Google AdSense</strong>: 広告配信サービス。ユーザーの興味に基づいた広告を表示するためにCookieを使用する場合があります。
            </li>
            <li>
              <strong>アフィリエイトプログラム</strong>: Amazonアソシエイト、A8.netなどのアフィリエイトプログラムに参加しています。商品リンクをクリックして購入された場合、手数料が発生する場合があります。
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            広告配信サービスのプライバシーポリシー：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                Google プライバシーポリシー
              </a>
            </li>
            <li>
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                Google 広告設定
              </a>
            </li>
            <li>
              <a
                href="https://affiliate.amazon.co.jp/help/operating/policies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                Amazonアソシエイト利用規約
              </a>
            </li>
            <li>
              <a
                href="https://www.a8.net/help/terms/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                A8.net利用規約
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            6. Cookieについて
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            本アプリでは、サイトの利用状況を分析するためにCookieを使用しています。
            ユーザーは、ブラウザの設定によりCookieの使用を拒否することができます。
            ただし、Cookieを拒否した場合、一部の機能が正常に動作しない可能性があります。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            7. データの保存期間
          </h2>
          <p className="text-gray-700 leading-relaxed">
            収集した情報は、本アプリの運営に必要な期間のみ保存し、その後は適切に削除します。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            8. お問い合わせ
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            本プライバシーポリシーに関するお問い合わせは、以下のフィードバックフォームからお願いします：
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeG-8tjDfWWkkLNAANW0sGrDp-CbM8aIGhgW4jDIyXODv1aNA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
          >
            フィードバックフォームを開く
          </a>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            9. プライバシーポリシーの変更
          </h2>
          <p className="text-gray-700 leading-relaxed">
            本プライバシーポリシーは、法令の変更や本アプリの運営方針の変更に伴い、予告なく変更される場合があります。
            変更後のプライバシーポリシーは、本ページに掲載した時点で効力を生じるものとします。
          </p>
        </section>
      </div>
    </div>
  );
}

