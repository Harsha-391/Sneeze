'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import Button from '../../ui/Button';
import { type BespokeProps, Crumbs, getPage, Head, Kicker, Lines, NextService, ServiceEnd, ServiceFaq, useEnterReveal } from '../parts';
import { useReveal } from '@/lib/motion';

const { s, next } = getPage('web-experience');

/** A page layout that builds itself block by block (outline → filled). */
function Wireframe() {
    const blocks = [
        { c: 'wf__nav', d: 0 },
        { c: 'wf__hero', d: 1 },
        { c: 'wf__line wf__line--a', d: 2 },
        { c: 'wf__line wf__line--b', d: 3 },
        { c: 'wf__btn', d: 4 },
        { c: 'wf__card wf__card--1', d: 5 },
        { c: 'wf__card wf__card--2', d: 6 },
        { c: 'wf__card wf__card--3', d: 7 },
    ];
    return (
        <div className="wf rv-fade" style={{ '--d': '250ms' } as React.CSSProperties} aria-hidden="true">
            <div className="wf__chrome">
                <i />
                <i />
                <i />
                <span>sneeze.media/your-brand</span>
            </div>
            <div className="wf__page">
                {blocks.map((b) => (
                    <span key={b.c} className={`wf__b ${b.c}`} style={{ '--k': b.d } as React.CSSProperties} />
                ))}
            </div>
            <div className="wf__score">
                <span>Performance</span>
                <span>SEO</span>
                <span>Accessibility</span>
            </div>
        </div>
    );
}

function Hero() {
    const ref = useEnterReveal<HTMLDivElement>();
    return (
        <section className="web-hero" aria-labelledby="svc-title">
            <div ref={ref} className="wrap">
                <Crumbs title={s.title} />
                <div className="web-hero__grid">
                    <div>
                        <h1 id="svc-title" className="web-hero__title serif">
                            <Kicker text={s.seo.kicker} />
                            <Lines lines={s.hero} delay={100} />
                        </h1>
                        <p className="web-hero__lede rv-fade" style={{ '--d': '420ms' } as React.CSSProperties}>
                            {s.lede}
                        </p>
                        <div className="rv-fade" style={{ '--d': '560ms', marginTop: 32 } as React.CSSProperties}>
                            <Button href={`/project?service=${s.slug}`} variant="solid">
                                {s.cta}
                            </Button>
                        </div>
                    </div>
                    <Wireframe />
                </div>
            </div>
        </section>
    );
}

/** Spec sheet: label / description rows. */
function Spec() {
    const ref = useReveal<HTMLElement>();
    return (
        <section ref={ref} className="spec" aria-labelledby="spec-title">
            <div className="wrap spec__grid">
                <div className="spec__head">
                    <Head eyebrow="Spec sheet" title={s.features.title} id="spec-title" />
                    <p className="rv-fade" style={{ '--d': '200ms' } as React.CSSProperties}>
                        {s.features.sub}
                    </p>
                </div>
                <dl className="spec__list">
                    {s.features.items.map((f, i) => (
                        <div key={f.title} className="rv-fade" style={{ '--i': i + 1 } as React.CSSProperties}>
                            <dt>
                                <span>{String(i + 1).padStart(2, '0')}</span>
                                {f.title}
                            </dt>
                            <dd>{f.desc}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}

const COMPARE: [string, string, string][] = [
    ['Speed', 'Slow, plugin-heavy pages', 'Built for sub-second loads'],
    ['Design', 'A theme everyone else uses', 'Bespoke and on-brand'],
    ['SEO', 'Bolt-on plugins', 'Semantic HTML, schema and sitemap built in'],
    ['Code', 'Bloated plugins', 'Clean Next.js / React you can maintain'],
    ['Content', 'Locked to the theme', 'Headless CMS you control'],
];

function Versus() {
    const ref = useReveal<HTMLElement>();
    return (
        <section ref={ref} className="versus" aria-labelledby="versus-title">
            <div className="wrap">
                <div className="versus__head">
                    <Head eyebrow="The shift" title={s.shift.title} id="versus-title" />
                    <p className="rv-fade" style={{ '--d': '200ms' } as React.CSSProperties}>
                        {s.shift.text}
                    </p>
                </div>
                <table className="ctable ctable--wide">
                    <caption className="sr-only">Template website compared with a bespoke Sneeze build</caption>
                    <thead>
                        <tr className="rv-fade">
                            <th scope="col">
                                <span className="sr-only">Factor</span>
                            </th>
                            <th scope="col">Template site</th>
                            <th scope="col">Sneeze build</th>
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

/** Three phases on a line that fills as you scroll through. */
function Build() {
    const ref = useReveal<HTMLElement>();
    const lineRef = useRef<HTMLOListElement>(null);
    const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start 80%', 'end 50%'] });
    const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
    return (
        <section ref={ref} className="build" aria-labelledby="build-title">
            <div className="wrap">
                <Head eyebrow="How it works" title={s.steps.title} id="build-title" />
                <div className="build__wrap">
                <span className="build__track" aria-hidden="true">
                    <motion.span style={{ scaleX: fill }} />
                </span>
                <ol ref={lineRef} className="build__line">
                    {s.steps.items.map((st, i) => (
                        <li key={st.title} className="rv-fade" style={{ '--i': i + 1 } as React.CSSProperties}>
                            <span className="build__dot" aria-hidden="true" />
                            <span className="build__phase">Phase {i + 1}</span>
                            <h3 className="serif">{st.title}</h3>
                            <p>{st.desc}</p>
                        </li>
                    ))}
                </ol>
                </div>
            </div>
        </section>
    );
}

function Builds() {
    const ref = useReveal<HTMLElement>();
    return (
        <section ref={ref} className="builds" aria-labelledby="builds-title">
            <div className="wrap">
                <p id="builds-title" className="eyebrow rv-fade">What we build</p>
                <ul className="builds__grid">
                    {s.promise.chips.map((c, i) => (
                        <li key={c} className="rv-fade" style={{ '--i': i + 1 } as React.CSSProperties}>
                            <Link href={`/project?service=${s.slug}`}>
                                <span className="builds__n">{String(i + 1).padStart(2, '0')}</span>
                                <span className="serif">{c}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default function WebExperiencePage({ children, faq, after }: BespokeProps) {
    return (
        <main className="svcp svcp--web">
            <Hero />
            <Spec />
            <Versus />
            <Build />
            <Builds />
            {children}
            <ServiceFaq s={s} items={faq} />
            <ServiceEnd s={s} />
            {after}
            <NextService next={next} />
        </main>
    );
}
