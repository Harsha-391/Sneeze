import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';
import { PUBLISHED_CASE_STUDIES } from '@/content/case-studies';
import { allDataRoutes, STUDIO_ONLY } from '@/content/registry';

/** Fixed pages: bump the date when their content meaningfully changes. */
const STATIC: { path: string; updated: string; priority: number }[] = [
    { path: '/', updated: '2026-11-04', priority: 1 },
    { path: '/services', updated: '2026-11-04', priority: 0.8 },
    { path: '/industries', updated: '2026-11-04', priority: 0.7 },
    { path: '/locations', updated: '2026-11-04', priority: 0.7 },
    { path: '/blog', updated: '2026-11-04', priority: 0.6 },
    { path: '/contact', updated: '2026-11-04', priority: 0.7 },
    { path: '/project', updated: '2026-11-04', priority: 0.5 },
    ...Object.keys(STUDIO_ONLY).map((slug) => ({ path: `/services/${slug}`, updated: '2026-11-04', priority: 0.7 })),
];

/** Generated from the content registries, so every page is listed automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        ...STATIC,
        ...allDataRoutes(),
        ...PUBLISHED_CASE_STUDIES.map((c) => ({ path: `/case-studies/${c.slug}`, updated: c.updated, priority: 0.6 })),
    ];
    return routes.map(({ path, updated, priority }) => ({
        url: `${SITE_URL}${path === '/' ? '' : path}`,
        lastModified: new Date(updated),
        changeFrequency: path.startsWith('/blog') ? 'monthly' : 'monthly',
        priority,
        ...(path === '/' ? { images: [`${SITE_URL}/og.png`] } : {}),
    }));
}
