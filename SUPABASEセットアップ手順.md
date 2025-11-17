# 🗄️ Supabaseセットアップ手順

## ステップ1: Supabaseアカウントの作成

1. [Supabase](https://supabase.com)にアクセス
2. 「Start your project」をクリック
3. GitHubアカウントでログイン（推奨）
4. 組織名を入力して「Create organization」をクリック
5. 「New Project」をクリック

## ステップ2: プロジェクトの作成

### 2-1. プロジェクト情報を入力

- **Name**: `tsukubamirai-kyushoku`（任意の名前）
- **Database Password**: 強力なパスワードを設定（**必ずメモしておく**）
- **Region**: `Northeast Asia (Tokyo)`（日本に近いリージョン）
- **Pricing Plan**: Free（無料プラン）

### 2-2. プロジェクト作成

「Create new project」をクリック（1-2分かかります）

## ステップ3: データベーステーブルの作成

### 3-1. SQL Editorを開く

1. 左メニューから「SQL Editor」をクリック
2. 「New query」をクリック

### 3-2. テーブル作成SQLを実行

以下のSQLをコピー＆ペーストして実行：

```sql
-- 献立テーブルの作成
CREATE TABLE kondate (
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
CREATE INDEX idx_kondate_date ON kondate(date);
CREATE INDEX idx_kondate_type ON kondate(type);
CREATE INDEX idx_kondate_date_type ON kondate(date, type);

-- updated_atを自動更新する関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_atを自動更新するトリガー
CREATE TRIGGER update_kondate_updated_at BEFORE UPDATE ON kondate
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 3-3. 実行確認

「Run」ボタンをクリックして実行。成功メッセージが表示されればOKです。

## ステップ4: Row Level Security (RLS) の設定

### 4-1. RLSを有効化

```sql
-- RLSを有効化（読み取りは全員、書き込みは認証済みユーザーのみ）
ALTER TABLE kondate ENABLE ROW LEVEL SECURITY;

-- 全員が読み取り可能
CREATE POLICY "Anyone can read kondate" ON kondate
  FOR SELECT USING (true);

-- 認証済みユーザーのみ書き込み可能（後で管理者認証を追加する場合）
-- 今は無効化しておく（APIキーで制御）
```

### 4-2. または、RLSを無効化（APIキーで制御する場合）

```sql
-- RLSを無効化（APIキーで制御）
ALTER TABLE kondate DISABLE ROW LEVEL SECURITY;
```

**推奨**: 最初はRLSを無効化して、APIキーで制御する方が簡単です。

## ステップ5: APIキーの取得

### 5-1. Project Settingsを開く

1. 左メニューの「Settings」（歯車アイコン）をクリック
2. 「API」をクリック

### 5-2. APIキーをコピー

以下の2つのキーをメモしておきます：

- **Project URL**: `https://xxxxx.supabase.co`
- **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`（長い文字列）
- **service_role key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`（管理者用、秘密に）

**重要**: `service_role key`は絶対に公開しないでください！

## ステップ6: 環境変数の設定

Vercelの環境変数に以下を追加：

| 変数名 | 値 | 説明 |
|--------|-----|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` | anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGci...` | service_role key（管理者用） |
| `ADMIN_PASSWORD` | `your-password` | CSVアップロード用パスワード |

## ステップ7: 既存データの移行（オプション）

既に`data/kondate.json`にデータがある場合、以下の手順で移行：

1. Supabaseダッシュボードの「Table Editor」を開く
2. 「Insert row」で手動入力、または
3. SQL Editorで一括インポート（後述の移行スクリプトを使用）

## 完了！

これでSupabaseのセットアップは完了です。次はアプリケーション側の実装に進みます。

