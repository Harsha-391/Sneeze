'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../constants';

export default function Background() {
    const mouseRef = useRef({ x: 0, y: 0 });
    const [maskPos, setMaskPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            updateMask();
        };

        const handleScroll = () => {
            updateMask();
        };

        const updateMask = () => {
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
            setMaskPos({
                x: mouseRef.current.x + scrollX,
                y: mouseRef.current.y + scrollY
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
            backgroundColor: COLORS.black,
            overflow: 'hidden'
        }}>

            {/* --- LAYER 1: THE STATIC GRID --- */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                filter: 'blur(1.5px)',
            }} />

            {/* --- LAYER 2: THE MOUSE GLOW --- */}
            <motion.div
                animate={{
                    maskPosition: `${maskPos.x - 250}px ${maskPos.y - 250}px`,
                    WebkitMaskPosition: `${maskPos.x - 250}px ${maskPos.y - 250}px`,
                } as any}
                transition={{ type: 'tween', ease: 'linear', duration: 0 }}
                style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `
                        linear-gradient(to right, rgba(212, 175, 55, 0.4) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(212, 175, 55, 0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    filter: 'blur(1px)',

                    maskImage: 'radial-gradient(circle at center, black 0%, transparent 60%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 60%)',
                    maskSize: '500px 500px',
                    maskRepeat: 'no-repeat',
                }}
            />

            {/* --- LAYER 3: FILM GRAIN (REDUCED NOISE) --- */}
            <div className="film-grain" style={{
                position: 'fixed',
                top: '-50%', left: '-50%', width: '200%', height: '200%',
                pointerEvents: 'none',
                zIndex: 2,
                opacity: 0.03, // Reduced from 0.07 to 0.03 for a cleaner look
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }} />

            <style jsx global>{`
                @keyframes grain-move {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-5%, -10%); }
                    20% { transform: translate(-15%, 5%); }
                    30% { transform: translate(7%, -25%); }
                    40% { transform: translate(-5%, 25%); }
                    50% { transform: translate(-15%, 10%); }
                    60% { transform: translate(15%, 0%); }
                    70% { transform: translate(0%, 15%); }
                    80% { transform: translate(3%, 35%); }
                    90% { transform: translate(-10%, 10%); }
                }
                .film-grain {
                    animation: grain-move 8s steps(10) infinite;
                }
            `}</style>
        </div>
    );
}