# 🗄️ Supabaseテーブル作成手順（UI別）

## 方法1: SQL Editorを使用（推奨）

### 手順

1. **SQL Editorを開く**
   - 左メニューから「SQL Editor」をクリック
   - または、上部の検索バーで「SQL Editor」を検索

2. **新しいクエリを作成**
   - 画面右上に「New query」ボタンがある場合
   - または、画面中央に「+ New query」ボタンがある場合
   - または、既にエディタが開いている場合はそのまま使用

3. **SQLを実行**
   - エディタに `supabase-setup.sql` の内容をコピー＆ペースト
   - 「Run」ボタンをクリック（または Cmd+Enter / Ctrl+Enter）

## 方法2: Table Editorから作成

もしSQL Editorが見つからない場合：

1. **Table Editorを開く**
   - 左メニューから「Table Editor」をクリック

2. **新しいテーブルを作成**
   - 「New table」または「Create a new table」をクリック
   - テーブル名: `kondate`

3. **カラムを追加**
   以下のカラムを1つずつ追加：

   | カラム名 | 型 | オプション |
   |---------|-----|-----------|
   | `id` | `bigint` | Primary Key, Auto-increment |
   | `date` | `date` | Not null |
   | `weekday` | `text` | Not null |
   | `menu` | `text` | Not null |
   | `type` | `text` | Not null, Check constraint: `type IN ('A', 'B')` |
   | `notes` | `text` | Nullable |
   | `created_at` | `timestamptz` | Default: `now()` |
   | `updated_at` | `timestamptz` | Default: `now()` |

4. **制約を追加**
   - 「Add constraint」から「Unique constraint」を追加
   - カラム: `date` と `type` の組み合わせ

5. **保存**
   - 「Save」または「Create table」をクリック

## 方法3: 直接SQLを実行

1. **Databaseを開く**
   - 左メニューから「Database」をクリック

2. **SQL Editorを探す**
   - 「SQL Editor」タブがある場合
   - または、「Query」タブがある場合

3. **SQLを実行**
   - `supabase-setup.sql` の内容をコピー＆ペースト
   - 「Run」をクリック

## 現在のSupabase UIで確認すべき場所

- 左メニューの「SQL Editor」アイコン
- 上部の検索バーで「SQL」と検索
- 「Database」セクション内の「SQL Editor」
- 画面右上の「+」ボタンや「New」ボタン

## スクリーンショットの確認

現在のSupabaseダッシュボードで、左メニューに何が表示されているか教えてください。それに合わせて具体的な手順を案内します。

