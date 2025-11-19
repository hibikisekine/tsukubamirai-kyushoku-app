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

  // AdSenseクライアントIDが設定されていない場合はプレースホルダーを表示
  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID) {
    return (
      <div className={`ad-container ${className}`}>
        <div className="bg-gray-200 rounded-lg p-6 text-center text-gray-600 border-2 border-dashed border-gray-400 max-w-4xl w-full">
          <p className="font-semibold mb-2">📢 広告スペース</p>
          <p className="text-sm">AdSense設定後、ここに広告が表示されます</p>
          <p className="text-xs mt-2 text-gray-500">
            位置: {position === 'top' ? '上部' : position === 'bottom' ? '下部' : '中間'}
          </p>
        </div>
      </div>
    );
  }

  const adSlotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || "1234567890";

  return (
    <div className={`ad-container ${className}`}>
      <div className="w-full max-w-4xl">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '100px' }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
          data-ad-slot={adSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

