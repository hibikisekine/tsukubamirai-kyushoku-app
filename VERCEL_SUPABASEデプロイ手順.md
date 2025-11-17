# 🚀 Vercel + Supabase 完全デプロイ手順

## 前提条件

- ✅ GitHubアカウント（既にお持ち）
- ✅ Vercelアカウント（以前使用したことがある）
- Supabaseアカウント（これから作成）

## パート1: Supabaseのセットアップ

詳細は `SUPABASEセットアップ手順.md` を参照してください。

### 簡易手順

1. [Supabase](https://supabase.com)でアカウント作成（GitHubでログイン）
2. 新しいプロジェクトを作成
3. SQL Editorでテーブルを作成
4. APIキーを取得

## パート2: アプリケーションの準備

### 2-1. Supabaseクライアントのインストール

```bash
cd 給食サイト
npm install @supabase/supabase-js
```

### 2-2. 環境変数ファイルの作成

`.env.local`ファイルを作成（GitHubにはコミットしない）：

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
ADMIN_PASSWORD=your-secure-password
```

## パート3: GitHubリポジトリの準備

### 3-1. Gitリポジトリの初期化（まだの場合）

```bash
cd 給食サイト
git init
git add .
git commit -m "Initial commit: つくばみらい市給食献立アプリ"
```

### 3-2. GitHubリポジトリの作成

1. [GitHub](https://github.com)にログイン
2. 右上の「+」→「New repository」
3. リポジトリ名を入力（例: `tsukubamirai-kyushoku-app`）
4. 「Create repository」をクリック

### 3-3. ローカルリポジトリをGitHubにプッシュ

```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

## パート4: Vercelへのデプロイ

### 4-1. Vercelにログイン

1. [Vercel](https://vercel.com)にアクセス
2. GitHubアカウントでログイン

### 4-2. プロジェクトをインポート

1. 「Add New...」→「Project」をクリック
2. 作成したGitHubリポジトリを選択
3. 「Import」をクリック

### 4-3. プロジェクト設定

- **Framework Preset**: Next.js（自動検出）
- **Root Directory**: `./`（そのまま）
- **Build Command**: `npm run build`（自動設定）
- **Output Directory**: `.next`（自動設定）

### 4-4. 環境変数の設定

「Environment Variables」で以下を追加：

| 変数名 | 値 | 説明 |
|--------|-----|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGci...` | Supabase service_role key |
| `ADMIN_PASSWORD` | `your-secure-password` | CSVアップロード用パスワード |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | `ca-pub-...` | Google AdSense（オプション） |

**重要**: 
- `SUPABASE_SERVICE_ROLE_KEY`は絶対に公開しない
- `ADMIN_PASSWORD`は強力なパスワードに設定

### 4-5. デプロイ実行

「Deploy」ボタンをクリック

## パート5: デプロイ後の確認

### 5-1. サイトにアクセス

デプロイ完了後、以下のようなURLが生成されます：
- `https://your-project-name.vercel.app`

### 5-2. 動作確認

1. トップページが表示されるか
2. カレンダーページが表示されるか
3. 管理者ページ（`/admin/upload`）にアクセス
4. CSVアップロードをテスト

### 5-3. データの確認

1. Supabaseダッシュボードの「Table Editor」を開く
2. `kondate`テーブルにデータが保存されているか確認

## パート6: 既存データの移行（オプション）

既に`data/kondate.json`にデータがある場合：

1. 管理者ページ（`/admin/upload`）からCSVを再アップロード
2. または、移行スクリプトを使用（後述）

## トラブルシューティング

### ビルドエラー

- 環境変数が正しく設定されているか確認
- `npm run build`をローカルで実行してエラーを確認

### データが保存されない

- SupabaseのAPIキーが正しいか確認
- RLS（Row Level Security）の設定を確認
- ブラウザのコンソールでエラーを確認

### 環境変数が反映されない

- 環境変数を設定した後、再デプロイを実行
- Vercelの設定画面で環境変数が保存されているか確認

## 次のステップ

1. ✅ Supabaseのセットアップ
2. ✅ アプリケーションのSupabase対応（実装が必要）
3. ✅ GitHubリポジトリの作成
4. ✅ Vercelへのデプロイ
5. ✅ 動作確認

## 参考リンク

- [Supabase公式ドキュメント](https://supabase.com/docs)
- [Vercel公式ドキュメント](https://vercel.com/docs)
- [Next.js + Supabase統合ガイド](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

