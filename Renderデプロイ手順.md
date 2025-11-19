# 🎨 Renderでデプロイする方法（無料プランあり）

## Renderの特徴

- ✅ 無料プランあり（スリープあり）
- ✅ データベース（PostgreSQL）が統合されている
- ✅ シンプルな設定
- ✅ GitHub連携で自動デプロイ

## ステップ1: Renderアカウントの作成

1. https://render.com にアクセス
2. 「Get Started for Free」をクリック
3. 「Sign up with GitHub」を選択
4. GitHubアカウントで認証

## ステップ2: Web Serviceの作成

1. 「New +」→「Web Service」をクリック
2. 「Connect account」でGitHubアカウントを接続
3. `hibikisekine/tsukubamirai-kyushoku-app` を選択
4. 「Connect」をクリック

## ステップ3: サービス設定

- **Name**: `tsukubamirai-kyushoku-app`
- **Region**: `Oregon (US West)` または `Singapore`
- **Branch**: `main`
- **Root Directory**: `./`
- **Runtime**: `Node`
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Plan**: Free（無料プラン、スリープあり）または Starter（$7/月、スリープなし）

## ステップ4: PostgreSQLデータベースの追加

1. 「New +」→「PostgreSQL」をクリック
2. データベース名を入力
3. 「Create Database」をクリック

## ステップ5: 環境変数の設定

Web Serviceの「Environment」タブで以下を追加：

| 変数名 | 値 |
|--------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ygvgnbdwxhfepphnligk.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyOTg5NDEsImV4cCI6MjA3ODg3NDk0MX0.OcoSA7C1Y86yHHjgNJj8aZFVRjzdXAUgIWf2wMtGbW0` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzI5ODk0MSwiZXhwIjoyMDc4ODc0OTQxfQ.QWWrpIe5DF4DkEl-F_Kz6ZkxedODt7J08IcOLFFbR24` |
| `ADMIN_PASSWORD` | 強力なパスワードを設定 |

## ステップ6: デプロイ実行

1. 「Create Web Service」をクリック
2. デプロイが開始されます（3-5分）

## ステップ7: カスタムドメインの設定（オプション）

1. 「Settings」→「Custom Domains」を開く
2. ドメインを追加

## 料金

- Free: 無料（スリープあり、15分非アクセスで停止）
- Starter: $7/月（スリープなし）

## メリット

- 無料で始められる
- データベースも統合されている

