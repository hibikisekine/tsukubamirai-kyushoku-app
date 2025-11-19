# 🌐 Netlify完全デプロイガイド

## ✅ 準備完了

- ✅ GitHubリポジトリ: `hibikisekine/tsukubamirai-kyushoku-app`
- ✅ Supabaseテーブル作成済み
- ✅ APIキー取得済み
- ✅ `netlify.toml` 設定ファイル作成済み

## ステップ1: Netlifyアカウントの作成

1. https://www.netlify.com にアクセス
2. 「Sign up」をクリック
3. 「Continue with GitHub」を選択
4. GitHubアカウントで認証
5. Netlifyにリポジトリへのアクセス権限を付与

## ステップ2: サイトの作成

1. Netlifyダッシュボードで「Add new site」をクリック
2. 「Import an existing project」を選択
3. 「Deploy with GitHub」をクリック
4. 初回の場合、GitHubアカウントを接続
5. `hibikisekine/tsukubamirai-kyushoku-app` を検索して選択
6. 「Import」をクリック

## ステップ3: ビルド設定

Netlifyが自動的にNext.jsを検出するので、以下の設定が自動入力されます：

- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `.next`

**そのまま「Deploy site」をクリックしてもOKですが、先に環境変数を設定することを推奨します。**

## ステップ4: 環境変数の設定（重要！）

### 4-1. 環境変数を設定する方法

**方法A: デプロイ前に設定（推奨）**

1. 「Deploy site」をクリックする前に、「Show advanced」をクリック
2. 「New variable」をクリック
3. 以下の4つを1つずつ追加：

| 変数名 | 値 |
|--------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ygvgnbdwxhfepphnligk.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyOTg5NDEsImV4cCI6MjA3ODg3NDk0MX0.OcoSA7C1Y86yHHjgNJj8aZFVRjzdXAUgIWf2wMtGbW0` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzI5ODk0MSwiZXhwIjoyMDc4ODc0OTQxfQ.QWWrpIe5DF4DkEl-F_Kz6ZkxedODt7J08IcOLFFbR24` |
| `ADMIN_PASSWORD` | 強力なパスワードを設定（例: `Kyushoku2024!Secure`） |

**方法B: デプロイ後に設定**

1. デプロイが完了したら、サイトの「Site settings」を開く
2. 「Environment variables」をクリック
3. 上記の4つを追加
4. 「Save」をクリック
5. 「Deploys」タブで「Trigger deploy」→「Clear cache and deploy site」を実行

## ステップ5: デプロイ実行

1. 環境変数を設定したら、「Deploy site」をクリック
2. ビルドが開始されます（2-5分かかります）
3. ビルドログを確認

## ステップ6: デプロイ後の確認

### 6-1. サイトにアクセス

デプロイが完了すると、以下のようなURLが表示されます：
- `https://random-name-12345.netlify.app`
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

## ステップ7: カスタムドメインの設定（オプション）

1. 「Site settings」→「Domain management」を開く
2. 「Add custom domain」をクリック
3. ドメイン名を入力
4. DNS設定の指示に従う

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
- 「Clear cache and deploy site」を実行

### API Routesが動作しない場合

- Netlify Functionsの設定を確認
- `netlify.toml`が正しく配置されているか確認

## 完了！

これでアプリがWeb上で公開されました！🎉

Netlifyの無料プランで、スリープなしで動作します。

