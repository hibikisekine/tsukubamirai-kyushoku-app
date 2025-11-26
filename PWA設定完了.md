# PWA設定完了ガイド

## ✅ 完了した設定

### 1. 基本設定
- ✅ `next-pwa`パッケージのインストール済み
- ✅ `next.config.js`でPWA設定が有効
- ✅ Service Workerが自動生成される設定

### 2. Web App Manifest
- ✅ `manifest.json`の作成・設定完了
- ✅ アイコン（192x192、512x512）の生成完了
- ✅ テーマカラー、背景色の設定
- ✅ ショートカット機能の追加

### 3. インストールプロンプト
- ✅ `PWAInstallPrompt`コンポーネントの作成
- ✅ `layout.tsx`への統合完了
- ✅ 自動インストールプロンプト表示機能

### 4. オフライン対応
- ✅ Service Workerによるキャッシュ機能
- ✅ 静的アセットのキャッシュ
- ✅ APIレスポンスのキャッシュ

## 📱 PWA機能

### インストール方法

#### モバイル（iOS）
1. Safariでサイトを開く
2. 共有ボタン（□↑）をタップ
3. 「ホーム画面に追加」を選択

#### モバイル（Android）
1. Chromeでサイトを開く
2. 自動的にインストールプロンプトが表示される
3. 「インストール」ボタンをタップ

#### デスクトップ（Chrome/Edge）
1. アドレスバーにインストールアイコンが表示される
2. クリックして「インストール」を選択

### 機能

- **オフライン対応**: 一度アクセスしたページはオフラインでも閲覧可能
- **ホーム画面追加**: アプリのようにホーム画面に追加可能
- **スタンドアロンモード**: ブラウザのUIなしで表示
- **高速読み込み**: キャッシュにより高速に読み込み

## 🔧 設定ファイル

### `next.config.js`
```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});
```

### `manifest.json`
- アプリ名、説明、アイコンを定義
- テーマカラー: `#f97316`（オレンジ）
- 表示モード: `standalone`

### Service Worker
- 自動生成される（`public/sw.js`）
- ビルド時に更新される

## 🧪 テスト方法

### 1. 開発環境でのテスト
```bash
npm run build
npm start
```
開発環境ではPWAは無効化されています（`disable: process.env.NODE_ENV === 'development'`）

### 2. 本番環境での確認
1. ビルドしてデプロイ
2. モバイルデバイスでアクセス
3. インストールプロンプトが表示されることを確認
4. インストール後、オフラインで動作することを確認

### 3. Lighthouseでの確認
1. Chrome DevToolsを開く
2. Lighthouseタブを開く
3. PWAカテゴリでスコアを確認
4. 100点を目指す

## 📝 注意事項

1. **HTTPS必須**: PWAはHTTPS環境でのみ動作します
2. **Service Worker**: ビルド時に自動生成されます
3. **キャッシュ**: 初回アクセス後にキャッシュが有効になります
4. **更新**: Service Workerの更新は自動的に行われます

## 🎨 カスタマイズ

### アイコンの変更
`scripts/create-pwa-icons.py`を編集して、アイコンのデザインを変更できます。

### インストールプロンプトのカスタマイズ
`components/PWAInstallPrompt.tsx`を編集して、デザインや表示タイミングを変更できます。

## 🚀 次のステップ

1. **オフライン機能の強化**: より多くのデータをキャッシュ
2. **プッシュ通知**: 新機能の追加時に通知
3. **バックグラウンド同期**: データの自動更新

## 📚 参考資料

- [Next.js PWA Documentation](https://github.com/shadowwalker/next-pwa)
- [Web App Manifest](https://web.dev/add-manifest/)
- [Service Worker API](https://developer.mozilla.org/ja/docs/Web/API/Service_Worker_API)

