# 🔍 Vercelでリポジトリが見つからない場合の対処法

## 原因と解決方法

### 1. GitHubとVercelの連携確認

1. Vercelダッシュボードで「Settings」→「Git」を開く
2. 「Connect Git Provider」または「Add Git Provider」をクリック
3. 「GitHub」を選択
4. GitHubアカウントで認証
5. リポジトリへのアクセス権限を付与

### 2. リポジトリの検索

1. 「Add New...」→「Project」をクリック
2. 検索バーで「tsukubamirai」と入力
3. リポジトリが表示されるか確認

### 3. リポジトリがプライベートの場合

1. Vercelの「Settings」→「Git」を開く
2. GitHubアカウントの連携を確認
3. プライベートリポジトリへのアクセス権限を付与

### 4. 手動でリポジトリURLを入力

1. 「Add New...」→「Project」をクリック
2. 「Import Git Repository」の下に「Or paste a repository URL」がある場合
3. 以下のURLを入力：
   ```
   https://github.com/hibikisekine/tsukubamirai-kyushoku-app
   ```

### 5. GitHubでリポジトリの確認

1. https://github.com/hibikisekine/tsukubamirai-kyushoku-app にアクセス
2. リポジトリが存在し、コードが表示されているか確認
3. リポジトリがプライベートの場合、Vercelにアクセス権限を付与

## 推奨手順

1. **VercelのSettingsでGit連携を確認**
   - Settings → Git → GitHub が接続されているか確認
   - 接続されていない場合は接続

2. **リポジトリを再検索**
   - 「Add New...」→「Project」
   - 検索バーで「tsukubamirai」と検索

3. **それでも見つからない場合**
   - Vercel CLIを使用してデプロイ（別の方法）

