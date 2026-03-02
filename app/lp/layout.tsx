import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'きゅうしょくなにかな｜自治体・学校向け給食献立デジタル化サービス',
    description:
        '学校給食の献立PDFをスマホで見やすくデジタル化。自治体・学校の情報提供をDXで効率化します。導入から運用まで一括サポート。自治体担当者様はお気軽にお問い合わせください。',
    keywords: [
        '給食献立 デジタル化', '給食 PDF変換', '自治体 給食 DX',
        '学校給食 スマホ', '給食献立 配信', '自治体 情報提供 支援',
        '給食 アレルギー対応', '献立表 デジタル', 'BPO 給食',
    ],
    alternates: {
        canonical: 'https://kyushoku.site/lp',
    },
    openGraph: {
        title: 'きゅうしょくなにかな｜自治体・学校向け給食献立デジタル化サービス',
        description:
            '学校給食の献立PDFをスマホで見やすくデジタル化。自治体・学校の情報提供をDXで効率化します。',
        type: 'website',
        url: 'https://kyushoku.site/lp',
        siteName: 'きゅうしょくなにかな',
        locale: 'ja_JP',
        images: [
            {
                url: 'https://kyushoku.site/lp-hero.png',
                width: 1200,
                height: 630,
                alt: 'きゅうしょくなにかな - 自治体・学校向け給食献立デジタル化サービス',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'きゅうしょくなにかな｜自治体・学校向け給食献立デジタル化',
        description:
            '学校給食の献立PDFをスマホで見やすくデジタル化。自治体・学校の情報提供をDXで効率化します。',
        images: ['https://kyushoku.site/lp-hero.png'],
    },
};

export default function LpLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
