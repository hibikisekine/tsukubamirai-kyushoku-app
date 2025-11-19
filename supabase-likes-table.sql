-- 「食べたい」カウント用テーブル作成SQL
-- このSQLをSupabaseのSQL Editorで実行してください

-- 食べたいカウントテーブルの作成
CREATE TABLE IF NOT EXISTS kondate_likes (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('A', 'B')),
  count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date, type)
);

-- インデックスの作成（検索を高速化）
CREATE INDEX IF NOT EXISTS idx_kondate_likes_date ON kondate_likes(date);
CREATE INDEX IF NOT EXISTS idx_kondate_likes_type ON kondate_likes(type);
CREATE INDEX IF NOT EXISTS idx_kondate_likes_date_type ON kondate_likes(date, type);

-- updated_atを自動更新するトリガー
DROP TRIGGER IF EXISTS update_kondate_likes_updated_at ON kondate_likes;
CREATE TRIGGER update_kondate_likes_updated_at 
  BEFORE UPDATE ON kondate_likes
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- RLS（Row Level Security）を無効化（APIキーで制御）
ALTER TABLE kondate_likes DISABLE ROW LEVEL SECURITY;

