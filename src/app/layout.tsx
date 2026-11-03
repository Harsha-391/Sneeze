import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif, Oswald } from 'next/font/google';
import './globals.css';
import './service-pages.css';
import SmoothScroll from '../components/SmoothScroll';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';
import PageTransition from '../components/PageTransition';
import JsonLd from '../components/seo/JsonLd';
import { BUSINESS, HOME_SEO, SITE_URL } from '../content/site';
import { organizationSchema } from '../content/seo';

const oswald = Oswald({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-oswald', display: 'swap' });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-inter', display: 'swap' });
const serif = Instrument_Serif({
    subsets: ['latin'],
    weight: '400',
    style: ['normal', 'italic'],
    variable: '--font-serif',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: { default: HOME_SEO.title, template: '%s | Sneeze Media' },
    description: HOME_SEO.description,
    applicationName: BUSINESS.name,
    keywords: HOME_SEO.keywords,
    category: 'Marketing agency',
    alternates: { canonical: '/' },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    },
    openGraph: {
        type: 'website',
        url: '/',
        siteName: BUSINESS.name,
        locale: 'en_IN',
        title: HOME_SEO.title,
        description: HOME_SEO.description,
        images: [{ url: '/og.png', width: 1200, height: 630, alt: `${BUSINESS.name}: ${BUSINESS.tagline}` }],
    },
    twitter: {
        card: 'summary_large_image',
        title: HOME_SEO.title,
        description: HOME_SEO.description,
        images: ['/og.png'],
    },
    other: {
        'geo.region': 'IN-RJ',
        'geo.placename': 'Jaipur',
    },
};

export const viewport: Viewport = {
    themeColor: '#0b0a08',
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en-IN" className={`${oswald.variable} ${inter.variable} ${serif.variable}`}>
            <body>
                <JsonLd data={organizationSchema()} />
                <SmoothScroll>
                    <Header />
                    {/* .page-root is what drifts during page transitions */}
                    <div className="page-root">
                        {children}
                        <Footer />
                    </div>
                    <PageTransition />
                </SmoothScroll>
                <Cursor />
                <div className="grain" aria-hidden="true" />
            </body>
        </html>
    );
}
