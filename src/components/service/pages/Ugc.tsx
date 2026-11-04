'use client';
import Button from '../../ui/Button';
import { type BespokeProps, Crumbs, getPage, Head, Kicker, Lines, NextService, ServiceEnd, ServiceFaq, useEnterReveal } from '../parts';
import { usePauseOffscreen, useReveal } from '@/lib/motion';

const { s, next } = getPage('ugc');

const TILES = [
    { format: 'Unboxing', time: '0:21', cap: 'okay, first impressions…', bg: '#2a1d14', ink: '#f4efe3' },
    { format: 'Testimonial', time: '0:34', cap: 'three weeks in and honestly…', bg: '#efe8d8', ink: '#0b0a08' },
    { format: 'How-to', time: '0:45', cap: 'step one, you just…', bg: '#1c1913', ink: '#f4efe3' },
    { format: 'Reaction', time: '0:18', cap: 'wait. what?', bg: '#d4af37', ink: '#0b0a08' },
    { format: 'ASMR', time: '0:30', cap: '(no words needed)', bg: '#3a2a1c', ink: '#f4efe3' },
    { format: 'Review', time: '0:27', cap: 'not sponsored, I bought it', bg: '#e4d5b7', ink: '#0b0a08' },
];

function Tile({ t }: { t: (typeof TILES)[number] }) {
    return (
        <div className="tile" style={{ '--bg': t.bg, '--ink': t.ink } as React.CSSProperties}>
            <span className="tile__format">{t.format}</span>
            <span className="tile__cap">{t.cap}</span>
            <span className="tile__bar">
                <span className="tile__time">{t.time}</span>
                <i />
            </span>
        </div>
    );
}

/** Two columns of vertical-video tiles drifting in opposite directions. */
function Feed() {
    const ref = usePauseOffscreen<HTMLDivElement>();
    const a = [...TILES.slice(0, 3), ...TILES.slice(0, 3)];
    const b = [...TILES.slice(3), ...TILES.slice(3)];
    return (
        <div ref={ref} className="feed rv-fade" style={{ '--d': '300ms' } as React.CSSProperties} aria-hidden="true">
            <div className="feed__col">
                <div className="feed__track loop">
                    {a.map((t, i) => (
                        <Tile key={i} t={t} />
                    ))}
                </div>
            </div>
            <div className="feed__col feed__col--down">
                <div className="feed__track feed__track--down loop">
                    {b.map((t, i) => (
                        <Tile key={i} t={t} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Hero() {
    const ref = useEnterReveal<HTMLDivElement>();
    return (
        <section className="ugc-hero" aria-labelledby="svc-title">
            <div ref={ref} className="wrap ugc-hero__grid">
                <div className="ugc-hero__copy">
                    <Crumbs title={s.title} />
                    <h1 id="svc-title" className="ugc-hero__title serif">
                        <Kicker text={s.seo.kicker} />
                        <Lines lines={s.hero} delay={100} />
                    </h1>
                    <p className="ugc-hero__lede rv-fade" style={{ '--d': '420ms' } as React.CSSProperties}>
                        {s.lede}
                    </p>
                    <div className="rv-fade" style={{ '--d': '560ms', marginTop: 32 } as React.CSSProperties}>
                        <Button href={`/project?service=${s.slug}`} variant="solid">
                            {s.cta}
                        </Button>
                    </div>
                </div>
                <Feed />
            </div>
        </section>
    );
}

/** Statement where the "old way" words get struck through as it scrolls in. */
function Strike() {
    const ref = useReveal<HTMLElement>({ rootMargin: '0px 0px -30% 0px' });
    const old = s.shift.oldWays;
    return (
        <section ref={ref} className="ugc-strike" aria-labelledby="ugc-strike-title">
            <div className="wrap">
                <p className="eyebrow rv-fade">The shift</p>
                <h2 id="ugc-strike-title" className="serif h-l" style={{ marginTop: 16 }}>
                    <Lines lines={s.shift.title} />
                </h2>
                <p className="ugc-strike__para serif">
                    No <s style={{ '--i': 0 } as React.CSSProperties}>{old[0].toLowerCase()}</s> sets. No{' '}
                    <s style={{ '--i': 1 } as React.CSSProperties}>{old[1].toLowerCase()}</s>. No{' '}
                    <s style={{ '--i': 2 } as React.CSSProperties}>{old[2].toLowerCase()}</s>. No{' '}
                    <s style={{ '--i': 3 } as React.CSSProperties}>{old[3].toLowerCase()}</s>. Just people your customers already
                    trust, talking the way they actually talk.
                </p>
                <div className="ugc-strike__foot">
                    <p className="rv-fade">{s.shift.text}</p>
                    {s.shift.values.map((v, i) => (
                        <div key={v.title} className="rv-fade" style={{ '--i': i + 1 } as React.CSSProperties}>
                            <h3 className="serif">{v.title}</h3>
                            <p>{v.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/** Offset two-column grid with large numerals. */
function Factory() {
    const ref = useReveal<HTMLElement>();
    return (
        <section ref={ref} className="factory" aria-labelledby="factory-title">
            <div className="wrap">
                <div className="factory__head">
                    <Head eyebrow="The factory" title={s.features.title} id="factory-title" />
                    <p className="rv-fade" style={{ '--d': '200ms' } as React.CSSProperties}>
                        {s.features.sub}
                    </p>
                </div>
                <div className="factory__grid">
                    {s.features.items.map((f, i) => (
                        <article key={f.title} className="rv-fade" style={{ '--i': i + 1 } as React.CSSProperties}>
                            <span className="factory__n display">{i + 1}</span>
                            <div>
                                <h3 className="serif">{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Pipeline() {
    const ref = useReveal<HTMLElement>();
    return (
        <section ref={ref} className="pipe" aria-labelledby="pipe-title">
            <div className="wrap pipe__grid">
                <Head eyebrow="How it works" title={s.steps.title} id="pipe-title" className="pipe__head" />
                <ol className="pipe__list">
                    {s.steps.items.map((st, i) => (
                        <li key={st.title} className="rv-fade" style={{ '--i': i + 1 } as React.CSSProperties}>
                            <span className="pipe__n">{String(i + 1).padStart(2, '0')}</span>
                            <div>
                                <h3 className="serif">{st.title}</h3>
                                <p>{st.desc}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
            <div className="wrap">
                <p className="pipe__formats rv-fade">
                    Formats we produce: <span>{s.promise.chips.join(', ')}.</span>
                </p>
            </div>
        </section>
    );
}

export default function UgcPage({ children, faq, after }: BespokeProps) {
    return (
        <main className="svcp svcp--ugc">
            <Hero />
            <Strike />
            <Factory />
            <Pipeline />
            {children}
            <ServiceFaq s={s} items={faq} />
            <ServiceEnd s={s} />
            {after}
            <NextService next={next} />
        </main>
    );
}
