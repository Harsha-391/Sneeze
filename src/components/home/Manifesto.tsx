'use client';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useRef } from 'react';
import Button from '../ui/Button';
import { useReveal } from '@/lib/motion';

const TEXT =
    'We are a Jaipur creative agency for brands that have something worth saying and refuse to blend in. From scrappy startups to names entering a new chapter, we turn ideas into AI visuals, scroll-stopping social, performance ads and websites people actually remember.';

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
    const opacity = useTransform(progress, range, [0.14, 1]);
    return (
        <motion.span className="w" style={{ opacity }}>
            {word}
        </motion.span>
    );
}

export default function Manifesto() {
    const headRef = useReveal<HTMLDivElement>();
    const textRef = useRef<HTMLParagraphElement>(null);
    const actionsRef = useReveal<HTMLDivElement>();
    const lenis = useLenis();

    // Words light up one by one as the paragraph moves through the viewport.
    const { scrollYProgress } = useScroll({ target: textRef, offset: ['start 85%', 'end 55%'] });
    const words = TEXT.split(' ');

    return (
        <section className="manifesto" aria-labelledby="manifesto-title">
            <div className="wrap">
                <div ref={headRef}>
                    <h2 id="manifesto-title" className="manifesto__title serif h-xl">
                        <span className="rv-line">
                            <span>Content that{' '}</span>
                        </span>
                        <span className="rv-line" style={{ '--i': 1 } as React.CSSProperties}>
                            <span>
                                <em>hits</em> different.
                            </span>
                        </span>
                    </h2>
                    <svg className="manifesto__flourish rv-draw" viewBox="0 0 70 20" fill="none" aria-hidden="true" style={{ '--d': '300ms' } as React.CSSProperties}>
                        <path pathLength={1} d="M2 10c8-8 14-8 20 0s12 8 18 0 12-8 18 0 8 6 10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>

                <p ref={textRef} className="manifesto__text lead serif">
                    <span className="sr-only">{TEXT}</span>
                    <span aria-hidden="true">
                        {words.map((w, i) => {
                            const start = i / words.length;
                            const end = start + 1.6 / words.length;
                            return <Word key={i} word={`${w}${i < words.length - 1 ? ' ' : ''}`} progress={scrollYProgress} range={[start, Math.min(1, end)]} />;
                        })}
                    </span>
                </p>

                <div ref={actionsRef} className="manifesto__actions">
                    <div className="rv-fade">
                        <Button href="/project" variant="solid">
                            Request a Proposal
                        </Button>
                    </div>
                    <div className="rv-fade" style={{ '--i': 1 } as React.CSSProperties}>
                        <Button
                            href="/#process"
                            onClick={(e) => {
                                if (!lenis) return;
                                e.preventDefault();
                                lenis.scrollTo('#process', { offset: -40, duration: 1.6 });
                            }}
                        >
                            How We Work
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
