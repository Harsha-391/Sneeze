'use client';
import { useLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';
import { intro } from '@/lib/motion';

// Plays once per tab session, and only on a real page load (not on client nav).
// The flag is set when the intro finishes (not when it starts) so React
// StrictMode's double effect run in dev doesn't skip it.
let playedThisLoad = false;
const STORAGE_KEY = 'sneeze-intro-seen';
const WORD = ['S', 'N', 'E', 'E', 'Z', 'E', '.'];

export default function Preloader() {
    const ref = useRef<HTMLDivElement>(null);
    const countRef = useRef<HTMLSpanElement>(null);
    const [state, setState] = useState<'playing' | 'leaving' | 'gone'>('playing');
    const lenis = useLenis();

    useEffect(() => {
        let seen = false;
        try {
            seen = sessionStorage.getItem(STORAGE_KEY) === '1';
        } catch {
            /* storage blocked: just play it */
        }
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (playedThisLoad || seen || reduced) {
            playedThisLoad = true;
            intro.finish();
            // eslint-disable-next-line react-hooks/set-state-in-effect -- hide overlay immediately for returning visitors
            setState('gone');
            return;
        }
        window.scrollTo(0, 0);

        // Count 0 → 100 with an ease-out curve. Writes text directly, no re-renders.
        const start = performance.now();
        const dur = 1500;
        let raf = 0;
        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            if (countRef.current) countRef.current.textContent = String(Math.round(eased * 100)).padStart(3, '0');
            if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        const leave = window.setTimeout(() => {
            playedThisLoad = true;
            setState('leaving');
            // Start the hero reveal while the curtain is still lifting.
            window.setTimeout(() => intro.finish(), 250);
        }, 1750);
        const done = window.setTimeout(() => {
            setState('gone');
            try {
                sessionStorage.setItem(STORAGE_KEY, '1');
            } catch {
                /* ignore */
            }
        }, 2900);

        return () => {
            cancelAnimationFrame(raf);
            window.clearTimeout(leave);
            window.clearTimeout(done);
        };
    }, []);

    // Lock scrolling while the intro plays. The Lenis instance arrives a tick
    // after mount, so this effect waits for it.
    useEffect(() => {
        if (!lenis) return;
        if (state !== 'playing') return;
        lenis.stop();
        return () => lenis.start();
    }, [lenis, state]);

    if (state === 'gone') return null;

    return (
        <div ref={ref} className={`preloader ${state === 'leaving' ? 'is-leaving' : ''}`} aria-hidden="true">
            <div className="preloader__top">
                <span>Sneeze Media</span>
                <span>Full-stack digital agency</span>
            </div>
            <div className="preloader__word">
                {WORD.map((l, i) => (
                    <span key={i} className={l === '.' ? 'gold' : ''} style={{ '--i': i } as React.CSSProperties}>
                        {l}
                    </span>
                ))}
            </div>
            <div className="preloader__bottom">
                <span>Loading the noise</span>
                <span ref={countRef} className="preloader__count">
                    000
                </span>
            </div>
            <div className="preloader__bar" />
        </div>
    );
}
