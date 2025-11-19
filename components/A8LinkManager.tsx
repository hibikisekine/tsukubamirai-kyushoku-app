'use client';

import Script from 'next/script';

export default function A8LinkManager() {
  const configId = process.env.NEXT_PUBLIC_A8_CONFIG_ID;

  if (!configId) {
    return null;
  }

  return (
    <>
      <Script
        src="https://statics.a8.net/a8link/a8linkmgr.js"
        strategy="afterInteractive"
        onError={(e) => {
          console.warn('A8.netリンクマネージャーの読み込みに失敗しました', e);
        }}
      />
      <Script
        id="a8-link-manager-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var retryCount = 0;
              var maxRetries = 10;
              function initA8LinkMgr() {
                if (typeof a8linkmgr !== 'undefined') {
                  try {
                    a8linkmgr({
                      "config_id": "${configId}"
                    });
                  } catch (e) {
                    console.warn('A8.netリンクマネージャーの初期化に失敗しました', e);
                  }
                } else if (retryCount < maxRetries) {
                  retryCount++;
                  setTimeout(initA8LinkMgr, 200);
                }
              }
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initA8LinkMgr);
              } else {
                initA8LinkMgr();
              }
            })();
          `,
        }}
      />
    </>
  );
}

