'use client';
import Link from 'next/link';
import { useLenis } from 'lenis/react';
import Button from './ui/Button';
import Waves from './Waves';
import { CONTACTS, SERVICES_DATA } from '../constants';
import { useReveal } from '@/lib/motion';

const WORD = ['S', 'N', 'E', 'E', 'Z', 'E', '.'];

export default function Footer() {
    const lenis = useLenis();
    const statementRef = useReveal<HTMLDivElement>();
    const wordRef = useReveal<HTMLDivElement>({ rootMargin: '0px 0px -5% 0px' });
    const gridRef = useReveal<HTMLDivElement>();

    return (
        <footer className="site-footer">
            <Waves />

            <div ref={statementRef} className="wrap">
                <h2 className="footer__statement serif lead rv-fade">
                    Sneeze Media is a full-stack creative studio where <em>AI</em>, design and performance marketing collide,
                    building brands that spread.
                </h2>
                <div className="footer__cta rv-fade" style={{ '--d': '150ms' } as React.CSSProperties}>
                    <Button href="/project" variant="solid">
                        Let&apos;s Connect
                    </Button>
                </div>
            </div>

            <div className="wrap">
                <div ref={wordRef} className="wordmark" aria-label="Sneeze.">
                    {WORD.map((l, i) => (
                        <span key={i} className={l === '.' ? 'dot' : ''} style={{ '--i': i } as React.CSSProperties} aria-hidden="true">
                            {l}
                        </span>
                    ))}
                </div>

                <div ref={gridRef} className="footer__grid">
                    <h3 className="serif rv-fade">Partnering with ambitious brands &amp; bold people.</h3>

                    <div className="footer__col rv-fade" style={{ '--i': 1 } as React.CSSProperties}>
                        <h4>Call</h4>
                        <ul>
                            {CONTACTS.map((c) => (
                                <li key={c.number}>
                                    <a className="uline" href={`tel:+${c.number.replace(/\D/g, '')}`}>
                                        {c.number}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer__col rv-fade" style={{ '--i': 2 } as React.CSSProperties}>
                        <h4>WhatsApp</h4>
                        <ul>
                            {CONTACTS.map((c) => (
                                <li key={c.number}>
                                    <a className="uline" href={`https://wa.me/${c.number.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                                        {c.label} chat
                                    </a>
                                </li>
                            ))}
                            <li>
                                <Link className="uline" href="/project">
                                    Project form
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer__col rv-fade" style={{ '--i': 3 } as React.CSSProperties}>
                        <h4>Services</h4>
                        <ul>
                            {SERVICES_DATA.map((s) => (
                                <li key={s.href}>
                                    <Link className="uline" href={s.href}>
                                        {s.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>© {new Date().getFullYear()} Sneeze Media. All rights reserved.</p>
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
