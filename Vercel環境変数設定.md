# 🔐 Vercel環境変数設定

## Supabaseの情報

### Project URL
```
https://ygvgnbdwxhfepphnligk.supabase.co
```

### anon public key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyOTg5NDEsImV4cCI6MjA3ODg3NDk0MX0.OcoSA7C1Y86yHHjgNJj8aZFVRjzdXAUgIWf2wMtGbW0
```

### service_role key（秘密に！）
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzI5ODk0MSwiZXhwIjoyMDc4ODc0OTQxfQ.QWWrpIe5DF4DkEl-F_Kz6ZkxedODt7J08IcOLFFbR24
```

## Vercelでの設定手順

### 1. Vercelにログイン
https://vercel.com にアクセスしてGitHubアカウントでログイン

### 2. プロジェクトをインポート
1. 「Add New...」→「Project」をクリック
2. `hibikisekine/tsukubamirai-kyushoku-app` を選択
3. 「Import」をクリック

### 3. 環境変数を追加

「Environment Variables」セクションで以下を追加：

| 変数名 | 値 |
|--------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ygvgnbdwxhfepphnligk.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyOTg5NDEsImV4cCI6MjA3ODg3NDk0MX0.OcoSA7C1Y86yHHjgNJj8aZFVRjzdXAUgIWf2wMtGbW0` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzI5ODk0MSwiZXhwIjoyMDc4ODc0OTQxfQ.QWWrpIe5DF4DkEl-F_Kz6ZkxedODt7J08IcOLFFbR24` |
| `ADMIN_PASSWORD` | 強力なパスワードを設定（例: `your-secure-password-123`） |

**重要**: 
- 各環境変数を追加したら「Save」をクリック
- `SUPABASE_SERVICE_ROLE_KEY`は絶対に公開しない
- `ADMIN_PASSWORD`は強力なパスワードに設定

### 4. デプロイ実行

1. 「Deploy」ボタンをクリック
2. 2-3分待つ
3. デプロイが完了するとURLが表示されます

### 5. 動作確認

1. デプロイされたサイトにアクセス
2. `/admin/upload` にアクセス
3. 管理者パスワードを入力
4. CSVファイルをアップロードしてテスト

## 完了！

これでアプリがWeb上で公開されました！🎉

