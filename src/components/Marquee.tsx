'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../constants';

export default function Marquee() {
    // The text to repeat
    const text = "DIGITAL MARKETING | AI INTEGRATION | VIRAL CONTENT | BRANDING | UGC | WEB DEV | SEO | AD CREATIVES | ";

    return (
        <div style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            borderTop: `1px solid ${COLORS.gold}`,
            borderBottom: `1px solid ${COLORS.gold}`,
            background: 'black',
            padding: '15px 0',
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            // Helps prevent jittering during the reset phase
            backfaceVisibility: 'hidden'
        }}>
            <motion.div
                /**
                 * To make it slow and smooth:
                 * 1. Increase duration (40-60s) for a slower crawl.
                 * 2. Use a linear ease.
                 * 3. Animate x to a fixed negative value that matches the content length.
                 */
                animate={{ x: [0, -1500] }}
                transition={{
                    repeat: Infinity,
                    duration: 50, // Higher number = slower and smoother
                    ease: "linear",
                }}
                style={{
                    display: 'flex',
                    fontSize: '1.1rem',
                    color: COLORS.gold,
                    fontFamily: 'var(--font-oswald)',
                    letterSpacing: '3px',
                    // GPU Acceleration: This is the most important line for 60fps
                    willChange: 'transform',
                    transform: 'translateZ(0)'
                }}
            >
                {/* We repeat the string multiple times. 
                  If the text starts to "gap" at the end, add more {text} repetitions.
                */}
                <span>{text}{text}{text}{text}{text}{text}{text}{text}</span>
            </motion.div>
        </div>
    );
}