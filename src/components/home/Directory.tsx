'use client';
import Link from 'next/link';
import Button from '../ui/Button';
import { INDUSTRIES, LOCATIONS } from '@/content/routes';
import { useReveal } from '@/lib/motion';

/**
 * Homepage hub links: industries grid, locations strip and the proof block.
 * Plain server-rendered links with descriptive anchors; the reveal is the
 * only client behaviour.
 */
export default function Directory() {
    const indRef = useReveal<HTMLElement>();
    const locRef = useReveal<HTMLElement>();
    const proofRef = useReveal<HTMLElement>();
    return (
        <>
            <section ref={indRef} className="dir" aria-labelledby="dir-ind-title">
                <div className="wrap">
                    <div className="dir__head">
                        <p className="eyebrow rv-fade">Industries</p>
                        <h2 id="dir-ind-title" className="serif h-l">
                            <span className="rv-line">
                                <span>
                                    Marketing that knows <em>your industry.</em>
                                </span>
                            </span>
                        </h2>
                        <p className="dir__intro rv-fade" style={{ '--d': '160ms' } as React.CSSProperties}>
                            Hospitals need compliance, builders need site visits, exporters need buyers abroad. Each industry gets its own playbook.
                        </p>
                    </div>
                    <ul className="dir__grid">
                        {INDUSTRIES.map((l, i) => (
                            <li key={l.href} className="rv-fade" style={{ '--i': i % 3 } as React.CSSProperties}>
                                <Link href={l.href} className="dir__card" prefetch={false}>
                                    <span className="dir__n">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="dir__label serif">Digital marketing for {l.label.toLowerCase()}</span>
                                    <small>{l.blurb}</small>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section ref={locRef} className="dir dir--loc" aria-labelledby="dir-loc-title">
                <div className="wrap dir__loc">
                    <h2 id="dir-loc-title" className="eyebrow rv-fade">
                        Where we work
                    </h2>
                    <p className="dir__places serif rv-fade" style={{ '--d': '120ms' } as React.CSSProperties}>
                        Based in{' '}
                        <Link href={LOCATIONS[0].href} className="dir__place" prefetch={false}>
                            Jaipur
                        </Link>
                        . Working across{' '}
                        {LOCATIONS.slice(1).map((l, i, arr) => (
                            <span key={l.href}>
                                <Link href={l.href} className="dir__place" prefetch={false}>
                                    {l.label}
                                </Link>
                                {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' and ' : ''}
                            </span>
                        ))}
                        .
                    </p>
                </div>
            </section>

            <section ref={proofRef} className="dir dir--proof" aria-labelledby="dir-proof-title">
                <div className="wrap dir__proof">
                    <h2 id="dir-proof-title" className="serif h-l">
                        <span className="rv-line">
                            <span>
                                Proof, <em>not promises.</em>
                            </span>
                        </span>
                    </h2>
                    <div className="dir__proof-side rv-fade" style={{ '--d': '160ms' } as React.CSSProperties}>
                        <p>
                            We only publish results our clients have approved, with the source for every number. Ask us on a call and we will walk you
                            through work relevant to your business, and exactly how we would measure yours.
                        </p>
                        <div className="dir__actions">
                            <Button href="/case-studies">How we report results</Button>
                            <Button href="/process" variant="ghost">
                                How we work
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
