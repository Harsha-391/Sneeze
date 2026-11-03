'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Button, { Arrow } from '../ui/Button';
import Faq from '../Faq';
import { SERVICE_PAGES, type Line, type ServiceContent } from '@/content/services';
import { usePageReady, useReveal } from '@/lib/motion';

/** Ref that gets `is-in` once the page curtain has lifted (or right away on a fresh load). */
export function useEnterReveal<T extends HTMLElement>() {
    const ready = usePageReady();
    const ref = useRef<T>(null);
    useEffect(() => {
        if (ready) ref.current?.classList.add('is-in');
    }, [ready]);
    return ref;
}

export function getPage(slug: string) {
    const i = SERVICE_PAGES.findIndex((p) => p.slug === slug);
    return { s: SERVICE_PAGES[i], next: SERVICE_PAGES[(i + 1) % SERVICE_PAGES.length], index: i };
}

/** Heading text with gold italic / struck / ember words. */
export function LineText({ line }: { line: Line }) {
    return (
        <>
            {line.text}
            {line.strike && <span className="strike">{line.strike}</span>}
            {line.ember && <span className="ember">{line.ember}</span>}
            {line.em && <em>{line.em}</em>}
            {line.after}
        </>
    );
}

/** Masked line-by-line reveal. Trailing spaces keep the text readable for crawlers. */
export function Lines({ lines, delay = 0 }: { lines: Line[]; delay?: number }) {
    return (
        <>
            {lines.map((l, i) => (
                <span key={i} className="rv-line" style={{ '--i': i, '--d': `${delay}ms` } as React.CSSProperties}>
                    <span>
                        <LineText line={l} />{' '}
                    </span>
                </span>
            ))}
        </>
    );
}

export function Crumbs({ title }: { title: string }) {
    return (
        <nav className="crumbs rv-fade" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <i>/</i>
            <Link href="/#services">Services</Link>
            <i>/</i>
            <span aria-current="page">{title}</span>
        </nav>
    );
}

/** The page's Jaipur keyword, inside the H1 as quiet small text. */
export function Kicker({ text, delay = 0 }: { text: string; delay?: number }) {
    return (
        <>
            <span className="kicker rv-fade" style={{ '--d': `${delay}ms` } as React.CSSProperties}>
                {text}
            </span>
            <span className="sr-only">: </span>
        </>
    );
}

export function ServiceFaq({ s }: { s: ServiceContent }) {
    return (
        <Faq
            id="faq"
            eyebrow={`FAQ · ${s.seo.kicker}`}
            title={
                <>
                    Good <em>questions.</em>
                </>
            }
            items={s.seo.faq}
        />
    );
}

/** Closing statement + call to action. */
export function ServiceEnd({ s }: { s: ServiceContent }) {
    const ref = useReveal<HTMLElement>();
    return (
        <section ref={ref} className="send" aria-labelledby="send-title">
            <div className="wrap send__grid">
                <h2 id="send-title" className="send__title serif">
                    <Lines lines={s.promise.title} />
                </h2>
                <div className="send__side">
                    <p className="send__text rv-fade" style={{ '--d': '200ms' } as React.CSSProperties}>
                        {s.promise.text}
                    </p>
                    <div className="rv-fade" style={{ '--d': '320ms' } as React.CSSProperties}>
                        <Button href={`/project?service=${s.slug}`} variant="solid">
                            {s.cta}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function NextService({ next }: { next: ServiceContent }) {
    const ref = useReveal<HTMLAnchorElement>();
    return (
        <Link ref={ref} href={next.href} className="next-svc" data-cursor="view" data-cursor-label="Next">
            <div className="wrap next-svc__inner">
                <div>
                    <span className="eyebrow rv-fade">Next service · {next.index}</span>
                    <span className="next-svc__title serif rv-line">
                        <span>{next.title}</span>
                    </span>
                </div>
                <span className="next-svc__arrow rv-scale">
                    <Arrow />
                </span>
            </div>
        </Link>
    );
}

/** Section heading block used inside pages (eyebrow + title). */
export function Head({ eyebrow, title, id, className = '' }: { eyebrow: string; title: Line | Line[]; id?: string; className?: string }) {
    const lines = Array.isArray(title) ? title : [title];
    return (
        <div className={className}>
            <p className="eyebrow rv-fade">{eyebrow}</p>
            <h2 id={id} className="serif h-l" style={{ marginTop: 16 }}>
                <Lines lines={lines} />
            </h2>
        </div>
    );
}
