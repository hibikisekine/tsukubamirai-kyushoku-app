# 🔒 Netlify SSL証明書エラー解決方法

## エラー: NET::ERR_CERT_COMMON_NAME_INVALID

このエラーは、SSL証明書が `kyushoku.site` ドメイン用に正しく発行されていないことを示しています。

## 解決手順

### ステップ1: DNS設定が正しく反映されているか確認

1. **DNS伝播状況を確認**
   - https://dnschecker.org で `kyushoku.site` を検索
   - 世界中のDNSサーバーでNetlifyのIPアドレスが表示されているか確認

2. **コマンドラインで確認（Mac/Linux）**
   ```bash
   dig kyushoku.site A +short
   ```
   - NetlifyのIPアドレスが表示されるはず（例: `75.2.60.5`）

### ステップ2: NetlifyでSSL証明書を再発行

1. **Netlifyダッシュボードにログイン**
   - https://app.netlify.com

2. **プロジェクトを選択**
   - `meek-manatee-a78963` をクリック

3. **「Site settings」→「Domain management」を開く**

4. **「HTTPS」セクションを確認**
   - SSL証明書の状態を確認

5. **「Verify DNS configuration」をクリック**
   - DNS設定が正しく反映されていれば、自動的に証明書が発行されます

6. **「Retry DNS verification」をクリック**（必要に応じて）
   - 数分待ってから再試行

### ステップ3: 証明書の発行を待つ

- SSL証明書の発行には**数分〜数時間**かかることがあります
- DNS設定が正しく反映されていれば、通常は**数分〜1時間以内**に発行されます

### ステップ4: 証明書が発行されたら確認

1. **Netlifyの「HTTPS」セクションで確認**
   - 「Certificate status」が「Active」になっているか確認
   - 「Issued by」に「Let's Encrypt」と表示されているか確認

2. **ブラウザで確認**
   - https://kyushoku.site にアクセス
   - エラーが解消され、正常に表示されるか確認

### ステップ5: Force HTTPSを有効化（推奨）

1. **「HTTPS」セクションで「Force HTTPS」をオンにする**
   - HTTPアクセスを自動的にHTTPSにリダイレクト

2. **保存**

## トラブルシューティング

### 問題1: 証明書が発行されない

**原因**:
- DNS設定がまだ反映されていない
- DNS設定が間違っている

**解決方法**:
1. DNS伝播状況を確認（https://dnschecker.org）
2. DNS設定が正しいか再確認
3. 数時間待ってから再試行

### 問題2: 証明書が発行されたがエラーが続く

**原因**:
- ブラウザのキャッシュ
- 古い証明書がキャッシュされている

**解決方法**:
1. ブラウザのキャッシュをクリア
2. シークレットモード/プライベートモードでアクセス
3. 別のブラウザで確認

### 問題3: DNS設定は正しいが証明書が発行されない

**解決方法**:
1. Netlifyのサポートに問い合わせ
2. 「Provide your own certificate」オプションを使用（独自証明書がある場合）

## 確認コマンド

### DNS設定の確認

```bash
# Aレコードを確認
dig kyushoku.site A +short

# ネームサーバーを確認
dig kyushoku.site NS +short
```

### SSL証明書の確認

```bash
# SSL証明書の詳細を確認
openssl s_client -connect kyushoku.site:443 -servername kyushoku.site < /dev/null 2>/dev/null | openssl x509 -noout -subject -dates
```

## 次のステップ

SSL証明書が正しく発行され、HTTPSでアクセスできるようになったら：

1. ✅ **「Force HTTPS」を有効化**
2. ✅ **サイトが正常に表示されるか確認**
3. ✅ **すべてのページがHTTPSでアクセスできるか確認**

## 参考リンク

- [Netlify SSL/TLS証明書](https://docs.netlify.com/domains-https/https-ssl/)
- [Let's Encrypt](https://letsencrypt.org/)
- [DNS伝播チェッカー](https://dnschecker.org)

