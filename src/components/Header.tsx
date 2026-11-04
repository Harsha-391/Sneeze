'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaPhone, FaWhatsapp } from 'react-icons/fa';
import Button from './ui/Button';
import { pageTransition } from '@/lib/motion';
import { CONTACTS } from '../constants';
import { COMBOS, COMPANY, HUBS, INDUSTRIES, LOCATIONS, PILLAR, RESOURCES, SERVICES, STUDIO, type RouteLink } from '@/content/routes';

type Group = { key: string; label: string; href: string; columns: { title: string; links: RouteLink[] }[] };

/** Mega-menu content. Every link is a real <a href> in the server HTML. */
const GROUPS: Group[] = [
    {
        key: 'services',
        label: 'Services',
        href: HUBS.services.href,
        columns: [
            { title: 'Growth', links: [PILLAR, ...SERVICES.slice(0, 4)] },
            { title: 'Brand & content', links: SERVICES.slice(4) },
            { title: 'Studio', links: [...STUDIO, { href: HUBS.services.href, label: 'All services' }] },
        ],
    },
    {
        key: 'industries',
        label: 'Industries',
        href: HUBS.industries.href,
        columns: [
            { title: 'Industries', links: INDUSTRIES.slice(0, 5) },
            { title: '', links: INDUSTRIES.slice(5) },
            { title: 'Specialist pages', links: COMBOS },
        ],
    },
    {
        key: 'locations',
        label: 'Locations',
        href: HUBS.locations.href,
        columns: [{ title: 'Where we work', links: LOCATIONS }],
    },
    {
        key: 'resources',
        label: 'Resources',
        href: HUBS.blog.href,
        columns: [
            { title: 'Learn', links: RESOURCES },
            { title: 'Company', links: COMPANY.slice(0, 3) },
        ],
    },
];

/**
 * Fixed header that hides while you scroll down and comes back when you
 * scroll up. It toggles CSS classes from the Lenis scroll callback, so
 * scrolling never re-renders React. Desktop gets hover/focus mega-menus;
 * phones get a full-screen menu.
 */
