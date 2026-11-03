'use client';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { useLenis } from 'lenis/react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Button, { Arrow } from '../ui/Button';
import Faq from '../Faq';
import { getService, Line, ServiceContent } from '@/content/services';
import { usePageReady, usePauseOffscreen, useReveal } from '@/lib/motion';

/** Renders a heading line with its gold / struck / ember words. */
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

function Star() {
    return (
        <svg className="star" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
        </svg>
    );
}

/* ------------------------------------------------------------------ */
/* HERO                                                               */
/* ------------------------------------------------------------------ */

const CHIP_SPOTS: [number, number][] = [
    [7, 16],
    [63, 11],
    [69, 70],
    [5, 68],
    [36, 84],
];

function Scene({ s }: { s: ServiceContent }) {
    const wrapRef = useReveal<HTMLDivElement>();
    const sceneRef = useRef<HTMLDivElement>(null);
    const layersRef = usePauseOffscreen<HTMLDivElement>();

    // grows to full size as it scrolls up into view
    const { scrollYProgress } = useScroll({ target: sceneRef, offset: ['start end', 'start 20%'] });
    const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);

    // pointer parallax: lerped CSS vars, loop only runs while the pointer moves
    useEffect(() => {
        const el = sceneRef.current;
        if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        let tx = 0;
        let ty = 0;
        let x = 0;
        let y = 0;
        let raf = 0;
        let running = false;
        const tick = () => {
            x += (tx - x) * 0.08;
            y += (ty - y) * 0.08;
            el.style.setProperty('--px', x.toFixed(3));
            el.style.setProperty('--py', y.toFixed(3));
            if (Math.abs(tx - x) < 0.002 && Math.abs(ty - y) < 0.002) {
                running = false;
                return;
            }
            raf = requestAnimationFrame(tick);
        };
        const wake = () => {
            if (!running) {
                running = true;
                raf = requestAnimationFrame(tick);
            }
        };
        const onMove = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            tx = ((e.clientX - r.left) / r.width) * 2 - 1;
            ty = ((e.clientY - r.top) / r.height) * 2 - 1;
            wake();
        };
        const onLeave = () => {
            tx = 0;
            ty = 0;
            wake();
        };
        el.addEventListener('pointermove', onMove, { passive: true });
        el.addEventListener('pointerleave', onLeave);
        return () => {
            cancelAnimationFrame(raf);
            el.removeEventListener('pointermove', onMove);
            el.removeEventListener('pointerleave', onLeave);
        };
    }, []);

    return (
        <div ref={wrapRef} className="wrap">
            <div className="rv-fade" style={{ '--d': '250ms' } as React.CSSProperties}>
                <motion.div ref={sceneRef} className="scene" style={{ scale }}>
                    <div ref={layersRef} className="scene__layers" aria-hidden="true">
                        <div className="scene__glow loop" style={{ '--c1': s.glow } as React.CSSProperties} />
                        <div className="scene__grid" />
                        <div className="scene__depth" style={{ '--k': 14 } as React.CSSProperties}>
                            <div className="card__ring loop" style={{ '--s': '74%', '--t': '46s' } as React.CSSProperties} />
                            <div className="card__ring loop" style={{ '--s': '52%', '--t': '30s', animationDirection: 'reverse' } as React.CSSProperties} />
                            <div className="card__ring loop" style={{ '--s': '32%', '--t': '20s' } as React.CSSProperties} />
                        </div>
                        <div className="scene__depth" style={{ '--k': 30 } as React.CSSProperties}>
                            <div className="scene__orb">{s.icon}</div>
                        </div>
                        {s.ticker.slice(0, 5).map((c, i) => (
                            <div
                                key={c}
                                className="scene__depth scene__chip-spot"
                                style={{ left: `${CHIP_SPOTS[i][0]}%`, top: `${CHIP_SPOTS[i][1]}%`, '--k': 44 + i * 8 } as React.CSSProperties}
                            >
                                <span className="scene__chip loop" style={{ '--fd': `${-i * 1.3}s` } as React.CSSProperties}>
                                    <Star /> {c}
                                </span>
                            </div>
                        ))}
                    </div>
                    <span className="scene__corner scene__corner--tl">{s.index} / 06</span>
                    <span className="scene__corner scene__corner--br">{s.badge}</span>
                </motion.div>
            </div>
        </div>
    );
}

