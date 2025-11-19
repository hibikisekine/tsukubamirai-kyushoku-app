# 📤 GitHubへのプッシュ手順

## 現在の状態

✅ Gitリポジトリの初期化完了
✅ 初回コミット完了
✅ リモートリポジトリの設定完了

## 次のステップ：コードをGitHubにプッシュ

ターミナルで以下のコマンドを実行してください：

```bash
cd 給食サイト
git push -u origin main
```

### 認証が必要な場合

GitHubの認証情報を求められたら：

1. **ユーザー名**: GitHubのユーザー名を入力
2. **パスワード**: GitHubのパスワード（またはPersonal Access Token）を入力

### Personal Access Tokenを使用する場合（推奨）

GitHubのパスワードの代わりにPersonal Access Tokenを使用できます：

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 「Generate new token (classic)」をクリック
3. スコープで `repo` にチェック
4. トークンを生成してコピー
5. パスワードの代わりにこのトークンを入力

## プッシュが成功したら

GitHubリポジトリ（https://github.com/hibikisekine/tsukubamirai-kyushoku-app）にコードが表示されます。

その後、Vercelでのデプロイに進みます。

