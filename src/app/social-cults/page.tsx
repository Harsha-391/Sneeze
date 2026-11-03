'use client';
import React from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { COLORS } from '../../constants';
import Background from '../../components/Background';
import { FaFire, FaGhost, FaBolt, FaLaughSquint, FaUsers, FaSkull, FaInfinity, FaBullhorn, FaGlobe, FaBomb } from 'react-icons/fa';

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

export default function SocialCultsPage() {
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
                            <FaFire /> Viral Engineering
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
                        We Don't Build Followers.<br />
                        We Build <span style={{ color: COLORS.gold }}>Cults.</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} style={{
                        fontSize: 'clamp(1rem, 4vw, 1.4rem)',
                        color: '#ccc',
                        maxWidth: '700px',
                        margin: '0 auto',
                        lineHeight: 1.6,
                        padding: '0 10px'
                    }}>
                        Algorithms are the new battleground. We hack the feed to turn passive scrollers into obsessed evangelists.
                        Your brand isn't a product. It's a movement.
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
                            Weapons of <span style={{ color: COLORS.gold }}>Influence</span>
                        </h2>
                        <p style={{ color: '#888', maxWidth: '600px', margin: '10px auto' }}>
                            Tools designed to penetrate the noise and command attention.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                        <FeatureCard
                            icon={<FaBolt />}
                            title="Algorithmic Warfare"
                            desc="Reverse-engineering the recommendation engine to guarantee reach. We feed the algorithm exactly what it craves."
                        />
                        <FeatureCard
                            icon={<FaUsers />}
                            title="Community Design"
                            desc="From Discord to DMs, we build spaces where your brand is the religion. Fostering deep, unbreakable loyalty."
                        />
                        <FeatureCard
                            icon={<FaGlobe />}
                            title="Trend Jacking"
                            desc="Identify and ride cultural waves before they crest. We insert your narrative into the global conversation instantly."
                        />
                        <FeatureCard
                            icon={<FaLaughSquint />}
                            title="Meme Engineering"
                            desc="Weaponized humor that travels faster than ads. Content that people actually share, ensuring organic virality."
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

                    {/* Visual: Burning Old Methods */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        style={{ position: 'relative', height: '400px', width: '100%', overflow: 'hidden' }}
                    >
                        {[<FaBullhorn />, "Vanilla Posts", "Generic Hashtags", "Begging for Likes", "Safe Branding"].map((item, i) => (
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
                            <FaFire />
                        </div>

                        <h3 style={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            fontFamily: 'var(--font-oswald)', fontSize: 'clamp(2rem, 8vw, 3rem)',
                            color: COLORS.text, textAlign: 'center', zIndex: 3, width: '100%'
                        }}>
                            BURN THE <br /> <span style={{ color: '#ff4444' }}>BORING</span>
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
                            Safety is <span style={{ color: '#ff4444' }}>Suicide.</span><br />
                            <span style={{ color: COLORS.gold }}>Polarize to Magnetize.</span>
                        </h2>

                        <p style={{ color: '#ccc', fontSize: '1rem', marginBottom: '20px', lineHeight: 1.7 }}>
                            In the attention economy, indifference is death. If they aren't talking about you, you don't exist. We create the spark that starts the wildfire.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                                <FaBomb style={{ color: COLORS.gold, fontSize: '1.5rem', flexShrink: 0 }} />
                                <div>
                                    <h4 style={{ color: COLORS.text, margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>Explosive Growth</h4>
                                    <p style={{ color: '#888', margin: 0, fontSize: '0.85rem' }}>Campaigns designed to break the internet, not just exist on it.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                                <FaGhost style={{ color: COLORS.gold, fontSize: '1.5rem', flexShrink: 0 }} />
                                <div>
                                    <h4 style={{ color: COLORS.text, margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>Shadow Influence</h4>
                                    <p style={{ color: '#888', margin: 0, fontSize: '0.85rem' }}>Subtle seeding in communities that feels organic, not corporate.</p>
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
                        The <span style={{ color: COLORS.gold }}>Ritual</span>
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <StepRow
                            num="01" title="Culture Audit"
                            desc="We infiltrate the subcultures your audience lives in. We learn their language, their jokes, and their fears."
                        />
                        <StepRow
                            num="02" title="Content Bombardment"
                            desc="High-volume, high-variance content testing. We throw everything at the wall and scientifically measure what sticks."
                        />
                        <StepRow
                            num="03" title="Loop Optimization"
                            desc="Once a winner is found, we double down. We optimize the feedback loop until the algorithm has no choice but to promote you."
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
                        <FaInfinity style={{ fontSize: '3rem', color: COLORS.gold, marginBottom: '20px' }} />
                        <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(2rem, 6vw, 5rem)', textTransform: 'uppercase', color: COLORS.text, marginBottom: '20px', lineHeight: 1 }}>
                            Attention Is The<br /> Only <span style={{ color: COLORS.gold }}>Currency.</span>
                        </h2>
                        <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#ccc', lineHeight: 1.6, maxWidth: '800px', margin: '0 auto' }}>
                            Don't pay for attention. Command it.
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
                            "Viral Reel Campaign",
                            "Discord Community Setup",
                            "Twitter/X Raids",
                            "Influencer Seeding",
                            "Meme Strategy"
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
                                <FaBolt style={{ marginRight: '8px', verticalAlign: 'middle' }} /> {text}
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
                        Join The Cult
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
