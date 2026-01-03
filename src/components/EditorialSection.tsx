'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { COLORS } from '../constants';
import { FaCamera } from 'react-icons/fa';

export default function EditorialSection() {
    return (
        <section style={{
            padding: '80px 20px',
            paddingBottom: '0px',
            background: 'transparent', // Lets the global grid show through
            position: 'relative',
            zIndex: 10,
            maxWidth: '1200px',
            margin: '0 auto'
        }}>

            {/* SECTION HEADER */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '100px' }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <FaCamera style={{ fontSize: '2rem', color: COLORS.gold }} />
                </div>
                <h2 style={{
                    color: COLORS.text,
                    fontFamily: 'var(--font-oswald)',
                    textTransform: 'uppercase',
                    fontSize: 'clamp(3rem, 7vw, 6rem)',
                    lineHeight: 0.9,
                    margin: 0
                }}>
                    EDITORIAL <span style={{ color: COLORS.gold }}>GRADE</span>
                </h2>
                <p style={{
                    color: '#666',
                    marginTop: '20px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontSize: '0.9rem'
                }}>
                    Defining your visual signature.
                </p>
            </motion.div>

            {/* THE FOCUS GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                <FocusItem title="VINTAGE" desc="Timeless grain. Analog warmth. Nostalgia engineered." />
                <FocusItem title="MODERN" desc="Clean lines. High-fidelity. Absolute clarity." />
                <FocusItem title="MINIMAL" desc="Stripped back. Negative space. Pure impact." />
                <FocusItem title="BESPOKE" desc="Your vision. Our lens. Tailored to requirement." />
            </div>

            {/* CLOSING STATEMENT */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                style={{
                    marginTop: '100px',
                    padding: '40px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    textAlign: 'center'
                }}
            >
                <p style={{ color: COLORS.textMuted, fontSize: '1.1rem', lineHeight: 1.6 }}>
                    "Whatever suits your requirement. We don't just take photos; we build <strong style={{ color: COLORS.text }}>assets</strong>."
                </p>
            </motion.div>

        </section>
    );
}

function FocusItem({ title, desc }: { title: string, desc: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5, once: true });

    return (
        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* TITLE: The "Focus" Animation happens here */}
            <motion.h3
                initial={{ filter: 'blur(15px)', opacity: 0, scale: 0.95 }}
                animate={isInView ? { filter: 'blur(0px)', opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{
                    fontFamily: 'var(--font-oswald)',
                    fontSize: '3rem',
                    color: COLORS.text,
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}
            >
                {title}
            </motion.h3>

            {/* LINE SEPARATOR */}
            <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: '50px' } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ height: '2px', background: COLORS.gold }}
            />

            {/* DESCRIPTION */}
            <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ color: '#888', fontSize: '1rem', lineHeight: 1.5 }}
            >
                {desc}
            </motion.p>
        </div>
    );
}