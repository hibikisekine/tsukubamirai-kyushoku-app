'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">⚠️</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        エラーが発生しました
      </h2>
      <p className="text-gray-600 mb-8">
        申し訳ございません。予期しないエラーが発生しました。
      </p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
        >
          再試行
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
        >
          トップページに戻る
        </Link>
      </div>
    </div>
  );
}

