# 🔍 AdSenseスクリプト確認方法

## 確認方法1: ブラウザの開発者ツールで確認

1. **サイトにアクセス**
   - https://kyushoku.site にアクセス

2. **開発者ツールを開く**
   - Windows/Linux: `F12` または `Ctrl + Shift + I`
   - Mac: `Cmd + Option + I`

3. **「Elements」タブ（要素）を開く**

4. **`<head>` セクションを展開**

5. **AdSenseスクリプトを確認**
   - 以下のようなスクリプトタグが表示されていれば成功：
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7310204683723531" crossorigin="anonymous"></script>
   ```

## 確認方法2: ページのソースコードで確認

1. **サイトにアクセス**
   - https://kyushoku.site にアクセス

2. **ページのソースを表示**
   - Windows/Linux: `Ctrl + U`
   - Mac: `Cmd + Option + U`
   - または、右クリック → 「ページのソースを表示」

3. **`adsbygoogle` を検索**
   - `Ctrl + F`（Mac: `Cmd + F`）で検索
   - `adsbygoogle` と入力

4. **スクリプトタグを確認**
   - スクリプトタグが見つかれば成功

## 確認方法3: コンソールで確認

1. **開発者ツールを開く**
   - `F12` または `Ctrl + Shift + I`（Mac: `Cmd + Option + I`）

2. **「Console」タブを開く**

3. **以下のコマンドを実行**
   ```javascript
   // AdSenseスクリプトが読み込まれているか確認
   typeof window.adsbygoogle !== 'undefined'
   ```
   - `true` が返れば成功

4. **AdSenseスクリプトのURLを確認**
   ```javascript
   // 読み込まれているAdSenseスクリプトを確認
   Array.from(document.querySelectorAll('script')).filter(s => s.src.includes('adsbygoogle'))
   ```

## 確認方法4: Networkタブで確認

1. **開発者ツールを開く**
   - `F12` または `Ctrl + Shift + I`（Mac: `Cmd + Option + I`）

2. **「Network」タブを開く**

3. **ページをリロード**
   - `F5` または `Ctrl + R`（Mac: `Cmd + R`）

4. **フィルターに `adsbygoogle` と入力**

5. **AdSenseスクリプトのリクエストを確認**
   - `adsbygoogle.js` のリクエストが表示されれば成功
   - ステータスが `200` であれば正常に読み込まれています

## 環境変数が設定されていない場合

もしAdSenseスクリプトが表示されない場合：

1. **Netlifyで環境変数を確認**
   - Netlifyダッシュボード → 「Site settings」→ 「Environment variables」
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID` が設定されているか確認
   - 値が `ca-pub-7310204683723531` になっているか確認

2. **環境変数を設定**
   - Key: `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
   - Value: `ca-pub-7310204683723531`
   - Scopes: すべてにチェック

3. **再デプロイ**
   - 「Deploys」タブで「Trigger deploy」をクリック
   - 「Clear cache and deploy site」を選択

## 広告が表示されない場合

AdSenseスクリプトが読み込まれていても、広告が表示されない場合：

1. **AdSenseの審査が完了しているか確認**
   - 審査が完了していない場合、広告は表示されません

2. **広告ブロッカーを無効化**
   - ブラウザの広告ブロッカーが有効な場合、広告が表示されません

3. **広告ユニットIDを確認**
   - `NEXT_PUBLIC_ADSENSE_SLOT_ID` が正しく設定されているか確認

4. **コンソールでエラーを確認**
   - 開発者ツールの「Console」タブでエラーメッセージを確認

## 参考

- [Google AdSense公式ドキュメント](https://support.google.com/adsense/)
- [AdSense広告のトラブルシューティング](https://support.google.com/adsense/topic/1319754)

