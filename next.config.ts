import type { NextConfig } from 'next';

/**
 * Canonical origin for metadata, sitemap and JSON-LD.
 * 1. NEXT_PUBLIC_SITE_URL, if set (use this once the custom domain is live)
 * 2. Vercel's production domain: the custom domain once attached, otherwise *.vercel.app
 * 3. Fallback for local builds
 */
const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
    'https://www.sneeze.media';

/** Old service URLs → their new homes under /services (permanent). */
const MOVED: [string, string][] = [
    ['/web-experience', '/services/website-design-development-jaipur'],
    ['/social-cults', '/services/social-media-marketing-jaipur'],
    ['/performance', '/services/performance-marketing-jaipur'],
    ['/ai-visuals', '/services/ai-content-creation-jaipur'],
    ['/editorial', '/services/product-photography-jaipur'],
    ['/ugc', '/services/ugc-video-production-jaipur'],
];

const nextConfig: NextConfig = {
    reactCompiler: true,
    env: { NEXT_PUBLIC_SITE_URL: SITE_URL.replace(/\/+$/, '') },
    async redirects() {
        return MOVED.map(([source, destination]) => ({ source, destination, permanent: true }));
    },
};

export default nextConfig;
