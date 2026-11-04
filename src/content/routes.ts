/**
 * Lightweight index of every page: path + descriptive anchor text + a short
 * blurb. The header mega-menu, footer and "related" blocks read this file
 * (it has no page bodies, so it stays tiny in the client bundle).
 *
 * `npm run seo:check` fails if any path here doesn't exist in the build.
 */

export type RouteLink = { href: string; label: string; blurb?: string };

export const PILLAR: RouteLink = {
    href: '/digital-marketing-agency-jaipur',
    label: 'Digital marketing agency in Jaipur',
    blurb: 'Strategy, SEO, ads, social and websites run as one plan.',
};

export const SERVICES: RouteLink[] = [
    { href: '/services/seo-company-jaipur', label: 'SEO services', blurb: 'Technical SEO, content and links that grow organic enquiries.' },
    { href: '/services/local-seo-jaipur', label: 'Local SEO & Google Business Profile', blurb: 'Show up in the map pack when Jaipur searches nearby.' },
    { href: '/services/website-design-development-jaipur', label: 'Website design & development', blurb: 'Fast, bespoke websites built to rank and convert.' },
    { href: '/services/ecommerce-shopify-marketing-jaipur', label: 'E-commerce & Shopify marketing', blurb: 'Shopify builds, store SEO and ads that sell.' },
    { href: '/services/social-media-marketing-jaipur', label: 'Social media marketing', blurb: 'Reels, community and content people actually share.' },
    { href: '/services/performance-marketing-jaipur', label: 'Google Ads & Meta Ads', blurb: 'Paid campaigns judged on leads and revenue.' },
    { href: '/services/branding-logo-design-jaipur', label: 'Branding & logo design', blurb: 'Names, logos and identity systems with a point of view.' },
    { href: '/services/video-production-reels-jaipur', label: 'Video production & reels', blurb: 'Short-form video, ad films and reels, shot and edited.' },
    { href: '/services/content-marketing-copywriting-jaipur', label: 'Content marketing & copywriting', blurb: 'Words that rank, explain and persuade.' },
];

export const STUDIO: RouteLink[] = [
    { href: '/services/ai-content-creation-jaipur', label: 'AI content creation', blurb: 'AI-generated campaign visuals and video.' },
    { href: '/services/product-photography-jaipur', label: 'Product & fashion photography', blurb: 'Editorial and e-commerce shoots.' },
    { href: '/services/ugc-video-production-jaipur', label: 'UGC video production', blurb: 'Creator-made videos for ads and social.' },
];

export const INDUSTRIES: RouteLink[] = [
    { href: '/industries/hospitals', label: 'Hospitals', blurb: 'Patient acquisition with ethical, compliant messaging.' },
    { href: '/industries/doctors-clinics', label: 'Doctors & clinics', blurb: 'Local visibility and trust for practices.' },
    { href: '/industries/schools-colleges', label: 'Schools & colleges', blurb: 'Admission funnels that earn parent trust.' },
    { href: '/industries/real-estate', label: 'Real estate & builders', blurb: 'Qualified site-visit leads, not junk forms.' },
    { href: '/industries/jewellery-fashion', label: 'Jewellery & fashion brands', blurb: 'Product content and D2C growth.' },
    { href: '/industries/restaurants-cafes', label: 'Restaurants & cafes', blurb: 'Footfall, reviews and delivery orders.' },
    { href: '/industries/coaching-edtech', label: 'Coaching institutes & EdTech', blurb: 'Enrolment funnels for batches and courses.' },
    { href: '/industries/manufacturers-exporters', label: 'Manufacturers & exporters', blurb: 'B2B leads from buyers in India and abroad.' },
    { href: '/industries/it-startups', label: 'IT companies & startups', blurb: 'Pipeline, positioning and launch marketing.' },
];

export const COMBOS: RouteLink[] = [
    { href: '/industries/hospitals/seo', label: 'SEO for hospitals in Jaipur' },
    { href: '/industries/doctors-clinics/website-design', label: 'Website design for doctors and clinics in Jaipur' },
    { href: '/industries/real-estate/google-ads', label: 'Google Ads for real estate in Jaipur' },
    { href: '/industries/restaurants-cafes/social-media-marketing', label: 'Social media marketing for restaurants in Jaipur' },
    { href: '/industries/jewellery-fashion/website-design', label: 'Website design for jewellery brands in Jaipur' },
];

