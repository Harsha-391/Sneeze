'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../constants';

export default function AiSpotlight() {
    return (
        <section style={{ padding: '160px 20px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                >
                    <h3 style={{ fontFamily: 'var(--font-oswald)', fontSize: '3.5rem', color: COLORS.text, lineHeight: 1, marginBottom: '30px', textTransform: 'uppercase' }}>
                        Redefine <br /> <span style={{ color: COLORS.gold }}>Reality.</span>
                    </h3>
                    <p style={{ color: '#ccc', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '30px' }}>
                        We don&apos;t just capture content; we synthesize it. Using proprietary AI models, we engineer <strong>astonishing visuals</strong> that render traditional productions obsolete.
                    </p>
                    <p style={{ color: COLORS.textMuted, fontSize: '1.1rem', lineHeight: 1.6 }}>
                        This is the unfair advantage for <strong>growing brands</strong>. Achieve Fortune 500 aesthetics on a startup budget. Stop burning cash on logistics. Start generating.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ border: '1px solid rgba(212, 175, 55, 0.2)', background: 'rgba(20,20,20,0.4)', backdropFilter: 'blur(10px)', padding: '60px 40px', textAlign: 'center', position: 'relative' }}
                >
                    <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '30px', height: '30px', borderTop: `2px solid ${COLORS.gold}`, borderLeft: `2px solid ${COLORS.gold}` }} />
                    <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '30px', height: '30px', borderTop: `2px solid ${COLORS.gold}`, borderRight: `2px solid ${COLORS.gold}` }} />
                    <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '30px', height: '30px', borderBottom: `2px solid ${COLORS.gold}`, borderLeft: `2px solid ${COLORS.gold}` }} />
                    <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '30px', height: '30px', borderBottom: `2px solid ${COLORS.gold}`, borderRight: `2px solid ${COLORS.gold}` }} />

                    <h4 style={{ fontSize: 'clamp(5rem, 10vw, 8rem)', fontFamily: 'var(--font-oswald)', color: COLORS.gold, margin: 0, lineHeight: 0.9 }}>40%</h4>
                    <p style={{ textTransform: 'uppercase', letterSpacing: '4px', color: '#fff', marginTop: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>Reduction in Spend</p>
                    <div style={{ width: '80%', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '40px auto' }} />
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', color: '#888', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        <span><span style={{ color: COLORS.gold }}>⚡</span> 10x Speed</span>
                        <span><span style={{ color: COLORS.gold }}>∞</span> Scale</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}