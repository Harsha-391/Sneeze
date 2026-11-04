'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import Button, { Arrow } from '../../ui/Button';
import { type BespokeProps, Crumbs, getPage, Head, Kicker, Lines, NextService, ServiceEnd, ServiceFaq, useEnterReveal } from '../parts';
import { useReveal } from '@/lib/motion';

const { s, next } = getPage('social-cults');
const WORD = 'Cults.'.split('');

function Hero() {
    const ref = useEnterReveal<HTMLDivElement>();
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
    const wordX = useTransform(scrollYProgress, [0, 1], ['0vw', '-12vw']);
    const wordY = useTransform(scrollYProgress, [0, 1], [0, 80]);

    return (
        <section ref={sectionRef} className="soc-hero" aria-labelledby="svc-title">
            <div ref={ref} className="wrap">
                <Crumbs title={s.title} />
                <h1 id="svc-title" className="soc-hero__title">
                    <Kicker text={s.seo.kicker} />
                    <span className="soc-hero__pre serif">
                        <Lines lines={[{ text: "We don't build followers." }, { text: 'We build' }]} delay={100} />
                    </span>
                    <motion.span className="soc-hero__word display" style={{ x: wordX, y: wordY }}>
                        {WORD.map((l, i) => (
                            <span key={i} className="soc-hero__letter" style={{ '--i': i } as React.CSSProperties}>
                                <span>{l}</span>
                            </span>
                        ))}
                    </motion.span>
                </h1>
                <div className="soc-hero__foot">
                    <p className="rv-fade" style={{ '--d': '700ms' } as React.CSSProperties}>
                        {s.lede}
                    </p>
                    <div className="rv-fade" style={{ '--d': '820ms' } as React.CSSProperties}>
                        <Button href={`/project?service=${s.slug}`} variant="solid">
                            {s.cta}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

/** Full-bleed gold block: the manifesto. */
function Manifesto() {
    const ref = useReveal<HTMLElement>();
    return (
        <section ref={ref} className="soc-gold" aria-labelledby="soc-gold-title">
            <div className="wrap soc-gold__grid">
                <h2 id="soc-gold-title" className="soc-gold__title serif">
                    <Lines lines={[{ text: 'Safety is suicide.' }, { text: 'Polarize to ', em: 'magnetize.' }]} />
                </h2>
                <p className="soc-gold__text rv-fade" style={{ '--d': '200ms' } as React.CSSProperties}>
                    {s.shift.text}
                </p>
                <dl className="soc-gold__values">
                    {s.shift.values.map((v, i) => (
                        <div key={v.title} className="rv-fade" style={{ '--i': i + 3 } as React.CSSProperties}>
                            <dt>{v.title}</dt>
                            <dd>{v.text}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}

/** Cards pin and pile on top of each other as you scroll (pure CSS sticky). */
function Weapons() {
    const headRef = useReveal<HTMLDivElement>();
    return (
        <section className="stack" aria-labelledby="stack-title">
            <div className="wrap">
                <div ref={headRef} className="stack__head">
                    <Head eyebrow="Weapons of influence" title={s.features.title} id="stack-title" />
                    <p className="rv-fade" style={{ '--d': '200ms' } as React.CSSProperties}>
                        {s.features.sub}
                    </p>
                </div>
                <div className="stack__list">
                    {s.features.items.map((f, i) => (
                        <article key={f.title} className="stack__card" style={{ '--i': i } as React.CSSProperties}>
                            <span className="stack__num display">{String(i + 1).padStart(2, '0')}</span>
                            <h3 className="stack__title serif">{f.title}</h3>
                            <p className="stack__desc">{f.desc}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Ritual() {
    const ref = useReveal<HTMLElement>();
    return (
        <section ref={ref} className="ritual" aria-labelledby="ritual-title">
            <div className="wrap">
                <Head eyebrow="How it works" title={s.steps.title} id="ritual-title" />
                <ol className="ritual__cols">
                    {s.steps.items.map((st, i) => (
                        <li key={st.title} className="rv-fade" style={{ '--i': i + 1 } as React.CSSProperties}>
                            <span className="ritual__rule" style={{ '--d': `${200 + i * 160}ms` } as React.CSSProperties} />
                            <span className="ritual__num">Step {i + 1}</span>
                            <h3 className="serif">{st.title}</h3>
                            <p>{st.desc}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

function Deliverables() {
    const ref = useReveal<HTMLElement>();
    return (
        <section ref={ref} className="hoverlist" aria-labelledby="hoverlist-title">
            <div className="wrap">
                <p id="hoverlist-title" className="eyebrow rv-fade">What we run</p>
                <ul>
                    {s.promise.chips.map((c, i) => (
                        <li key={c} className="rv-fade" style={{ '--i': i + 1 } as React.CSSProperties}>
                            <Link href={`/project?service=${s.slug}`} className="hoverlist__row">
                                <span className="hoverlist__n">{String(i + 1).padStart(2, '0')}</span>
                                <span className="hoverlist__t serif">{c}</span>
                                <span className="hoverlist__a" aria-hidden="true">
                                    <Arrow />
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default function SocialCultsPage({ children, faq, after }: BespokeProps) {
    return (
        <main className="svcp svcp--soc">
            <Hero />
            <Manifesto />
            <Weapons />
            <Ritual />
            <Deliverables />
            {children}
            <ServiceFaq s={s} items={faq} />
            <ServiceEnd s={s} />
            {after}
            <NextService next={next} />
        </main>
    );
}
