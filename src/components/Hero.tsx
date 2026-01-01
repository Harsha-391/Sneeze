'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
// FIX: Imported "Variants" type
import { motion, Variants } from 'framer-motion';
import { COLORS } from '../constants';

export default function Hero() {
    const router = useRouter();

    // FIX: Explicitly typed as ": Variants" so TypeScript accepts it
    const strokeVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.5, ease: "easeInOut" }
        }
    };

    // FIX: Explicitly typed as ": Variants"
    const fillVariants: Variants = {
        hidden: { fillOpacity: 0 },
        visible: {
            fillOpacity: 1,
            transition: { duration: 1, ease: "easeOut", delay: 1.5 }
        }
    };

    return (
        <section style={{ height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 10, padding: '20px' }}>

            {/* Static Glow (Replaces the heavy animated blob) */}
            <div style={{
                position: 'absolute', width: '600px', height: '600px',
                background: `radial-gradient(circle, ${COLORS.gold} 0%, transparent 70%)`,
                opacity: 0.15, borderRadius: '50%', pointerEvents: 'none',
                transform: 'translateZ(0)' // GPU optimization
            }} />

            {/* HANDWRITTEN LOGO */}
            <div style={{ position: 'relative', zIndex: 2, marginBottom: '20px' }}>
                <svg viewBox="0 0 600 120" style={{ width: 'clamp(300px, 80vw, 700px)', height: 'auto', overflow: 'visible' }}>
                    {/* SNEEZE. */}
                    <motion.text
                        x="50%" y="85%" textAnchor="middle"
                        fontFamily="var(--font-oswald)" fontSize="100" fontWeight="bold" letterSpacing="-2"
                        stroke={COLORS.text} strokeWidth="1.5" fill={COLORS.text}
                        variants={fillVariants} initial="hidden" animate="visible"
                    >
                        SNEEZE<tspan fill={COLORS.gold} stroke={COLORS.gold}>.</tspan> MEDIA
                    </motion.text>

                    {/* The Stroke Overlay (Draws the line) */}
                    <motion.text
                        x="50%" y="85%" textAnchor="middle"
                        fontFamily="var(--font-oswald)" fontSize="100" fontWeight="bold" letterSpacing="-2"
                        stroke={COLORS.text} strokeWidth="1.5" fill="transparent"
                        variants={strokeVariants} initial="hidden" animate="visible"
                    >
                        SNEEZE<tspan stroke={COLORS.gold}>.</tspan> MEDIA
                    </motion.text>
                </svg>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.8 }}
                style={{ textAlign: 'center', position: 'relative', zIndex: 5 }}
            >
                <p style={{ fontSize: '1.1rem', color: COLORS.textMuted, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '40px' }}>
                    The Full-Stack Digital Agency.
                </p>
                <button
                    onClick={() => router.push('/project')}
                    style={{
                        padding: '16px 45px', fontSize: '0.9rem', fontWeight: '600',
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: 'white',
                        cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '2px', transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.borderColor = COLORS.gold}
                    onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
                >
                    Start Project
                </button>
            </motion.div>
        </section>
    );
}