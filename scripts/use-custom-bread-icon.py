#!/usr/bin/env python3
"""
カスタムパン画像をPWAアイコンに変換するスクリプト
ユーザーが提供した画像を192x192と512x512にリサイズします
"""

from PIL import Image
import os
import sys

def resize_icon(input_path, output_path, size):
    """画像を指定サイズにリサイズ（アスペクト比を維持し、余白を追加）"""
    try:
        # 元の画像を開く
        img = Image.open(input_path)
        
        # RGBAモードに変換（透明度を保持）
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # アスペクト比を維持してリサイズ
        img.thumbnail((size, size), Image.Resampling.LANCZOS)
        
        # 新しい画像を作成（白背景）
        new_img = Image.new('RGB', (size, size), color='#ffffff')
        
        # 中央に配置
        paste_x = (size - img.width) // 2
        paste_y = (size - img.height) // 2
        
        # 透明度を考慮して貼り付け
        if img.mode == 'RGBA':
            new_img.paste(img, (paste_x, paste_y), img)
        else:
            new_img.paste(img, (paste_x, paste_y))
        
        # オレンジの枠を追加
        from PIL import ImageDraw
        draw = ImageDraw.Draw(new_img)
        margin = size // 10
        draw.ellipse(
            [margin, margin, size - margin, size - margin],
            outline='#f97316',
            width=max(2, size // 50)
        )
        
        # 保存
        new_img.save(output_path, 'PNG')
        print(f'✓ {output_path} を作成しました ({size}x{size})')
        return True
    except Exception as e:
        print(f'❌ エラー: {e}')
        return False

def main():
    """メイン処理"""
    if len(sys.argv) < 2:
        print('使用方法: python use-custom-bread-icon.py <画像ファイルのパス>')
        print('例: python use-custom-bread-icon.py ~/Downloads/bread.png')
        sys.exit(1)
    
    input_path = sys.argv[1]
    
    if not os.path.exists(input_path):
        print(f'❌ ファイルが見つかりません: {input_path}')
        sys.exit(1)
    
    public_dir = os.path.join(os.path.dirname(__file__), '..', 'public')
    os.makedirs(public_dir, exist_ok=True)
    
    # 192x192アイコン
    icon_192_path = os.path.join(public_dir, 'icon-192x192.png')
    if not resize_icon(input_path, icon_192_path, 192):
        sys.exit(1)
    
    # 512x512アイコン
    icon_512_path = os.path.join(public_dir, 'icon-512x512.png')
    if not resize_icon(input_path, icon_512_path, 512):
        sys.exit(1)
    
    print('\n✅ PWAアイコンの生成が完了しました！')
    print(f'   保存先: {public_dir}')

if __name__ == '__main__':
    main()



