import type { Metadata } from 'next';
import { BUSINESS, isSet, SITE_URL, socialLinks } from '@/config/site';
import type { AnyPage, Faq, LocationPage, Post } from './types';
import { PILLAR, SERVICES, STUDIO } from './routes';

/* ------------------------------------------------------------------ */
/* Metadata                                                           */
/* ------------------------------------------------------------------ */

type PageMetaInput = {
    /** Page title without the " | Sneeze Media" suffix (the layout template adds it). */
    title: string;
    description: string;
    path: string;
    keywords?: string[];
    /** Use the title exactly as given (home page). */
    absoluteTitle?: boolean;
    article?: { published: string; modified: string; author: string; section?: string };
};

export function pageMetadata({ title, description, path, keywords, absoluteTitle, article }: PageMetaInput): Metadata {
    const fullTitle = absoluteTitle ? title : `${title} | ${BUSINESS.name}`;
    const image = { url: '/og.png', width: 1200, height: 630, alt: `${BUSINESS.name}: ${BUSINESS.tagline}` };
    return {
        title: absoluteTitle ? { absolute: title } : title,
        description,
        keywords,
        alternates: { canonical: path },
        robots: { index: true, follow: true },
        openGraph: article
            ? {
                  type: 'article',
                  url: path,
                  siteName: BUSINESS.name,
                  locale: 'en_IN',
                  title: fullTitle,
                  description,
                  images: [image],
                  publishedTime: article.published,
                  modifiedTime: article.modified,
                  authors: [article.author],
                  section: article.section,
              }
            : { type: 'website', url: path, siteName: BUSINESS.name, locale: 'en_IN', title: fullTitle, description, images: [image] },
        twitter: { card: 'summary_large_image', title: fullTitle, description, images: ['/og.png'] },
    };
}

/** Metadata for any data-driven page. */
export function metaFor(page: AnyPage, path: string): Metadata {
    return pageMetadata({
        title: page.title,
        description: page.description,
        path,
        keywords: [page.primaryKeyword, ...page.keywords],
        article:
            page.kind === 'post'
                ? { published: page.published, modified: page.updated, author: page.author, section: page.category }
                : undefined,
    });
}

/* ------------------------------------------------------------------ */
/* JSON-LD (schema.org)                                               */
/* ------------------------------------------------------------------ */

export const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const abs = (path: string) => `${SITE_URL}${path === '/' ? '' : path}`;

function postalAddress() {
    const a = BUSINESS.address;
    return {
        '@type': 'PostalAddress',
        ...(isSet(a.streetAddress) ? { streetAddress: a.streetAddress } : {}),
        addressLocality: a.locality,
        addressRegion: a.region,
        ...(isSet(a.postalCode) ? { postalCode: a.postalCode } : {}),
        addressCountry: a.country,
    };
}

const AREA_SERVED = [
    { '@type': 'City', name: 'Jaipur' },
    { '@type': 'State', name: 'Rajasthan' },
    { '@type': 'Country', name: 'India' },
];

/** Site-wide: the business as Organization + ProfessionalService (a LocalBusiness subtype). */
export function organizationSchema() {
    const sameAs = socialLinks().map((s) => s.href);
    return {
        '@context': 'https://schema.org',
        '@type': ['Organization', 'ProfessionalService'],
        '@id': ORG_ID,
        name: BUSINESS.name,
        ...(isSet(BUSINESS.legalName) ? { legalName: BUSINESS.legalName } : {}),
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: BUSINESS.logo, width: 512, height: 512 },
        image: BUSINESS.image,
        description: BUSINESS.description,
        telephone: BUSINESS.phones[0],
        ...(isSet(BUSINESS.email) ? { email: BUSINESS.email } : {}),
        ...(isSet(BUSINESS.foundingYear) ? { foundingDate: BUSINESS.foundingYear } : {}),
        address: postalAddress(),
        ...(isSet(BUSINESS.geo.lat) && isSet(BUSINESS.geo.lng)
            ? { geo: { '@type': 'GeoCoordinates', latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng } }
            : {}),
        ...(isSet(BUSINESS.openingHours) ? { openingHours: BUSINESS.openingHours } : {}),
        areaServed: AREA_SERVED,
        priceRange: '₹₹',
        contactPoint: BUSINESS.phones.map((tel) => ({
            '@type': 'ContactPoint',
            telephone: tel,
            contactType: 'sales',
            areaServed: 'IN',
            availableLanguage: BUSINESS.languages,
        })),
        knowsAbout: [
            'Digital marketing',
            'Search engine optimisation',
            'Local SEO',
            'Website design and development',
            'Shopify and e-commerce marketing',
            'Social media marketing',
            'Google Ads',
            'Meta Ads',
            'Branding and logo design',
            'Video production',
            'Content marketing',
        ],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Digital marketing services',
            itemListElement: [PILLAR, ...SERVICES, ...STUDIO].map((s) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: s.label, url: abs(s.href) },
            })),
        },
        ...(sameAs.length ? { sameAs } : {}),
    };
}

/** Homepage only. */
export function websiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_URL,
        name: BUSINESS.name,
        description: BUSINESS.tagline,
        inLanguage: 'en-IN',
        publisher: { '@id': ORG_ID },
    };
}

export function faqSchema(faq: Faq[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
    };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((it, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: it.name,
            item: abs(it.path),
        })),
    };
}

export function serviceSchema({
    name,
    description,
    path,
    serviceType,
    audience,
    area,
}: {
    name: string;
    description: string;
    path: string;
    serviceType: string;
    audience?: string;
    area?: { type: string; name: string }[];
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${abs(path)}#service`,
        name,
        serviceType,
        description,
        url: abs(path),
        provider: { '@id': ORG_ID },
        areaServed: area ? area.map((a) => ({ '@type': a.type, name: a.name })) : AREA_SERVED,
        ...(audience ? { audience: { '@type': 'BusinessAudience', name: audience } } : {}),
    };
}

export function articleSchema(post: Post, path: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${abs(path)}#article`,
        headline: post.h1,
        description: post.description,
        image: [`${SITE_URL}/og.png`],
        datePublished: post.published,
        dateModified: post.updated,
        inLanguage: 'en-IN',
        articleSection: post.category,
        keywords: [post.primaryKeyword, ...post.keywords].join(', '),
        author:
            post.author === BUSINESS.name || post.author.startsWith('Sneeze Media')
                ? { '@type': 'Organization', name: post.author, url: SITE_URL }
                : { '@type': 'Person', name: post.author },
        publisher: { '@id': ORG_ID },
        mainEntityOfPage: { '@type': 'WebPage', '@id': abs(path) },
    };
}

export function webPageSchema(type: string, name: string, description: string, path: string) {
    return {
        '@context': 'https://schema.org',
        '@type': type,
        '@id': `${abs(path)}#webpage`,
        name,
        description,
        url: abs(path),
        inLanguage: 'en-IN',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORG_ID },
    };
}

export function locationArea(page: LocationPage) {
    return [{ type: page.placeType, name: page.place }];
}
