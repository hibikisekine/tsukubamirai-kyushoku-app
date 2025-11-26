#!/usr/bin/env python3
"""
PWAアイコン生成スクリプト
パンのイラストアイコンを生成します
192x192と512x512のアイコンを生成します
"""

from PIL import Image, ImageDraw, ImageFont
import os
import math

def create_bread_icon(size, output_path):
    """パンのイラストアイコンを生成（2本のバゲット）"""
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
    
    # パンのイラストを描画（2本のバゲット）
    center_x = size // 2
    center_y = size // 2
    
    # バゲットのサイズ
    baguette_length = size * 0.7
    baguette_width = size * 0.15
    
    # 2本のバゲットを斜めに配置
    angle = -35  # 斜めの角度（度）
    angle_rad = math.radians(angle)
    
    # 1本目のバゲット（上）
    offset_y1 = -size * 0.08
    # 2本目のバゲット（下、少し重なる）
    offset_y2 = size * 0.08
    
    def draw_baguette(x, y, angle, length, width):
        """バゲットを描画"""
        # バゲットの本体（楕円形）
        cos_a = math.cos(angle)
        sin_a = math.sin(angle)
        
        # バゲットの中心点
        points = []
        num_points = 20
        
        for i in range(num_points + 1):
            t = (i / num_points - 0.5) * 2  # -1 to 1
            # 楕円のパラメータ
            local_x = t * length / 2
            local_y = (1 - t*t) * width / 2
            
            # 回転
            rot_x = local_x * cos_a - local_y * sin_a
            rot_y = local_x * sin_a + local_y * cos_a
            
            points.append((x + rot_x, y + rot_y))
        
        # バゲットの本体を描画（暖かい茶色）
        bread_color = '#8B4513'  # サドルブラウン（パンの色）
        if len(points) > 2:
            draw.polygon(points, fill=bread_color, outline='#654321', width=max(1, size // 150))
        
        # バゲットのスコア（切り込み）を描画
        num_scores = 4
        score_color = '#D4A574'  # 薄い茶色（切り込みの色）
        score_width = max(1, size // 120)
        
        for i in range(num_scores):
            t = (i + 1) / (num_scores + 1) - 0.5  # -0.5 to 0.5
            local_x = t * length * 0.8
            local_y = 0
            
            # 回転
            rot_x = local_x * cos_a - local_y * sin_a
            rot_y = local_x * sin_a + local_y * cos_a
            
            score_x = x + rot_x
            score_y = y + rot_y
            
            # スコアの線（斜め）
            score_length = width * 0.6
            score_angle = angle + 90
            score_angle_rad = math.radians(score_angle)
            
            score_dx = math.cos(score_angle_rad) * score_length / 2
            score_dy = math.sin(score_angle_rad) * score_length / 2
            
            draw.line(
                [(score_x - score_dx, score_y - score_dy), 
                 (score_x + score_dx, score_y + score_dy)],
                fill=score_color,
                width=score_width
            )
    
    # 1本目のバゲットを描画
    draw_baguette(center_x, center_y + offset_y1, angle_rad, baguette_length, baguette_width)
    
    # 2本目のバゲットを描画（少し重なる）
    draw_baguette(center_x, center_y + offset_y2, angle_rad, baguette_length, baguette_width)
    
    # 2本の間の影を描画
    shadow_color = '#654321'
    shadow_width = max(1, size // 100)
    shadow_start_x = center_x - baguette_length * 0.3
    shadow_start_y = center_y
    shadow_end_x = center_x + baguette_length * 0.3
    shadow_end_y = center_y
    
    draw.line(
        [(shadow_start_x, shadow_start_y), (shadow_end_x, shadow_end_y)],
        fill=shadow_color,
        width=shadow_width
    )
    
    # 画像を保存
    img.save(output_path, 'PNG')
    print(f'✓ {output_path} を作成しました ({size}x{size})')

def create_icon(size, output_path):
    """指定サイズのアイコンを生成（パンイラスト版）"""
    create_bread_icon(size, output_path)

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

