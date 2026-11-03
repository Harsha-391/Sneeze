'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Button from '../ui/Button';
import { HOME_SEO } from '@/content/site';
import { useIntroDone, useIsVisible, usePageReady, usePauseOffscreen, useReveal } from '@/lib/motion';
import { useLenis } from 'lenis/react';

const LINES: React.ReactNode[] = [
    'We make brands',
    <>
        <em>impossible</em> to
    </>,
    'scroll past.',
];

export function Swoosh({ flip = false }: { flip?: boolean }) {
    return (
        <svg viewBox="0 0 60 18" fill="none" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined} className="rv-draw">
            <path pathLength={1} d="M2 12C14 4 26 3 36 8s16 6 22-2" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
            <path pathLength={1} d="M12 16c8-3 16-3 24 0" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" opacity=".6" />
        </svg>
    );
}

export default function Hero() {
    const introDone = useIntroDone();
    const pageReady = usePageReady();
    const topRef = useRef<HTMLDivElement>(null);
    const belowRef = useReveal<HTMLDivElement>();
    const glowRef = usePauseOffscreen<HTMLDivElement>();
    const mediaRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaVisible = useIsVisible(mediaRef, '200px');
    const lenis = useLenis();

    // Media card grows to full size as it scrolls up, with an inner parallax.
    const { scrollYProgress: enter } = useScroll({ target: mediaRef, offset: ['start end', 'start 35%'] });
    const scale = useTransform(enter, [0, 1], [0.86, 1]);
    const { scrollYProgress: pass } = useScroll({ target: mediaRef, offset: ['start end', 'end start'] });
    const innerY = useTransform(pass, [0, 1], ['-7%', '7%']);

    // The title drifts up and fades as you leave the hero.
    const { scrollY } = useScroll();
    const titleY = useTransform(scrollY, [0, 700], [0, -120]);
    const titleOpacity = useTransform(scrollY, [0, 600], [1, 0.25]);

    // Video only decodes while it's on screen.
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        if (mediaVisible) v.play().catch(() => {});
        else v.pause();
    }, [mediaVisible]);

    // Reveal once the preloader (first visit) or the page curtain (navigation) is out of the way.
    useEffect(() => {
        if (introDone && pageReady) topRef.current?.classList.add('is-in');
    }, [introDone, pageReady]);

    return (
        <section className="hero" aria-labelledby="hero-title">
            <div ref={glowRef} aria-hidden="true">
                <div className="hero__glow loop" />
            </div>

            <div ref={topRef} className="wrap">
                <motion.div style={{ y: titleY, opacity: titleOpacity }}>
                    <h1 id="hero-title" className="hero__title serif h-hero">
                        {/* Keyword kicker inside the H1: tells Google what we are and where */}
                        <span className="badge hero__kicker rv-fade">
                            <FaMapMarkerAlt aria-hidden="true" /> {HOME_SEO.kicker}
                        </span>
                        <span className="sr-only">: </span>
                        {LINES.map((line, i) => (
                            <span key={i} className="rv-line" style={{ '--i': i } as React.CSSProperties}>
                                <span>{line}{' '}</span>
                            </span>
                        ))}
                    </h1>

                    <p className="hero__sub rv-fade" style={{ '--d': '450ms' } as React.CSSProperties}>
                        <Swoosh />
                        <span>For ambitious brands in Jaipur &amp; beyond, ready to go viral</span>
                        <Swoosh flip />
                    </p>

                    <div className="hero__cta rv-fade" style={{ '--d': '600ms' } as React.CSSProperties}>
                        <Button href="/project" variant="solid">
                            Start a Project
                        </Button>
                    </div>
                </motion.div>
            </div>

            <div ref={belowRef} className="wrap hero__below">
                <div className="hero__blurb">
                    <p className="lead serif rv-fade">
                        An AI-first creative studio engineering content, ads &amp; websites that <em>convert</em>.
                    </p>
                    <div className="rv-fade" style={{ '--d': '150ms', display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' } as React.CSSProperties}>
                        <Button
                            href="/#services"
                            onClick={(e) => {
                                if (!lenis) return;
                                e.preventDefault();
                                lenis.scrollTo('#services', { offset: -40, duration: 1.6 });
                            }}
                        >
                            Our Services
                        </Button>
                        <span className="hero__scroll">
                            <span />
                            Scroll
                        </span>
                    </div>
                </div>

                <div className="rv-fade" style={{ '--d': '200ms' } as React.CSSProperties}>
                <motion.div ref={mediaRef} className="hero__media" style={{ scale }} data-cursor="view" data-cursor-label="Reel">
                    <motion.div style={{ y: innerY, position: 'absolute', inset: 0 }}>
                        {/* Rendered with Remotion: see /remotion (npm run render) */}
                        <video
                            ref={videoRef}
                            poster="/reel-poster.jpg"
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-label="Sneeze Media showreel"
                        >
                            <source src="/reel.webm" type="video/webm" />
                            <source src="/reel.mp4" type="video/mp4" />
                        </video>
                    </motion.div>
                    <span className="hero__media-tag">
                        <i className="loop" /> Showreel 2026
                    </span>
                </motion.div>
                </div>
            </div>
        </section>
    );
}
