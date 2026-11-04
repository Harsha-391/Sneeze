/**
 * Homepage + project page copy. Business details and the site URL live in
 * src/config/site.ts (re-exported here for older imports).
 */
export { SITE_URL, BUSINESS, addressLine } from '@/config/site';
export type { Faq } from './types';
import type { Faq } from './types';

export const HOME_SEO = {
    title: 'Best Creative Agency in Jaipur, Rajasthan | Sneeze Media',
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
};

export const PROJECT_SEO = {
    title: 'Start a Project · Creative Agency in Jaipur',
    description:
        'Hire Sneeze Media, a creative & digital marketing agency in Jaipur. Send a brief, call or WhatsApp us and get a clear proposal for your website, ads or content.',
};
