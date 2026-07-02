import type { MetadataRoute } from 'next';
import { siteUrl } from '@/data/schoolInfo';

const routes = [
  '',
  '/rijlessen',
  '/pakketten',
  '/lesgebieden',
  '/over-ons',
  '/slagingspercentage',
  '/ervaringen',
  '/faq',
  '/contact',
  '/privacyverklaring',
  '/algemene-voorwaarden',
  '/cookiebeleid',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/contact' ? 0.9 : 0.7,
  }));
}
