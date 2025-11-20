'use client';

import React, { useEffect } from 'react';

interface NinjaAdMaxProps {
  position?: 'top' | 'bottom' | 'middle';
  className?: string;
  scriptId?: string; // スクリプトID（オプション）
}

export default function NinjaAdMax({ 
  position = 'top', 
  className = '',
  scriptId
}: NinjaAdMaxProps) {
  // スクリプトIDが指定されている場合はそれを使用、なければ環境変数から取得
  const adMaxScriptId = scriptId || process.env.NEXT_PUBLIC_NINJA_ADMAX_SCRIPT_ID;

  useEffect(() => {
    // 忍者AdMaxのスクリプトを読み込む
    if (typeof window !== 'undefined' && adMaxScriptId) {
      // 既に同じスクリプトが読み込まれているかチェック
      const existingScript = document.getElementById(`ninja-admax-script-${position}`);
      if (existingScript) {
        return; // 既に読み込まれている場合は何もしない
      }

      const script = document.createElement('script');
      script.src = `https://adm.shinobi.jp/s/${adMaxScriptId}`;
      script.async = true;
      script.id = `ninja-admax-script-${position}`;
      document.head.appendChild(script);

      return () => {
        // クリーンアップ
        const scriptToRemove = document.getElementById(`ninja-admax-script-${position}`);
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      };
    }
  }, [adMaxScriptId, position]);

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
      <div className="w-full max-w-4xl mx-auto text-center">
        {/* 忍者AdMaxの広告がここに表示されます */}
        <div
          id={`ninja-admax-${position}`}
          style={{ minHeight: '100px' }}
        />
      </div>
    </div>
  );
}

