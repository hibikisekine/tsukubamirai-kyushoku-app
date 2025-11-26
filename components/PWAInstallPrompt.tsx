'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    // デバッグ情報を収集
    const checkPWAStatus = () => {
      const info: string[] = [];
      
      // インストール状態チェック
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      info.push(`Standalone: ${isStandalone}`);
      
      // Service Workerチェック
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then(reg => {
          info.push(`Service Worker: ${reg ? '登録済み' : '未登録'}`);
          setDebugInfo(info.join(' | '));
        });
      } else {
        info.push('Service Worker: 未サポート');
        setDebugInfo(info.join(' | '));
      }
      
      // Manifestチェック
      const manifestLink = document.querySelector('link[rel="manifest"]');
      info.push(`Manifest: ${manifestLink ? 'あり' : 'なし'}`);
      
      if (isStandalone) {
        setIsInstalled(true);
        return;
      }
    };

    checkPWAStatus();

    // beforeinstallpromptイベントをリッスン
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('beforeinstallprompt イベントが発火しました');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallButton(true);
      setDebugInfo(prev => prev + ' | beforeinstallprompt: 発火');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // インストール完了を検知
    window.addEventListener('appinstalled', () => {
      console.log('PWAがインストールされました');
      setIsInstalled(true);
      setShowInstallButton(false);
      setDeferredPrompt(null);
    });

    // タイムアウト: 5秒後に手動表示ボタンを表示（開発環境用）
    const timer = setTimeout(() => {
      if (!showInstallButton && !isInstalled && !deferredPrompt) {
        console.log('beforeinstallpromptが発火しなかったため、手動表示を有効化');
        // 開発環境では手動で表示できるようにする
        if (process.env.NODE_ENV === 'development') {
          setShowInstallButton(true);
        }
      }
    }, 5000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, [showInstallButton, isInstalled, deferredPrompt]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // インストールプロンプトを表示
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('PWAがインストールされました');
      }

      setDeferredPrompt(null);
      setShowInstallButton(false);
    } else {
      // 手動インストール（iOS Safariなど）
      alert('このブラウザでは手動でインストールしてください:\n\niOS Safari: 共有ボタン → ホーム画面に追加\nAndroid Chrome: メニュー → アプリをインストール');
    }
  };

  // 既にインストールされている場合は表示しない
  if (isInstalled) {
    return null;
  }

  // 開発環境では常に表示（デバッグ用）
  const shouldShow = showInstallButton || process.env.NODE_ENV === 'development';
  
  if (!shouldShow) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg
              className="w-6 h-6 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              アプリをインストール
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              ホーム画面に追加して、オフラインでも使えます
            </p>
            {process.env.NODE_ENV === 'development' && debugInfo && (
              <p className="text-xs text-gray-400 mb-2 font-mono">
                {debugInfo}
              </p>
            )}
            <div className="flex gap-2">
              <button
                onClick={handleInstallClick}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {deferredPrompt ? 'インストール' : 'インストール方法'}
              </button>
              <button
                onClick={() => setShowInstallButton(false)}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                後で
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

