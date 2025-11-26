#!/usr/bin/env python3
"""
PWAアイコン生成スクリプト
192x192と512x512のアイコンを生成します
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, output_path):
    """指定サイズのアイコンを生成"""
    # 新しい画像を作成（オレンジのグラデーション背景）
    img = Image.new('RGB', (size, size), color='#f97316')
    draw = ImageDraw.Draw(img)
    
    # 円形の背景を描画
    margin = size // 10
    draw.ellipse(
        [margin, margin, size - margin, size - margin],
        fill='#ffffff',
        outline='#f97316',
        width=max(2, size // 50)
    )
    
    # テキストを描画（「給」の文字）
    try:
        # システムフォントを使用
        font_size = size // 3
        font = ImageFont.truetype('/System/Library/Fonts/ヒラギノ角ゴシック W3.ttc', font_size)
    except:
        # フォントが見つからない場合はデフォルトフォント
        font = ImageFont.load_default()
    
    text = "給"
    # テキストの位置を中央に配置
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    position = ((size - text_width) // 2, (size - text_height) // 2 - text_height // 4)
    
    draw.text(position, text, fill='#f97316', font=font)
    
    # 画像を保存
    img.save(output_path, 'PNG')
    print(f'✓ {output_path} を作成しました ({size}x{size})')

def main():
    """メイン処理"""
    public_dir = os.path.join(os.path.dirname(__file__), '..', 'public')
    os.makedirs(public_dir, exist_ok=True)
    
    # 192x192アイコン
    icon_192_path = os.path.join(public_dir, 'icon-192x192.png')
    create_icon(192, icon_192_path)
    
    # 512x512アイコン
    icon_512_path = os.path.join(public_dir, 'icon-512x512.png')
    create_icon(512, icon_512_path)
    
    print('\n✅ PWAアイコンの生成が完了しました！')
    print(f'   保存先: {public_dir}')

if __name__ == '__main__':
    main()

