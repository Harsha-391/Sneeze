'use client';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { SERVICES_DATA, Service } from '@/constants';
import { useMediaQuery, useReveal } from '@/lib/motion';
import { Arrow } from '../ui/Button';

/** Typographic plate per service: a line of copy on a flat tone, no ornament. */
const PLATES: Record<string, { line: [string, string]; tone: string; ink: string }> = {
    '/services/ai-content-creation-jaipur': { line: ['Imagination,', 'generated.'], tone: '#efe8d8', ink: '#0b0a08' },
    '/services/social-media-marketing-jaipur': { line: ['Followers into', 'fanatics.'], tone: '#2a1d14', ink: '#f4efe3' },
    '/services/product-photography-jaipur': { line: ['Silence', 'the noise.'], tone: '#1c1913', ink: '#f4efe3' },
    '/services/performance-marketing-jaipur': { line: ['Creative that', 'converts.'], tone: '#d4af37', ink: '#0b0a08' },
    '/services/ugc-video-production-jaipur': { line: ['Real people.', 'Real trust.'], tone: '#e4d5b7', ink: '#0b0a08' },
    '/services/website-design-development-jaipur': { line: ['Fast. Findable.', 'Yours.'], tone: '#141210', ink: '#f4efe3' },
};

function ServiceCard({ s, index }: { s: Service; index: number }) {
    const ref = useReveal<HTMLAnchorElement>();
    const plate = PLATES[s.href];
    return (
        <Link
            ref={ref}
            href={s.href}
            className="card"
            data-cursor="view"
            data-cursor-label="Explore"
            aria-label={`${s.title}: ${s.desc}`}
        >
            <div
                className="card__plate rv-scale"
                style={{ '--ar': s.ratio, '--tone': plate.tone, '--ink': plate.ink } as React.CSSProperties}
                aria-hidden="true"
            >
                <span className="card__num">{String(index + 1).padStart(2, '0')}</span>
                <span className="card__line serif">
                    {plate.line[0]}
                    <br />
                    <em>{plate.line[1]}</em>
                </span>
                <span className="card__go">
                    <Arrow />
                </span>
            </div>
            <div className="card__meta rv-fade" style={{ '--d': '150ms' } as React.CSSProperties}>
                <h3 className="card__title serif">{s.title}</h3>
                <p className="card__desc">{s.desc}</p>
                <p className="card__tags">{s.tags.join(' · ')}</p>
            </div>
        </Link>
    );
}

function Column({ items, progress, speed }: { items: { s: Service; i: number }[]; progress: MotionValue<number>; speed: number }) {
    // Each column drifts at its own speed for a layered parallax.
    const y = useTransform(progress, [0, 1], [speed * 70, -speed * 70]);
    return (
        <motion.div className="services__col" style={{ y }}>
            {items.map(({ s, i }) => (
                <ServiceCard key={s.href} s={s} index={i} />
            ))}
        </motion.div>
    );
}

export default function ServicesGrid() {
    const headRef = useReveal<HTMLDivElement>();
    const gridRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: gridRef, offset: ['start end', 'end start'] });
    // Parallax only when the three columns sit side by side.
    const wide = useMediaQuery('(min-width: 1100px)');

    // Spread services across 3 columns (CSS collapses them on small screens).
    const cols: { s: Service; i: number }[][] = [[], [], []];
    SERVICES_DATA.forEach((s, i) => cols[i % 3].push({ s, i }));

    return (
        <section id="services" className="services" aria-labelledby="services-title">
            <div className="wrap">
                <div ref={headRef} className="section-head">
                    <div>
                        <p className="eyebrow rv-fade">Capabilities</p>
                        <h2 id="services-title" className="serif h-l" style={{ marginTop: 18 }}>
                            <span className="rv-line">
                                <span>Six ways we{' '}</span>
                            </span>
                            <span className="rv-line" style={{ '--i': 1 } as React.CSSProperties}>
                                <span>
                                    make <em>noise.</em>
                                </span>
                            </span>
                        </h2>
                    </div>
                    <p className="rv-fade" style={{ '--d': '200ms' } as React.CSSProperties}>
                        Pick one weapon or deploy the full arsenal. Every service plugs into the same strategy, so your brand
                        hits with one voice.
                    </p>
                </div>

                <div ref={gridRef} className="services__grid">
                    {cols.map((items, c) => (
                        <Column key={c} items={items} progress={scrollYProgress} speed={wide ? [0.3, -0.6, 0.9][c] : 0} />
                    ))}
                </div>
            </div>
        </section>
    );
}
