# 🔧 Netlify DNS設定トラブルシューティング

## エラー: "DNS verification failed"

このエラーは、`kyushoku.site` のDNS設定がNetlifyのサーバーを指していないことを示しています。

## 解決手順

### ステップ1: NetlifyのDNS設定を確認

1. **Netlifyダッシュボードで「Domain management」を開く**
2. **「DNS setup navigator」をクリック**
   - エラーメッセージの下にあるリンクから
   - または「Go to DNS setup navigator」をクリック

3. **Netlifyが推奨するDNS設定を確認**
   - 表示されるDNSレコード（AレコードまたはCNAME）をメモ

### ステップ2: 現在のDNS設定を確認

現在のDNS設定を確認する方法：

#### 方法A: コマンドラインで確認（Mac/Linux）

```bash
# Aレコードを確認
dig kyushoku.site A

# CNAMEレコードを確認
dig kyushoku.site CNAME

# ネームサーバーを確認
dig kyushoku.site NS
```

#### 方法B: オンラインツールで確認

- https://dnschecker.org で `kyushoku.site` を検索
- 現在のDNS設定を確認

#### 方法C: ドメイン管理画面で確認

- ドメイン登録業者（お名前.com、ムームードメインなど）の管理画面にログイン
- 「DNS設定」または「レコード設定」を確認
- 現在の設定を確認

### ステップ3: DNS設定を変更

#### ケース1: ルートドメイン（kyushoku.site）の場合

**推奨: Aレコードを使用**

1. **Netlifyが表示するAレコードのIPアドレスを確認**
   - 例: `75.2.60.5` のようなIPアドレス

2. **ドメイン管理画面で設定**
   - **レコードタイプ**: `A`
   - **ホスト名**: `@` または空白（ルートドメイン）
   - **値**: Netlifyが表示するIPアドレス
   - **TTL**: `3600` またはデフォルト値

#### ケース2: サブドメイン（www.kyushoku.site）の場合

**CNAMEレコードを使用**

1. **Netlifyが表示するCNAMEを確認**
   - 例: `meek-manatee-a78963.netlify.app`

2. **ドメイン管理画面で設定**
   - **レコードタイプ**: `CNAME`
   - **ホスト名**: `www`
   - **値**: `meek-manatee-a78963.netlify.app`
   - **TTL**: `3600` またはデフォルト値

### ステップ4: 既存のDNS設定を削除/変更

**重要**: 既存のDNSレコードがNetlify以外を指している場合、削除または変更が必要です。

1. **既存のAレコードやCNAMEレコードを確認**
2. **Netlify以外を指しているレコードを削除または変更**
3. **Netlifyのレコードを追加**

### ステップ5: DNS伝播を待つ

1. **DNS設定を保存**
2. **数分〜数時間待つ**（通常は数分〜1時間）
3. **DNS伝播状況を確認**
   - https://dnschecker.org で確認
   - 世界中のDNSサーバーで反映状況を確認

### ステップ6: Netlifyで再検証

1. **Netlifyの「Domain management」に戻る**
2. **「Retry DNS verification」をクリック**
3. **成功するまで待つ**（DNS伝播が完了していれば成功）

## よくある問題と解決方法

### 問題1: 既存のDNS設定が残っている

**解決方法**:
- ドメイン管理画面で既存のAレコードやCNAMEレコードを削除
- Netlifyのレコードを追加

### 問題2: DNS伝播が完了していない

**解決方法**:
- 数時間待つ（最大48時間）
- DNS伝播状況を https://dnschecker.org で確認
- 世界中のDNSサーバーで反映されているか確認

### 問題3: 間違ったDNS設定

**解決方法**:
- Netlifyの「DNS setup navigator」で正しい設定を確認
- ドメイン管理画面で設定を再確認
- タイポや設定ミスがないか確認

### 問題4: ドメイン管理画面で設定を保存していない

**解決方法**:
- ドメイン管理画面で「保存」または「適用」をクリック
- 設定が正しく保存されているか確認

## 確認コマンド（Mac/Linux）

DNS設定が正しく反映されているか確認：

```bash
# Aレコードを確認（NetlifyのIPアドレスが表示されるはず）
dig kyushoku.site A +short

# CNAMEレコードを確認（wwwサブドメインの場合）
dig www.kyushoku.site CNAME +short

# ネームサーバーを確認
dig kyushoku.site NS +short
```

## 次のステップ

DNS設定が正しく反映され、Netlifyで検証が成功したら：

1. **SSL証明書が自動的に発行される**（数分〜数時間）
2. **「Force HTTPS」を有効化**（推奨）
3. **https://kyushoku.site にアクセスして確認**

## 参考リンク

- [Netlify DNS設定ガイド](https://docs.netlify.com/domains-https/dns-overview/)
- [DNS伝播チェッカー](https://dnschecker.org)
- [Netlifyトラブルシューティング](https://docs.netlify.com/domains-https/troubleshooting-dns/)

