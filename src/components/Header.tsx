'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaPhone, FaWhatsapp } from 'react-icons/fa';
import Button from './ui/Button';
import { CONTACTS } from '../constants';

/**
 * Fixed header that hides while you scroll down and comes back when you
 * scroll up. It toggles CSS classes from the Lenis scroll callback, so
 * scrolling never re-renders React.
 */
export default function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState<null | 'call' | 'chat'>(null);
    const pathname = usePathname();
    const router = useRouter();

    const lenis = useLenis(({ scroll, direction }) => {
        const el = headerRef.current;
        if (!el) return;
        el.classList.toggle('is-scrolled', scroll > 40);
        el.classList.toggle('is-hidden', scroll > 240 && direction === 1);
    });

    // Close dropdowns on outside click / escape
    useEffect(() => {
        if (!open) return;
        const onDown = (e: PointerEvent) => {
            if (actionsRef.current && !actionsRef.current.contains(e.target as Node)) setOpen(null);
        };
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
        document.addEventListener('pointerdown', onDown);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('pointerdown', onDown);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);

    const goTo = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        if (pathname === '/' && lenis) {
            lenis.scrollTo(`#${id}`, { offset: -40, duration: 1.6 });
        } else {
            router.push(`/#${id}`);
        }
    };

    return (
        <header ref={headerRef} className="site-header">
            <div className="wrap site-header__inner">
                <Link href="/" className="logo" aria-label="Sneeze Media, home">
                    Sneeze<span className="logo__dot">.</span>
                </Link>

                <nav className="nav" aria-label="Main">
                    <Link href="/#services" onClick={goTo('services')}>Services</Link>
                    <Link href="/#process" onClick={goTo('process')}>Process</Link>
                    <Link href="/#arsenal" onClick={goTo('arsenal')}>Arsenal</Link>
                    <Link href="/project">Contact</Link>
                </nav>

                <div ref={actionsRef} className="header-actions">
                    <div style={{ position: 'relative' }}>
                        <button
                            type="button"
                            className="pill"
                            aria-expanded={open === 'call'}
                            aria-haspopup="true"
                            onClick={() => setOpen(open === 'call' ? null : 'call')}
                        >
                            <FaPhone />
                            <span className="pill__label">Call</span>
                            <FaChevronDown className="pill__chev" />
                        </button>
                        <div className={`dropdown ${open === 'call' ? 'is-open' : ''}`}>
                            {CONTACTS.map((c, i) => (
                                <div key={c.number}>
                                    {i > 0 && <hr />}
                                    <a href={`tel:+${c.number.replace(/\D/g, '')}`}>
                                        <small>{c.label} line</small>
                                        <strong>
                                            <FaPhone /> {c.number}
                                        </strong>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <button
                            type="button"
                            className="pill"
                            aria-expanded={open === 'chat'}
                            aria-haspopup="true"
                            onClick={() => setOpen(open === 'chat' ? null : 'chat')}
                        >
                            <FaWhatsapp />
                            <span className="pill__label">Chat</span>
                            <FaChevronDown className="pill__chev" />
                        </button>
                        <div className={`dropdown ${open === 'chat' ? 'is-open' : ''}`}>
                            {CONTACTS.map((c, i) => (
                                <div key={c.number}>
                                    {i > 0 && <hr />}
                                    <a href={`https://wa.me/${c.number.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                                        <small>{c.label} WhatsApp</small>
                                        <strong>
                                            <FaWhatsapp /> {c.number}
                                        </strong>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button href="/project" variant="solid" className="header-cta">
                        Let&apos;s Talk
                    </Button>
                </div>
            </div>
        </header>
    );
}
