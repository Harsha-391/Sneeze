'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { COLORS } from '../constants';

export default function Hero() {
    const router = useRouter();

    const strokeVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.5, ease: "easeInOut" }
        }
    };

    const fillVariants: Variants = {
        hidden: { fillOpacity: 0 },
        visible: {
            fillOpacity: 1,
            transition: { duration: 1, ease: "easeOut", delay: 1.5 }
        }
    };

    return (
        <section style={{ height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 10, padding: '20px' }}>

            {/* CONTAINER: Matches Header Width */}
            <div style={{ width: '100%', maxWidth: '1280px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/* Static Glow */}
                <div style={{
                    position: 'absolute', width: '600px', height: '600px',
                    background: `radial-gradient(circle, ${COLORS.gold} 0%, transparent 70%)`,
                    opacity: 0.15, borderRadius: '50%', pointerEvents: 'none',
                    transform: 'translateZ(0)'
                }} />

                {/* HANDWRITTEN LOGO */}
                <div style={{ position: 'relative', zIndex: 2, marginBottom: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '800px', height: 'auto', overflow: 'visible' }}>
                        {/* SNEEZE. */}
                        <motion.text
                            x="50%" y="85%" textAnchor="middle"
                            fontFamily="var(--font-oswald)" fontSize="100" fontWeight="bold" letterSpacing="-2"
                            stroke={COLORS.text} strokeWidth="1.5" fill={COLORS.text}
                            variants={fillVariants} initial="hidden" animate="visible"
                        >
                            SNEEZE<tspan fill={COLORS.gold} stroke={COLORS.gold}>.</tspan> MEDIA
                        </motion.text>

                        {/* Stroke Overlay */}
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

            </div>
        </section>
    );
}