import { MetadataRoute } from 'next';
import { getKondateList } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kyushoku.site';
  
  // 静的ページ
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/calendar`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 動的ページ（献立ページ）
  let dynamicPages: MetadataRoute.Sitemap = [];
  
  try {
    const kondateList = await getKondateList();
    const uniqueDates = Array.from(new Set(kondateList.map(k => k.date)));
    
    dynamicPages = uniqueDates.map((date) => ({
      url: `${baseUrl}/${date}`,
      lastModified: new Date(date),
      changeFrequency: 'daily' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  return [...staticPages, ...dynamicPages];
}



