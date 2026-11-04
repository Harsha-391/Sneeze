'use client';
import Link from 'next/link';
import { useLenis } from 'lenis/react';
import Button from './ui/Button';
import Waves from './Waves';
import { addressLine, BUSINESS, isSet, socialLinks, telHref, waHref } from '@/config/site';
import { COMPANY, INDUSTRIES, LOCATIONS, PILLAR, RESOURCES, SERVICES, STUDIO } from '@/content/routes';
import { useReveal } from '@/lib/motion';

const WORD = ['S', 'N', 'E', 'E', 'Z', 'E', '.'];

const COLUMNS = [
    { title: 'Services', links: [PILLAR, ...SERVICES, ...STUDIO] },
    { title: 'Industries', links: INDUSTRIES },
    { title: 'Locations', links: LOCATIONS },
    { title: 'Resources', links: [...RESOURCES, ...COMPANY.slice(0, 3)] },
];

export default function Footer() {
    const lenis = useLenis();
    const statementRef = useReveal<HTMLDivElement>();
    const wordRef = useReveal<HTMLDivElement>({ rootMargin: '0px 0px -5% 0px' });
    const gridRef = useReveal<HTMLDivElement>();
    const social = socialLinks();

    return (
        <footer className="site-footer">
            <Waves />

            <div ref={statementRef} className="wrap">
                <p className="footer__statement serif lead rv-fade">
                    Sneeze Media is a full-stack creative studio in <em>Jaipur</em> where AI, design and performance marketing
                    collide, building brands that spread.
                </p>
                <div className="footer__cta rv-fade" style={{ '--d': '150ms' } as React.CSSProperties}>
                    <Button href="/contact" variant="solid">
                        Let&apos;s Connect
                    </Button>
                </div>
            </div>

            <div className="wrap">
                <div ref={wordRef} className="wordmark" aria-hidden="true">
                    {WORD.map((l, i) => (
                        <span key={i} className={l === '.' ? 'dot' : ''} style={{ '--i': i } as React.CSSProperties}>
                            {l}
                        </span>
                    ))}
                </div>

                <div ref={gridRef} className="footer__grid footer__grid--wide">
                    <div className="footer__nap rv-fade">
                        <h2 className="serif">Partnering with ambitious brands &amp; bold people.</h2>
                        <address className="footer__addr">
                            <strong>{BUSINESS.name}</strong>
                            <br />
                            {BUSINESS.tagline}
                            <br />
                            {addressLine()}
                        </address>
                        <ul className="footer__contact">
                            {BUSINESS.phones.map((p) => (
                                <li key={p}>
                                    <a className="uline" href={telHref(p)}>
                                        {p}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a className="uline" href={waHref(BUSINESS.whatsapp)} target="_blank" rel="noopener noreferrer">
                                    WhatsApp chat
                                </a>
                            </li>
                            {isSet(BUSINESS.email) && (
                                <li>
                                    <a className="uline" href={`mailto:${BUSINESS.email}`}>
                                        {BUSINESS.email}
                                    </a>
                                </li>
                            )}
                        </ul>
                        {social.length > 0 && (
                            <ul className="footer__social" aria-label="Sneeze Media on social media">
                                {social.map((s) => (
                                    <li key={s.href}>
                                        <a className="uline" href={s.href} target="_blank" rel="noopener noreferrer me">
                                            {s.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {COLUMNS.map((col, i) => (
                        <nav key={col.title} className="footer__col rv-fade" style={{ '--i': i + 1 } as React.CSSProperties} aria-label={`${col.title} links`}>
                            <h3>{col.title}</h3>
                            <ul>
                                {col.links.map((l) => (
                                    <li key={l.href}>
                                        <Link className="uline" href={l.href} prefetch={false}>
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </div>

                <div className="footer__bottom">
                    <p>
                        © {new Date().getFullYear()} Sneeze Media · Creative &amp; digital marketing agency in Jaipur ·{' '}
                        <Link href="/privacy-policy" className="uline" prefetch={false}>
                            Privacy
                        </Link>{' '}
                        ·{' '}
                        <Link href="/terms" className="uline" prefetch={false}>
                            Terms
                        </Link>
                    </p>
                    <button
                        type="button"
                        className="to-top"
                        onClick={() => (lenis ? lenis.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0, behavior: 'smooth' }))}
                    >
                        Back to top
                        <span aria-hidden="true">↑</span>
                    </button>
                </div>
            </div>
        </footer>
    );
}
