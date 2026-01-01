'use client';
import React from 'react';
import { COLORS } from '../constants';

export default function Footer() {
    return (
        <section style={{ borderTop: '1px solid #111', padding: '100px 20px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <h2 style={{ fontFamily: 'var(--font-oswald)', fontSize: 'clamp(2rem, 5vw, 4rem)', textTransform: 'uppercase', marginBottom: '30px', color: '#333' }}>
                Ready to <span style={{ color: COLORS.gold }}>Dominate?</span>
            </h2>
        </section>
    );
}