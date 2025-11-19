'use client';

import Link from 'next/link';

interface TypeSelectorProps {
  currentType: 'A' | 'B';
  basePath: string;
}

export default function TypeSelector({ currentType, basePath }: TypeSelectorProps) {
  const getUrl = (type: 'A' | 'B') => {
    return `${basePath}?type=${type}`;
  };

  return (
    <div className="flex gap-2">
      <Link
        href={getUrl('A')}
        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
          currentType === 'A'
            ? 'bg-primary-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        A献立
      </Link>
      <Link
        href={getUrl('B')}
        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
          currentType === 'B'
            ? 'bg-primary-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        B献立
      </Link>
    </div>
  );
}

