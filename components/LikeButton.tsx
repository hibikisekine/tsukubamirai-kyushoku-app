'use client';

import { useState, useEffect } from 'react';

interface LikeButtonProps {
  date: string;
  type: 'A' | 'B';
}

export default function LikeButton({ date, type }: LikeButtonProps) {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // 初期カウントを取得
  useEffect(() => {
    fetchCount();
  }, [date, type]);

  const fetchCount = async () => {
    try {
      const response = await fetch(`/api/likes?date=${date}&type=${type}`);
      if (response.ok) {
        const data = await response.json();
        setCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const handleLike = async () => {
    if (isClicked || isLoading) return;

    setIsLoading(true);
    setIsClicked(true);

    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, type }),
      });

      if (response.ok) {
        const data = await response.json();
        setCount(data.count);
      } else {
        console.error('Error updating likes');
        setIsClicked(false);
      }
    } catch (error) {
      console.error('Error updating likes:', error);
      setIsClicked(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading || isClicked}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold
        transition-all duration-200
        ${
          isClicked
            ? 'bg-green-500 text-white cursor-not-allowed'
            : 'bg-primary-500 text-white hover:bg-primary-600 active:scale-95'
        }
        ${isLoading ? 'opacity-50 cursor-wait' : ''}
      `}
      title={isClicked ? 'ありがとうございます！' : 'このメニューが食べたい！'}
    >
      <span className="text-lg">
        {isClicked ? '✓' : '🍽️'}
      </span>
      <span>
        {isClicked ? '食べたい！' : '食べたい'}
      </span>
      {count !== null && (
        <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-sm">
          {count}
        </span>
      )}
    </button>
  );
}

