# 🔍 Google Search Console設定手順

Google Search Consoleに登録して、サイトの検索エンジン最適化（SEO）を管理します。

## ステップ1: Google Search Consoleにアクセス

1. **Google Search Consoleにアクセス**
   - https://search.google.com/search-console
   - Googleアカウントでログイン

## ステップ2: プロパティを追加

1. **「プロパティを追加」をクリック**
   - 左サイドバーまたは上部の「プロパティを追加」ボタンをクリック

2. **プロパティタイプを選択**
   - **「URLプレフィックス」を選択**（推奨）
   - プロパティURL: `https://kyushoku.site`
   - 「続行」をクリック

## ステップ3: 所有権の確認

### 方法1: HTMLタグ（推奨）

1. **「HTMLタグ」を選択**
2. **表示されたメタタグをコピー**
   - 例: `<meta name="google-site-verification" content="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />`

3. **`app/layout.tsx`に追加**
   ```tsx
   <head>
     {/* Google Search Console */}
     <meta name="google-site-verification" content="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
     {/* 既存のコード */}
   </head>
   ```

4. **変更をコミット・プッシュ**
   ```bash
   git add app/layout.tsx
   git commit -m "Add: Google Search Console verification"
   git push origin main
   ```

5. **Netlifyで再デプロイ**
   - デプロイ完了後、「確認」をクリック

### 方法2: HTMLファイル

1. **「HTMLファイル」を選択**
2. **表示されたファイルをダウンロード**
3. **`public/`フォルダに配置**
   - 例: `public/google1234567890abcdef.html`
4. **変更をコミット・プッシュ**
5. **Netlifyで再デプロイ**
6. **「確認」をクリック**

### 方法3: Google Analytics（既に設定済みの場合）

1. **「Google Analytics」を選択**
2. **既にGoogle Analyticsが設定されていれば、自動的に確認されます**

## ステップ4: サイトマップを送信

1. **左サイドバーの「サイトマップ」をクリック**
2. **「新しいサイトマップの追加」をクリック**
3. **サイトマップURLを入力**
   - `sitemap.xml`
4. **「送信」をクリック**

## ステップ5: インデックス登録をリクエスト（オプション）

1. **左サイドバーの「URL検査」をクリック**
2. **URLを入力**
   - 例: `https://kyushoku.site`
3. **「インデックス登録をリクエスト」をクリック**

## ステップ6: パフォーマンスを確認

1. **左サイドバーの「パフォーマンス」をクリック**
2. **検索結果での表示状況を確認**
   - クリック数
   - インプレッション数
   - CTR（クリック率）
   - 平均掲載順位

## よくある問題と解決方法

### 所有権の確認が失敗する場合

1. **メタタグが正しく追加されているか確認**
   - ブラウザの開発者ツール（F12）→「Elements」タブで`<head>`内を確認

2. **デプロイが完了しているか確認**
   - Netlifyのデプロイが完了してから数分待つ

3. **キャッシュをクリア**
   - ブラウザのキャッシュをクリアして再読み込み

### サイトマップが認識されない場合

1. **sitemap.xmlが正しく生成されているか確認**
   - `https://kyushoku.site/sitemap.xml`にアクセスして確認

2. **robots.txtが正しく設定されているか確認**
   - `https://kyushoku.site/robots.txt`にアクセスして確認

## 次のステップ

1. **定期的にパフォーマンスを確認**
   - 週に1回程度、検索結果での表示状況を確認

2. **カバレッジレポートを確認**
   - インデックス登録されているページとエラーを確認

3. **モバイルユーザビリティを確認**
   - モバイルでの表示に問題がないか確認

4. **Core Web Vitalsを確認**
   - ページの読み込み速度とユーザー体験を確認

