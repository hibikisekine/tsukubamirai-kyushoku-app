# 🔐 Netlify環境変数設定方法

## 方法1: 左サイドバーから（推奨）

1. **左サイドバーの「Site settings」をクリック**
   - 歯車アイコン（⚙️）をクリック
   - または、「Site settings」というテキストリンクをクリック

2. **「Environment variables」を選択**
   - 左サイドバーまたはメインエリアに「Environment variables」がある
   - クリック

3. **環境変数を追加**
   - 「Add a variable」または「Add variable」をクリック
   - 変数名と値を入力
   - 「Save」をクリック

## 方法2: デプロイ画面から

1. **「Deploys」タブを開く**（現在開いている画面）
2. **「Site settings」タブをクリック**
   - 上部のタブに「Deploys」「Site settings」などがある
3. **「Environment variables」を選択**
4. **環境変数を追加**

## 方法3: デプロイ前に設定（新規デプロイ時）

1. **「Add new site」→「Import an existing project」**
2. **リポジトリを選択**
3. **「Show advanced」をクリック**
4. **「New variable」をクリック**
5. **環境変数を追加**

## 現在の画面から設定する場合

デプロイが完了している場合：

1. **左サイドバーの「Site settings」（歯車アイコン⚙️）をクリック**
2. **「Environment variables」を選択**
3. **「Add a variable」をクリック**
4. **以下の4つを追加：**

| 変数名 | 値 |
|--------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ygvgnbdwxhfepphnligk.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyOTg5NDEsImV4cCI6MjA3ODg3NDk0MX0.OcoSA7C1Y86yHHjgNJj8aZFVRjzdXAUgIWf2wMtGbW0` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndmduYmR3eGhmZXBwaG5saWdrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzI5ODk0MSwiZXhwIjoyMDc4ODc0OTQxfQ.QWWrpIe5DF4DkEl-F_Kz6ZkxedODt7J08IcOLFFbR24` |
| `ADMIN_PASSWORD` | 強力なパスワードを設定 |

5. **各変数を追加したら「Save」をクリック**

## 環境変数設定後の再デプロイ

環境変数を設定した後、再デプロイが必要です：

1. **「Deploys」タブに戻る**
2. **「Trigger deploy」をクリック**
3. **「Clear cache and deploy site」を選択**
4. 再デプロイが開始されます

## 確認方法

環境変数が正しく設定されているか確認：

1. 「Site settings」→「Environment variables」を開く
2. 追加した4つの変数が表示されているか確認

