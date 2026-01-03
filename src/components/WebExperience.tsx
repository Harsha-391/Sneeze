'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../constants';
import { FaGem, FaSearchDollar } from 'react-icons/fa';
import { SiNextdotjs, SiReact, SiWordpress, SiShopify, SiWix } from 'react-icons/si';

export default function WebExperience() {
    const techStack = [
        { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "React", icon: <SiReact /> },
        { name: "WordPress", icon: <SiWordpress /> },
        { name: "Shopify", icon: <SiShopify /> },
        { name: "SEO", icon: <FaSearchDollar /> },
        { name: "Wix", icon: <SiWix /> }
    ];

    return (
        <section style={{
            padding: '120px 20px',
            background: 'transparent',
            position: 'relative',
            zIndex: 10,
            maxWidth: '1280px',
            margin: '0 auto',
            // REMOVED overflow: 'hidden' to prevent badges from clipping
        }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '80px', alignItems: 'center' }}>

                {/* --- LEFT SIDE: THE VISUAL --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{
                        position: 'relative',
                        height: '450px',
                        // Added padding so badges don't hit the screen edge on mobile
                        padding: '0 30px'
                    }}
                >
                    {/* The Premium Browser Frame */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            width: '100%', height: '100%',
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '20px',
                            backdropFilter: 'blur(20px)',
                            position: 'relative',
                            zIndex: 2,
                            boxShadow: `0 30px 60px rgba(0,0,0,0.5), inset 0 0 20px rgba(212, 175, 55, 0.05)`
                        }}
                    >
                        <div style={{ padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '8px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                        </div>

                        <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ height: '30px', width: '60%', background: 'rgba(212, 175, 55, 0.2)', borderRadius: '4px' }} />
                            <div style={{ height: '150px', width: '100%', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                                {[1, 2, 3].map(i => <div key={i} style={{ height: '60px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }} />)}
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating Tech Chips */}
                    {techStack.map((tech, idx) => (
                        <motion.div
                            key={idx}
                            animate={{
                                y: [0, idx % 2 === 0 ? -30 : 30, 0],
                                rotate: idx % 2 === 0 ? [0, 5, 0] : [0, -5, 0]
                            }}
                            transition={{ duration: 5 + idx, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                position: 'absolute',
                                top: `${15 + idx * 14}%`, // Slightly increased spacing
                                // Adjusted offsets to stay within the padded container
                                right: idx % 2 === 0 ? '0px' : 'auto',
                                left: idx % 2 !== 0 ? '0px' : 'auto',
                                background: COLORS.black,
                                border: `1px solid ${COLORS.gold}`,
                                color: COLORS.gold,
                                padding: '10px 18px',
                                borderRadius: '50px',
                                fontSize: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                zIndex: 5,
                                boxShadow: `0 10px 20px rgba(0,0,0,0.5)`,
                                willChange: 'transform',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {tech.icon} {tech.name}
                        </motion.div>
                    ))}
                </motion.div>

                {/* --- RIGHT SIDE: THE COPY --- */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                        <FaGem style={{ color: COLORS.gold, fontSize: '1.5rem' }} />
                        <span style={{ fontFamily: 'monospace', color: COLORS.gold, fontSize: '1rem', letterSpacing: '2px' }}>
                            // BESPOKE DIGITAL HEADQUARTERS
                        </span>
                    </div>

                    <h2 style={{
                        fontFamily: 'var(--font-oswald)',
                        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                        textTransform: 'uppercase',
                        color: COLORS.text,
                        lineHeight: 1,
                        marginBottom: '30px'
                    }}>
                        Liquid Smooth <br />
                        <span style={{ color: COLORS.gold }}>Experiences.</span>
                    </h2>

                    <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '40px', maxWidth: '550px' }}>
                        We build high-end, expensive-looking digital assets that perform as well as they look. From <strong>Next.js</strong> speed to <strong>Shopify</strong> conversions, we engineer websites that act as your most lethal sales tool.
                    </p>

                    <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
                        <div>
                            <h4 style={{ color: COLORS.gold, fontSize: '1.5rem', margin: '0 0 5px 0', fontFamily: 'var(--font-oswald)' }}>100/100</h4>
                            <p style={{ color: COLORS.textMuted, fontSize: '0.8rem', margin: 0, textTransform: 'uppercase' }}>Core Web Vitals</p>
                        </div>
                        <div style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '40px' }}>
                            <h4 style={{ color: COLORS.gold, fontSize: '1.5rem', margin: '0 0 5px 0', fontFamily: 'var(--font-oswald)' }}>SEO+</h4>
                            <p style={{ color: COLORS.textMuted, fontSize: '0.8rem', margin: 0, textTransform: 'uppercase' }}>Visibility First</p>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: COLORS.gold, color: 'black' }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: '18px 45px',
                            background: 'transparent',
                            color: COLORS.gold,
                            border: `1px solid ${COLORS.gold}`,
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-oswald)',
                            borderRadius: '4px',
                            transition: 'all 0.3s'
                        }}
                    >
                        Start Your Build
                    </motion.button>
                </motion.div>

            </div>
        </section>
    );
}