import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

export const metadata: Metadata = {
  title: {
    default: 'きゅうしょくなにかな | つくばみらい市給食献立',
    template: '%s | きゅうしょくなにかな',
  },
  description: 'つくばみらい市の学校給食献立を毎日確認できるアプリ。今日と明日の献立を簡単にチェックできます。',
  keywords: ['給食', '献立', 'つくばみらい市', '学校給食', 'きゅうしょく', '給食メニュー', '茨城県'],
  authors: [{ name: 'きゅうしょくなにかな' }],
  creator: 'きゅうしょくなにかな',
  publisher: 'きゅうしょくなにかな',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kyushoku.site'),
  alternates: {
    canonical: '/',
  },
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
      <body className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <Navigation />
        <main className="min-h-screen pb-8">{children}</main>
        <PWAInstallPrompt />
        <footer className="bg-white border-t border-gray-200 py-6 mt-8">
          <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
            <p>© 2024 つくばみらい市給食献立アプリ</p>
            <div className="flex justify-center gap-4 mt-2">
              <a
                href="/about"
                className="text-primary-600 hover:text-primary-700"
              >
                このアプリについて
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

