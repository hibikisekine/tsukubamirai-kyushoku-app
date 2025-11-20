# 🛒 AmazonアソシエイトID設定

## あなたのアソシエイトID

**アソシエイトID**: `mjmg-22`

## Netlifyで環境変数を設定

### ステップ1: Netlifyダッシュボードにログイン

1. https://app.netlify.com にアクセス
2. プロジェクト `meek-manatee-a78963` を選択

### ステップ2: 環境変数を追加

1. **「Site settings」→「Environment variables」を開く**

2. **環境変数を追加**
   - **Key**: `NEXT_PUBLIC_AMAZON_ASSOCIATE_ID`
   - **Value**: `mjmg-22`
   - **Scopes**: すべてにチェック（Production, Deploy previews, Branch deploys）
   - 「Save」をクリック

### ステップ3: 再デプロイ

1. **「Deploys」タブに戻る**
2. **「Trigger deploy」をクリック**
3. **「Clear cache and deploy site」を選択**
4. 再デプロイが開始されます（2-3分）

## 動作確認

デプロイ完了後：

1. **サイトにアクセス**
   - https://kyushoku.site にアクセス
   - 日付ページ（例: `/2025-01-15`）を開く

2. **アフィリエイトリンクを確認**
   - 「🛒 給食関連商品」セクションを確認
   - リンクを右クリック → 「リンクのアドレスをコピー」
   - 短縮URL `https://amzn.to/44d5r5t` が使用されていることを確認

## 現在のアフィリエイトリンク

- **短縮URL**: `https://amzn.to/44d5r5t`
  - このURLには既にアソシエイトIDが含まれている可能性があります
  - 環境変数を設定することで、他のAmazonリンクにも自動的に適用されます

## 注意事項

- **短縮URLについて**: `amzn.to` の短縮URLは既にアソシエイトIDが含まれているため、追加の処理は不要です
- **通常のAmazonリンク**: 環境変数を設定することで、通常のAmazonリンク（`amazon.co.jp`）にも自動的にアソシエイトIDが追加されます

## 参考

- [Amazonアソシエイト公式サイト](https://affiliate.amazon.co.jp/)
- [Amazonアソシエイト利用規約](https://affiliate.amazon.co.jp/help/operating/policies)

