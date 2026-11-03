import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif, Oswald } from 'next/font/google';
import './globals.css';
import SmoothScroll from '../components/SmoothScroll';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';

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
    title: 'Sneeze Media | Full-Stack Digital Agency',
    description:
        'Sneeze Media is an AI-first creative studio: AI-generated visuals, social, editorial photography, performance ads, UGC and high-performance websites.',
    openGraph: {
        title: 'Sneeze Media | Full-Stack Digital Agency',
        description: 'We make brands impossible to scroll past.',
        type: 'website',
    },
};

export const viewport: Viewport = {
    themeColor: '#0b0a08',
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${oswald.variable} ${inter.variable} ${serif.variable}`}>
            <body>
                <SmoothScroll>
                    <Header />
                    {children}
                    <Footer />
                </SmoothScroll>
                <Cursor />
                <div className="grain" aria-hidden="true" />
            </body>
        </html>
    );
}
