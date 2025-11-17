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
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`text-primary-600 hover:text-primary-700 underline ${className}`}
      title={title}
    >
      {children}
    </a>
  );
}

