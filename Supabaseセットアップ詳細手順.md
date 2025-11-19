# 🗄️ Supabaseセットアップ詳細手順

## ステップ1: プロジェクトの作成

1. https://supabase.com/dashboard/org/ypnwwsifgccmhyldkbhx にアクセス
2. 「New project」ボタンをクリック
3. 以下の情報を入力：
   - **Name**: `tsukubamirai-kyushoku`（任意の名前）
   - **Database Password**: 強力なパスワードを設定（**必ずメモしておく**）
   - **Region**: `Northeast Asia (Tokyo)` を選択（日本に近いリージョン）
   - **Pricing Plan**: Free（無料プラン）
4. 「Create new project」をクリック
5. プロジェクトの作成が完了するまで1-2分待つ

## ステップ2: テーブルの作成

### 2-1. SQL Editorを開く

1. 左メニューから「SQL Editor」をクリック
2. 「New query」ボタンをクリック

### 2-2. SQLを実行

以下のSQLをコピー＆ペーストして実行：

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
```

3. 「Run」ボタンをクリック（または Cmd+Enter / Ctrl+Enter）
4. 成功メッセージが表示されればOK

### 2-3. テーブルの確認

1. 左メニューから「Table Editor」をクリック
2. `kondate`テーブルが表示されていれば成功

## ステップ3: APIキーの取得

### 3-1. Settingsを開く

1. 左メニューの「Settings」（歯車アイコン）をクリック
2. 「API」をクリック

### 3-2. 必要な情報をコピー

以下の3つの情報をコピーしてメモしておいてください：

1. **Project URL**
   - 例: `https://xxxxx.supabase.co`
   - 「Project URL」の下に表示されています

2. **anon public key**
   - 例: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`（長い文字列）
   - 「Project API keys」の「anon」の「public」キー
   - 「Reveal」をクリックして表示

3. **service_role key**（重要：秘密に！）
   - 例: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`（長い文字列）
   - 「Project API keys」の「service_role」の「secret」キー
   - 「Reveal」をクリックして表示
   - **このキーは絶対に公開しないでください！**

## ステップ4: 環境変数の準備

取得した情報を以下の形式でメモしておいてください：

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
ADMIN_PASSWORD=your-secure-password-here
```

## 次のステップ

APIキーを取得したら、Vercelでのデプロイに進みます。

