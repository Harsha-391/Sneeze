'use client';
import { useEffect, useRef } from 'react';
import { DECRYPT } from '@/constants';
import { useReveal } from '@/lib/motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*';

/**
 * "Decryption" rows: the target word scrambles into place. It writes
 * textContent inside rAF, throttled to ~30 updates a second, with no React state.
 */
function Row({ from, to, delay }: { from: string; to: string; delay: number }) {
    const rowRef = useReveal<HTMLDivElement>();
    const outRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const row = rowRef.current;
        const out = outRef.current;
        if (!row || !out) return;
        const target = to.toUpperCase();
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            out.textContent = target;
            return;
        }
        out.textContent = '/'.repeat(target.length);
        let raf = 0;
        let timer = 0;

        const play = () => {
            const start = performance.now();
            let last = 0;
            const dur = 1100;
            const tick = (now: number) => {
                const t = (now - start) / dur;
                if (now - last > 33) {
                    last = now;
                    const settled = Math.floor(t * target.length);
                    let s = '';
                    for (let i = 0; i < target.length; i++) {
                        s += i < settled ? target[i] : CHARS[(Math.random() * CHARS.length) | 0];
                    }
                    out.textContent = s;
                }
                if (t < 1) raf = requestAnimationFrame(tick);
                else out.textContent = target;
            };
            raf = requestAnimationFrame(tick);
        };

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    timer = window.setTimeout(play, delay + 400);
                    io.disconnect();
                }
            },
            { rootMargin: '0px 0px -20% 0px' }
        );
        io.observe(row);
        return () => {
            io.disconnect();
            cancelAnimationFrame(raf);
            window.clearTimeout(timer);
        };
    }, [rowRef, to, delay]);

    return (
        <div ref={rowRef} className="decrypt__row">
            <span className="decrypt__from">{from}</span>
            <span className="decrypt__line" style={{ '--d': `${delay}ms` } as React.CSSProperties} />
            <span className="decrypt__to" aria-label={to}>
                <span ref={outRef} aria-hidden="true">
                    {to.toUpperCase()}
                </span>
            </span>
        </div>
    );
}

export default function Decrypt() {
    const headRef = useReveal<HTMLDivElement>();
    return (
        <section className="decrypt" aria-labelledby="decrypt-title">
            <div className="wrap">
                <div ref={headRef} className="section-head" style={{ justifyContent: 'center', textAlign: 'center' }}>
                    <div>
                        <p className="eyebrow rv-fade">Social dominance</p>
                        <h2 id="decrypt-title" className="serif h-l" style={{ marginTop: 18 }}>
                            <span className="rv-line">
                                <span>
                                    From <em>noise</em> to signal.
                                </span>
                            </span>
                        </h2>
                    </div>
                </div>
                <div className="decrypt__rows">
                    {DECRYPT.map((r, i) => (
                        <Row key={r.to} from={r.from} to={r.to} delay={i * 180} />
                    ))}
                </div>
            </div>
        </section>
    );
}
