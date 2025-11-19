# 🌐 Netlifyでデプロイする方法（無料）

## Netlifyの特徴

- ✅ 無料プランが充実
- ✅ 簡単な設定
- ✅ GitHub連携で自動デプロイ
- ✅ フォーム機能が標準装備

## ステップ1: Netlifyアカウントの作成

1. https://www.netlify.com にアクセス
2. 「Sign up」をクリック
3. 「Continue with GitHub」を選択
4. GitHubアカウントで認証

## ステップ2: サイトの作成

1. 「Add new site」→「Import an existing project」をクリック
2. 「Deploy with GitHub」を選択
3. `hibikisekine/tsukubamirai-kyushoku-app` を選択
4. 「Import」をクリック

## ステップ3: ビルド設定

以下の設定を入力：

- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `.next`

**重要**: Netlifyは自動的にNext.jsを検出するので、上記の設定で問題ありません。

## ステップ4: 環境変数の設定

「Site settings」→「Environment variables」で以下を追加：

| 変数名 | 値 |
|--------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ygvgnbdwxhfepphnligk.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyOTg5NDEsImV4cCI6MjA3ODg3NDk0MX0.OcoSA7C1Y86yHHjgNJj8aZFVRjzdXAUgIWf2wMtGbW0` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzI5ODk0MSwiZXhwIjoyMDc4ODc0OTQxfQ.QWWrpIe5DF4DkEl-F_Kz6ZkxedODt7J08IcOLFFbR24` |
| `ADMIN_PASSWORD` | 強力なパスワードを設定 |

## ステップ5: 設定ファイルの確認

`netlify.toml` ファイルがプロジェクトに含まれていることを確認してください。
（既に作成済みです）

## ステップ6: デプロイ実行

1. 「Deploy site」をクリック
2. デプロイが開始されます（2-5分）

## ステップ7: カスタムドメインの設定（オプション）

1. 「Domain settings」を開く
2. 「Add custom domain」をクリック

## 料金

- Free: 無料（十分な機能あり）

## 注意事項

- Next.jsのAPI RoutesはNetlify Functionsとして動作します
- 一部の機能で設定が必要な場合があります

