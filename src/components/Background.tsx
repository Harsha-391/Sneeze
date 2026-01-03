'use client';
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { COLORS } from '../constants';

export default function Background() {
    // 1. Motion values handle mouse position without triggering React re-renders
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 2. Spring physics for that "expensive" smooth follow-through
    const springConfig = { stiffness: 100, damping: 25, mass: 0.5 };
    const softX = useSpring(mouseX, springConfig);
    const softY = useSpring(mouseY, springConfig);

    // 3. Convert coordinates into a CSS mask position string for the GPU
    const maskPos = useTransform(
        [softX, softY],
        ([x, y]) => `${(x as number) - 250}px ${(y as number) - 250}px`
    );

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div style={{
            position: 'fixed', // Keeps the background static during scroll
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
            pointerEvents: 'none',
            backgroundColor: COLORS.black,
            overflow: 'hidden'
        }}>

            {/* --- LAYER 1: THE "HIDDEN" GRID (Blurred & Dim) --- */}
            {/* This layer is always visible but stays out of focus */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                filter: 'blur(2px)', // Adds the "not fully revealed" style
                opacity: 0.5
            }} />

            {/* --- LAYER 2: THE "EXPOSED" GLOW GRID --- */}
            {/* This layer reveals the gold grid only where the mouse points */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(to right, ${COLORS.gold}44 1px, transparent 1px),
                        linear-gradient(to bottom, ${COLORS.gold}44 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    filter: 'blur(0.5px)', // Sharper than the base layer

                    // High-Performance Masking
                    maskImage: 'radial-gradient(circle 250px at center, black 0%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(circle 250px at center, black 0%, transparent 80%)',
                    maskSize: '500px 500px',
                    maskRepeat: 'no-repeat',

                    // Bind coordinates to the mask
                    maskPosition: maskPos,
                    WebkitMaskPosition: maskPos,

                    willChange: 'mask-position, -webkit-mask-position'
                }}
            />

            {/* --- LAYER 3: GRAIN & NOISE OVERLAY --- */}
            <div className="film-grain" style={{
                position: 'absolute',
                top: '-50%', left: '-50%', width: '200%', height: '200%',
                zIndex: 2,
                opacity: 0.04, // Subtle but visible texture
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }} />

            <style jsx global>{`
                @keyframes grain-move {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-1%, -1%); }
                    30% { transform: translate(1%, 0.5%); }
                    50% { transform: translate(-0.5%, 1%); }
                    70% { transform: translate(0.5%, -1%); }
                    90% { transform: translate(-1%, 0.5%); }
                }
                .film-grain {
                    animation: grain-move 0.4s steps(4) infinite;
                }
            `}</style>
        </div>
    );
}