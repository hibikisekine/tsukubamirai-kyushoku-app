import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: 'きゅうしょくなにかな | 茨城県給食献立',
    template: '%s | きゅうしょくなにかな',
  },
  description: '茨城県つくば地域（つくばみらい市・つくば市・守谷市・取手市・龍ケ崎市）の学校給食献立を毎日確認できる無料サービス。カレンダー表示・キーワード検索にも対応。',
  keywords: [
    '給食', '献立', '学校給食', 'きゅうしょく', '給食メニュー', '茨城県',
    'つくばみらい市', 'つくば市', '守谷市', '取手市', '龍ケ崎市',
    'つくばみらい市 給食', 'つくば市 給食', '守谷市 給食', '取手市 給食', '龍ケ崎市 給食',
    '給食 献立', '今日の給食', '明日の給食', '給食カレンダー',
  ],
  authors: [{ name: 'きゅうしょくなにかな' }],
  creator: 'きゅうしょくなにかな',
  publisher: 'きゅうしょくなにかな',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kyushoku.site'),
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://kyushoku.site',
    siteName: 'きゅうしょくなにかな',
    title: 'きゅうしょくなにかな | つくばみらい市給食献立',
    description: 'つくばみらい市の学校給食献立を毎日確認できるアプリ。今日と明日の献立を簡単にチェックできます。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'きゅうしょくなにかな',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'きゅうしょくなにかな | つくばみらい市給食献立',
    description: 'つくばみらい市の学校給食献立を毎日確認できるアプリ。今日と明日の献立を簡単にチェックできます。',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f97316" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="きゅうしょくなにかな" />
        <link rel="apple-touch-icon" href="/icon-192x192.png?v=2" />
        {/* Google AdSense（環境変数から取得） */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-6K7NXBD8T9"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6K7NXBD8T9');
        `}
      </Script>
      <body className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <Navigation />
        <main className="min-h-screen pb-8">{children}</main>
        <PWAInstallPrompt />
        <footer className="bg-white border-t border-gray-200 py-6 mt-8">
          <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
            <p>© 2026 きゅうしょくなにかな</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <a href="/about" className="text-primary-600 hover:text-primary-700">
                このサイトについて
              </a>
              <span>|</span>
              <a href="/privacy" className="text-primary-600 hover:text-primary-700">
                プライバシーポリシー
              </a>
              <span>|</span>
              <a href="/terms" className="text-primary-600 hover:text-primary-700">
                利用規約
              </a>
              <span>|</span>
              <a href="/lp" className="text-primary-600 hover:text-primary-700">
                自治体・学校の方へ
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

