# 🔐 Netlifyフリープランで環境変数を設定する方法

## 重要：Team settingsではなく、Site settingsを使う

現在見ている「Team settings」の「Environment variables」は、**Shared environment variables**（チーム全体で共有する環境変数）で、有料プランが必要です。

**フリープランでも、プロジェクト単位の環境変数は設定できます！**

## 正しい手順

### ステップ1: プロジェクト（サイト）の設定画面に移動

1. **左サイドバーの「Projects」をクリック**
   - または、上部の「Projects / meek-manatee-a78963」のドロップダウンからプロジェクトを選択

2. **プロジェクト名（`meek-manatee-a78963`）をクリック**
   - プロジェクトのダッシュボードに移動

### ステップ2: Site settingsを開く

1. **左サイドバーの「Site settings」（歯車アイコン⚙️）をクリック**
   - プロジェクトの設定画面に移動

2. **「Environment variables」を選択**
   - 左サイドバーまたはメインエリアに表示されます

### ステップ3: 環境変数を追加

1. **「Add a variable」または「Add variable」をクリック**

2. **以下の4つを1つずつ追加：**

   #### 1. NEXT_PUBLIC_SUPABASE_URL
   - **Key**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: `https://ygvgnbdwxhfepphnligk.supabase.co`
   - **Scopes**: すべてにチェック（Production, Deploy previews, Branch deploys）
   - 「Save」をクリック

   #### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
   - **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyOTg5NDEsImV4cCI6MjA3ODg3NDk0MX0.OcoSA7C1Y86yHHjgNJj8aZFVRjzdXAUgIWf2wMtGbW0`
   - **Scopes**: すべてにチェック
   - 「Save」をクリック

   #### 3. SUPABASE_SERVICE_ROLE_KEY
   - **Key**: `SUPABASE_SERVICE_ROLE_KEY`
   - **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzI5ODk0MSwiZXhwIjoyMDc4ODc0OTQxfQ.QWWrpIe5DF4DkEl-F_Kz6ZkxedODt7J08IcOLFFbR24`
   - **Scopes**: すべてにチェック
   - 「Save」をクリック

   #### 4. ADMIN_PASSWORD
   - **Key**: `ADMIN_PASSWORD`
   - **Value**: 強力なパスワードを設定（例: `Kyushoku2024!Secure`）
   - **Scopes**: すべてにチェック
   - 「Save」をクリック

### ステップ4: 再デプロイ

環境変数を設定した後、再デプロイが必要です：

1. **「Deploys」タブに戻る**
2. **「Trigger deploy」をクリック**
3. **「Clear cache and deploy site」を選択**
4. 再デプロイが開始されます（2-3分）

## 確認方法

環境変数が正しく設定されているか確認：

1. 「Site settings」→「Environment variables」を開く
2. 追加した4つの変数が表示されているか確認

## 違いの説明

| 場所 | 説明 | プラン |
|------|------|--------|
| **Team settings** → Environment variables | チーム全体で共有する環境変数 | 有料プラン必要 |
| **Site settings** → Environment variables | 個別のプロジェクト用の環境変数 | **フリープランで利用可能** ✅ |

**フリープランでは「Site settings」の環境変数を使用してください！**

