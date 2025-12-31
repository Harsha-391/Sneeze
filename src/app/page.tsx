'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { FaRobot, FaInstagram, FaCameraRetro, FaBullhorn, FaCode, FaFingerprint, FaSkull, FaBolt, FaEye, FaFire, FaGem, FaGhost } from 'react-icons/fa';

export default function Home() {
    const router = useRouter();

    // --- HIGH PERFORMANCE MOUSE TRACKER ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // --- CONFIG ---
    const colors = {
        gold: '#D4AF37',
        black: '#050505',
        text: '#ffffff',
        textMuted: '#888888',
    };

    // --- ANIMATIONS ---
    const paintReveal = {
        hidden: { width: '120%' },
        visible: {
            width: '0%',
            // FIX: Changed specific numbers to "easeInOut" to fix TypeScript error
            transition: { duration: 1.2, ease: "easeInOut", delay: 0.1 }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 1.4 } }
    };

    const services = [
        { title: "AI-Gen Visuals", iconMain: <FaRobot />, iconHover: <FaSkull />, desc: "We engineer imaginable posters and AI video synthesis.", tags: ["MidJourney", "Runway"] },
        { title: "Social Cults", iconMain: <FaInstagram />, iconHover: <FaFire />, desc: "Algorithm-hacking reels and community warfare.", tags: ["Reels", "Viral"] },
        { title: "Editorial Stills", iconMain: <FaCameraRetro />, iconHover: <FaEye />, desc: "Editorial grade photography. Texture, grain, and vibe.", tags: ["Fashion", "Product"] },
        { title: "Performance Ads", iconMain: <FaBullhorn />, iconHover: <FaBolt />, desc: "High-CTR creatives designed purely for conversion.", tags: ["ROAS", "PPC"] },
        { title: "UGC Factory", iconMain: <FaFingerprint />, iconHover: <FaGhost />, desc: "Authenticity scales. Creators that look like friends.", tags: ["TikTok", "Raw"] },
        { title: "Web Experiences", iconMain: <FaCode />, iconHover: <FaGem />, desc: "Fast, SEO-optimized, and animated digital headquarters.", tags: ["Next.js", "React"] }
    ];

    return (
        <div
            style={{ backgroundColor: colors.black, minHeight: '100vh', color: colors.text, overflowX: 'hidden', fontFamily: 'var(--font-inter)', position: 'relative' }}
            onMouseMove={handleMouseMove}
        >

            {/* --- GPU-ACCELERATED LAYERS --- */}

            {/* 1. Static Noise (Cached Layer) */}
            <div style={{
                position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50, opacity: 0.05,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }} />

            {/* 2. Spotlight Mask (Hardware Accelerated) */}
            <motion.div
                style={{
                    background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(212, 175, 55, 0.12), transparent 80%)`,
                    position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
                    willChange: 'background'
                }}
            />

            {/* 3. The Grid (Static Background) */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: 0,
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
            }}></div>

            {/* --- HERO --- */}
            <section style={{ height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 10, padding: '20px' }}>

                {/* Breathing Glow */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: 'absolute', width: '600px', height: '600px',
                        background: `radial-gradient(circle, ${colors.gold} 0%, transparent 60%)`,
                        borderRadius: '50%', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none'
                    }}
                />

                <div style={{ position: 'relative', display: 'inline-block', padding: '20px 0', zIndex: 2 }}>
                    <h1 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(4rem, 12vw, 11rem)', lineHeight: 0.9, margin: 0, textTransform: 'uppercase', position: 'relative', letterSpacing: '-3px' }}>
                        SNEEZE<span style={{ color: colors.gold }}>.</span> MEDIA
                    </h1>
                    <motion.div
                        style={{
                            position: 'absolute', top: 0, left: 0, height: '100%', width: '100%',
                            backgroundColor: colors.black, zIndex: 3, transform: 'skewX(-15deg)', transformOrigin: 'left'
                        }}
                        variants={paintReveal} initial="hidden" animate="visible"
                    />
                </div>

                <motion.div
                    variants={fadeInUp} initial="hidden" animate="visible"
                    style={{ textAlign: 'center', position: 'relative', zIndex: 5 }}
                >
                    <p style={{ maxWidth: '600px', margin: '30px auto', fontSize: '1.1rem', color: colors.textMuted, lineHeight: 1.6, letterSpacing: '1px', textTransform: 'uppercase' }}>
                        The Full-Stack Digital Agency.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05, borderColor: colors.gold, color: colors.gold, boxShadow: `0 0 25px rgba(212, 175, 55, 0.2)` }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push('/project')}
                        style={{
                            padding: '18px 50px', fontSize: '1rem', fontWeight: '600',
                            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.2)', color: 'white',
                            borderRadius: '2px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '2px'
                        }}
                    >
                        Start Project
                    </motion.button>
                </motion.div>
            </section>

            {/* --- MARQUEE --- */}
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', borderTop: `1px solid ${colors.gold}`, borderBottom: `1px solid ${colors.gold}`, background: 'black', padding: '15px 0', position: 'relative', zIndex: 10 }}>
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    style={{ display: 'inline-block', fontSize: '1.1rem', color: colors.gold, fontFamily: 'var(--font-oswald)', letterSpacing: '3px' }}
                >
                    DIGITAL MARKETING | AI INTEGRATION | VIRAL CONTENT | BRANDING | UGC | WEB DEV | SEO | AD CREATIVES | DIGITAL MARKETING | AI INTEGRATION | VIRAL CONTENT |
                </motion.div>
            </div>

            {/* --- SERVICES GRID --- */}
            <section style={{ padding: '120px 20px', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                <motion.h3
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    style={{ fontFamily: 'var(--font-oswald)', fontSize: '2rem', textAlign: 'center', marginBottom: '60px', color: '#444', letterSpacing: '6px', textTransform: 'uppercase' }}
                >
                    Capabilities
                </motion.h3>

                {/* Grid Optimization: Fixed Sizing */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '30px',
                    width: '100%'
                }}>
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} colors={colors} />
                    ))}
                </div>
            </section>

            {/* --- FOOTER --- */}
            <section style={{ borderTop: '1px solid #111', padding: '100px 20px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
                <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(2rem, 5vw, 4rem)', textTransform: 'uppercase', marginBottom: '30px', color: '#333' }}>
                    Ready to <span style={{ color: colors.gold }}>Dominate?</span>
                </h2>
            </section>
        </div>
    );
}

// --- OPTIMIZED CARD COMPONENT ---
function ServiceCard({ service, index, colors }: { service: any, index: number, colors: any }) {
    return (
        <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={{
                rest: { borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(10, 10, 10, 0.8)' },
                hover: { borderColor: colors.gold, backgroundColor: 'rgba(10, 10, 10, 0.95)', zIndex: 10 }
            }}
            transition={{ duration: 0.3 }}
            style={{
                padding: '40px',
                borderRadius: '0px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                height: 'auto',
                minHeight: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderWidth: '1px',
                borderStyle: 'solid',
            }}
        >
            {/* Shine Gradient */}
            <motion.div
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                transition={{ duration: 0.4 }}
                style={{
                    position: 'absolute', inset: 0,
                    background: `radial-gradient(circle at top right, rgba(212, 175, 55, 0.1), transparent 70%)`,
                    pointerEvents: 'none'
                }}
            />

            {/* Icons Container */}
            <div style={{ height: '50px', marginBottom: '25px', position: 'relative', zIndex: 1 }}>
                {/* Main Icon (Fades Out) */}
                <motion.div
                    variants={{ rest: { opacity: 1, y: 0 }, hover: { opacity: 0, y: -10 } }}
                    style={{ fontSize: '2.5rem', color: '#444', position: 'absolute' }}
                >
                    {service.iconMain}
                </motion.div>

                {/* Gold Hover Icon (Fades In) */}
                <motion.div
                    variants={{ rest: { opacity: 0, y: 10 }, hover: { opacity: 1, y: 0 } }}
                    style={{ fontSize: '2.5rem', color: colors.gold, position: 'absolute', filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.4))' }}
                >
                    {service.iconHover}
                </motion.div>
            </div>

            {/* Text Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <h4 style={{ fontFamily: 'var(--font-oswald)', fontSize: '1.4rem', margin: '0 0 15px 0', textTransform: 'uppercase', color: 'white', letterSpacing: '1px' }}>
                    {service.title}
                </h4>
                <p style={{ color: '#888', lineHeight: 1.6, marginBottom: '25px', fontSize: '0.95rem', fontWeight: '300' }}>
                    {service.desc}
                </p>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                {service.tags.map((tag: string, i: number) => (
                    <motion.span
                        key={i}
                        variants={{ rest: { color: '#555', borderColor: 'rgba(255,255,255,0.1)' }, hover: { color: colors.gold, borderColor: colors.gold } }}
                        style={{
                            fontSize: '0.7rem', padding: '6px 12px',
                            borderWidth: '1px', borderStyle: 'solid',
                            letterSpacing: '1px', textTransform: 'uppercase'
                        }}
                    >
                        {tag}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
}