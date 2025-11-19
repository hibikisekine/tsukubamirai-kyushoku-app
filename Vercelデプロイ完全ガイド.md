# 🚀 Vercelデプロイ完全ガイド

## 前提条件

✅ GitHubリポジトリ作成済み: `hibikisekine/tsukubamirai-kyushoku-app`
✅ Supabaseテーブル作成済み
✅ APIキー取得済み

## ステップ1: GitHubにプッシュ（まだの場合）

ターミナルで実行：

```bash
cd 給食サイト
git push -u origin main
```

認証情報を求められたら入力してください。

## ステップ2: Vercelにログイン

1. https://vercel.com にアクセス
2. 「Sign Up」または「Log In」をクリック
3. 「Continue with GitHub」を選択
4. GitHubアカウントで認証

## ステップ3: プロジェクトをインポート

1. Vercelダッシュボードで「Add New...」をクリック
2. 「Project」を選択
3. 「Import Git Repository」から `hibikisekine/tsukubamirai-kyushoku-app` を選択
4. 「Import」をクリック

## ステップ4: プロジェクト設定

### 4-1. 基本設定（自動設定されるはず）

- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

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
- **重要**: このキーは秘密に！
- 「Save」をクリック

#### 4. ADMIN_PASSWORD
- **Key**: `ADMIN_PASSWORD`
- **Value**: 強力なパスワードを設定（例: `Kyushoku2024!Secure`）
- **Environment**: Production, Preview, Development すべてにチェック
- 「Save」をクリック

## ステップ5: デプロイ実行

1. すべての環境変数を設定したら、「Deploy」ボタンをクリック
2. ビルドが開始されます（2-5分かかります）
3. ビルドログを確認してエラーがないか確認

## ステップ6: デプロイ後の確認

### 6-1. サイトにアクセス

デプロイが完了すると、以下のようなURLが表示されます：
- `https://tsukubamirai-kyushoku-app.vercel.app`
- または、カスタムドメインが設定されている場合、そのURL

### 6-2. 動作確認

1. **トップページ**: サイトが正常に表示されるか確認
2. **カレンダーページ**: `/calendar` にアクセス
3. **検索ページ**: `/search` にアクセス
4. **管理者ページ**: `/admin/upload` にアクセス
   - 設定した`ADMIN_PASSWORD`を入力
   - CSVファイルをアップロードしてテスト

### 6-3. データの確認

1. Supabaseダッシュボードの「Table Editor」を開く
2. CSVアップロード後、`kondate`テーブルにデータが保存されているか確認

## トラブルシューティング

### ビルドエラーが発生する場合

- 環境変数が正しく設定されているか確認
- ビルドログを確認してエラーメッセージを確認
- ローカルで`npm run build`を実行してエラーを確認

### データが保存されない場合

- SupabaseのAPIキーが正しいか確認
- ブラウザのコンソールでエラーを確認
- SupabaseのTable Editorでテーブルが作成されているか確認

### 環境変数が反映されない場合

- 環境変数を設定した後、再デプロイを実行
- 環境変数の設定画面で正しく保存されているか確認

## 完了！

これでアプリがWeb上で公開されました！🎉

次のステップ：
- カスタムドメインの設定（オプション）
- Google AdSenseの設定（オプション）
- データのアップロード

