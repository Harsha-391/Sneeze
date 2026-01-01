'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { COLORS } from '../constants';

export default function SocialManifesto() {
    return (
        <section style={{
            padding: '140px 20px',
            // FIX: Removed "background: COLORS.black" so the Global Grid/Spotlight shows through
            background: 'transparent',
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>

            {/* BIGGER HEADING: "SOCIAL DOMINANCE" */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '100px' }}
            >
                <h2 style={{
                    color: COLORS.text,
                    fontFamily: 'var(--font-oswald)',
                    textTransform: 'uppercase',
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    lineHeight: 1,
                    margin: 0
                }}>
                    SOCIAL <span style={{ color: COLORS.gold }}>DOMINANCE</span>
                </h2>
                <div style={{
                    width: '60px',
                    height: '4px',
                    background: COLORS.gold,
                    margin: '20px auto 0 auto'
                }} />
            </motion.div>

            {/* The Decryption Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', width: '100%', maxWidth: '1000px' }}>
                <DecryptRow from="OBSCURITY" to="AUTHORITY" delay={0} />
                <DecryptRow from="NOISE" to="SIGNAL" delay={0.2} />
                <DecryptRow from="FOLLOWER" to="LEADER" delay={0.4} />
            </div>

        </section>
    );
}

function DecryptRow({ from, to, delay }: { from: string, to: string, delay: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5, once: true });

    return (
        <div ref={ref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>

            {/* The "Ground" State (Left Side - Faded) */}
            <span style={{
                fontFamily: 'var(--font-inter)',
                color: '#333',
                fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textDecoration: 'line-through'
            }}>
                {from}
            </span>

            {/* The Arrow */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: delay }}
                style={{
                    flexGrow: 1,
                    height: '1px',
                    background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`,
                    margin: '0 30px',
                    transformOrigin: 'left'
                }}
            />

            {/* The "Top" State (Right Side - Scramble Effect) */}
            <div style={{ width: '50%', textAlign: 'right' }}>
                <ScrambleText text={to} trigger={isInView} delay={delay + 0.5} />
            </div>

        </div>
    );
}

// --- THE SCRAMBLE LOGIC ---
function ScrambleText({ text, trigger, delay }: { text: string, trigger: boolean, delay: number }) {
    const [displayText, setDisplayText] = useState("");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    useEffect(() => {
        if (!trigger) return;

        let iteration = 0;
        let interval: NodeJS.Timeout;

        const timeout = setTimeout(() => {
            interval = setInterval(() => {
                setDisplayText(prev =>
                    text
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 2;
            }, 50);
        }, delay * 1000);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [trigger, text, delay]);

    return (
        <span style={{
            fontFamily: 'var(--font-oswald)',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            color: COLORS.text,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textShadow: `0 0 20px ${COLORS.gold}40`
        }}>
            {displayText || "////////"}
        </span>
    );
}