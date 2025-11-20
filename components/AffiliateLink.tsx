'use client';

interface AffiliateLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  affiliateType?: 'amazon' | 'a8' | 'auto'; // アフィリエイトタイプ
}

export default function AffiliateLink({
  href,
  children,
  className = '',
  title,
  affiliateType = 'auto',
}: AffiliateLinkProps) {
  // AmazonアソシエイトIDを取得
  const amazonAssociateId = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_ID;
  // A8.netメディアIDを取得（メディアIDは「a」で始まる11桁の数字、例: a12345678901）
  const a8MediaId = process.env.NEXT_PUBLIC_A8_AFFILIATE_ID;
  
  // URLにアフィリエイトIDを追加
  const getAffiliateUrl = (url: string) => {
    // A8.netのリンク形式をチェック（既にA8.netのリンクの場合はそのまま返す）
    if (url.includes('px.a8.net') || url.includes('a8.net')) {
      return url;
    }
    
    // Amazonのリンクの場合
    if (url.includes('amazon.co.jp') || url.includes('amzn.to')) {
      // 明示的にA8を指定している場合はスキップ
      if (affiliateType === 'a8') {
        return url;
      }
      
      // AmazonアソシエイトIDを追加
      if (amazonAssociateId) {
        try {
          const urlObj = new URL(url);
          // 既にtagパラメータがある場合は上書き、ない場合は追加
          urlObj.searchParams.set('tag', amazonAssociateId);
          return urlObj.toString();
        } catch {
          // URLの解析に失敗した場合は、クエリパラメータとして追加
          const separator = url.includes('?') ? '&' : '?';
          return `${url}${separator}tag=${amazonAssociateId}`;
        }
      }
      return url;
    }
    
    // A8.netのアフィリエイトリンクに変換
    if (affiliateType === 'a8' || (affiliateType === 'auto' && a8MediaId)) {
      if (a8MediaId) {
        // A8.netのリンク形式: https://px.a8.net/svt/ejp/?aam2=メディアID&url=元のURL
        // メディアIDは「a」で始まる11桁の数字（例: a12345678901）
        const encodedUrl = encodeURIComponent(url);
        return `https://px.a8.net/svt/ejp/?aam2=${a8MediaId}&url=${encodedUrl}`;
      }
    }
    
    // デフォルトは元のURLを返す
    return url;
  };

  return (
    <a
      href={getAffiliateUrl(href)}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`text-primary-600 hover:text-primary-700 underline ${className}`}
      title={title}
    >
      {children}
    </a>
  );
}

