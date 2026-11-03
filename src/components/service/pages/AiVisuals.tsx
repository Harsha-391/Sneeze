'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';
import Button from '../../ui/Button';
import { Crumbs, getPage, Head, Kicker, Lines, NextService, ServiceEnd, ServiceFaq, useEnterReveal } from '../parts';
import { useIsVisible, useMediaQuery, useReveal } from '@/lib/motion';

const { s, next } = getPage('ai-visuals');

/** Types a prompt, holds, erases, moves to the next. Writes textContent only. */
function PromptLine({ prompts }: { prompts: string[] }) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const visible = useIsVisible(wrapRef, '0px');

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.textContent = prompts[0];
            return;
        }
        if (!visible) return;
        let p = 0;
        let i = el.textContent?.length ?? 0;
        let deleting = false;
        let t = 0;
        const step = () => {
            const full = prompts[p];
            if (!deleting) {
                i++;
                el.textContent = full.slice(0, i);
                if (i >= full.length) {
                    deleting = true;
                    t = window.setTimeout(step, 1900);
                    return;
                }
                t = window.setTimeout(step, 38 + Math.random() * 40);
            } else {
                i -= 2;
                el.textContent = full.slice(0, Math.max(0, i));
                if (i <= 0) {
                    deleting = false;
                    p = (p + 1) % prompts.length;
                    t = window.setTimeout(step, 350);
                    return;
                }
                t = window.setTimeout(step, 18);
            }
        };
        t = window.setTimeout(step, 600);
        return () => window.clearTimeout(t);
    }, [visible, prompts]);

    return (
        <div ref={wrapRef} className="prompt rv-fade" style={{ '--d': '550ms' } as React.CSSProperties} aria-hidden="true">
            <span className="prompt__label">Prompt</span>
            <span className="prompt__text">
                <span ref={textRef} />
                <i className="prompt__caret" />
            </span>
            <span className="prompt__enter">Generate ↵</span>
        </div>
    );
}

function Hero() {
    const ref = useEnterReveal<HTMLDivElement>();
    const lenis = useLenis();
    return (
        <section className="ai-hero" aria-labelledby="svc-title">
            <div ref={ref} className="wrap">
                <Crumbs title={s.title} />
                <h1 id="svc-title" className="ai-hero__title serif">
                    <Kicker text={s.seo.kicker} />
                    <Lines lines={s.hero} delay={100} />
                </h1>
                <div className="ai-hero__row">
                    <p className="ai-hero__lede rv-fade" style={{ '--d': '420ms' } as React.CSSProperties}>
                        {s.lede}
                    </p>
                    <PromptLine prompts={s.ticker} />
                </div>
                <div className="ai-hero__actions rv-fade" style={{ '--d': '650ms' } as React.CSSProperties}>
                    <Button href={`/project?service=${s.slug}`} variant="solid">
                        {s.cta}
                    </Button>
                    <Button
                        href="#vectors"
                        onClick={(e) => {
                            e.preventDefault();
                            lenis?.scrollTo('#vectors', { offset: 0, duration: 1.6 });
                        }}
                    >
                        See What We Make
                    </Button>
                </div>
            </div>
        </section>
    );
}

const TONES = [
    { bg: '#efe8d8', ink: '#0b0a08' },
    { bg: '#d4af37', ink: '#0b0a08' },
    { bg: '#1c1913', ink: '#f4efe3' },
    { bg: '#2a1d14', ink: '#f4efe3' },
];

/** Vertical scroll drives a horizontal row of plates (pinned). Stacks on small screens. */
function Vectors() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const headRef = useReveal<HTMLDivElement>();
    const wide = useMediaQuery('(min-width: 900px)');
    const [distance, setDistance] = useState(0);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
    const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);
    const bar = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(track);
        return () => ro.disconnect();
    }, []);

    const items = s.features.items;

    return (
        <section
            ref={sectionRef}
            id="vectors"
            className="hs"
            style={{ height: wide ? `${100 + items.length * 70}vh` : 'auto' }}
            aria-labelledby="vectors-title"
        >
            <div className="hs__sticky">
                <div ref={headRef} className="wrap hs__head">
                    <Head eyebrow="What we generate" title={s.features.title} id="vectors-title" />
                    <p className="hs__sub rv-fade" style={{ '--d': '200ms' } as React.CSSProperties}>
                        {s.features.sub}
                    </p>
                </div>
                <motion.div ref={trackRef} className="hs__track" style={wide ? { x } : undefined}>
                    {items.map((f, i) => (
                        <article key={f.title} className="vplate" style={{ '--bg': TONES[i].bg, '--ink': TONES[i].ink } as React.CSSProperties}>
                            <span className="vplate__num">{String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
                            <p className="vplate__prompt serif" aria-hidden="true">
                                “{s.ticker[i % s.ticker.length]}”
                            </p>
                            <div className="vplate__foot">
                                <h3 className="serif">{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        </article>
                    ))}
                </motion.div>
                {wide && (
                    <div className="wrap hs__progress" aria-hidden="true">
                        <motion.span style={{ scaleX: bar }} />
                    </div>
                )}
            </div>
        </section>
    );
}

const COMPARE: [string, string, string][] = [
    ['Location', 'Studio rent, permits, travel', 'Any place you can describe'],
    ['Crew', 'Photographer, lighting, stylists', 'Art director + retouch team'],
    ['Turnaround', 'Weeks', 'Hours to days'],
    ['Variations', 'A handful of setups', 'Hundreds of options'],
    ['Budget', 'Production-heavy', 'Up to 40% back into media'],
];

function Compare() {
    const ref = useReveal<HTMLElement>();
    return (
        <section ref={ref} className="ai-compare" aria-labelledby="ai-compare-title">
            <div className="wrap ai-compare__grid">
                <div>
                    <Head eyebrow="The shift" title={s.shift.title} id="ai-compare-title" />
                    <p className="ai-compare__text rv-fade" style={{ '--d': '200ms' } as React.CSSProperties}>
                        {s.shift.text}
                    </p>
                </div>
                <table className="ctable">
                    <caption className="sr-only">Traditional photo shoot compared with Sneeze AI production</caption>
                    <thead>
                        <tr className="rv-fade">
                            <th scope="col">
                                <span className="sr-only">Factor</span>
                            </th>
                            <th scope="col">Traditional shoot</th>
                            <th scope="col">Sneeze AI production</th>
                        </tr>
                    </thead>
                    <tbody>
                        {COMPARE.map(([k, a, b], i) => (
                            <tr key={k} className="rv-fade" style={{ '--i': i + 1 } as React.CSSProperties}>
                                <th scope="row">{k}</th>
                                <td>{a}</td>
                                <td>{b}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

function Protocol() {
    const ref = useReveal<HTMLElement>();
    return (
        <section ref={ref} className="ai-steps" aria-labelledby="ai-steps-title">
            <div className="wrap">
                <Head eyebrow="How it works" title={s.steps.title} id="ai-steps-title" />
                <ol className="ai-steps__list">
                    {s.steps.items.map((st, i) => (
                        <li key={st.title} className="rv-fade" style={{ '--i': i + 1 } as React.CSSProperties}>
                            <span className="ai-steps__num display">{String(i + 1).padStart(2, '0')}</span>
                            <h3 className="serif">{st.title}</h3>
                            <p>{st.desc}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

export default function AiVisualsPage() {
    return (
        <main className="svcp svcp--ai">
            <Hero />
            <Vectors />
            <Compare />
            <Protocol />
            <ServiceFaq s={s} />
            <ServiceEnd s={s} />
            <NextService next={next} />
        </main>
    );
}
