# PWA動作確認方法

## 🔍 問題: インストールプロンプトが表示されない

### 原因
1. **開発環境ではPWAが無効化されている**
   - `next.config.js`で`disable: process.env.NODE_ENV === 'development'`となっている
   - Service Workerが動作しないため、`beforeinstallprompt`イベントが発火しない

2. **HTTPS環境が必要**
   - PWAはHTTPS環境でのみ動作します
   - ローカル開発環境（http://localhost）では一部機能が制限されます

3. **ブラウザの要件**
   - Chrome/Edge: `beforeinstallprompt`イベントが発火
   - Safari (iOS): 手動で「ホーム画面に追加」が必要
   - Firefox: 部分的にサポート

## ✅ 解決方法

### 1. 開発環境での確認

現在の実装では、開発環境でも5秒後にプロンプトが表示されるようになっています。

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開くと、右下にインストールプロンプトが表示されます。

### 2. 本番環境での確認（推奨）

```bash
npm run build
npm start
```

本番ビルドでは、Service Workerが有効になり、PWA機能が完全に動作します。

### 3. デバッグ情報の確認

開発環境では、プロンプトにデバッグ情報が表示されます：
- `Standalone: false` - スタンドアロンモードかどうか
- `Service Worker: 登録済み/未登録` - Service Workerの状態
- `Manifest: あり/なし` - manifest.jsonの読み込み状態

### 4. ブラウザの開発者ツールで確認

1. Chrome DevToolsを開く（F12）
2. Applicationタブを開く
3. 以下を確認：
   - **Manifest**: manifest.jsonが正しく読み込まれているか
   - **Service Workers**: Service Workerが登録されているか
   - **Storage**: キャッシュが動作しているか

## 📱 各ブラウザでの動作

### Chrome/Edge（デスクトップ）
- アドレスバーにインストールアイコンが表示される
- または、自動的にインストールプロンプトが表示される

### Chrome（Android）
- 自動的にインストールプロンプトが表示される
- または、メニューから「アプリをインストール」を選択

### Safari（iOS）
- `beforeinstallprompt`イベントは発火しない
- 手動で「共有」→「ホーム画面に追加」を選択
- プロンプトには「インストール方法」ボタンが表示され、手順が表示される

### Firefox
- 部分的にサポート
- メニューから「このサイトをインストール」を選択

## 🧪 テスト手順

### ステップ1: 開発環境で確認
```bash
npm run dev
```
→ 5秒後にプロンプトが表示される（デバッグ情報付き）

### ステップ2: 本番ビルドで確認
```bash
npm run build
npm start
```
→ Service Workerが有効になり、実際のPWA機能が動作

### ステップ3: 本番環境（HTTPS）で確認
- Netlify/Vercelなどにデプロイ
- モバイルデバイスでアクセス
- インストールプロンプトが表示されることを確認

## 🔧 トラブルシューティング

### プロンプトが表示されない場合

1. **ブラウザのコンソールを確認**
   ```javascript
   // コンソールで実行
   console.log('Service Worker:', navigator.serviceWorker);
   console.log('Manifest:', document.querySelector('link[rel="manifest"]'));
   ```

2. **Service Workerをクリア**
   - Chrome DevTools → Application → Service Workers → Unregister

3. **キャッシュをクリア**
   - Chrome DevTools → Application → Clear storage → Clear site data

4. **HTTPS環境で確認**
   - PWAはHTTPS必須です
   - ローカル開発では `http://localhost` でも動作しますが、一部制限があります

### インストールできない場合

1. **既にインストールされている**
   - アプリ一覧を確認
   - 既にインストールされている場合は、プロンプトは表示されません

2. **ブラウザがサポートしていない**
   - Chrome/Edge/Safari（iOS）を推奨
   - Firefoxは部分的にサポート

3. **manifest.jsonのエラー**
   - Chrome DevTools → Application → Manifest でエラーを確認

## 📝 現在の実装

- ✅ 開発環境でもプロンプトが表示される（5秒後）
- ✅ デバッグ情報が表示される（開発環境のみ）
- ✅ iOS Safari対応（手動インストール手順を表示）
- ✅ manifest.jsonへのリンクを明示的に追加
- ✅ Apple用メタタグを追加

## 🚀 次のステップ

1. 本番環境にデプロイして確認
2. モバイルデバイスで実際にインストールをテスト
3. LighthouseでPWAスコアを確認（100点を目指す）



