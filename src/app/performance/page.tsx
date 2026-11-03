'use client';
import React from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { COLORS } from '../../constants';
import Background from '../../components/Background';
import { FaBullhorn, FaChartLine, FaBrain, FaHandPaper, FaStop, FaFlask, FaMoneyBillWave, FaRocket, FaPercent } from 'react-icons/fa';

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

export default function PerformancePage() {
    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <main style={{
            minHeight: '100vh',
            overflowX: 'hidden',
            width: '100%',
            position: 'relative'
        }}>

            {/* GLOBAL BACKGROUND */}
            <Background />

            {/* ==================== HERO SECTION ==================== */}
            <section style={{
                position: 'relative',
                minHeight: '90vh',
                padding: '120px 20px 60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                zIndex: 1
            }}>
                <motion.div
                    style={{ zIndex: 10, textAlign: 'center', maxWidth: '100%', width: '100%', y: yHero }}
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeInUp} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <span style={{
                            border: `1px solid ${COLORS.gold}`, color: COLORS.gold,
                            padding: '8px 24px', borderRadius: '50px',
                            fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px',
                            display: 'flex', alignItems: 'center', gap: '10px',
                            background: 'rgba(11,10,8,0.85)'
                        }}>
                            <FaBullhorn /> Revenue Engines
                        </span>
                    </motion.div>

                    <motion.h1 variants={fadeInUp} style={{
                        fontFamily: 'var(--font-oswald)',
                        fontSize: 'clamp(2.5rem, 10vw, 7rem)',
                        lineHeight: 1,
                        textTransform: 'uppercase',
                        color: COLORS.text,
                        marginBottom: '30px',
                        wordWrap: 'break-word'
                    }}>
                        Creative That Converts.<br />
                        <span style={{ color: COLORS.gold }}>Period.</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} style={{
                        fontSize: 'clamp(1rem, 4vw, 1.4rem)',
                        color: '#ccc',
                        maxWidth: '700px',
                        margin: '0 auto',
                        lineHeight: 1.6,
                        padding: '0 10px'
                    }}>
                        We don't make "ads". We make revenue engines. High-CTR creatives tested to destruction. If it doesn't sell, it dies.
                    </motion.p>
                </motion.div>
            </section>


            {/* ==================== DEPLOYMENT VECTORS ==================== */}
            <section style={{
                padding: '80px 20px',
                background: 'transparent',
                position: 'relative',
                zIndex: 2
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '60px' }}
                    >
                        <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: '2.5rem', color: COLORS.text, textTransform: 'uppercase', letterSpacing: '2px' }}>
                            Growth <span style={{ color: COLORS.gold }}>Levers</span>
                        </h2>
                        <p style={{ color: '#888', maxWidth: '600px', margin: '10px auto' }}>
                            Scientific methodology applied to creativity.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                        <FeatureCard
                            icon={<FaFlask />}
                            title="A/B Testing"
                            desc="Darwinism for your ads. We test hundreds of variations to ensure only the strongest survive."
                        />
                        <FeatureCard
                            icon={<FaChartLine />}
                            title="Data-Driven"
                            desc="Decisions made by spreadsheets, not hunches. We follow the ROAS wherever it leads."
                        />
                        <FeatureCard
                            icon={<FaHandPaper />}
                            title="Scroll Stoppers"
                            desc="Visual hooks designed to arrest the thumb in 0.3 seconds. Attention is zero-sum, and we take it all."
                        />
                        <FeatureCard
                            icon={<FaBrain />}
                            title="Psychological Triggers"
                            desc="Copy and visuals that speak directly to desire and pain points. We bypass logic and speak to the lizard brain."
                        />
                    </div>
                </div>
            </section>


            {/* ==================== THE SHIFT (Old vs New) ==================== */}
            <section style={{
                padding: '100px 20px',
                position: 'relative',
                zIndex: 5,
                background: 'transparent'
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '80px', alignItems: 'center' }}>

                    {/* Visual: Burning Money */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        style={{ position: 'relative', height: '400px', width: '100%', overflow: 'hidden' }}
                    >
                        {[<FaMoneyBillWave />, "Brand Awareness", "Vanity Metrics", "Burning Cash", "Hope Marketing"].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 1, scale: 1 }}
                                whileInView={{ opacity: 0, scale: 0.5, y: -50, x: 20, rotate: 10 }}
                                viewport={{ margin: "-50px" }}
                                transition={{ duration: 1.5, delay: i * 0.2 }}
                                style={{
                                    position: 'absolute',
                                    top: `${15 + (i * 15)}%`,
                                    left: `${10 + (i * 12)}%`,
                                    color: COLORS.textMuted,
                                    fontSize: typeof item === 'string' ? 'clamp(0.8rem, 3vw, 1rem)' : '3rem',
                                    border: typeof item === 'string' ? '1px solid #333' : 'none',
                                    padding: typeof item === 'string' ? '8px 12px' : '0',
                                    borderRadius: '4px',
                                    background: 'rgba(0,0,0,0.8)',
                                    opacity: 0.7,
                                    whiteSpace: 'nowrap',
                                    zIndex: 2
                                }}
                            >
                                {item}
                            </motion.div>
                        ))}

                        <div style={{ position: 'absolute', bottom: '10px', left: '10px', color: '#ff4444', fontSize: '8rem', zIndex: 1 }}>
                            <FaPercent />
                        </div>

                        <h3 style={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            fontFamily: 'var(--font-oswald)', fontSize: 'clamp(2rem, 8vw, 3rem)',
                            color: COLORS.text, textAlign: 'center', zIndex: 3, width: '100%'
                        }}>
                            STOP <br /> <span style={{ color: '#ff4444' }}>GUESSING</span>
                        </h3>
                    </motion.div>

                    {/* Copy: The Value Prop */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: COLORS.text, marginBottom: '20px', textTransform: 'uppercase', lineHeight: 1.1 }}>
                            Art is <span style={{ color: '#ff4444' }}>Optional.</span><br />
                            <span style={{ color: COLORS.gold }}>Profit is Mandatory.</span>
                        </h2>

                        <p style={{ color: '#ccc', fontSize: '1rem', marginBottom: '20px', lineHeight: 1.7 }}>
                            We appreciate beauty, but we worship efficiency. Every pixel on the screen must justify its existence by contributing to the bottom line.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                                <FaRocket style={{ color: COLORS.gold, fontSize: '1.5rem', flexShrink: 0 }} />
                                <div>
                                    <h4 style={{ color: COLORS.text, margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>Scale Up</h4>
                                    <p style={{ color: '#888', margin: 0, fontSize: '0.85rem' }}>Once we find a winner, we pour fuel on the fire.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                                <FaChartLine style={{ color: COLORS.gold, fontSize: '1.5rem', flexShrink: 0 }} />
                                <div>
                                    <h4 style={{ color: COLORS.text, margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>Predictable Growth</h4>
                                    <p style={{ color: '#888', margin: 0, fontSize: '0.85rem' }}>Turn your ad spend into a vending machine. $1 in, $5 out.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* ==================== THE PROTOCOL (Process) ==================== */}
            <section style={{
                padding: '80px 20px',
                background: 'transparent',
                position: 'relative',
                zIndex: 2
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: '2.5rem', color: COLORS.text, marginBottom: '60px', textAlign: 'center', textTransform: 'uppercase' }}>
                        The <span style={{ color: COLORS.gold }}>Algorithm</span>
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <StepRow
                            num="01" title="Hypothesis Generation"
                            desc="We analyze the data and market trends to formulate creative angles that serve specific audience segments."
                        />
                        <StepRow
                            num="02" title="Rapid Production"
                            desc="We create dozens of variations—different hooks, different pacing, different CTAs—to find the local maximum."
                        />
                        <StepRow
                            num="03" title="Kill & Scale"
                            desc="We kill loser creatives immediately. We scale winners aggressively. No mercy for underperformance."
                        />
                    </div>
                </div>
            </section>


            {/* ==================== THE PROMISE (Prompt Bubbles) ==================== */}
            <section style={{
                padding: '100px 20px',
                background: 'transparent',
                position: 'relative',
                zIndex: 2
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <FaBullhorn style={{ fontSize: '3rem', color: COLORS.gold, marginBottom: '20px' }} />
                        <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(2rem, 6vw, 5rem)', textTransform: 'uppercase', color: COLORS.text, marginBottom: '20px', lineHeight: 1 }}>
                            Stop Burning <br /> <span style={{ color: COLORS.gold }}>Cash.</span>
                        </h2>
                        <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#ccc', lineHeight: 1.6, maxWidth: '800px', margin: '0 auto' }}>
                            Start printing it.
                        </p>
                    </motion.div>

                    {/* Floating Prompt Bubbles */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '15px',
                        marginTop: '60px'
                    }}>
                        {[
                            "Meta Ads",
                            "TikTok Ads",
                            "YouTube Shorts",
                            "Dynamic Creative",
                            "UGC Ads"
                        ].map((text, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                whileHover={{ scale: 1.05, color: COLORS.gold, borderColor: COLORS.gold }}
                                style={{
                                    padding: '12px 20px',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    borderRadius: '30px',
                                    color: '#888',
                                    fontSize: '0.85rem',
                                    background: 'rgba(0,0,0,0.5)',
                                    cursor: 'default',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                                    maxWidth: '90vw',
                                    whiteSpace: 'normal',
                                    textAlign: 'center',
                                    width: 'fit-content'
                                }}
                            >
                                <FaChartLine style={{ marginRight: '8px', verticalAlign: 'middle' }} /> {text}
                            </motion.div>
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: COLORS.gold, color: 'black' }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            marginTop: '50px',
                            padding: '18px 50px',
                            background: 'transparent',
                            border: `1px solid ${COLORS.gold}`,
                            color: COLORS.gold,
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-oswald)',
                            transition: 'all 0.3s',
                            width: 'fit-content'
                        }}
                    >
                        Boost ROAS
                    </motion.button>

                </div>
            </section>

        </main>
    );
}

// --- SUB COMPONENTS ---

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={{
                rest: { borderColor: 'rgba(255,255,255,0.1)', y: 0 },
                hover: { borderColor: COLORS.gold, y: -5 }
            }}
            transition={{ duration: 0.3 }}
            style={{
                padding: '30px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <motion.div
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                transition={{ duration: 0.4 }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at top right, rgba(212, 175, 55, 0.1), transparent 70%)`,
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ color: COLORS.gold, fontSize: '2rem', marginBottom: '10px' }}>{icon}</div>
                <h3 style={{ fontFamily: 'var(--font-oswald)', color: COLORS.text, fontSize: '1.4rem', margin: '0 0 10px 0', textTransform: 'uppercase' }}>{title}</h3>
                <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{desc}</p>
            </div>
        </motion.div>
    );
}

function StepRow({ num, title, desc }: { num: string, title: string, desc: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '30px'
            }}
        >
            <div style={{ fontFamily: 'var(--font-oswald)', fontSize: '3rem', color: 'rgba(255,255,255,0.1)', lineHeight: 1 }}>{num}</div>
            <div>
                <h3 style={{ color: COLORS.text, fontSize: '1.3rem', margin: '0 0 10px 0', fontFamily: 'var(--font-oswald)', textTransform: 'uppercase' }}>{title}</h3>
                <p style={{ color: '#888', lineHeight: 1.6, margin: 0, fontSize: '1rem' }}>{desc}</p>
            </div>
        </motion.div>
    );
}
