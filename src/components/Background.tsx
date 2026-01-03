'use client';
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { COLORS } from '../constants'; //

export default function Background() {
    // 1. Motion values for raw mouse coordinates (No React state updates for 60fps)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 2. High-performance spring physics for "expensive" weight/feel
    const springConfig = { stiffness: 150, damping: 30, mass: 0.5 };
    const softX = useSpring(mouseX, springConfig);
    const softY = useSpring(mouseY, springConfig);

    // 3. Transform coordinates into CSS Mask Position without re-renders
    const maskPosition = useTransform(
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
            position: 'fixed', // Fixed ensures zero jitter during Lenis scroll
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 0,
            pointerEvents: 'none',
            backgroundColor: COLORS.black, //
            overflow: 'hidden'
        }}>

            {/* --- LAYER 1: STATIC GRID --- */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                filter: 'blur(1px)',
            }} />

            {/* --- LAYER 2: MOUSE GLOW (GOLD REVEAL) --- */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(to right, ${COLORS.gold}44 1px, transparent 1px),
                        linear-gradient(to bottom, ${COLORS.gold}44 1px, transparent 1px)
                    `, //
                    backgroundSize: '50px 50px',
                    filter: 'blur(0.5px)',

                    // Torch Effect masking
                    maskImage: 'radial-gradient(circle 250px at center, black 0%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(circle 250px at center, black 0%, transparent 80%)',
                    maskSize: '500px 500px',
                    maskRepeat: 'no-repeat',

                    // Direct GPU binding for movement
                    maskPosition: maskPosition,
                    WebkitMaskPosition: maskPosition,

                    willChange: 'mask-position, -webkit-mask-position'
                }}
            />

            {/* --- LAYER 3: FILM GRAIN --- */}
            <div className="film-grain" style={{
                position: 'fixed',
                top: '-50%', left: '-50%', width: '200%', height: '200%',
                pointerEvents: 'none',
                zIndex: 2,
                opacity: 0.02,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }} />

            <style jsx global>{`
                @keyframes grain-move {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-2%, -2%); }
                    30% { transform: translate(2%, 1%); }
                    50% { transform: translate(-1%, 2%); }
                    70% { transform: translate(1%, -2%); }
                    90% { transform: translate(-2%, 1%); }
                }
                .film-grain {
                    animation: grain-move 0.5s steps(5) infinite;
                }
            `}</style>
        </div>
    );
}