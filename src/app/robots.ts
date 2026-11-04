import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
    return {
        // Everyone (incl. Googlebot, Bingbot and AI search crawlers) may crawl the whole site.
        rules: { userAgent: '*', allow: '/' },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
