'use client';
import Button from '../../ui/Button';
import { type BespokeProps, Crumbs, getPage, Head, Kicker, Lines, NextService, ServiceEnd, ServiceFaq, useEnterReveal } from '../parts';
import { useReveal } from '@/lib/motion';

const { s, next } = getPage('performance');

/* ------------------------------------------------------------------ */
/* Illustrative chart: many variations start, losers get cut, one     */
/* winner gets scaled. No numbers — it explains the method, not a     */
/* result. Paths are generated once from a fixed seed.                */
/* ------------------------------------------------------------------ */
const CW = 640;
const CH = 420;

function seeded(seed: number) {
    let t = seed;
    return () => {
        t = (t * 9301 + 49297) % 233280;
        return t / 233280;
    };
}

function buildPaths() {
    const rnd = seeded(7);
    const losers: { d: string; end: [number, number] }[] = [];
    for (let k = 0; k < 11; k++) {
        const stopAt = 0.32 + rnd() * 0.45; // where this variation got killed
        const steps = 14;
        let y = CH - 40 - rnd() * 30;
        let d = `M 0 ${y.toFixed(1)}`;
        let lastX = 0;
        for (let i = 1; i <= steps; i++) {
            const x = (i / steps) * CW;
            if (x / CW > stopAt) break;
            y = Math.min(CH - 20, Math.max(CH * 0.42, y - (rnd() - 0.42) * 46));
            d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
            lastX = x;
        }
        losers.push({ d, end: [lastX, y] });
    }
    let y = CH - 50;
    let d = `M 0 ${y}`;
    const steps = 16;
    for (let i = 1; i <= steps; i++) {
        const x = (i / steps) * CW;
        const target = CH - 50 - Math.pow(i / steps, 1.7) * (CH - 90);
        y = target + (rnd() - 0.5) * 22;
        d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return { losers, winner: { d, end: [CW, y] as [number, number] } };
}

const PATHS = buildPaths();

function Chart() {
    return (
        <figure className="pchart rv-fade" style={{ '--d': '300ms' } as React.CSSProperties}>
            <svg viewBox={`-10 -10 ${CW + 20} ${CH + 20}`} role="img" aria-label="Illustration: many ad variations are tested, the losers are cut early and one winner is scaled.">
                {[0.25, 0.5, 0.75].map((f) => (
                    <line key={f} x1="0" x2={CW} y1={CH * f} y2={CH * f} className="pchart__grid" />
                ))}
                <line x1="0" x2={CW} y1={CH} y2={CH} className="pchart__axis" />
                <line x1="0" x2="0" y1="0" y2={CH} className="pchart__axis" />
                {PATHS.losers.map((l, i) => (
                    <g key={i} className="pchart__loser" style={{ '--i': i } as React.CSSProperties}>
                        <path d={l.d} pathLength={1} />
                        <line x1={l.end[0] - 6} y1={l.end[1] - 6} x2={l.end[0] + 6} y2={l.end[1] + 6} />
                        <line x1={l.end[0] - 6} y1={l.end[1] + 6} x2={l.end[0] + 6} y2={l.end[1] - 6} />
                    </g>
                ))}
                <path d={PATHS.winner.d} pathLength={1} className="pchart__winner" />
                <circle cx={PATHS.winner.end[0]} cy={PATHS.winner.end[1]} r="7" className="pchart__end" />
            </svg>
            <figcaption>
                <span>
                    <i className="pchart__key pchart__key--loser" /> Variations killed
                </span>
                <span>
                    <i className="pchart__key pchart__key--winner" /> Winner scaled
                </span>
            </figcaption>
        </figure>
    );
}

function Hero() {
    const ref = useEnterReveal<HTMLDivElement>();
    return (
        <section className="perf-hero" aria-labelledby="svc-title">
            <div ref={ref} className="wrap">
                <Crumbs title={s.title} />
                <div className="perf-hero__grid">
                    <div>
                        <h1 id="svc-title" className="perf-hero__title serif">
                            <Kicker text={s.seo.kicker} />
                            <Lines lines={s.hero} delay={100} />
                        </h1>
                        <p className="perf-hero__lede rv-fade" style={{ '--d': '420ms' } as React.CSSProperties}>
                            {s.lede}
                        </p>
                        <div className="rv-fade" style={{ '--d': '560ms', marginTop: 32 } as React.CSSProperties}>
                            <Button href={`/project?service=${s.slug}`} variant="solid">
                                {s.cta}
                            </Button>
                        </div>
                    </div>
                    <Chart />
                </div>
            </div>
        </section>
    );
}

/** Swiss-style four-column grid. */
function Levers() {
    const ref = useReveal<HTMLElement>();
    return (
        <section ref={ref} className="levers" aria-labelledby="levers-title">
            <div className="wrap">
                <div className="levers__head">
                    <Head eyebrow="Growth levers" title={s.features.title} id="levers-title" />
                    <p className="rv-fade" style={{ '--d': '200ms' } as React.CSSProperties}>
                        {s.features.sub}
                    </p>
                </div>
                <div className="levers__grid">
                    {s.features.items.map((f, i) => (
                        <article key={f.title} className="rv-fade" style={{ '--i': i + 1 } as React.CSSProperties}>
                            <span className="levers__n display">{String(i + 1).padStart(2, '0')}</span>
                            <h3 className="serif">{f.title}</h3>
                            <p>{f.desc}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

const FROM_TO: [string, string][] = [
    ['Brand awareness', 'Revenue you can trace'],
    ['Vanity metrics', 'ROAS & cost per lead'],
    ['Burning cash', 'Losers cut in days'],
    ['Hope marketing', 'Tested hypotheses'],
];

/** Sticky statement on the left, argument scrolls past on the right. */
function Split() {
    const ref = useReveal<HTMLElement>();
    return (
        <section ref={ref} className="psplit" aria-labelledby="psplit-title">
            <div className="wrap psplit__grid">
                <div className="psplit__sticky">
                    <p className="eyebrow rv-fade">The shift</p>
                    <h2 id="psplit-title" className="psplit__title serif">
                        <Lines lines={s.shift.title} />
                    </h2>
                </div>
                <div className="psplit__body">
                    <p className="psplit__text rv-fade">{s.shift.text}</p>
                    <ul className="fromto" aria-label="What we replace, and what with">
                        {FROM_TO.map(([a, b], i) => (
                            <li key={a} className="rv-fade" style={{ '--i': i + 1 } as React.CSSProperties}>
                                <span className="fromto__a">{a}</span>
                                <span className="fromto__arrow" aria-hidden="true">→</span>
                                <span className="fromto__b serif">{b}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="psplit__values">
                        {s.shift.values.map((v, i) => (
                            <div key={v.title} className="rv-fade" style={{ '--i': i + 5 } as React.CSSProperties}>
                                <h3 className="serif">{v.title}</h3>
                                <p>{v.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function Algorithm() {
    const ref = useReveal<HTMLElement>();
    return (
        <section ref={ref} className="algo" aria-labelledby="algo-title">
            <div className="wrap">
                <Head eyebrow="How it works" title={s.steps.title} id="algo-title" />
                <ol className="algo__flow">
                    {s.steps.items.map((st, i) => (
                        <li key={st.title} className="rv-fade" style={{ '--i': i + 1 } as React.CSSProperties}>
                            <span className="algo__n">{String(i + 1).padStart(2, '0')}</span>
                            <h3 className="serif">{st.title}</h3>
                            <p>{st.desc}</p>
                        </li>
                    ))}
                </ol>
                <p className="algo__platforms rv-fade">{s.promise.chips.join('  ·  ')}</p>
            </div>
        </section>
    );
}

export default function PerformancePage({ children, faq, after }: BespokeProps) {
    return (
        <main className="svcp svcp--perf">
            <Hero />
            <Levers />
            <Split />
            <Algorithm />
            {children}
            <ServiceFaq s={s} items={faq} />
            <ServiceEnd s={s} />
            {after}
            <NextService next={next} />
        </main>
    );
}
