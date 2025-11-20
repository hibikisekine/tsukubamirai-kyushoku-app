'use client';

import React, { useEffect, useRef } from 'react';

interface NinjaAdMaxProps {
  position?: 'top' | 'bottom' | 'middle';
  className?: string;
}

export default function NinjaAdMax({ 
  position = 'top', 
  className = ''
}: NinjaAdMaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);
  
  // 環境変数からスクリプトIDを取得
  const adMaxScriptId = process.env.NEXT_PUBLIC_NINJA_ADMAX_SCRIPT_ID;

  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window === 'undefined' || !adMaxScriptId || scriptLoadedRef.current) {
      return;
    }

    // 既にスクリプトが読み込まれているかチェック
    const existingScript = document.querySelector(`script[src*="adm.shinobi.jp/s/${adMaxScriptId}"]`);
    if (existingScript) {
      scriptLoadedRef.current = true;
      return;
    }

    // スクリプトを読み込む
    const script = document.createElement('script');
    script.src = `https://adm.shinobi.jp/s/${adMaxScriptId}`;
    script.async = true;
    script.onload = () => {
      scriptLoadedRef.current = true;
    };
    document.head.appendChild(script);

    return () => {
      // クリーンアップはしない（広告スクリプトは残しておく）
    };
  }, [adMaxScriptId]);

  if (!adMaxScriptId) {
    return (
      <div className={`ad-container ${className}`} style={{ margin: '24px 0' }}>
        <div className="bg-blue-100 rounded-lg p-6 text-center text-gray-700 border-2 border-blue-400 max-w-4xl w-full mx-auto">
          <p className="font-bold text-lg mb-2 text-blue-800">📢 広告スペース（忍者AdMax）</p>
          <p className="text-sm mb-1">忍者AdMax設定後、ここに広告が表示されます</p>
          <p className="text-xs mt-2 text-gray-600">
            位置: {position === 'top' ? '上部' : position === 'bottom' ? '下部' : '中間'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`} style={{ margin: '24px 0' }}>
      <div className="w-full max-w-4xl mx-auto text-center" ref={containerRef}>
        {/* 忍者AdMaxの広告がここに自動的に表示されます */}
        <div
          id={`ninja-admax-${position}`}
          style={{ minHeight: '100px', width: '100%' }}
        />
      </div>
    </div>
  );
}

