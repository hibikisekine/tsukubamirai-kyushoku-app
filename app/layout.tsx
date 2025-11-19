import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export const metadata: Metadata = {
  title: 'きゅうしょくなにかな',
  description: 'つくばみらい市の給食献立を確認できるアプリ',
  manifest: '/manifest.json',
  themeColor: '#f97316',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* Google AdSense（環境変数から取得） */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
        {/* A8.netリンクマネージャー（環境変数から取得） */}
        {process.env.NEXT_PUBLIC_A8_CONFIG_ID && (
          <>
            <script src="//statics.a8.net/a8link/a8linkmgr.js"></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  a8linkmgr({
                    "config_id": "${process.env.NEXT_PUBLIC_A8_CONFIG_ID}"
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <GoogleAnalytics />
        <Navigation />
        <main className="min-h-screen pb-8">{children}</main>
        <footer className="bg-white border-t border-gray-200 py-6 mt-8">
          <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
            <p>© 2024 きゅうしょくなにかな</p>
            <div className="flex justify-center gap-4 mt-2 flex-wrap">
              <a
                href="/about"
                className="text-primary-600 hover:text-primary-700"
              >
                このアプリについて
              </a>
              <span>|</span>
              <a
                href="/privacy"
                className="text-primary-600 hover:text-primary-700"
              >
                プライバシーポリシー
              </a>
              <span>|</span>
              <a
                href="/admin/upload"
                className="text-primary-600 hover:text-primary-700"
              >
                管理者ページ
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

