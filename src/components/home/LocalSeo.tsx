'use client';
import Link from 'next/link';
import { Arrow } from '../ui/Button';
import { addressLine, BUSINESS } from '@/config/site';
import { PILLAR, SERVICES, STUDIO } from '@/content/routes';

const ALL = [PILLAR, ...SERVICES, ...STUDIO];
import { useReveal } from '@/lib/motion';

/**
 * "Jaipur's creative agency" block: a plain-language definition (the kind of
 * sentence AI search and featured snippets quote) plus keyword-rich internal
 * links to every service page and the business's location/phone (NAP).
 */
export default function LocalSeo() {
    const ref = useReveal<HTMLElement>();
    return (
        <section ref={ref} id="jaipur" className="local" aria-labelledby="local-title">
            <div className="wrap">
                <div className="local__head">
                    <p className="eyebrow rv-fade">Based in Jaipur, Rajasthan</p>
                    <h2 id="local-title" className="serif h-l" style={{ marginTop: 18 }}>
                        <span className="rv-line">
                            <span>Jaipur&apos;s creative agency,{' '}</span>
                        </span>
                        <span className="rv-line" style={{ '--i': 1 } as React.CSSProperties}>
                            <span>
                                <em>full stack.</em>
                            </span>
                        </span>
                    </h2>
                    <p className="local__def lead serif rv-fade" style={{ '--d': '200ms' } as React.CSSProperties}>
                        Sneeze Media is a creative and digital marketing agency in Jaipur, Rajasthan. We plan, produce and run
                        SEO, websites, social media, Google and Meta ads, branding, video and content for ambitious brands,
                        pairing AI-powered production with human strategy and taste.
                    </p>
                </div>

                <ul className="local__list">
                    {ALL.map((l, i) => (
                        <li key={l.href} className="rv-fade" style={{ '--i': Math.min(i, 8) + 2 } as React.CSSProperties}>
                            <Link href={l.href} className="local__link">
                                <span className="local__label serif">{l.label}</span>
                                <small>{l.blurb}</small>
                                <span className="local__arrow" aria-hidden="true">
                                    <Arrow />
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <address className="local__nap rv-fade" style={{ '--i': 8 } as React.CSSProperties}>
                    <span>
                        {BUSINESS.name}, {addressLine()}
                    </span>
                    {BUSINESS.phones.map((p) => (
                        <a key={p} className="uline" href={`tel:+${p.replace(/\D/g, '')}`}>
                            {p}
                        </a>
                    ))}
                </address>
            </div>
        </section>
    );
}
