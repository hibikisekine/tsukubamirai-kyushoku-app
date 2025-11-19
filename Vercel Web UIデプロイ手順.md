# 🌐 Vercel Web UIでデプロイする方法

## ステップ1: Vercelにログイン

1. https://vercel.com にアクセス
2. 「Log In」または「Sign Up」をクリック
3. 「Continue with GitHub」を選択
4. GitHubアカウントで認証

## ステップ2: GitHub連携の確認

1. Vercelダッシュボードで「Settings」（右上の歯車アイコン）をクリック
2. 左メニューから「Git」を選択
3. 「GitHub」が表示されているか確認
4. 表示されていない、または「Disconnect」と表示されている場合：
   - 「Connect Git Provider」をクリック
   - 「GitHub」を選択
   - 認証して、リポジトリへのアクセス権限を付与

## ステップ3: プロジェクトをインポート

### 方法A: リポジトリを検索

1. 「Add New...」→「Project」をクリック
2. 検索バーに以下を入力：
   - `tsukubamirai`
   - または `hibikisekine`
3. リポジトリが表示されるまで待つ

### 方法B: リポジトリURLを直接入力

1. 「Add New...」→「Project」をクリック
2. 画面下部に「Or paste a repository URL」がある場合、以下を入力：
   ```
   https://github.com/hibikisekine/tsukubamirai-kyushoku-app
   ```
3. 「Continue」をクリック

### 方法C: GitHubから直接インポート

1. https://github.com/hibikisekine/tsukubamirai-kyushoku-app にアクセス
2. リポジトリのページで「Settings」→「Integrations」→「Vercel」を探す
3. または、Vercelダッシュボードで「Import Project」をクリック

## ステップ4: プロジェクト設定

### 4-1. 基本設定（自動設定されるはず）

- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### 4-2. 環境変数の設定（重要！）

「Environment Variables」セクションで「Add」をクリックして、以下を1つずつ追加：

#### 1. NEXT_PUBLIC_SUPABASE_URL
- **Key**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://ygvgnbdwxhfepphnligk.supabase.co`
- **Environment**: Production, Preview, Development すべてにチェック
- 「Save」をクリック

#### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyOTg5NDEsImV4cCI6MjA3ODg3NDk0MX0.OcoSA7C1Y86yHHjgNJj8aZFVRjzdXAUgIWf2wMtGbW0`
- **Environment**: Production, Preview, Development すべてにチェック
- 「Save」をクリック

#### 3. SUPABASE_SERVICE_ROLE_KEY
- **Key**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzI5ODk0MSwiZXhwIjoyMDc4ODc0OTQxfQ.QWWrpIe5DF4DkEl-F_Kz6ZkxedODt7J08IcOLFFbR24`
- **Environment**: Production, Preview, Development すべてにチェック
- 「Save」をクリック

#### 4. ADMIN_PASSWORD
- **Key**: `ADMIN_PASSWORD`
- **Value**: 強力なパスワードを設定（例: `Kyushoku2024!Secure`）
- **Environment**: Production, Preview, Development すべてにチェック
- 「Save」をクリック

## ステップ5: デプロイ実行

1. すべての環境変数を設定したら、「Deploy」ボタンをクリック
2. ビルドが開始されます（2-5分かかります）
3. ビルドログを確認

## ステップ6: デプロイ後の確認

1. デプロイが完了すると、URLが表示されます
2. サイトにアクセスして動作確認
3. `/admin/upload` にアクセスしてCSVアップロードをテスト

## リポジトリが見つからない場合の対処

### 1. GitHubリポジトリの確認

https://github.com/hibikisekine/tsukubamirai-kyushoku-app にアクセスして、リポジトリが存在するか確認

### 2. VercelのGit連携を再設定

1. Settings → Git → GitHub を「Disconnect」
2. 再度「Connect Git Provider」→「GitHub」で接続
3. リポジトリへのアクセス権限を確認

### 3. リポジトリがプライベートの場合

- Settings → Collaborators でVercelにアクセス権限を付与
- または、一時的にPublicに変更

