'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../constants'; //
import { FaCrosshairs, FaChartLine } from 'react-icons/fa';

export default function PerformanceAds() {
    return (
        <section style={{
            padding: '80px 20px',
            background: 'transparent', // Uses the global grid/grain background
            position: 'relative',
            zIndex: 10,
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '80px', alignItems: 'center', width: '100%' }}>

                {/* --- LEFT SIDE: THE VISUAL (Sniper Scope UI) --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ position: 'relative', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    {/* Rotating Rings */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{ position: 'absolute', width: '300px', height: '300px', border: `1px dashed ${COLORS.gold}`, borderRadius: '50%', opacity: 0.3 }}
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        style={{ position: 'absolute', width: '240px', height: '240px', borderTop: `2px solid ${COLORS.gold}`, borderBottom: `2px solid ${COLORS.gold}`, borderRadius: '50%', opacity: 0.6 }}
                    />

                    {/* Center Crosshair */}
                    <div style={{ position: 'relative', zIndex: 2, color: COLORS.gold, fontSize: '3rem' }}>
                        <FaCrosshairs />
                    </div>

                    {/* HUD Data Text */}
                    <div style={{ position: 'absolute', bottom: '20px', right: '20px', fontFamily: 'monospace', color: COLORS.gold, fontSize: '0.8rem', textAlign: 'right', opacity: 0.8 }}>
                        TARGET: CONFIRMED<br />
                        ROAS: OPTIMIZED<br />
                        STATUS: <span style={{ color: '#fff' }}>LETHAL</span>
                    </div>

                    {/* Glowing Background Box */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        zIndex: -1
                    }} />
                </motion.div>


                {/* --- RIGHT SIDE: THE COPY --- */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header with "Glitch" accent */}
                    <h2 style={{
                        fontFamily: 'var(--font-oswald)',
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        textTransform: 'uppercase',
                        color: COLORS.text,
                        lineHeight: 1,
                        marginBottom: '30px'
                    }}>
                        Stop <span style={{ textDecoration: 'line-through', color: COLORS.textMuted }}>Wandering.</span><br />
                        Start <span style={{ color: COLORS.gold }}>Targeting.</span>
                    </h2>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                        <FaChartLine style={{ color: COLORS.gold, fontSize: '1.5rem' }} />
                        <span style={{ fontFamily: 'monospace', color: COLORS.gold, fontSize: '1rem', letterSpacing: '2px' }}>
                            // HIGH-PRECISION LEADS
                        </span>
                    </div>

                    <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '30px', maxWidth: '500px' }}>
                        No more guessing games. We bypass the noise to target your ideal customer directly. We don't just hunt for clicks; we engineer the <strong>Best ROAS</strong> in the game.
                    </p>

                    <p style={{ color: COLORS.textMuted, fontSize: '1rem', lineHeight: 1.6, borderLeft: `3px solid ${COLORS.gold}`, paddingLeft: '20px' }}>
                        "The results you've been waiting for. Delivered with surgical precision."
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: COLORS.gold, color: 'black' }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            marginTop: '40px',
                            padding: '16px 40px',
                            background: 'transparent',
                            border: `1px solid ${COLORS.gold}`,
                            color: COLORS.gold,
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-oswald)',
                            transition: 'all 0.3s'
                        }}
                    >
                        Acquire Targets
                    </motion.button>
                </motion.div>

            </div>
        </section>
    );
}