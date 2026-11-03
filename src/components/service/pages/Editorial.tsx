'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Button from '../../ui/Button';
import { Crumbs, getPage, Kicker, Lines, NextService, ServiceEnd, ServiceFaq, useEnterReveal } from '../parts';
import { useReveal } from '@/lib/motion';

const { s, next } = getPage('editorial');
const PAGES = ['04', '12', '22', '36'];

/** Magazine cover: masthead bar, headline, coverlines down the side. */
function Cover() {
    const ref = useEnterReveal<HTMLDivElement>();
    return (
        <section className="ed-cover" aria-labelledby="svc-title">
            <div ref={ref} className="wrap">
                <Crumbs title={s.title} />
                <div className="ed-bar rv-fade" style={{ '--d': '80ms' } as React.CSSProperties}>
                    <span>Sneeze Editorial</span>
                    <span>Issue {s.index} · Jaipur</span>
                    <span>{s.badge}</span>
                </div>
                <div className="ed-cover__grid">
                    <h1 id="svc-title" className="ed-cover__title serif">
                        <Kicker text={s.seo.kicker} delay={120} />
                        <Lines lines={s.hero} delay={160} />
                    </h1>
                    <ul className="ed-cover__lines" aria-label="In this issue">
                        {s.features.items.map((f, i) => (
                            <li key={f.title} className="rv-fade" style={{ '--d': `${500 + i * 90}ms` } as React.CSSProperties}>
                                <span className="ed-cover__p">p. {PAGES[i]}</span>
                                <span className="ed-cover__t serif">{f.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="ed-bar ed-bar--foot rv-fade" style={{ '--d': '700ms' } as React.CSSProperties}>
                    <p>{s.lede}</p>
                    <Button href={`/project?service=${s.slug}`} variant="solid">
                        {s.cta}
                    </Button>
                </div>
            </div>
        </section>
    );
}

/** "In this issue" contents page. */
function Contents() {
    const ref = useReveal<HTMLElement>();
    return (
        <section ref={ref} className="toc" aria-labelledby="toc-title">
            <div className="wrap toc__grid">
                <div className="toc__head">
                    <p className="eyebrow rv-fade">Contents</p>
                    <h2 id="toc-title" className="serif h-l" style={{ marginTop: 16 }}>
                        <Lines lines={[s.features.title]} />
                    </h2>
                    <p className="toc__sub rv-fade" style={{ '--d': '200ms' } as React.CSSProperties}>
                        {s.features.sub}
                    </p>
                </div>
                <ol className="toc__list">
                    {s.features.items.map((f, i) => (
                        <li key={f.title} className="rv-fade" style={{ '--i': i + 1 } as React.CSSProperties}>
                            <span className="toc__page display">{PAGES[i]}</span>
                            <div>
                                <h3 className="serif">{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

/** Big pull quote that drifts against the body copy. */
function Feature() {
    const ref = useReveal<HTMLElement>();
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
    return (
        <section ref={ref} className="ed-feature" aria-labelledby="ed-feature-title">
            <div ref={sectionRef} className="wrap">
                <motion.h2 id="ed-feature-title" className="ed-feature__quote serif" style={{ y }}>
                    <Lines lines={[{ text: '“Generic is invisible.' }, { text: '', em: 'Own your aesthetic.”' }]} />
                </motion.h2>
                <div className="ed-feature__body">
                    <p className="ed-feature__cols rv-fade" style={{ '--d': '200ms' } as React.CSSProperties}>
                        <span className="ed-drop">I</span>n a sea of sameness, only the bold survive. {s.shift.text.replace('In a sea of sameness, only the bold survive. ', '')} The
                        old playbook (stock photos, flat lighting, safe angles, boring composition) is exactly what
                        your audience has learned to scroll past.
                    </p>
                    <aside className="ed-feature__side">
                        {s.shift.values.map((v, i) => (
                            <div key={v.title} className="rv-fade" style={{ '--i': i + 3 } as React.CSSProperties}>
                                <h3>{v.title}</h3>
                                <p>{v.text}</p>
                            </div>
                        ))}
                    </aside>
                </div>
            </div>
        </section>
    );
}

/** The workflow as a contact sheet: three frames on a film strip. */
function ContactSheet() {
    const ref = useReveal<HTMLElement>();
    return (
        <section ref={ref} className="sheet" aria-labelledby="sheet-title">
            <div className="wrap">
                <div className="sheet__head">
                    <p className="eyebrow rv-fade">How it works</p>
                    <h2 id="sheet-title" className="serif h-l" style={{ marginTop: 16 }}>
                        <Lines lines={[s.steps.title]} />
                    </h2>
                </div>
                <ol className="sheet__strip">
                    {s.steps.items.map((st, i) => (
                        <li key={st.title} className="sheet__frame rv-scale" style={{ '--d': `${i * 140}ms` } as React.CSSProperties}>
                            <span className="sheet__no">{String(i + 1).padStart(2, '0')}A</span>
                            <div className="sheet__img" aria-hidden="true">
                                <span className="serif">{st.title}</span>
                            </div>
                            <p>{st.desc}</p>
                        </li>
                    ))}
                </ol>
                <p className="sheet__deliver rv-fade">
                    {s.promise.chips.map((c, i) => (
                        <span key={c}>
                            {c}
                            {i < s.promise.chips.length - 1 && <i aria-hidden="true"> / </i>}
                        </span>
                    ))}
                </p>
            </div>
        </section>
    );
}

export default function EditorialPage() {
    return (
        <main className="svcp svcp--ed">
            <Cover />
            <Contents />
            <Feature />
            <ContactSheet />
            <ServiceFaq s={s} />
            <ServiceEnd s={s} />
            <NextService next={next} />
        </main>
    );
}
