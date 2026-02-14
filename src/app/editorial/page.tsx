'use client';
import React from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { COLORS } from '../../constants';
import Background from '../../components/Background';
import { FaCameraRetro, FaEye, FaFingerprint, FaPaintBrush, FaMagic, FaImage, FaFilm, FaLayerGroup, FaGem } from 'react-icons/fa';

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

export default function EditorialPage() {
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
                            background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(5px)'
                        }}>
                            <FaCameraRetro /> Visual Alchemy
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
                        Silence The Noise.<br />
                        Visuals That <span style={{ color: COLORS.gold }}>Scream.</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} style={{
                        fontSize: 'clamp(1rem, 4vw, 1.4rem)',
                        color: '#ccc',
                        maxWidth: '700px',
                        margin: '0 auto',
                        lineHeight: 1.6,
                        padding: '0 10px'
                    }}>
                        We blend high fashion aesthetics with raw, gritty textures.
                        Imagery that isn't just seen—it's felt.
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
                            The <span style={{ color: COLORS.gold }}>Aesthetic</span>
                        </h2>
                        <p style={{ color: '#888', maxWidth: '600px', margin: '10px auto' }}>
                            A curated approach to visual dominance.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                        <FeatureCard
                            icon={<FaMagic />}
                            title="Art Direction"
                            desc="Conceptualizing the impossible and making it real. We don't just shoot; we build worlds."
                        />
                        <FeatureCard
                            icon={<FaEye />}
                            title="High Fidelity"
                            desc="Every pixel perfected. From mobile screens to Times Square billboards, quality is non-negotiable."
                        />
                        <FeatureCard
                            icon={<FaFingerprint />}
                            title="Mood Engineering"
                            desc="Dialing in the exact emotional resonance of your brand through color, shadow, and composition."
                        />
                        <FeatureCard
                            icon={<FaPaintBrush />}
                            title="Post-Production"
                            desc="Where good becomes legendary. Our retouching and grading process is our secret sauce."
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

                    {/* Visual: Shredding Stock Photos */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        style={{ position: 'relative', height: '400px', width: '100%', overflow: 'hidden' }}
                    >
                        {[<FaImage />, "Stock Photos", "Flat Lighting", "Safe Angles", "Boring Composition"].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 1, scale: 1 }}
                                whileInView={{ opacity: 0, scale: 0.8, y: 50, x: -20, rotate: -15, filter: 'blur(2px)' }}
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

                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', color: '#ff4444', fontSize: '8rem', zIndex: 1, opacity: 0.2 }}>
                            <FaLayerGroup />
                        </div>

                        <h3 style={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            fontFamily: 'var(--font-oswald)', fontSize: 'clamp(2rem, 8vw, 3rem)',
                            color: COLORS.text, textAlign: 'center', zIndex: 3, width: '100%'
                        }}>
                            NO MORE <br /> <span style={{ color: '#ff4444' }}>MEDIOCRE</span>
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
                            Generic is <span style={{ color: '#ff4444' }}>Invisible.</span><br />
                            <span style={{ color: COLORS.gold }}>Own Your Aesthetic.</span>
                        </h2>

                        <p style={{ color: '#ccc', fontSize: '1rem', marginBottom: '20px', lineHeight: 1.7 }}>
                            In a sea of sameness, only the bold survive. We create visuals that stop the scroll and imprint your brand into the retina of your audience.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                                <FaGem style={{ color: COLORS.gold, fontSize: '1.5rem', flexShrink: 0 }} />
                                <div>
                                    <h4 style={{ color: COLORS.text, margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>Premium Polish</h4>
                                    <p style={{ color: '#888', margin: 0, fontSize: '0.85rem' }}>Visuals that scream "luxury" and "authority" instantly.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                                <FaFilm style={{ color: COLORS.gold, fontSize: '1.5rem', flexShrink: 0 }} />
                                <div>
                                    <h4 style={{ color: COLORS.text, margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>Cinematic Storytelling</h4>
                                    <p style={{ color: '#888', margin: 0, fontSize: '0.85rem' }}>Every image tells a story. We make sure it's an epic.</p>
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
                        The <span style={{ color: COLORS.gold }}>Workflow</span>
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <StepRow
                            num="01" title="Concept Extraction"
                            desc="We dig deep into your brand's soul to extract the visual core. Moodboards, lighting references, and style guides."
                        />
                        <StepRow
                            num="02" title="The Shoot / Gen"
                            desc="Whether physical photography or AI synthesis, we execute with precision. Capturing the raw material for greatness."
                        />
                        <StepRow
                            num="03" title="The Grade"
                            desc="Applying our signature color science and texture overlays. This is where the magic happens."
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
                        <FaCameraRetro style={{ fontSize: '3rem', color: COLORS.gold, marginBottom: '20px' }} />
                        <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(2rem, 6vw, 5rem)', textTransform: 'uppercase', color: COLORS.text, marginBottom: '20px', lineHeight: 1 }}>
                            Your Brand, In <br /> <span style={{ color: COLORS.gold }}>High Definition.</span>
                        </h2>
                        <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#ccc', lineHeight: 1.6, maxWidth: '800px', margin: '0 auto' }}>
                            Ready to upgrade your visual language?
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
                            "Lookbook Shoot",
                            "Product Editorial",
                            "Brand Campaign",
                            "Social Media Assets",
                            "Billboards"
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
                                    backdropFilter: 'blur(5px)',
                                    cursor: 'default',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                                    maxWidth: '90vw',
                                    whiteSpace: 'normal',
                                    textAlign: 'center',
                                    width: 'fit-content'
                                }}
                            >
                                <FaMagic style={{ marginRight: '8px', verticalAlign: 'middle' }} /> {text}
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
                        Book A Shoot
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
