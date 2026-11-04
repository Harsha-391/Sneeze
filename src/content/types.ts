/**
 * Content model for every data-driven page.
 *
 * Words live in typed content files (src/content/{services,industries,combos,
 * locations,blog,pages}/*.ts); layouts live in src/components/longform. Bodies
 * are Markdown strings rendered on the server by src/lib/markdown.tsx.
 */

export type Faq = { q: string; a: string };

export type Related = {
    /** Service slugs under /services, or 'pillar' for /digital-marketing-agency-jaipur */
    services?: string[];
    /** Industry slugs under /industries */
    industries?: string[];
    /** Combo paths without the leading /industries/, e.g. 'hospitals/seo' */
    combos?: string[];
    /** Location slugs under /locations */
    locations?: string[];
    /** Blog post slugs under /blog */
    posts?: string[];
};

export type Longform = {
    slug: string;
    /** Meta title WITHOUT the " | Sneeze Media" suffix: 35–45 characters, so the full title is 50–60. */
    title: string;
    /** Meta description: 140–160 characters, with a benefit and a call to action. */
    description: string;
    /** The page's only H1. Must contain the primary keyword. */
    h1: string;
    /** Short label for cards, menus and breadcrumbs. */
    name: string;
    primaryKeyword: string;
    keywords: string[];
    /** Hero paragraph under the H1 (40–70 words). Contains the primary keyword. */
    lede: string;
    /** One or two sentences used on cards and hub pages. */
    summary: string;
    /** Optional hero side panel, e.g. "What's included". */
    highlights?: { title: string; items: string[] };
    /** Markdown body. See the syntax notes at the top of src/lib/markdown.tsx. */
    body: string;
    faq: Faq[];
    related: Related;
    /** ISO date (YYYY-MM-DD) of the last meaningful edit. Feeds sitemap lastModified. */
    updated: string;
    /** Closing call to action. */
    cta?: { title: string; text: string; label?: string };
};

export type ServicePage = Longform & {
    kind: 'service';
    /** Render this existing hand-built layout above the long-form content. */
    bespoke?: 'web' | 'social' | 'performance';
};

export type PillarPage = Longform & { kind: 'pillar' };

export type IndustryPage = Longform & { kind: 'industry' };

export type ComboPage = Longform & {
    kind: 'combo';
    /** Parent industry slug, e.g. 'hospitals'. */
    industry: string;
    /** The main service page this combo specialises, e.g. 'seo-company-jaipur'. */
    service: string;
};

export type LocationPage = Longform & {
    kind: 'location';
    /** Display name used in the hero and in schema areaServed. */
    place: string;
    placeType: 'City' | 'State' | 'AdministrativeArea';
};

export type Post = Longform & {
    kind: 'post';
    /** ISO date first published. */
    published: string;
    /** Byline. "Sneeze Media Team" until real authors are added (CONTENT_TODOS.md). */
    author: string;
    category: string;
};

export type InfoPage = Longform & {
    kind: 'page';
    /** schema.org WebPage subtype for this page. */
    schemaType?: 'AboutPage' | 'ContactPage' | 'FAQPage' | 'WebPage' | 'CollectionPage';
    /** Hide the "On this page" table of contents (short pages). */
    noToc?: boolean;
};

export type AnyPage = ServicePage | PillarPage | IndustryPage | ComboPage | LocationPage | Post | InfoPage;

/**
 * A client case study. Only publish with the client's written approval and
 * numbers you can show a source for (Search Console, Ads Manager, CRM…).
 */
export type CaseStudy = Longform & {
    kind: 'case-study';
    client: string;
    /** Industry slug, e.g. 'hospitals'. */
    industry: string;
    /** Service slugs, e.g. ['seo-company-jaipur']. */
    services: string[];
    period: string;
    results: { value: string; label: string; source: string }[];
    /** Must be true (client approved) or the page is not built. */
    approved: boolean;
};