export default function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState<null | 'call' | 'chat'>(null);
    const [mega, setMega] = useState<string | null>(null);
    const [menu, setMenu] = useState(false);
    // After a menu link is clicked, keep panels shut (even under a resting
    // pointer or keyboard focus) until the pointer leaves the nav.
    const [settled, setSettled] = useState(false);
    const settledAt = useRef(0);

    /** Close every menu the moment a menu link is chosen, so it fades out as the page transition starts. */
    const chose = () => {
        settledAt.current = performance.now();
        setSettled(true);
        setMega(null);
        setMenu(false);
        (document.activeElement as HTMLElement | null)?.blur?.();
    };
    const pathname = usePathname();

    const lenis = useLenis(({ scroll, direction }) => {
        const el = headerRef.current;
        if (!el) return;
        el.classList.toggle('is-scrolled', scroll > 40);
        el.classList.toggle('is-hidden', scroll > 240 && direction === 1 && !el.matches(':focus-within'));
    });

    // Close everything on navigation.
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- reset menus when the route changes
        setMenu(false);
        setMega(null);
        setOpen(null);
    }, [pathname]);

    // The page transition intercepts link clicks before React sees them, so close
    // every menu the instant a transition starts (whatever link started it).
    useEffect(
        () =>
            pageTransition.subscribe(() => {
                if (!pageTransition.isReady()) chose();
            }),
        []
    );

    // Re-arm hover menus only when the pointer genuinely moves off the nav after
    // the page transition (the curtain passing over the header doesn't count).
    useEffect(() => {
        if (!settled) return;
        const onMove = (e: PointerEvent) => {
            if (performance.now() - settledAt.current < 1800) return;
            const nav = headerRef.current?.querySelector('.nav');
            if (nav && !nav.contains(e.target as Node)) setSettled(false);
        };
        document.addEventListener('pointermove', onMove, { passive: true });
        return () => document.removeEventListener('pointermove', onMove);
    }, [settled]);

    // The mobile menu freezes the page behind it.
    useEffect(() => {
        if (!lenis) return;
        if (menu) lenis.stop();
        else lenis.start();
    }, [menu, lenis]);

    // Close dropdowns on outside click / escape
    useEffect(() => {
        if (!open && !mega && !menu) return;
        const onDown = (e: PointerEvent) => {
            const t = e.target as Node;
            if (open && actionsRef.current && !actionsRef.current.contains(t)) setOpen(null);
            if (mega && headerRef.current && !headerRef.current.contains(t)) setMega(null);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return;
            setOpen(null);
            setMega(null);
            setMenu(false);
        };
        document.addEventListener('pointerdown', onDown);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('pointerdown', onDown);
            document.removeEventListener('keydown', onKey);
        };
    }, [open, mega, menu]);

    return (
        <header ref={headerRef} className={`site-header${menu ? ' is-menu' : ''}`}>
            <div className="wrap site-header__inner">
                <Link href="/" className="logo" aria-label="Sneeze Media, home">
                    Sneeze<span className="logo__dot">.</span>
                </Link>

                <nav className={`nav${settled ? ' is-settled' : ''}`} aria-label="Main">
                    <ul className="nav__list">
                        {GROUPS.map((g) => (
                            <li key={g.key} className={`nav__item${mega === g.key ? ' is-open' : ''}`} onMouseLeave={() => mega === g.key && setMega(null)}>
                                <Link href={g.href} className="nav__top" prefetch={false} onClick={chose}>
                                    {g.label}
                                </Link>
                                <button
                                    type="button"
                                    className="nav__toggle"
                                    aria-expanded={mega === g.key}
                                    aria-controls={`mega-${g.key}`}
                                    aria-label={`Show ${g.label} menu`}
                                    onClick={() => setMega(mega === g.key ? null : g.key)}
                                >
                                    <FaChevronDown />
                                </button>
                                <div id={`mega-${g.key}`} className={`mega mega--${g.columns.length}`}>
                                    {g.columns.map((c, i) => (
                                        <div key={i} className="mega__col">
                                            {c.title ? <p className="mega__title">{c.title}</p> : <p className="mega__title" aria-hidden="true">&nbsp;</p>}
                                            <ul>
                                                {c.links.map((l) => (
                                                    <li key={l.href}>
                                                        <Link href={l.href} className="mega__link" prefetch={false} onClick={chose}>
                                                            <span>{l.label}</span>
                                                            {l.blurb && <small>{l.blurb}</small>}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </li>
                        ))}
                        <li className="nav__item">
                            <Link href="/contact" className="nav__top" onClick={chose}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div ref={actionsRef} className="header-actions">
                    <div style={{ position: 'relative' }}>
                        <button
                            type="button"
                            className="pill"
                            aria-expanded={open === 'call'}
                            aria-haspopup="true"
                            aria-label="Call us"
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
                            aria-label="Chat on WhatsApp"
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

                    <Button href="/contact" variant="solid" className="header-cta">
                        Let&apos;s Talk
                    </Button>

                    <button
                        type="button"
                        className="menu-btn"
                        aria-expanded={menu}
                        aria-controls="mobile-menu"
                        onClick={() => setMenu((m) => !m)}
                    >
                        <span className="sr-only">{menu ? 'Close menu' : 'Open menu'}</span>
                        <span className="menu-btn__bars" aria-hidden="true">
                            <i />
                            <i />
                        </span>
                    </button>
                </div>
            </div>

            {/* Phone menu: always in the DOM (crawlable), shown with CSS. */}
            <div id="mobile-menu" className="mnav" data-lenis-prevent aria-hidden={!menu} inert={!menu}>
                <div className="wrap mnav__inner">
                    {GROUPS.map((g) => (
                        <details key={g.key} className="mnav__group">
                            <summary className="serif">{g.label}</summary>
                            <ul>
                                <li>
                                    <Link href={g.href} className="mnav__hub" prefetch={false} onClick={chose}>
                                        All {g.label.toLowerCase()}
                                    </Link>
                                </li>
                                {g.columns
                                    .flatMap((c) => c.links)
                                    .filter((l) => l.href !== g.href)
                                    .map((l) => (
                                        <li key={l.href}>
                                            <Link href={l.href} prefetch={false} onClick={chose}>
                                                {l.label}
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        </details>
                    ))}
                    <Link href="/contact" className="mnav__contact serif" prefetch={false} onClick={chose}>
                        Contact
                    </Link>
                    <div className="mnav__actions">
                        <a href={`tel:+${CONTACTS[0].number.replace(/\D/g, '')}`} className="mnav__btn">
                            <FaPhone /> Call
                        </a>
                        <a href={`https://wa.me/${CONTACTS[0].number.replace(/\D/g, '')}`} className="mnav__btn" target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp /> WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
