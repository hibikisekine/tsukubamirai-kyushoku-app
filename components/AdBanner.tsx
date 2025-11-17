'use client';

import { useEffect } from 'react';

interface AdBannerProps {
  position?: 'top' | 'bottom' | 'middle';
  className?: string;
}

export default function AdBanner({ position = 'top', className = '' }: AdBannerProps) {
  useEffect(() => {
    try {
      // Google AdSense広告を表示
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  // AdSenseクライアントIDが設定されていない場合は非表示
  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID) {
    return (
      <div className={`ad-container ${className}`}>
        <div className="bg-gray-200 rounded p-4 text-center text-gray-500 text-sm">
          広告スペース（AdSense設定後、ここに広告が表示されます）
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot="1234567890" // 実際のAdSense広告ユニットIDに置き換え
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

