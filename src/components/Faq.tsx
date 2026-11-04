'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useReveal } from '@/lib/motion';

type Item = { q: string; a: string };

/**
 * FAQ accordion built for answer engines:
 * - every question is an <h3> phrased the way people search
 * - answers are always in the HTML (collapsed with CSS, never removed), so
 *   Google, voice assistants and AI search can read and quote them
 * - pair it with faqSchema() JSON-LD on the page
 *
 * Open/close animates `grid-template-rows` on a small element only.
 */
export default function Faq({
    id,
    eyebrow,
    title,
    items,
}: {
    id: string;
    eyebrow: string;
    title: React.ReactNode;
    items: Item[];
}) {
    const ref = useReveal<HTMLDivElement>();
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section id={id} className="faq" aria-labelledby={`${id}-title`}>
            <div ref={ref} className="wrap faq__grid">
                <div className="faq__aside">
                    <p className="eyebrow rv-fade">{eyebrow}</p>
                    <h2 id={`${id}-title`} className="serif h-l" style={{ marginTop: 18 }}>
                        <span className="rv-line">
                            <span>{title}</span>
                        </span>
                    </h2>
                    <p className="faq__note rv-fade" style={{ '--d': '200ms' } as React.CSSProperties}>
                        Can&apos;t find your answer?{' '}
                        <Link href="/contact" className="uline">
                            Ask us directly
                        </Link>
                        .
                    </p>
                </div>

                <div className="faq__list">
                    {items.map((f, i) => {
                        const isOpen = open === i;
                        const qid = `${id}-q${i}`;
                        const aid = `${id}-a${i}`;
                        return (
                            <div key={f.q} className={`faq__item rv-fade ${isOpen ? 'is-open' : ''}`} style={{ '--i': i } as React.CSSProperties}>
                                <h3 className="faq__q">
                                    <button
                                        id={qid}
                                        type="button"
                                        aria-expanded={isOpen}
                                        aria-controls={aid}
                                        onClick={() => setOpen(isOpen ? null : i)}
                                    >
                                        <span className="serif">{f.q}</span>
                                        <span className="faq__icon" aria-hidden="true" />
                                    </button>
                                </h3>
                                <div id={aid} role="region" aria-labelledby={qid} className="faq__a">
                                    <div>
                                        <p>{f.a}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
