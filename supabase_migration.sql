-- =====================================================
-- kyushoku.site マルチ市対応 マイグレーション
-- Supabase の SQL Editor で実行してください
-- =====================================================

-- 1. city 列の追加（既にある場合はスキップされます）
ALTER TABLE kondate
  ADD COLUMN IF NOT EXISTS city TEXT NOT NULL DEFAULT 'つくばみらい市';

-- 2. 既存レコードに city を設定（念のため）
UPDATE kondate SET city = 'つくばみらい市' WHERE city IS NULL OR city = '';

-- 3. 旧ユニーク制約を削除（存在する場合）
--    ※ 制約名が異なる場合は Supabase の Table Editor > Indexes で確認してください
ALTER TABLE kondate DROP CONSTRAINT IF EXISTS kondate_date_type_key;
ALTER TABLE kondate DROP CONSTRAINT IF EXISTS kondate_pkey;

-- 4. 新しい複合ユニーク制約を追加（city + date + type）
ALTER TABLE kondate
  ADD CONSTRAINT kondate_city_date_type_key UNIQUE (city, date, type);

-- 5. city 列のインデックスを追加（検索を高速化）
CREATE INDEX IF NOT EXISTS idx_kondate_city ON kondate (city);
CREATE INDEX IF NOT EXISTS idx_kondate_city_date ON kondate (city, date);

-- 確認用クエリ
SELECT city, COUNT(*) AS count
FROM kondate
GROUP BY city
ORDER BY city;
