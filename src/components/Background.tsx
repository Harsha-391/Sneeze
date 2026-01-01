'use client';
import React, { useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

export default function Background() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        // Optimized: Only tracks mouse on desktop (saves mobile battery)
        const updateMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        // Simple check to skip on touch devices
        if (window.matchMedia("(hover: hover)").matches) {
            window.addEventListener('mousemove', updateMouse);
        }
        return () => window.removeEventListener('mousemove', updateMouse);
    }, [mouseX, mouseY]);

    return (
        <>
            {/* OPTIMIZATION: Removed the heavy SVG Noise Filter. 
                Using a simple low-opacity texture or just clean black is 100x faster. */}

            {/* The Spotlight: Now uses hardware acceleration (will-change) */}
            <motion.div
                style={{
                    background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(212, 175, 55, 0.08), transparent 80%)`,
                    position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
                    willChange: 'background', // Forces GPU rendering
                }}
            />

            {/* The Grid: Static and lightweight */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: 0,
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
                opacity: 0.6
            }}></div>
        </>
    );
}