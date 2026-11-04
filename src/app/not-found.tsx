import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { HUBS, PILLAR, POSTS, SERVICES } from '@/content/routes';

export const metadata: Metadata = {
    title: 'Page not found',
    description: 'This page has moved or never existed. Find our services, industries, locations and guides from here.',
    robots: { index: false, follow: true },
};

/** Branded 404 with a way back into the site. */
export default function NotFound() {
    return (
        <main className="nf">
            <div className="wrap nf__inner">
                <p className="eyebrow">Error 404</p>
                <h1 className="serif nf__title">
                    This page sneezed <em>and vanished.</em>
                </h1>
                <p className="nf__lede">The link may be old or mistyped. Here are the places most people are looking for.</p>
                <div className="nf__actions">
                    <Button href="/" variant="solid">
                        Back to home
                    </Button>
                    <Button href="/contact">Contact us</Button>
                </div>
                <div className="nf__grid">
                    <nav aria-label="Popular pages">
                        <h2 className="eyebrow">Popular</h2>
                        <ul>
                            <li>
                                <Link prefetch={false} href={PILLAR.href}>{PILLAR.label}</Link>
                            </li>
                            {SERVICES.slice(0, 5).map((s) => (
                                <li key={s.href}>
                                    <Link prefetch={false} href={s.href}>{s.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <nav aria-label="Browse">
                        <h2 className="eyebrow">Browse</h2>
                        <ul>
                            {Object.values(HUBS).map((h) => (
                                <li key={h.href}>
                                    <Link prefetch={false} href={h.href}>{h.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <nav aria-label="Guides">
                        <h2 className="eyebrow">Guides</h2>
                        <ul>
                            {POSTS.slice(0, 4).map((p) => (
                                <li key={p.href}>
                                    <Link prefetch={false} href={p.href}>{p.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </main>
    );
}
