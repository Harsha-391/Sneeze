/**
 * Typed access to every data-driven page. The per-folder index files are
 * generated (scripts/gen-content-index.mjs); this file only sorts them by kind.
 * Server-only: it pulls in every page body, so never import it from a client
 * component (use src/content/routes.ts there).
 */
import type { AnyPage, ComboPage, IndustryPage, InfoPage, LocationPage, PillarPage, Post, Related, ServicePage } from './types';
import services from './services';
import industries from './industries';
import combos from './combos';
import locations from './locations';
import blog from './blog';
import pages from './pages';

const of =
    <T extends AnyPage>(kind: T['kind']) =>
    (list: AnyPage[]) =>
        list.filter((p): p is T => p.kind === kind);

export const SERVICE_PAGES = of<ServicePage>('service')(services);
export const PILLAR_PAGE = of<PillarPage>('pillar')(services)[0];
export const INDUSTRY_PAGES = of<IndustryPage>('industry')(industries);
export const COMBO_PAGES = of<ComboPage>('combo')(combos);
export const LOCATION_PAGES = of<LocationPage>('location')(locations);
export const POST_PAGES = of<Post>('post')(blog).sort((a, b) => b.published.localeCompare(a.published) || a.title.localeCompare(b.title));
export const INFO_PAGES = of<InfoPage>('page')(pages);

export const getServicePage = (slug: string) => SERVICE_PAGES.find((p) => p.slug === slug);
export const getIndustryPage = (slug: string) => INDUSTRY_PAGES.find((p) => p.slug === slug);
export const getComboPage = (industry: string, slug: string) => COMBO_PAGES.find((p) => p.industry === industry && p.slug === slug);
export const getLocationPage = (slug: string) => LOCATION_PAGES.find((p) => p.slug === slug);
export const getPost = (slug: string) => POST_PAGES.find((p) => p.slug === slug);
export const getInfoPage = (slug: string) => INFO_PAGES.find((p) => p.slug === slug);

/**
 * The three hand-built studio layouts that have no long-form page. They live
 * at /services/<slug> and keep their own copy (src/content/studio.tsx).
 */
export const STUDIO_ONLY: Record<string, { id: 'ai-visuals' | 'editorial' | 'ugc'; name: string; related: Related }> = {
    'ai-content-creation-jaipur': {
        id: 'ai-visuals',
        name: 'AI content creation',
        related: {
            services: ['product-photography-jaipur', 'video-production-reels-jaipur', 'ecommerce-shopify-marketing-jaipur'],
            industries: ['jewellery-fashion', 'real-estate'],
            posts: ['instagram-reels-strategy-local-brands'],
        },
    },
    'product-photography-jaipur': {
        id: 'editorial',
        name: 'Product & fashion photography',
        related: {
            services: ['ecommerce-shopify-marketing-jaipur', 'ai-content-creation-jaipur', 'branding-logo-design-jaipur'],
            industries: ['jewellery-fashion', 'restaurants-cafes'],
            combos: ['jewellery-fashion/website-design'],
            posts: ['shopify-store-seo-guide'],
        },
    },
    'ugc-video-production-jaipur': {
        id: 'ugc',
        name: 'UGC video production',
        related: {
            services: ['video-production-reels-jaipur', 'social-media-marketing-jaipur', 'performance-marketing-jaipur'],
            industries: ['jewellery-fashion', 'restaurants-cafes'],
            posts: ['instagram-reels-strategy-local-brands', 'google-ads-vs-meta-ads'],
        },
    },
};

/** Every data-driven route with its last-updated date (sitemap). */
export function allDataRoutes(): { path: string; updated: string; priority: number }[] {
    return [
        ...(PILLAR_PAGE ? [{ path: '/digital-marketing-agency-jaipur', updated: PILLAR_PAGE.updated, priority: 0.95 }] : []),
        ...SERVICE_PAGES.map((p) => ({ path: `/services/${p.slug}`, updated: p.updated, priority: 0.9 })),
        ...INDUSTRY_PAGES.map((p) => ({ path: `/industries/${p.slug}`, updated: p.updated, priority: 0.8 })),
        ...COMBO_PAGES.map((p) => ({ path: `/industries/${p.industry}/${p.slug}`, updated: p.updated, priority: 0.8 })),
        ...LOCATION_PAGES.map((p) => ({ path: `/locations/${p.slug}`, updated: p.updated, priority: p.slug === 'jaipur' ? 0.9 : 0.7 })),
        ...POST_PAGES.map((p) => ({ path: `/blog/${p.slug}`, updated: p.updated, priority: 0.6 })),
        ...INFO_PAGES.map((p) => ({ path: `/${p.slug}`, updated: p.updated, priority: ['privacy-policy', 'terms'].includes(p.slug) ? 0.3 : 0.6 })),
    ];
}
