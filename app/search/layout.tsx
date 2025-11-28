import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '献立を検索',
  description: 'つくばみらい市の学校給食献立をメニュー名、日付、曜日で検索できます。',
  openGraph: {
    title: '給食献立検索 | きゅうしょくなにかな',
    description: 'つくばみらい市の学校給食献立をメニュー名、日付、曜日で検索できます。',
    type: 'website',
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


