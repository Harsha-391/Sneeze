/**
 * Options on the /project and /contact forms, and which one each service page
 * pre-selects (?service=<slug>). Kept tiny because the forms are client code.
 */
export const OBJECTIVES = [
    'Full digital marketing plan',
    'SEO',
    'Local SEO / Google Business Profile',
    'Website design & development',
    'E-commerce / Shopify',
    'Social media marketing',
    'Google Ads / Meta Ads',
    'Branding & logo design',
    'Video production & reels',
    'Content & copywriting',
    'AI content creation',
    'Product & fashion photography',
    'UGC videos',
    'Other',
] as const;

export const OBJECTIVE_BY_SLUG: Record<string, (typeof OBJECTIVES)[number]> = {
    'digital-marketing-agency-jaipur': 'Full digital marketing plan',
    'seo-company-jaipur': 'SEO',
    'local-seo-jaipur': 'Local SEO / Google Business Profile',
    'website-design-development-jaipur': 'Website design & development',
    'ecommerce-shopify-marketing-jaipur': 'E-commerce / Shopify',
    'social-media-marketing-jaipur': 'Social media marketing',
    'performance-marketing-jaipur': 'Google Ads / Meta Ads',
    'branding-logo-design-jaipur': 'Branding & logo design',
    'video-production-reels-jaipur': 'Video production & reels',
    'content-marketing-copywriting-jaipur': 'Content & copywriting',
    'ai-content-creation-jaipur': 'AI content creation',
    'product-photography-jaipur': 'Product & fashion photography',
    'ugc-video-production-jaipur': 'UGC videos',
    // ids used by the hand-built service layouts
    'ai-visuals': 'AI content creation',
    'social-cults': 'Social media marketing',
    editorial: 'Product & fashion photography',
    performance: 'Google Ads / Meta Ads',
    ugc: 'UGC videos',
    'web-experience': 'Website design & development',
};
