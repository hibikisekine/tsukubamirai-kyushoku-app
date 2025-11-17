-- つくばみらい市給食献立アプリ - Supabaseテーブル作成SQL
-- このSQLをSupabaseのSQL Editorで実行してください

-- 献立テーブルの作成
CREATE TABLE IF NOT EXISTS kondate (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL,
  weekday TEXT NOT NULL,
  menu TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('A', 'B')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date, type)
);

-- インデックスの作成（検索を高速化）
CREATE INDEX IF NOT EXISTS idx_kondate_date ON kondate(date);
CREATE INDEX IF NOT EXISTS idx_kondate_type ON kondate(type);
CREATE INDEX IF NOT EXISTS idx_kondate_date_type ON kondate(date, type);

-- updated_atを自動更新する関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_atを自動更新するトリガー
DROP TRIGGER IF EXISTS update_kondate_updated_at ON kondate;
CREATE TRIGGER update_kondate_updated_at 
  BEFORE UPDATE ON kondate
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- RLS（Row Level Security）を無効化（APIキーで制御）
ALTER TABLE kondate DISABLE ROW LEVEL SECURITY;

-- 確認用: テーブル構造を表示
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'kondate'
ORDER BY ordinal_position;

