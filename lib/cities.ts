// 対応都市の設定ファイル

export interface CenterConfig {
  id: string;    // Supabase の type 列に格納される値
  label: string; // 表示用ラベル
}

export interface CityConfig {
  slug: string;        // URL スラッグ (例: 'tsukubamirai')
  name: string;        // 市の正式名称 (例: 'つくばみらい市')
  emoji: string;       // アイコン絵文字
  description: string; // サブタイトル
  centers: CenterConfig[];
}

export const CITIES: CityConfig[] = [
  {
    slug: 'tsukubamirai',
    name: 'つくばみらい市',
    emoji: '🌸',
    description: '陽光台小・小絹小・伊奈中など',
    centers: [
      { id: 'A', label: 'A献立' },
      { id: 'B', label: 'B献立' },
    ],
  },
  {
    slug: 'tsukuba',
    name: 'つくば市',
    emoji: '🔬',
    description: 'すこやか・ほがらか・桜・筑波センター',
    centers: [
      { id: 'すこやか豊里', label: 'すこやか(豊里)' },
      { id: 'ほがらか谷田部', label: 'ほがらか(谷田部)' },
      { id: '桜', label: '桜センター' },
      { id: '筑波', label: '筑波センター' },
    ],
  },
  {
    slug: 'moriya',
    name: '守谷市',
    emoji: '🌿',
    description: 'A・B・Cブロック',
    centers: [
      { id: 'Aブロック', label: 'Aブロック' },
      { id: 'Bブロック', label: 'Bブロック' },
      { id: 'Cブロック', label: 'Cブロック' },
    ],
  },
  {
    slug: 'toride',
    name: '取手市',
    emoji: '🚂',
    description: '取手市全校共通',
    centers: [
      { id: '取手', label: '取手市' },
    ],
  },
  {
    slug: 'ryugasaki',
    name: '龍ケ崎市',
    emoji: '🐉',
    description: 'A・B献立',
    centers: [
      { id: 'A献立', label: 'A献立' },
      { id: 'B献立', label: 'B献立' },
    ],
  },
];

export function getCityBySlug(slug: string): CityConfig | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getCityByName(name: string): CityConfig | undefined {
  return CITIES.find((c) => c.name === name);
}
