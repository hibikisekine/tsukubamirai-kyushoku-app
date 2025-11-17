import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        ページが見つかりません
      </h2>
      <p className="text-gray-600 mb-8">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
      >
        トップページに戻る
      </Link>
    </div>
  );
}

