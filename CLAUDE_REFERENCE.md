# きゅうしょくなにかな — Claude参照ドキュメント

このファイルはClaude（AI）が作業をすぐに開始できるよう、プロジェクトの全体像・更新方法・デプロイ手順をまとめたものです。

---

## 基本情報

| 項目 | 内容 |
|------|------|
| サイトURL | https://kyushoku.site |
| GitHubリポジトリ | https://github.com/hibikisekine/tsukubamirai-kyushoku-app |
| ローカルフォルダ | `~/Downloads/tsukubamirai-kyushoku-app` |
| ホスティング | Vercel（GitHubと連携済み・自動デプロイ） |
| DB | Supabase |

---

## 技術スタック

- **フレームワーク**: Next.js 14（App Router）
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **DB**: Supabase（献立データ・いいねボタン）
- **PWA**: next-pwa対応済み
- **デプロイ**: Vercel（GitHubへpushで自動デプロイ）

---

## 対応自治体

| スラッグ | 市名 | センター |
|---------|------|---------|
| `tsukubamirai` | つくばみらい市 | A献立 / B献立 |
| `tsukuba` | つくば市 | すこやか(豊里) / ほがらか(谷田部) / 桜 / 筑波 |
| `moriya` | 守谷市 | Aブロック / Bブロック / Cブロック |
| `toride` | 取手市 | 取手市 |
| `ryugasaki` | 龍ケ崎市 | （単一） |

自治体の追加・変更は `lib/cities.ts` を編集する。

---

## 主要ファイル一覧

```
tsukubamirai-kyushoku-app/
├── app/
│   ├── layout.tsx         ← 全ページ共通レイアウト（GA・AdSense・ナビ・フッター）
│   ├── page.tsx           ← トップページ（自治体選択）
│   ├── [city]/page.tsx    ← 各自治体の献立ページ
│   ├── calendar/          ← カレンダーページ
│   ├── search/            ← 検索ページ
│   ├── about/             ← このサイトについて
│   ├── privacy/           ← プライバシーポリシー
│   ├── terms/             ← 利用規約
│   ├── admin/             ← 管理ページ
│   └── lp/                ← 自治体・学校向けLPページ
├── components/
│   ├── Navigation.tsx     ← ナビゲーションバー
│   ├── AdBanner.tsx       ← Google AdSense広告
│   ├── LikeButton.tsx     ← 食べたいボタン（Supabase連携）
│   └── PWAInstallPrompt.tsx ← PWAインストール促進
├── lib/
│   ├── cities.ts          ← 自治体・センター設定（ここを編集して自治体追加）
│   ├── data.ts            ← Supabaseからの献立データ取得
│   ├── supabase.ts        ← Supabaseクライアント
│   └── csvParser.ts       ← CSVパーサー
├── public/                ← 画像・アイコン・manifest.json
├── scripts/               ← データ投入スクリプト
└── CLAUDE_REFERENCE.md    ← このファイル
```

---

## 設定済みサービス

### Google Analytics
- 計測ID: `G-6K7NXBD8T9`
- 設定場所: `app/layout.tsx`（`next/script` で `afterInteractive` 設定済み）

### Google AdSense
- クライアントID: 環境変数 `NEXT_PUBLIC_ADSENSE_CLIENT_ID` で管理
- 設定場所: `app/layout.tsx`・`components/AdBanner.tsx`

### Supabase
- URL: `https://ygvgnbdwxhfepphnligk.supabase.co`
- 環境変数一覧: `Vercel環境変数一覧.txt` 参照

---

## デプロイ手順（コードを変更したあと）

**ステップ1: ターミナルを開く**
`Command + スペース` → 「ターミナル」→ Enter

**ステップ2: 以下を1行ずつ実行**

```bash
cd ~/Downloads/tsukubamirai-kyushoku-app
git add .
git commit -m "変更内容のメモ"
git push origin main
```

**ステップ3: 自動デプロイ確認**
- Vercelダッシュボード → プロジェクト → Deploymentsタブ
- 1〜2分でhttps://kyushoku.site に反映される

> ⚠️ Claudeのサンドボックス環境からは `git push` できない（認証が通らない）。
> コミットまではClaude側でやって、pushはターミナルでユーザーが実行する。

---

## よくある更新パターン

### デザイン変更・文言変更
→ 該当ページの `.tsx` ファイルを編集 → push

### 新しい自治体を追加する
1. `lib/cities.ts` に自治体情報を追記
2. Supabaseに献立データを投入（`scripts/` 以下のスクリプトを使用）
3. push

### Google Analytics IDを変更する
→ `app/layout.tsx` の `G-XXXXXXXXXX` を書き換え → push

### AdSense広告を追加・変更する
→ `components/AdBanner.tsx` を編集、またはVercelの環境変数 `NEXT_PUBLIC_ADSENSE_CLIENT_ID` を更新

### フッター・ナビゲーションを変更する
→ `app/layout.tsx`（フッター）または `components/Navigation.tsx`（ナビ）を編集 → push

---

## 注意事項

- `app/layout.tsx` は全ページに影響するため変更は慎重に
- Supabaseのキーは公開しないこと（環境変数で管理）
- デプロイはVercelが自動でやるため、pushするだけでOK
