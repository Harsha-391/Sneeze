'use client';
import { useEffect, useRef } from 'react';
import { STATS } from '@/constants';
import { usePauseOffscreen, useReveal } from '@/lib/motion';

/**
 * Infinite stat ticker. The track holds two copies and slides -50% on a CSS
 * loop, so it wraps seamlessly on the compositor. Numbers count up once on
 * first view (textContent writes, no re-render).
 */
export default function StatsStrip() {
    const sectionRef = useReveal<HTMLElement>();
    const frameRef = usePauseOffscreen<HTMLDivElement>();
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;
        const nums = Array.from(track.querySelectorAll<HTMLElement>('[data-count]'));
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let raf = 0;

        const run = () => {
            const start = performance.now();
            const dur = 1800;
            const tick = (now: number) => {
                const t = Math.min(1, (now - start) / dur);
                const e = 1 - Math.pow(1 - t, 4);
                for (const n of nums) {
                    const target = Number(n.dataset.count);
                    n.textContent = `${n.dataset.prefix ?? ''}${target ? Math.round(target * e) : ''}${n.dataset.suffix ?? ''}`;
                }
                if (t < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
        };

        if (reduced) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    run();
                    io.disconnect();
                }
            },
            { rootMargin: '0px 0px -15% 0px' }
        );
        io.observe(section);
        return () => {
            io.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [sectionRef]);

    const items = [...STATS, ...STATS];

    return (
        <section ref={sectionRef} className="stats" aria-label="Sneeze in numbers">
            <div className="wrap">
                <div ref={frameRef} className="stats__frame rv-fade">
                    <div ref={trackRef} className="stats__track loop">
                        {items.map((s, i) => (
                            <article key={i} className="stat" aria-hidden={i >= STATS.length ? true : undefined}>
                                <div className="stat__head">
                                    {s.icon}
                                    <span>{s.label}</span>
                                </div>
                                <div className="stat__body">
                                    <p
                                        className="stat__num serif"
                                        data-count={s.value}
                                        data-prefix={s.prefix}
                                        data-suffix={s.suffix}
                                    >
                                        {s.prefix}
                                        {s.value || ''}
                                        {s.suffix}
                                    </p>
                                    <p className="stat__label">{s.text}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