export const LOCATIONS: RouteLink[] = [
    { href: '/locations/jaipur', label: 'Jaipur', blurb: 'Our home city, neighbourhood by neighbourhood.' },
    { href: '/locations/rajasthan', label: 'Rajasthan', blurb: 'Udaipur, Jodhpur, Kota, Ajmer and beyond.' },
    { href: '/locations/delhi-ncr', label: 'Delhi NCR', blurb: 'Delhi, Gurugram, Noida and the NCR market.' },
    { href: '/locations/mumbai', label: 'Mumbai', blurb: 'D2C, real estate and media-heavy markets.' },
];

export const POSTS: RouteLink[] = [
    { href: '/blog/digital-marketing-cost-jaipur', label: 'How much does digital marketing cost in Jaipur?' },
    { href: '/blog/ethical-hospital-marketing-guidelines', label: 'Hospital marketing strategies that follow ethical guidelines' },
    { href: '/blog/local-seo-checklist-jaipur', label: 'Local SEO checklist for Jaipur businesses' },
    { href: '/blog/shopify-store-seo-guide', label: 'Shopify store SEO guide' },
    { href: '/blog/school-admissions-online-marketing', label: 'How schools can get more admissions online' },
    { href: '/blog/website-cost-jaipur', label: 'How much does a website cost in Jaipur?' },
    { href: '/blog/instagram-reels-strategy-local-brands', label: 'Instagram Reels strategy for local brands' },
    { href: '/blog/google-ads-vs-meta-ads', label: 'Google Ads vs Meta Ads: which should you run?' },
    { href: '/blog/real-estate-lead-generation-jaipur', label: 'Real estate lead generation in Jaipur' },
    { href: '/blog/how-to-choose-digital-marketing-agency', label: 'How to choose a digital marketing agency' },
    { href: '/blog/digital-marketing-for-exporters', label: 'Digital marketing for exporters and manufacturers' },
    { href: '/blog/what-is-digital-marketing', label: 'What is digital marketing? (Digital marketing kya hai)' },
];

export const RESOURCES: RouteLink[] = [
    { href: '/blog', label: 'Blog & guides', blurb: 'Practical marketing guides for Indian businesses.' },
    { href: '/case-studies', label: 'Case studies', blurb: 'How we measure and report results.' },
    { href: '/process', label: 'How we work', blurb: 'Our process from brief to reporting.' },
    { href: '/pricing', label: 'Pricing', blurb: 'How engagements and budgets work.' },
    { href: '/faq', label: 'FAQ', blurb: 'Straight answers before you call.' },
];

export const COMPANY: RouteLink[] = [
    { href: '/about', label: 'About Sneeze Media' },
    { href: '/contact', label: 'Contact us' },
    { href: '/project', label: 'Start a project' },
    { href: '/privacy-policy', label: 'Privacy policy' },
    { href: '/terms', label: 'Terms of use' },
];

export const HUBS = {
    services: { href: '/services', label: 'Services' },
    industries: { href: '/industries', label: 'Industries' },
    locations: { href: '/locations', label: 'Locations' },
    blog: { href: '/blog', label: 'Blog' },
} as const;

const ALL: RouteLink[] = [PILLAR, ...SERVICES, ...STUDIO, ...INDUSTRIES, ...COMBOS, ...LOCATIONS, ...POSTS, ...RESOURCES, ...COMPANY];

/** Look up a link by path (used by the related-content blocks). */
export function linkFor(href: string): RouteLink | undefined {
    return ALL.find((r) => r.href === href);
}

export const serviceHref = (slug: string) => (slug === 'pillar' ? PILLAR.href : `/services/${slug}`);
export const industryHref = (slug: string) => `/industries/${slug}`;
export const comboHref = (path: string) => `/industries/${path}`;
export const locationHref = (slug: string) => `/locations/${slug}`;
export const postHref = (slug: string) => `/blog/${slug}`;
