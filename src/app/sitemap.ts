import { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/site';

// Bump this when page content meaningfully changes (tells Google to recrawl).
const LAST_UPDATED = new Date('2026-11-03');

const ROUTES: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    { path: '/web-experience', priority: 0.9 },
    { path: '/social-cults', priority: 0.9 },
    { path: '/performance', priority: 0.9 },
    { path: '/ai-visuals', priority: 0.8 },
    { path: '/editorial', priority: 0.8 },
    { path: '/ugc', priority: 0.8 },
    { path: '/project', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
    return ROUTES.map(({ path, priority }) => ({
        url: `${SITE_URL}${path}`,
        lastModified: LAST_UPDATED,
        changeFrequency: 'monthly',
        priority,
        images: path === '' ? [`${SITE_URL}/og.png`] : undefined,
    }));
}
