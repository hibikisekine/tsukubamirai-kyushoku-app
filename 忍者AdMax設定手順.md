# 📢 忍者AdMax設定手順

## 概要

忍者AdMaxは、審査不要で手軽に始められる広告配信サービスです。Google AdSenseと併用することで、収益を最大化できます。

## 特徴

- ✅ **審査不要**: すぐに始められる
- ✅ **手軽**: 設定が簡単
- ⚠️ **収益性**: Google AdSenseと比較すると低め（月間10,000PVで約300円程度）
- 💡 **併用推奨**: Google AdSenseと併用することで、収益を最大化

## ステップ1: 忍者AdMaxで広告IDを取得

1. **忍者AdMaxにログイン**
   - https://www.ninja.co.jp/admax/ にアクセス
   - アカウントでログイン

2. **広告コードを取得**
   - ダッシュボードから「広告コード」を選択
   - 広告サイズを選択（推奨: レスポンシブ）
   - 広告コードをコピー

3. **広告IDを確認**
   - 広告コードから広告IDを確認
   - 形式: `VC-xxxxx-xxxxx` または数字のみ

## ステップ2: Netlifyで環境変数を設定

### ステップ2-1: Netlifyダッシュボードにログイン

1. https://app.netlify.com にアクセス
2. プロジェクト `meek-manatee-a78963` を選択

### ステップ2-2: 環境変数を追加

1. **「Site settings」→「Environment variables」を開く**

2. **環境変数を追加**
   - **Key**: `NEXT_PUBLIC_NINJA_ADMAX_SCRIPT_ID`
   - **Value**: 忍者AdMaxのスクリプトID（例: `73d1d6e1895b47d9212fc481b81c629d`）
   - **注意**: スクリプトのURL `https://adm.shinobi.jp/s/` の後の部分がスクリプトIDです
   - **Scopes**: すべてにチェック（Production, Deploy previews, Branch deploys）
   - 「Save」をクリック

### ステップ2-3: 再デプロイ

1. **「Deploys」タブに戻る**
2. **「Trigger deploy」をクリック**
3. **「Clear cache and deploy site」を選択**
4. 再デプロイが開始されます（2-3分）

## ステップ3: サイトに広告を追加

### 方法1: 既存のAdBannerコンポーネントと併用

`app/[date]/page.tsx` などに追加：

```tsx
import NinjaAdMax from '@/components/NinjaAdMax';

// 使用例
<NinjaAdMax position="top" />
<NinjaAdMax position="bottom" />
```

### 方法2: Google AdSenseと交互に表示

条件によって表示を切り替える：

```tsx
import AdBanner from '@/components/AdBanner';
import NinjaAdMax from '@/components/NinjaAdMax';

// 例: ランダムに表示
{Math.random() > 0.5 ? (
  <AdBanner position="top" />
) : (
  <NinjaAdMax position="top" />
)}
```

## ステップ4: 動作確認

デプロイ完了後：

1. **サイトにアクセス**
   - https://kyushoku.site にアクセス
   - 日付ページ（例: `/2025-01-15`）を開く

2. **広告を確認**
   - 忍者AdMaxの広告が表示されているか確認
   - 広告が正しく動作しているか確認

## 収益について

### 期待収益

- **月間10,000PV**: 約300円程度
- **月間100,000PV**: 約3,000円程度

### Google AdSenseとの比較

| サービス | 月間10,000PV | 月間100,000PV |
|---------|-------------|--------------|
| Google AdSense | 3,000〜5,000円 | 30,000〜50,000円 |
| 忍者AdMax | 約300円 | 約3,000円 |

### 併用のメリット

- **収益の最大化**: 複数の広告サービスを併用することで、収益を最大化
- **リスク分散**: 1つのサービスが停止しても、他のサービスで収益を確保
- **最適化**: どの広告が効果的か比較できる

## 注意事項

- **審査不要**: 忍者AdMaxは審査不要ですが、利用規約を遵守してください
- **プライバシーポリシー**: プライバシーポリシーに忍者AdMaxについて記載する必要があります
- **広告の配置**: ユーザー体験を損なわないように、適切な場所に配置してください

## トラブルシューティング

### 広告が表示されない

1. **環境変数が正しく設定されているか確認**
   - `NEXT_PUBLIC_NINJA_ADMAX_ID` が設定されているか
   - 値が正しいか

2. **再デプロイを実行**
   - 環境変数を設定した後、必ず再デプロイが必要です

3. **ブラウザのキャッシュをクリア**
   - ブラウザのキャッシュをクリアして再読み込み

4. **コンソールでエラーを確認**
   - ブラウザの開発者ツールでエラーを確認

## 参考リンク

- [忍者AdMax公式サイト](https://www.ninja.co.jp/admax/)
- [忍者AdMaxヘルプ](https://www.ninja.co.jp/admax/help/)

## 次のステップ

1. 忍者AdMaxの広告IDを取得
2. Netlifyで環境変数を設定
3. サイトに広告を追加
4. デプロイして動作確認
5. 収益を確認

Google AdSenseと併用することで、収益を最大化できます！

