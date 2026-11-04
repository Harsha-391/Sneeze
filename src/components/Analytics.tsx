'use client';
import Script from 'next/script';
import { useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type Gtag = (...args: unknown[]) => void;

/**
 * Google Analytics 4, only when NEXT_PUBLIC_GA_ID is set (Vercel → Project →
 * Settings → Environment Variables). Loads after the page is interactive,
 * so it never competes with the first paint. Sends lead events for:
 *   - tap/click on a tel: link          → generate_lead { method: 'phone' }
 *   - tap/click on a wa.me link         → generate_lead { method: 'whatsapp' }
 *   - submitting any form on the site   → generate_lead { method: 'form' }
 * Mark these as key events in GA4 to see them as conversions.
 */
export default function Analytics() {
    useEffect(() => {
        if (!GA_ID) return;
        const send = (method: string, label: string) => {
            const gtag = (window as unknown as { gtag?: Gtag }).gtag;
            gtag?.('event', 'generate_lead', { method, link_text: label.slice(0, 80), page_path: location.pathname });
        };
        const onClick = (e: MouseEvent) => {
            const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
            if (!a) return;
            if (a.href.startsWith('tel:')) send('phone', a.textContent || a.href);
            else if (a.href.includes('wa.me/')) send('whatsapp', a.textContent || 'WhatsApp');
        };
        const onSubmit = (e: SubmitEvent) => send('form', (e.target as HTMLFormElement).className || 'form');
        document.addEventListener('click', onClick, { capture: true });
        document.addEventListener('submit', onSubmit, { capture: true });
        return () => {
            document.removeEventListener('click', onClick, { capture: true });
            document.removeEventListener('submit', onSubmit, { capture: true });
        };
    }, []);

    if (!GA_ID) return null;
    return (
        <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
                {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
        </>
    );
}
