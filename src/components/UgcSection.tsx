'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../constants';
import { FaFingerprint, FaVideo, FaUsers } from 'react-icons/fa';

export default function UgcSection() {
    return (
        <section style={{
            padding: '80px 20px',
            background: 'transparent',
            position: 'relative',
            zIndex: 10,
            maxWidth: '1280px',
            margin: '0 auto'
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '80px',
                alignItems: 'center'
            }}>

                {/* --- LEFT SIDE: THE COPY --- */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                        <FaFingerprint style={{ color: COLORS.gold, fontSize: '1.5rem' }} />
                        <span style={{ fontFamily: 'monospace', color: COLORS.gold, fontSize: '1rem', letterSpacing: '2px' }}>
                            // AUTHENTICITY SCALES
                        </span>
                    </div>

                    <h2 style={{
                        fontFamily: 'var(--font-oswald)',
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        textTransform: 'uppercase',
                        color: COLORS.text,
                        lineHeight: 1,
                        marginBottom: '30px'
                    }}>
                        UGC <span style={{ color: COLORS.gold }}>Factory.</span><br />
                        Real Humans.
                    </h2>

                    <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '30px', maxWidth: '500px' }}>
                        Stop looking like a brand and start looking like a <strong>friend</strong>. We source creators who speak the language of the algorithm. No scripts, no studio lights—just raw, high-converting attention.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={{ borderLeft: `2px solid ${COLORS.gold}`, paddingLeft: '15px' }}>
                            <h4 style={{ color: COLORS.text, margin: '0 0 5px 0', fontSize: '0.9rem' }}>RAW FEED</h4>
                            <p style={{ color: COLORS.textMuted, fontSize: '0.8rem', margin: 0 }}>Youtube Shorts & Reels Native.</p>
                        </div>
                        <div style={{ borderLeft: `2px solid ${COLORS.gold}`, paddingLeft: '15px' }}>
                            <h4 style={{ color: COLORS.text, margin: '0 0 5px 0', fontSize: '0.9rem' }}>TRUST FIRST</h4>
                            <p style={{ color: COLORS.textMuted, fontSize: '0.8rem', margin: 0 }}>Built for Community Warfare.</p>
                        </div>
                    </div>
                </motion.div>

                {/* --- RIGHT SIDE: THE VISUAL (Floating "Phone" Frames) --- */}
                <div style={{ position: 'relative', height: '500px', display: 'flex', justifyContent: 'center' }}>
                    {/* Background Glow */}
                    <div style={{
                        position: 'absolute', width: '300px', height: '300px',
                        background: COLORS.gold, filter: 'blur(100px)', opacity: 0.1, top: '10%'
                    }} />

                    {/* Main "Phone" Card */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            width: '240px', height: '420px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '24px', position: 'relative', z_index: 2,
                            backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', padding: '15px'
                        }}
                    >
                        <div style={{ width: '40px', height: '4px', background: '#333', borderRadius: '2px', margin: '0 auto 20px auto' }} />
                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FaVideo style={{ fontSize: '3rem', opacity: 0.2, color: COLORS.gold }} />
                        </div>
                        <div style={{ marginTop: '15px', height: '10px', width: '70%', background: 'rgba(255,255,255,0.1)', borderRadius: '5px' }} />
                        <div style={{ marginTop: '8px', height: '10px', width: '40%', background: 'rgba(255,255,255,0.05)', borderRadius: '5px' }} />
                    </motion.div>

                    {/* Smaller Floating Element */}
                    <motion.div
                        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        style={{
                            position: 'absolute', bottom: '50px', right: '10%',
                            width: '120px', height: '120px', background: 'rgba(212, 175, 55, 0.1)',
                            border: `1px solid ${COLORS.gold}`, borderRadius: '15px',
                            zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.gold
                        }}
                    >
                        <FaUsers style={{ fontSize: '2rem' }} />
                    </motion.div>
                </div>

            </div>
        </section>
    );
}