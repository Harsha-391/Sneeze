'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../constants';

export default function Marquee() {
    return (
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', borderTop: `1px solid ${COLORS.gold}`, borderBottom: `1px solid ${COLORS.gold}`, background: 'black', padding: '15px 0', position: 'relative', zIndex: 10 }}>
            <motion.div
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                style={{ display: 'inline-block', fontSize: '1.1rem', color: COLORS.gold, fontFamily: 'var(--font-oswald)', letterSpacing: '3px' }}
            >
                DIGITAL MARKETING | AI INTEGRATION | VIRAL CONTENT | BRANDING | UGC | WEB DEV | SEO | AD CREATIVES | DIGITAL MARKETING | AI INTEGRATION | VIRAL CONTENT |
            </motion.div>
        </div>
    );
}