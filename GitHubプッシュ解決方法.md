# 🔐 GitHubプッシュ解決方法

## 問題

GitHubへのプッシュ時に認証エラーが発生しています。

## 解決方法

### 方法1: GitHub CLIで認証（推奨）

ターミナルで以下を実行：

```bash
cd /Users/hs/Cursor/給食サイト
gh auth login
```

1. 「GitHub.com」を選択
2. 「HTTPS」を選択
3. 「Login with a web browser」を選択
4. 表示されたコードをコピー
5. ブラウザで認証
6. 認証後、ターミナルに戻る

認証が完了したら：

```bash
git push -u origin main
```

### 方法2: Personal Access Tokenを使用

1. **Personal Access Tokenを作成**
   - https://github.com/settings/tokens にアクセス
   - 「Generate new token (classic)」をクリック
   - Note: `tsukubamirai-kyushoku-app` など任意の名前
   - Expiration: 適切な期間を選択
   - Scopes: `repo` にチェック
   - 「Generate token」をクリック
   - **トークンをコピー**（一度しか表示されません）

2. **プッシュ時にトークンを使用**
   ```bash
   cd /Users/hs/Cursor/給食サイト
   git push -u origin main
   ```
   
   認証情報を求められたら：
   - Username: `hibikisekine`
   - Password: **Personal Access Tokenを貼り付け**（パスワードではない）

### 方法3: SSHキーを使用（既に設定済みの場合）

```bash
cd /Users/hs/Cursor/給食サイト
git remote set-url origin git@github.com:hibikisekine/tsukubamirai-kyushoku-app.git
git push -u origin main
```

## 確認

プッシュが成功すると、GitHubリポジトリ（https://github.com/hibikisekine/tsukubamirai-kyushoku-app）にコードが表示されます。

## 次のステップ

プッシュが完了したら、Vercelでのデプロイに進みます。

