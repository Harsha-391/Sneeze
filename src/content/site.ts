/**
 * Business details + Jaipur SEO keyword map.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ TO DO (owner): fill in `address.streetAddress`, `address.postalCode` │
 * │ and `sameAs` (Google Business Profile, Instagram, LinkedIn…).        │
 * │ Empty values are simply left out of the schema and the footer.      │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export const SITE_URL = 'https://www.sneeze.media';

export const BUSINESS = {
    name: 'Sneeze Media',
    url: SITE_URL,
    tagline: 'Creative & digital marketing agency in Jaipur',
    description:
        'Sneeze Media is a full-stack creative and digital marketing agency in Jaipur, Rajasthan, offering AI-generated visuals, social media marketing, product and fashion photography, performance ads, UGC video and website design and development.',
    phones: ['+91 9929103969', '+91 9549791480'],
    email: '',
    address: {
        streetAddress: '',
        postalCode: '',
        locality: 'Jaipur',
        region: 'Rajasthan',
        country: 'IN',
        countryName: 'India',
    },
    /** Google Business Profile, Instagram, LinkedIn, YouTube… (full URLs) */
    sameAs: [] as string[],
    areaServed: ['Jaipur', 'Rajasthan', 'India'],
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og.png`,
};

/** Human-readable postal address (only the parts that are filled in). */
export function addressLine() {
    const a = BUSINESS.address;
    return [a.streetAddress, a.locality, a.region, a.postalCode, a.countryName].filter(Boolean).join(', ');
}

/**
 * Primary keyword per page (+ supporting terms). Each page targets one
 * main Jaipur query so pages don't compete with each other.
 */
export const KEYWORD_MAP = [
    { page: '/', primary: 'best creative agency in Jaipur', supporting: ['creative agency in Jaipur', 'digital marketing agency in Jaipur', 'branding agency in Jaipur', 'advertising agency in Jaipur'] },
    { page: '/web-experience', primary: 'best web designing agency in Jaipur', supporting: ['website development company in Jaipur', 'website design in Jaipur', 'SEO services in Jaipur', 'Shopify developer in Jaipur'] },
    { page: '/social-cults', primary: 'social media marketing agency in Jaipur', supporting: ['Instagram marketing agency in Jaipur', 'Instagram reels agency in Jaipur', 'social media management Jaipur'] },
    { page: '/performance', primary: 'performance marketing agency in Jaipur', supporting: ['Google ads agency in Jaipur', 'Meta ads agency in Jaipur', 'advertising agency in Jaipur'] },
    { page: '/editorial', primary: 'product photography in Jaipur', supporting: ['fashion photography in Jaipur', 'commercial photography Jaipur', 'brand shoot Jaipur'] },
    { page: '/ai-visuals', primary: 'AI content creation agency in Jaipur', supporting: ['AI product photography Jaipur', 'AI video production Jaipur'] },
    { page: '/ugc', primary: 'UGC video production agency in Jaipur', supporting: ['UGC content creators Jaipur', 'influencer marketing agency in Jaipur'] },
    { page: '/project', primary: 'hire a creative agency in Jaipur', supporting: ['contact digital marketing agency Jaipur'] },
];

export type Faq = { q: string; a: string };

export const HOME_SEO = {
    title: 'Best Creative & Digital Agency in Jaipur | Sneeze Media',
    description:
        'Sneeze Media is a creative & digital marketing agency in Jaipur: AI visuals, social media, ads, UGC and website design. Call or WhatsApp to start your project.',
    keywords: [
        'best creative agency in Jaipur',
        'creative agency in Jaipur',
        'digital marketing agency in Jaipur',
        'best web designing agency in Jaipur',
        'website development company in Jaipur',
        'social media marketing agency in Jaipur',
        'performance marketing agency in Jaipur',
        'branding agency in Jaipur',
        'advertising agency in Jaipur',
        'product photography in Jaipur',
        'AI content creation agency in Jaipur',
        'UGC video production agency in Jaipur',
    ],
    kicker: 'Creative agency in Jaipur',
    faq: [
        {
            q: 'What does Sneeze Media do?',
            a: 'Sneeze Media is a full-stack creative and digital marketing agency in Jaipur. We create AI-generated visuals, product and fashion photography, social media content, performance ads, UGC videos and fast, SEO-friendly websites, so brands can plan, produce and grow with one team instead of juggling several vendors.',
        },
        {
            q: 'Why choose Sneeze Media as your creative agency in Jaipur?',
            a: 'Strategy, production and performance sit under one roof. AI-assisted production keeps turnaround fast and budgets lean, while our team owns the taste: art direction, copy and editing. Every campaign is judged on results such as leads, return on ad spend and engagement, not on how pretty the deck looks.',
        },
        {
            q: 'Do you offer website design and development in Jaipur?',
            a: 'Yes. We design and build fast, SEO-optimised websites on Next.js and React, and also work with Shopify, WordPress and Wix. Every site is mobile-first, built for Core Web Vitals and set up with on-page SEO, so it can rank in Jaipur searches and turn visitors into enquiries.',
        },
        {
            q: 'Can you manage social media marketing for Jaipur brands?',
            a: 'Yes. We plan and produce Instagram Reels, YouTube Shorts and platform-native posts, build communities and track what actually drives reach. For Jaipur businesses that means content that speaks to local audiences while still being built to travel on the algorithm.',
        },
        {
            q: 'Do you run Google and Meta ads for businesses in Jaipur?',
            a: 'Yes. We create and test ad creatives for Meta (Facebook and Instagram), Google, YouTube and LinkedIn, then scale the winners. Reporting focuses on cost per lead, return on ad spend and revenue, so you always know what your ad budget is returning.',
        },
        {
            q: 'Do you only work with businesses in Jaipur?',
            a: 'No. We are based in Jaipur and love working with local brands, but briefs, calls and reviews all happen online, so we can partner with businesses anywhere in India and beyond.',
        },
        {
            q: 'How do I start a project with Sneeze Media?',
            a: 'Send a brief through our project form, call us on +91 99291 03969 or message us on WhatsApp. We go through your goals, get on a quick call and come back with a clear proposal covering what we will make, the timeline and the cost.',
        },
    ] as Faq[],
    /** Internal links with descriptive, keyword-rich anchor text */
    localServices: [
        { label: 'Web design & development in Jaipur', href: '/web-experience', kind: 'Websites · SEO' },
        { label: 'Social media marketing in Jaipur', href: '/social-cults', kind: 'Reels · Community' },
        { label: 'Performance marketing & ads in Jaipur', href: '/performance', kind: 'Meta · Google' },
        { label: 'Product & fashion photography in Jaipur', href: '/editorial', kind: 'Shoots · Grading' },
        { label: 'AI content creation in Jaipur', href: '/ai-visuals', kind: 'AI images · Video' },
        { label: 'UGC video production in Jaipur', href: '/ugc', kind: 'Creators · Ads' },
    ],
};

export const PROJECT_SEO = {
    title: 'Start a Project · Creative Agency in Jaipur',
    description:
        'Hire Sneeze Media, a creative & digital marketing agency in Jaipur. Send a brief, call or WhatsApp us and get a clear proposal for your website, ads or content.',
};
