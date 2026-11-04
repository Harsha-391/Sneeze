import Link from 'next/link';
import type { ReactNode } from 'react';
import JsonLd from '../seo/JsonLd';
import Breadcrumbs from './Breadcrumbs';
import EndCta from './EndCta';
import LfHero from './LfHero';
import RevealScope from './RevealScope';
import { breadcrumbSchema, webPageSchema } from '@/content/seo';
import { BUSINESS, waHref } from '@/config/site';
import { SITE_URL } from '@/config/site';

export type HubItem = { href: string; label: string; summary?: string; meta?: string };
export type HubSection = { title: string; intro?: string; items: HubItem[]; layout?: 'grid' | 'list' | 'feature' };

/** Listing page for a group of pages (services, industries, locations, blog). */
export default function Hub({
    path,
    name,
    eyebrow,
    h1,
    lede,
    description,
    sections,
    after,
}: {
    path: string;
    name: string;
    eyebrow: string;
    h1: string;
    lede: string;
    description: string;
    sections: HubSection[];
    after?: ReactNode;
}) {
    const crumbs = [
        { name: 'Home', path: '/' },
        { name, path },
    ];
    const items = sections.flatMap((s) => s.items);
    return (
        <main className="lf lf--hub">
            <JsonLd
                data={[
                    {
                        ...webPageSchema('CollectionPage', h1, description, path),
                        mainEntity: {
                            '@type': 'ItemList',
                            itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.label, url: `${SITE_URL}${it.href}` })),
                        },
                    },
                    breadcrumbSchema(crumbs),
                ]}
            />
            <LfHero
                variant="page"
                crumbs={<Breadcrumbs items={crumbs.map((c) => ({ name: c.name, href: c.path }))} />}
                eyebrow={eyebrow}
                h1={h1}
                lede={lede}
                primary={{ href: '/contact', label: 'Talk to us' }}
                secondary={{ href: waHref(BUSINESS.whatsapp), label: 'WhatsApp us' }}
            />
            {sections.map((s) => (
                <section key={s.title} className={`hub hub--${s.layout ?? 'grid'}`} aria-label={s.title}>
                    <RevealScope className="wrap">
                        <div className="hub__head rvb">
                            <h2 className="serif hub__title">{s.title}</h2>
                            {s.intro && <p className="hub__intro">{s.intro}</p>}
                        </div>
                        <ul className="hub__items">
                            {s.items.map((it, i) => (
                                <li key={it.href} className="rvb" style={{ '--i': i % 6 } as React.CSSProperties}>
                                    <Link href={it.href} className="hub__card" prefetch={false}>
                                        <span className="hub__n" aria-hidden="true">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className="hub__label serif">{it.label}</span>
                                        {it.summary && <span className="hub__summary">{it.summary}</span>}
                                        {it.meta && <span className="hub__meta">{it.meta}</span>}
                                        <span className="hub__go" aria-hidden="true">
                                            →
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </RevealScope>
                </section>
            ))}
            {after}
            <EndCta
                title="Not sure where to start?"
                text="Tell us about your business and what you want more of. We will point you to the two or three things that will move the needle first."
                href="/contact"
                label="Book a strategy call"
                whatsappHref={waHref(BUSINESS.whatsapp)}
            />
        </main>
    );
}