function Hero({ s }: { s: ServiceContent }) {
    const ready = usePageReady();
    const topRef = useRef<HTMLDivElement>(null);
    const lenis = useLenis();
    const { scrollY } = useScroll();
    const copyY = useTransform(scrollY, [0, 700], [0, -90]);
    const indexY = useTransform(scrollY, [0, 900], [0, 240]);

    // Reveal when the page curtain lifts (or right away on a fresh load).
    useEffect(() => {
        if (ready) topRef.current?.classList.add('is-in');
    }, [ready]);

    return (
        <section className="svc-hero" aria-labelledby="svc-title">
            <motion.span className="svc-hero__index display" style={{ y: indexY }} aria-hidden="true">
                {s.index}
            </motion.span>

            <div ref={topRef} className="wrap svc-hero__top">
                <motion.div style={{ y: copyY }}>
                    <nav className="crumbs rv-fade" aria-label="Breadcrumb">
                        <Link href="/">Home</Link>
                        <i>/</i>
                        <Link href="/#services">Services</Link>
                        <i>/</i>
                        <span aria-current="page">{s.title}</span>
                    </nav>

                    <h1 id="svc-title" className="svc-hero__title serif">
                        {/* Keyword kicker inside the H1 (primary Jaipur search term for this page) */}
                        <span className="badge rv-fade" style={{ '--d': '80ms' } as React.CSSProperties}>
                            {s.icon} {s.seo.kicker}
                        </span>
                        <span className="sr-only">: </span>
                        {s.hero.map((l, i) => (
                            <span key={i} className="rv-line" style={{ '--i': i, '--d': '120ms' } as React.CSSProperties}>
                                <span>
                                    <LineText line={l} />{' '}
                                </span>
                            </span>
                        ))}
                    </h1>

                    <p className="svc-hero__lede rv-fade" style={{ '--d': '450ms' } as React.CSSProperties}>
                        {s.lede}
                    </p>

                    <div className="svc-hero__actions rv-fade" style={{ '--d': '600ms' } as React.CSSProperties}>
                        <Button href={`/project?service=${s.slug}`} variant="solid">
                            {s.cta}
                        </Button>
                        <Button
                            href="#features"
                            onClick={(e) => {
                                e.preventDefault();
                                if (lenis) lenis.scrollTo('#features', { offset: -40, duration: 1.6 });
                                else document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Explore
                        </Button>
                    </div>
                </motion.div>
            </div>

            <Scene s={s} />
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* TICKER                                                             */
/* ------------------------------------------------------------------ */

function Ticker({ items }: { items: string[] }) {
    const ref = usePauseOffscreen<HTMLElement>();
    const seq = [...items, ...items];
    return (
        <section ref={ref} className="ticker" aria-hidden="true">
            <div className="ticker__row">
                <div className="ticker__track loop">
                    {[...seq, ...seq].map((t, i) => (
                        <span key={i} className="ticker__item serif">
                            <em>{t}</em>
                            <Star />
                        </span>
                    ))}
                </div>
            </div>
            <div className="ticker__row ticker__row--alt">
                <div className="ticker__track ticker__track--rev loop">
                    {[...seq, ...seq].map((t, i) => (
                        <span key={i} className="ticker__item ticker__item--outline display">
                            {t}
                            <Star />
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* FEATURES                                                           */
/* ------------------------------------------------------------------ */

function Features({ s }: { s: ServiceContent }) {
    const headRef = useReveal<HTMLDivElement>();
    const gridRef = useReveal<HTMLDivElement>();
    return (
        <section id="features" className="feats" aria-labelledby="feats-title">
            <div className="wrap">
                <div ref={headRef} className="section-head">
                    <div>
                        <p className="eyebrow rv-fade">What we deploy</p>
                        <h2 id="feats-title" className="serif h-l" style={{ marginTop: 18 }}>
                            <span className="rv-line">
                                <span>
                                    <LineText line={s.features.title} />
                                </span>
                            </span>
                        </h2>
                    </div>
                    <p className="rv-fade" style={{ '--d': '200ms' } as React.CSSProperties}>
                        {s.features.sub}
                    </p>
                </div>

                <div ref={gridRef} className="feat-grid">
                    {s.features.items.map((f, i) => (
                        <article key={f.title} className="feat rv-fade" style={{ '--i': i } as React.CSSProperties}>
                            <div className="feat__top">
                                <span className="feat__num">{String(i + 1).padStart(2, '0')}</span>
                                <span className="feat__icon">{f.icon}</span>
                            </div>
                            <h3 className="feat__title serif">{f.title}</h3>
                            <p className="feat__desc">{f.desc}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* THE SHIFT — old way burns away as you scroll                       */
/* ------------------------------------------------------------------ */

const OLD_SPOTS: [number, number][] = [
    [8, 12],
    [46, 22],
    [12, 72],
    [50, 80],
];

function OldChip({ text, i, progress }: { text: string; i: number; progress: MotionValue<number> }) {
    const dir = i % 2 ? 1 : -1;
    const y = useTransform(progress, [0, 1], [0, -(90 + i * 45)]);
    const x = useTransform(progress, [0, 1], [0, dir * (24 + i * 10)]);
    const rotate = useTransform(progress, [0, 1], [dir * 2, dir * (14 + i * 4)]);
    const opacity = useTransform(progress, [0.2 + i * 0.1, 0.55 + i * 0.1], [1, 0]);
    return (
        <motion.span
            className="oldchip"
            style={{ left: `${OLD_SPOTS[i][0]}%`, top: `${OLD_SPOTS[i][1]}%`, x, y, rotate, opacity }}
        >
            <span aria-hidden="true">✕</span> {text}
        </motion.span>
    );
}

function Shift({ s }: { s: ServiceContent }) {
    const visualRef = useRef<HTMLDivElement>(null);
    const stampRef = useReveal<HTMLDivElement>({ rootMargin: '0px 0px -30% 0px' });
    const copyRef = useReveal<HTMLDivElement>();
    const { scrollYProgress } = useScroll({ target: visualRef, offset: ['start 85%', 'end 30%'] });
    const ghostScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
    const ghostRotate = useTransform(scrollYProgress, [0, 1], [0, -18]);

    return (
        <section className="shift" aria-labelledby="shift-title">
            <div className="wrap shift__grid">
                <div ref={visualRef} className="shift__visual">
                    <motion.div className="shift__ghost" style={{ scale: ghostScale, rotate: ghostRotate }} aria-hidden="true">
                        {s.shift.oldIcon}
                    </motion.div>
                    {s.shift.oldWays.map((w, i) => (
                        <OldChip key={w} text={w} i={i} progress={scrollYProgress} />
                    ))}
                    <div ref={stampRef} className="shift__stamp display">
                        <span className="rv-line">
                            <span>{s.shift.stamp[0]}{' '}</span>
                        </span>
                        <span className="rv-line" style={{ '--i': 1 } as React.CSSProperties}>
                            <span className="ember">{s.shift.stamp[1]}</span>
                        </span>
                    </div>
                </div>

                <div ref={copyRef} className="shift__copy">
                    <p className="eyebrow rv-fade">The shift</p>
                    <h2 id="shift-title" className="serif h-l" style={{ marginTop: 18 }}>
                        {s.shift.title.map((l, i) => (
                            <span key={i} className="rv-line" style={{ '--i': i } as React.CSSProperties}>
                                <span>
                                    <LineText line={l} />{' '}
                                </span>
                            </span>
                        ))}
                    </h2>
                    <p className="shift__text rv-fade" style={{ '--d': '200ms' } as React.CSSProperties}>
                        {s.shift.text}
                    </p>
                    <div className="shift__values">
                        {s.shift.values.map((v, i) => (
                            <div key={v.title} className="value rv-fade" style={{ '--i': i + 3 } as React.CSSProperties}>
                                <span className="value__icon">{v.icon}</span>
                                <div>
                                    <h3>{v.title}</h3>
                                    <p>{v.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* STEPS — sticky title + scroll-filled rail                          */
/* ------------------------------------------------------------------ */

function Step({ i, title, desc }: { i: number; title: string; desc: string }) {
    const ref = useReveal<HTMLElement>({ rootMargin: '0px 0px -35% 0px' });
    const n = String(i + 1).padStart(2, '0');
    return (
        <article ref={ref} className="step">
            <span className="step__num display" aria-hidden="true">
                <span className="step__num-o">{n}</span>
                <span className="step__num-f">{n}</span>
            </span>
            <div>
                <h3 className="step__title serif rv-fade">{title}</h3>
                <p className="step__desc rv-fade" style={{ '--d': '120ms' } as React.CSSProperties}>
                    {desc}
                </p>
            </div>
        </article>
    );
}

function Steps({ s }: { s: ServiceContent }) {
    const asideRef = useReveal<HTMLDivElement>();
    const listRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 55%'] });

    return (
        <section className="steps" aria-labelledby="steps-title">
            <div className="wrap steps__grid">
                <div ref={asideRef} className="steps__aside">
                    <p className="eyebrow rv-fade">How it works</p>
                    <h2 id="steps-title" className="serif h-l" style={{ marginTop: 18 }}>
                        <span className="rv-line">
                            <span>
                                <LineText line={s.steps.title} />
                            </span>
                        </span>
                    </h2>
                    <p className="steps__note rv-fade" style={{ '--d': '200ms' } as React.CSSProperties}>
                        Three moves from brief to results. Scroll through the process.
                    </p>
                </div>

                <div ref={listRef} className="steps__list">
                    <div className="steps__rail" aria-hidden="true">
                        <motion.div className="steps__fill" style={{ scaleY: scrollYProgress }} />
                    </div>
                    {s.steps.items.map((it, i) => (
                        <Step key={it.title} i={i} title={it.title} desc={it.desc} />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* PROMISE + CTA                                                      */
/* ------------------------------------------------------------------ */

function PromiseCta({ s }: { s: ServiceContent }) {
    const ref = useReveal<HTMLDivElement>();
    const iconRef = usePauseOffscreen<HTMLDivElement>();
    return (
        <section className="pcta" aria-labelledby="pcta-title">
            <div ref={ref} className="wrap pcta__inner">
                <div ref={iconRef} className="pcta__icon rv-scale">
                    <span className="pcta__halo loop" aria-hidden="true" />
                    {s.promise.icon}
                </div>
                <h2 id="pcta-title" className="serif h-xl">
                    {s.promise.title.map((l, i) => (
                        <span key={i} className="rv-line" style={{ '--i': i } as React.CSSProperties}>
                            <span>
                                <LineText line={l} />{' '}
                            </span>
                        </span>
                    ))}
                </h2>
                <p className="pcta__text lead serif rv-fade" style={{ '--d': '250ms' } as React.CSSProperties}>
                    {s.promise.text}
                </p>
                <ul className="pcta__chips">
                    {s.promise.chips.map((c, i) => (
                        <li key={c} className="chip rv-fade" style={{ '--i': i + 3 } as React.CSSProperties}>
                            <Star /> {c}
                        </li>
                    ))}
                </ul>
                <div className="rv-fade" style={{ '--d': '600ms' } as React.CSSProperties}>
                    <Button href={`/project?service=${s.slug}`} variant="solid">
                        {s.cta}
                    </Button>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* NEXT SERVICE                                                       */
/* ------------------------------------------------------------------ */

function NextService({ next }: { next: ServiceContent }) {
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

/* ------------------------------------------------------------------ */

export default function ServicePage({ slug }: { slug: string }) {
    const { service: s, next } = getService(slug);
    return (
        <main className="svc">
            <Hero s={s} />
            <Ticker items={s.ticker} />
            <Features s={s} />
            <Shift s={s} />
            <Steps s={s} />
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
            <PromiseCta s={s} />
            <NextService next={next} />
        </main>
    );
}
