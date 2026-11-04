/**
 * Single source of truth for business details and the site URL.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │ OWNER: replace every value that starts with `TODO_`.                      │
 * │ Anything still `TODO_…` is automatically left out of the page, the       │
 * │ footer and the JSON-LD, and `npm run seo:check` lists it as a warning.  │
 * │ The full list is in CONTENT_TODOS.md.                                    │
 * └──────────────────────────────────────────────────────────────────────────┘
 */

/**
 * Canonical origin, with no trailing slash. It is resolved in next.config.ts
 * (NEXT_PUBLIC_SITE_URL → Vercel production domain → fallback) and inlined at
 * build time, so server and client always agree.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sneeze.media').replace(/\/+$/, '');

/** True when a config value is real (not empty and not a TODO_ placeholder). */
export function isSet(v: string | undefined | null): v is string {
    return !!v && !v.startsWith('TODO_');
}

export const BUSINESS = {
    name: 'Sneeze Media',
    legalName: 'TODO_LEGAL_ENTITY_NAME',
    url: SITE_URL,
    tagline: 'Creative & digital marketing agency in Jaipur',
    description:
        'Sneeze Media is a creative and digital marketing agency in Jaipur, Rajasthan. We plan, make and run SEO, websites, social media, Google and Meta ads, branding, video and content for businesses across India.',
    /** E.164-ish display format; first one is the main line. */
    phones: ['+91 9929103969', '+91 9549791480'],
    whatsapp: '+91 9929103969',
    email: 'TODO_EMAIL',
    address: {
        streetAddress: 'TODO_STREET_ADDRESS',
        locality: 'Jaipur',
        region: 'Rajasthan',
        postalCode: 'TODO_PIN_CODE',
        country: 'IN',
        countryName: 'India',
    },
    /** Decimal degrees, e.g. '26.9124'. */
    geo: { lat: 'TODO_LATITUDE', lng: 'TODO_LONGITUDE' },
    /** e.g. 'Mo-Sa 10:00-19:00' (schema.org openingHours format). */
    openingHours: 'TODO_OPENING_HOURS',
    /** Google Maps "Embed a map" iframe src for the contact page. */
    mapEmbedUrl: 'TODO_GOOGLE_MAPS_EMBED_URL',
    /** Year the agency started, e.g. '2025'. Shown on About and in schema. */
    foundingYear: 'TODO_FOUNDING_YEAR',
    social: {
        googleBusinessProfile: 'TODO_GOOGLE_BUSINESS_PROFILE_URL',
        instagram: 'TODO_INSTAGRAM_URL',
        linkedin: 'TODO_LINKEDIN_URL',
        facebook: 'TODO_FACEBOOK_URL',
        youtube: 'TODO_YOUTUBE_URL',
        x: 'TODO_X_URL',
    },
    areaServed: ['Jaipur', 'Rajasthan', 'Delhi NCR', 'Mumbai', 'India'],
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og.png`,
    languages: ['English', 'Hindi'],
};

/** Social profile URLs that are filled in (for `sameAs` and the footer). */
export function socialLinks() {
    const labels: Record<keyof typeof BUSINESS.social, string> = {
        googleBusinessProfile: 'Google Business Profile',
        instagram: 'Instagram',
        linkedin: 'LinkedIn',
        facebook: 'Facebook',
        youtube: 'YouTube',
        x: 'X (Twitter)',
    };
    return (Object.keys(BUSINESS.social) as (keyof typeof BUSINESS.social)[])
        .filter((k) => isSet(BUSINESS.social[k]))
        .map((k) => ({ label: labels[k], href: BUSINESS.social[k] }));
}

/** Human-readable postal address made of the parts that are filled in. */
export function addressLine() {
    const a = BUSINESS.address;
    return [a.streetAddress, a.locality, a.region, a.postalCode, a.countryName].filter(isSet).join(', ');
}

export const telHref = (n: string) => `tel:+${n.replace(/\D/g, '')}`;
export const waHref = (n: string, text?: string) =>
    `https://wa.me/${n.replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

/** Web3Forms endpoint + public access key (safe to ship: it can only email the owner's inbox). */
export const FORM_ENDPOINT = 'https://api.web3forms.com/submit';
export const FORM_ACCESS_KEY = 'cc43b0dc-0e85-4c41-95a4-7c64e1378e8f';
