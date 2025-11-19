# 🗄️ Supabase簡単セットアップ（Web UI使用）

## ステップ1: プロジェクトの作成（まだの場合）

1. https://supabase.com/dashboard/org/ypnwwsifgccmhyldkbhx にアクセス
2. 「New project」をクリック
3. プロジェクト情報を入力して作成

## ステップ2: SQL Editorを開く

### 方法A: 検索バーを使用

1. ダッシュボード上部の検索バー（「Search...」）をクリック
2. 「SQL」と入力
3. 「SQL Editor」を選択

### 方法B: 左メニューから

1. 左メニューをスクロール
2. 「SQL Editor」または「Database」→「SQL Editor」を探す

### 方法C: 直接URL

プロジェクトが作成されている場合：
`https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql/new`

## ステップ3: SQLを実行

1. SQL Editorが開いたら、エディタに以下をコピー＆ペースト：

```sql
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

-- インデックスの作成
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

-- RLSを無効化
ALTER TABLE kondate DISABLE ROW LEVEL SECURITY;
```

2. 「Run」ボタンをクリック（または Cmd+Enter / Ctrl+Enter）
3. 成功メッセージが表示されれば完了

## ステップ4: テーブルの確認

1. 左メニューから「Table Editor」をクリック
2. `kondate`テーブルが表示されていれば成功

## ステップ5: APIキーの取得

1. 左メニュー「Settings」（歯車アイコン）→「API」
2. 以下をコピー：
   - **Project URL**
   - **anon public key**（Revealをクリック）
   - **service_role key**（Revealをクリック、秘密に）

## 完了！

これでSupabaseの設定は完了です。APIキーを取得したら、Vercelでのデプロイに進みます。

