# 🚀 Vercelへのデプロイ手順

## 前提条件

- GitHubアカウント
- Vercelアカウント（無料で作成可能）

## ステップ1: GitHubリポジトリの作成

### 1-1. プロジェクトをGitリポジトリとして初期化

```bash
cd 給食サイト
git init
```

### 1-2. ファイルをコミット

```bash
# すべてのファイルを追加
git add .

# 初回コミット
git commit -m "Initial commit: つくばみらい市給食献立アプリ"
```

### 1-3. GitHubにリポジトリを作成

1. [GitHub](https://github.com)にログイン
2. 右上の「+」→「New repository」をクリック
3. リポジトリ名を入力（例: `tsukubamirai-kyushoku-app`）
4. 「Public」または「Private」を選択
5. 「Create repository」をクリック

### 1-4. ローカルリポジトリをGitHubにプッシュ

```bash
# リモートリポジトリを追加（YOUR_USERNAMEとREPO_NAMEを置き換え）
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# メインブランチにプッシュ
git branch -M main
git push -u origin main
```

## ステップ2: Vercelアカウントの作成

1. [Vercel](https://vercel.com)にアクセス
2. 「Sign Up」をクリック
3. 「Continue with GitHub」を選択してGitHubアカウントでログイン

## ステップ3: Vercelでプロジェクトをインポート

### 3-1. 新しいプロジェクトを作成

1. Vercelダッシュボードで「Add New...」→「Project」をクリック
2. 「Import Git Repository」から作成したGitHubリポジトリを選択
3. 「Import」をクリック

### 3-2. プロジェクト設定

- **Framework Preset**: Next.js（自動検出されるはず）
- **Root Directory**: `./`（そのまま）
- **Build Command**: `npm run build`（自動設定）
- **Output Directory**: `.next`（自動設定）
- **Install Command**: `npm install`（自動設定）

### 3-3. 環境変数の設定

「Environment Variables」セクションで以下を追加：

| 名前 | 値 | 説明 |
|------|-----|------|
| `ADMIN_PASSWORD` | `your-secure-password-here` | CSVアップロード用のパスワード（強力なパスワードを設定） |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | `ca-pub-xxxxxxxxxxxxx` | Google AdSenseのクライアントID（オプション） |

**重要**: `ADMIN_PASSWORD`は必ず強力なパスワードに変更してください。

### 3-4. デプロイ実行

「Deploy」ボタンをクリックしてデプロイを開始します。

## ステップ4: デプロイ後の確認

### 4-1. デプロイの完了を待つ

通常、2-5分でデプロイが完了します。

### 4-2. サイトにアクセス

デプロイが完了すると、以下のようなURLが生成されます：
- `https://your-project-name.vercel.app`

### 4-3. 動作確認

1. トップページが表示されるか確認
2. カレンダーページが表示されるか確認
3. 検索機能が動作するか確認
4. 管理者ページ（`/admin/upload`）にアクセスしてCSVアップロードをテスト

## ステップ5: カスタムドメインの設定（オプション）

1. Vercelダッシュボードでプロジェクトを開く
2. 「Settings」→「Domains」をクリック
3. ドメイン名を入力して「Add」をクリック
4. DNS設定の指示に従う

## ステップ6: 初回データのアップロード

デプロイ後、以下の手順でデータをアップロードします：

1. `https://your-project-name.vercel.app/admin/upload` にアクセス
2. 管理者パスワードを入力（Vercelで設定した`ADMIN_PASSWORD`）
3. CSVファイルをアップロード

## トラブルシューティング

### ビルドエラーが発生する場合

- Node.jsのバージョンを確認（Vercelの設定で18以上に設定）
- エラーログを確認して、不足している依存関係がないか確認

### 環境変数が反映されない場合

- 環境変数を設定した後、再デプロイを実行
- 設定画面で環境変数が正しく保存されているか確認

### データが保存されない場合

- Vercelはサーバーレス環境のため、ファイルシステムへの書き込みは一時的なものです
- 本番環境では、データベース（PostgreSQL、MongoDBなど）の使用を推奨
- 現在の実装では、再デプロイ時にデータがリセットされる可能性があります

## 次のステップ（推奨）

### データベースの導入

本番環境では、以下のデータベースサービスの使用を推奨：

- **Vercel Postgres**: Vercelと統合されたPostgreSQL
- **Supabase**: 無料でPostgreSQLが使える
- **MongoDB Atlas**: 無料プランあり

データベースを導入することで、データの永続化が可能になります。

## 参考リンク

- [Vercel公式ドキュメント](https://vercel.com/docs)
- [Next.jsデプロイガイド](https://nextjs.org/docs/deployment)

