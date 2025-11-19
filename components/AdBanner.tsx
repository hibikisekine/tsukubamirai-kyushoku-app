'use client';

import React, { useEffect } from 'react';

interface AdBannerProps {
  position?: 'top' | 'bottom' | 'middle';
  className?: string;
}

export default function AdBanner({ position = 'top', className = '' }: AdBannerProps) {
  const [clientId, setClientId] = React.useState<string | undefined>(undefined);
  const [adSlotId, setAdSlotId] = React.useState<string>("1234567890");

  React.useEffect(() => {
    // クライアント側で環境変数を取得
    const envClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
    const envSlotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;
    
    setClientId(envClientId);
    if (envSlotId) {
      setAdSlotId(envSlotId);
    }

    // Google AdSense広告を表示
    if (envClientId && typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  // AdSenseクライアントIDが設定されていない場合はプレースホルダーを表示
  if (!clientId) {
    return (
      <div className={`ad-container ${className}`} style={{ margin: '24px 0' }}>
        <div className="bg-yellow-100 rounded-lg p-6 text-center text-gray-700 border-2 border-yellow-400 max-w-4xl w-full mx-auto">
          <p className="font-bold text-lg mb-2 text-yellow-800">📢 広告スペース</p>
          <p className="text-sm mb-1">AdSense設定後、ここに広告が表示されます</p>
          <p className="text-xs mt-2 text-gray-600">
            位置: {position === 'top' ? '上部' : position === 'bottom' ? '下部' : '中間'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`} style={{ margin: '24px 0' }}>
      <div className="w-full max-w-4xl mx-auto">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '100px' }}
          data-ad-client={clientId}
          data-ad-slot={adSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

