# 🍽️ つくばみらい市給食献立アプリ

つくばみらい市の給食献立を閲覧できるWebアプリ（PWA対応）

## 🚀 機能

- ✅ CSVファイルで献立データをメンテナンス
- ✅ カレンダー表示で献立を確認
- ✅ Google AdSense広告統合
- ✅ アフィリエイトリンク対応
- ✅ PWA対応（ホーム画面に追加可能）

## 📦 セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local`ファイルを作成し、以下を設定：

```env
# Google AdSense（オプション）
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxx

# 管理者パスワード（CSVアップロード用）
ADMIN_PASSWORD=your-secure-password
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## 📁 プロジェクト構造

```
給食サイト/
├── app/                    # Next.js App Router
│   ├── (public)/          # 公開ページ
│   │   ├── page.tsx       # トップページ
│   │   └── [date]/        # 日付別献立
│   ├── admin/             # 管理者ページ
│   │   └── upload/        # CSVアップロード
│   └── api/               # API Routes
├── components/            # Reactコンポーネント
├── lib/                   # ユーティリティ
├── data/                  # データファイル
└── public/                # 静的ファイル
```

## 📝 CSV形式

CSVファイルは以下の形式でアップロード：

```csv
日付,曜日,献立
2024-01-15,月曜日,ごはん,味噌汁,鮭の塩焼き,ほうれん草のお浸し,牛乳
2024-01-16,火曜日,パン,スープ,ハンバーグ,サラダ,牛乳
```

## 🚢 デプロイ

### Vercel（推奨）

1. [Vercel](https://vercel.com)にアカウント作成
2. GitHubリポジトリを接続
3. 自動デプロイ

### 手動ビルド

```bash
npm run build
npm start
```

## 📄 ライセンス

MIT

