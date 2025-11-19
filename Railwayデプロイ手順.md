# 🚂 Railwayでデプロイする方法（推奨）

## Railwayの特徴

- ✅ データベース（PostgreSQL）が統合されている
- ✅ シンプルな設定
- ✅ 月額$5から（$5のクレジット付き）
- ✅ スリープなし
- ✅ GitHub連携で自動デプロイ

## ステップ1: Railwayアカウントの作成

1. https://railway.app にアクセス
2. 「Start a New Project」をクリック
3. 「Login with GitHub」を選択
4. GitHubアカウントで認証

## ステップ2: プロジェクトの作成

1. 「New Project」をクリック
2. 「Deploy from GitHub repo」を選択
3. `hibikisekine/tsukubamirai-kyushoku-app` を選択
4. 「Deploy Now」をクリック

## ステップ3: PostgreSQLデータベースの追加

1. プロジェクト画面で「+ New」をクリック
2. 「Database」→「Add PostgreSQL」を選択
3. データベースが作成されます（1-2分）

## ステップ4: 環境変数の設定

プロジェクト画面で「Variables」タブをクリックして、以下を追加：

| 変数名 | 値 |
|--------|-----|
| `DATABASE_URL` | PostgreSQLの接続URL（自動生成される） |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ygvgnbdwxhfepphnligk.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyOTg5NDEsImV4cCI6MjA3ODg3NDk0MX0.OcoSA7C1Y86yHHjgNJj8aZFVRjzdXAUgIWf2wMtGbW0` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzI5ODk0MSwiZXhwIjoyMDc4ODc0OTQxfQ.QWWrpIe5DF4DkEl-F_Kz6ZkxedODt7J08IcOLFFbR24` |
| `ADMIN_PASSWORD` | 強力なパスワードを設定 |

## ステップ5: デプロイ設定

1. 「Settings」タブを開く
2. 「Build Command**: `npm run build`
3. 「Start Command**: `npm start`
4. 「Root Directory**: `./`

## ステップ6: デプロイ実行

自動的にデプロイが開始されます。完了まで2-5分かかります。

## ステップ7: カスタムドメインの設定（オプション）

1. 「Settings」→「Domains」を開く
2. カスタムドメインを追加

## 料金

- Hobbyプラン: $5/月（$5のクレジット付き）
- 使用量に応じて追加課金

## メリット

- Supabaseを使わずにRailwayのPostgreSQLを使うことも可能
- すべてが統合されている
- スリープなし

