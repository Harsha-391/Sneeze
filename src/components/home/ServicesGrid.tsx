'use client';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { SERVICES_DATA, Service } from '@/constants';
import { useMediaQuery, usePauseOffscreen, useReveal } from '@/lib/motion';

function ServiceCard({ s, index }: { s: Service; index: number }) {
    const ref = useReveal<HTMLAnchorElement>();
    const sceneRef = usePauseOffscreen<HTMLDivElement>();
    return (
        <Link
            ref={ref}
            href={s.href}
            className="card"
            data-cursor="view"
            data-cursor-label="Explore"
            aria-label={`${s.title}: ${s.desc}`}
        >
            <div className="card__media rv-scale" style={{ '--ar': s.ratio } as React.CSSProperties}>
                <div ref={sceneRef} className="card__scene" aria-hidden="true">
                    <div
                        className="card__glow loop"
                        style={{ '--c1': s.glow, '--gx': s.glowAt[0], '--gy': s.glowAt[1] } as React.CSSProperties}
                    />
                    <div className="card__gridlines" />
                    <div className="card__ring loop" style={{ '--s': '78%', '--t': '40s' } as React.CSSProperties} />
                    <div className="card__ring loop" style={{ '--s': '56%', '--t': '26s', animationDirection: 'reverse' } as React.CSSProperties} />
                    <div className="card__icon">{s.iconMain}</div>
                </div>
                <span className="card__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="card__chip">{s.tags[0]}</span>
            </div>
            <div className="card__meta rv-fade" style={{ '--d': '150ms' } as React.CSSProperties}>
                <div>
                    <h3 className="card__title serif">{s.title}</h3>
                    <p className="card__desc">{s.desc}</p>
                </div>
                <div className="card__tags">
                    {s.tags.map((t) => (
                        <span key={t}>{t}</span>
                    ))}
                </div>
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
