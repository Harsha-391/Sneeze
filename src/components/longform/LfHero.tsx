'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import Button from '../ui/Button';
import { usePageReady } from '@/lib/motion';

export type HeroVariant = 'service' | 'pillar' | 'industry' | 'combo' | 'location' | 'post' | 'page';

/**
 * Long-form page hero. The H1, lede and panel are server-rendered props; this
 * component only adds `is-in` once the page curtain lifts, which plays the
 * CSS reveal. Each page type gets its own composition.
 */
export default function LfHero({
    variant,
    crumbs,
    eyebrow,
    h1,
    lede,
    meta,
    panel,
    primary,
    secondary,
    backdrop,
}: {
    variant: HeroVariant;
    crumbs: ReactNode;
    eyebrow?: string;
    h1: string;
    lede: string;
    /** Small line under the lede (e.g. byline + dates on posts). */
    meta?: ReactNode;
    /** Right-hand panel (highlights list, place name, etc.). */
    panel?: ReactNode;
    primary?: { href: string; label: string };
    secondary?: { href: string; label: string };
    /** Huge background word for location/pillar heroes (decorative). */
    backdrop?: string;
}) {
    const ready = usePageReady();
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (ready) ref.current?.classList.add('is-in');
    }, [ready]);

    return (
        <section className={`lf-hero lf-hero--${variant}`} aria-labelledby="page-title">
            {backdrop && (
                <span className="lf-hero__backdrop display" aria-hidden="true">
                    {backdrop}
                </span>
            )}
            <div ref={ref} className="wrap lf-hero__inner">
                {crumbs}
                <div className={`lf-hero__grid${panel ? ' lf-hero__grid--panel' : ''}`}>
                    <div className="lf-hero__main">
                        {eyebrow && (
                            <p className="eyebrow rv-fade" style={{ '--d': '60ms' } as React.CSSProperties}>
                                {eyebrow}
                            </p>
                        )}
                        <h1 id="page-title" className={`lf-hero__title serif${h1.length > 52 ? ' lf-hero__title--long' : ''}`}>
                            <span className="rv-line" style={{ '--d': '100ms' } as React.CSSProperties}>
                                <span>{h1}</span>
                            </span>
                        </h1>
                        <p className="lf-hero__lede rv-fade" style={{ '--d': '300ms' } as React.CSSProperties}>
                            {lede}
                        </p>
                        {meta && (
                            <div className="lf-hero__meta rv-fade" style={{ '--d': '380ms' } as React.CSSProperties}>
                                {meta}
                            </div>
                        )}
                        {(primary || secondary) && (
                            <div className="lf-hero__actions rv-fade" style={{ '--d': '440ms' } as React.CSSProperties}>
                                {primary && (
                                    <Button href={primary.href} variant="solid">
                                        {primary.label}
                                    </Button>
                                )}
                                {secondary && (
                                    <Button href={secondary.href} variant="outline">
                                        {secondary.label}
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                    {panel && (
                        <div className="lf-hero__panel rv-fade" style={{ '--d': '360ms' } as React.CSSProperties}>
                            {panel}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
