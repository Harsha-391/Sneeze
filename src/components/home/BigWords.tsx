'use client';
import { useEffect, useRef, useState } from 'react';
import Button from '../ui/Button';
import { BIG_WORDS } from '@/constants';
import { useReveal } from '@/lib/motion';

/**
 * Giant service words. On hover the letters roll to cream one after another,
 * and a small card trails the cursor listing what's inside. The card uses a
 * lerped transform in an rAF loop that only runs while you hover.
 */
export default function BigWords() {
    const ref = useReveal<HTMLElement>();
    const peekRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<number | null>(null);

    useEffect(() => {
        const peek = peekRef.current;
        if (!peek || active === null) return;
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        let tx = lastPointer.x;
        let ty = lastPointer.y;
        let x = tx;
        let y = ty;
        let raf = 0;
        const onMove = (e: PointerEvent) => {
            tx = e.clientX;
            ty = e.clientY;
        };
        const tick = () => {
            x += (tx - x) * 0.14;
            y += (ty - y) * 0.14;
            const rot = Math.max(-8, Math.min(8, (tx - x) * 0.08));
            peek.style.transform = `translate3d(${x + 28}px, ${y + 20}px, 0) rotate(${rot}deg)`;
            raf = requestAnimationFrame(tick);
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        raf = requestAnimationFrame(tick);
        return () => {
            window.removeEventListener('pointermove', onMove);
            cancelAnimationFrame(raf);
        };
    }, [active]);

    const item = active !== null ? BIG_WORDS[active] : null;

    return (
        <section ref={ref} className="bigwords" aria-labelledby="bigwords-title">
            <div className="wrap">
                <h2 id="bigwords-title" className="bigwords__title serif h-l">
                    <span className="rv-line">
                        <span>We know what{' '}</span>
                    </span>
                    <span className="rv-line" style={{ '--i': 1 } as React.CSSProperties}>
                        <span>
                            we&apos;re <em>good</em> at.
                        </span>
                    </span>
                </h2>

                <ul className="bigwords__list" onPointerLeave={() => setActive(null)}>
                    {BIG_WORDS.map((w, wi) => (
                        <li
                            key={w.word}
                            className="bigword rv-fade"
                            style={{ '--i': wi + 2 } as React.CSSProperties}
                            onPointerEnter={(e) => {
                                lastPointer.x = e.clientX;
                                lastPointer.y = e.clientY;
                                setActive(wi);
                            }}
                        >
                            <span className="bigword__text" aria-label={w.word}>
                                {w.word.split('').map((l, i) => (
                                    <span key={i} className="bigword__letter" style={{ '--i': i } as React.CSSProperties} aria-hidden="true">
                                        <span>{l}</span>
                                        <span>{l}</span>
                                    </span>
                                ))}
                            </span>
                            <span className="bigword__subs">
                                {w.subs.map((s) => (
                                    <span key={s}>{s}</span>
                                ))}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="bigwords__actions">
                    <div className="rv-fade" style={{ '--i': 6 } as React.CSSProperties}>
                        <Button href="/project" variant="solid">
                            Request a Proposal
                        </Button>
                    </div>
                    <div className="rv-fade" style={{ '--i': 7 } as React.CSSProperties}>
                        <Button href="/services/website-design-development-jaipur">View Web Work</Button>
                    </div>
                </div>
            </div>

            <div ref={peekRef} className={`peek ${item ? 'is-on' : ''}`} aria-hidden="true">
                {item && (
                    <>
                        <h4>{item.word}</h4>
                        <ul>
                            {item.subs.map((s) => (
                                <li key={s}>{s}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </section>
    );
}

const lastPointer = { x: 0, y: 0 };
