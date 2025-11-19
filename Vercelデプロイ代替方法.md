# 🚀 Vercelデプロイ代替方法

## 方法1: Vercel Web UIでリポジトリを検索

### ステップ1: GitHub連携の確認

1. Vercelダッシュボードで「Settings」（右上の歯車アイコン）をクリック
2. 左メニューから「Git」を選択
3. 「Connect Git Provider」または「GitHub」が表示されているか確認
4. 表示されていない、または「Disconnect」と表示されている場合：
   - 「Connect Git Provider」をクリック
   - 「GitHub」を選択
   - GitHubアカウントで認証
   - リポジトリへのアクセス権限を付与

### ステップ2: リポジトリを検索

1. 「Add New...」→「Project」をクリック
2. 検索バーに以下を入力：
   - `tsukubamirai`
   - `tsukubamirai-kyushoku-app`
   - `hibikisekine/tsukubamirai-kyushoku-app`
3. リポジトリが表示されるまで待つ（数秒かかる場合があります）

### ステップ3: リポジトリURLを直接入力

1. 「Add New...」→「Project」をクリック
2. 画面下部に「Or paste a repository URL」がある場合、以下を入力：
   ```
   https://github.com/hibikisekine/tsukubamirai-kyushoku-app
   ```
3. 「Continue」をクリック

## 方法2: Vercel CLIを使用（推奨）

### ステップ1: Vercel CLIをインストール

```bash
npm install -g vercel
```

### ステップ2: ログイン

```bash
cd /Users/hs/Cursor/給食サイト
vercel login
```

ブラウザで認証します。

### ステップ3: デプロイ

```bash
vercel
```

対話形式で設定：
- Set up and deploy? → **Y**
- Which scope? → 組織を選択
- Link to existing project? → **N**
- What's your project's name? → `tsukubamirai-kyushoku-app`
- In which directory is your code located? → `./`
- Want to override the settings? → **N**

### ステップ4: 環境変数を設定

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# 値: https://ygvgnbdwxhfepphnligk.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# 値: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyOTg5NDEsImV4cCI6MjA3ODg3NDk0MX0.OcoSA7C1Y86yHHjgNJj8aZFVRjzdXAUgIWf2wMtGbW0

vercel env add SUPABASE_SERVICE_ROLE_KEY
# 値: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzI5ODk0MSwiZXhwIjoyMDc4ODc0OTQxfQ.QWWrpIe5DF4DkEl-F_Kz6ZkxedODt7J08IcOLFFbR24

vercel env add ADMIN_PASSWORD
# 値: 強力なパスワードを入力
```

### ステップ5: 本番環境にデプロイ

```bash
vercel --prod
```

## 方法3: GitHubリポジトリの確認

1. https://github.com/hibikisekine/tsukubamirai-kyushoku-app にアクセス
2. リポジトリが存在し、コードが表示されているか確認
3. リポジトリがプライベートの場合：
   - Settings → Collaborators でVercelにアクセス権限を付与
   - または、リポジトリをPublicに変更（一時的）

## 推奨

**方法2（Vercel CLI）が最も確実です。** コマンドラインから直接デプロイできるため、Web UIの問題を回避できます。

