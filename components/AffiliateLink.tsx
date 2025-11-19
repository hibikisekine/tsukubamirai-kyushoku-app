'use client';

interface AffiliateLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export default function AffiliateLink({
  href,
  children,
  className = '',
  title,
}: AffiliateLinkProps) {
  // AmazonアソシエイトIDを取得
  const associateId = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_ID;
  
  // URLにアソシエイトIDを追加
  const getAffiliateUrl = (url: string) => {
    if (!associateId || !url.includes('amazon.co.jp')) {
      return url;
    }
    
    try {
      const urlObj = new URL(url);
      // 既にtagパラメータがある場合は上書き、ない場合は追加
      urlObj.searchParams.set('tag', associateId);
      return urlObj.toString();
    } catch {
      // URLの解析に失敗した場合は、クエリパラメータとして追加
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}tag=${associateId}`;
    }
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

