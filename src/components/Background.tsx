'use client';
import React from 'react';
import { COLORS } from '../constants';

export default function Background() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
            backgroundColor: COLORS.black, // Ensures deep black base
        }}>
            {/* GRID LAYER 
               - Increased opacity to 0.15 (was 0.05) for better visibility
               - Size set to 50px for a premium technical look
            */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                // This vignette makes the center bright and corners dark (Cinematic effect)
                maskImage: 'radial-gradient(circle at 50% 50%, black 60%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 60%, transparent 100%)'
            }} />

            {/* OPTIONAL: Golden Glow in the center to highlight content */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60vw',
                height: '60vh',
                background: `radial-gradient(circle, ${COLORS.gold} 0%, transparent 70%)`,
                opacity: 0.03, // Very subtle warm tint
                filter: 'blur(100px)',
            }} />
        </div>
    );
}