import type { Metadata } from 'next';
import { BUSINESS, SITE_URL, type Faq } from './site';
import { SERVICE_PAGES, type ServiceContent } from './services';

/* ------------------------------------------------------------------ */
/* Metadata                                                           */
/* ------------------------------------------------------------------ */

type PageMetaInput = {
    /** Page title without the " | Sneeze Media" suffix (the layout template adds it) */
    title: string;
    description: string;
    path: string;
    keywords?: string[];
    /** Use the title exactly as given (home page) */
    absoluteTitle?: boolean;
};

export function pageMetadata({ title, description, path, keywords, absoluteTitle }: PageMetaInput): Metadata {
    const fullTitle = absoluteTitle ? title : `${title} | ${BUSINESS.name}`;
    return {
        title: absoluteTitle ? { absolute: title } : title,
        description,
        keywords,
        alternates: { canonical: path },
        openGraph: {
            type: 'website',
            url: path,
            siteName: BUSINESS.name,
            locale: 'en_IN',
            title: fullTitle,
            description,
            images: [{ url: '/og.png', width: 1200, height: 630, alt: `${BUSINESS.name}: ${BUSINESS.tagline}` }],
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: ['/og.png'],
        },
    };
}

export function serviceMetadata(slug: string): Metadata {
    const s = SERVICE_PAGES.find((p) => p.slug === slug)!;
    return pageMetadata({ title: s.seo.title, description: s.seo.description, path: s.href, keywords: s.seo.keywords });
}

/* ------------------------------------------------------------------ */
/* JSON-LD (schema.org)                                               */
/* ------------------------------------------------------------------ */

const ORG_ID = `${SITE_URL}/#organization`;

function postalAddress() {
    const a = BUSINESS.address;
    return {
        '@type': 'PostalAddress',
        ...(a.streetAddress ? { streetAddress: a.streetAddress } : {}),
        addressLocality: a.locality,
        addressRegion: a.region,
        ...(a.postalCode ? { postalCode: a.postalCode } : {}),
        addressCountry: a.country,
    };
}

const areaServed = [
    { '@type': 'City', name: 'Jaipur' },
    { '@type': 'State', name: 'Rajasthan' },
    { '@type': 'Country', name: 'India' },
];

/** Site-wide: the business entity (LocalBusiness subtype) + the website. */
export function organizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': ['Organization', 'ProfessionalService'],
                '@id': ORG_ID,
                name: BUSINESS.name,
                url: SITE_URL,
                logo: { '@type': 'ImageObject', url: BUSINESS.logo, width: 512, height: 512 },
                image: BUSINESS.image,
                description: BUSINESS.description,
                slogan: 'We make brands impossible to scroll past.',
                telephone: BUSINESS.phones[0],
                ...(BUSINESS.email ? { email: BUSINESS.email } : {}),
                address: postalAddress(),
                areaServed,
                contactPoint: BUSINESS.phones.map((tel) => ({
                    '@type': 'ContactPoint',
                    telephone: tel,
                    contactType: 'sales',
                    areaServed: 'IN',
                    availableLanguage: ['English', 'Hindi'],
                })),
                knowsAbout: [
                    'Creative agency services',
                    'Digital marketing',
                    'Web design and development',
                    'Search engine optimisation',
                    'Social media marketing',
                    'Performance marketing',
                    'Product photography',
                    'AI-generated content',
                    'UGC video production',
                    'Branding',
                ],
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Creative & digital marketing services in Jaipur',
                    itemListElement: SERVICE_PAGES.map((s) => ({
                        '@type': 'Offer',
                        itemOffered: { '@type': 'Service', name: s.seo.kicker, url: `${SITE_URL}${s.href}` },
                    })),
                },
                ...(BUSINESS.sameAs.length ? { sameAs: BUSINESS.sameAs } : {}),
            },
            {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                url: SITE_URL,
                name: BUSINESS.name,
                description: BUSINESS.tagline,
                inLanguage: 'en-IN',
                publisher: { '@id': ORG_ID },
            },
        ],
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
            item: `${SITE_URL}${it.path}`,
        })),
    };
}

export function serviceSchemas(slug: string) {
    const s = SERVICE_PAGES.find((p) => p.slug === slug) as ServiceContent;
    return [
        {
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': `${SITE_URL}${s.href}#service`,
            name: s.seo.kicker,
            serviceType: s.title,
            description: s.seo.description,
            url: `${SITE_URL}${s.href}`,
            provider: { '@id': ORG_ID },
            areaServed,
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: `${s.title} deliverables`,
                itemListElement: s.promise.chips.map((c) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: c } })),
            },
        },
        breadcrumbSchema([
            { name: 'Home', path: '' },
            { name: 'Services', path: '/#services' },
            { name: s.title, path: s.href },
        ]),
        faqSchema(s.seo.faq),
    ];
}
