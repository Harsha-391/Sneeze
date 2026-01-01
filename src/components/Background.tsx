'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../constants';

export default function Background() {
    // 1. Track Mouse Position
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            zIndex: 0, pointerEvents: 'none', backgroundColor: COLORS.black, overflow: 'hidden'
        }}>

            {/* --- LAYER 1: THE MOVING GRID (Always Visible but Faint) --- */}
            <div className="moving-grid" style={{
                position: 'absolute', inset: -100,
                backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
            }} />

            {/* --- LAYER 2: THE MOUSE GLOW (Intense Grid Reveal) --- */}
            <motion.div
                // FIX: Used 'maskPosition' and added 'as any' to satisfy TypeScript
                animate={{
                    maskPosition: `${mousePosition.x - 250}px ${mousePosition.y - 250}px`,
                    WebkitMaskPosition: `${mousePosition.x - 250}px ${mousePosition.y - 250}px`,
                } as any}
                transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
                style={{
                    position: 'absolute', inset: -100,
                    backgroundImage: `
                        linear-gradient(to right, rgba(212, 175, 55, 0.3) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(212, 175, 55, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    // The Mask: Only shows this bright gold grid in a circle around mouse
                    maskImage: 'radial-gradient(circle at center, black 0%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 70%)',
                    maskSize: '500px 500px', // Size of the torchlight
                    maskRepeat: 'no-repeat',
                }}
                className="moving-grid"
            />

            {/* --- CSS FOR THE ANIMATION --- */}
            <style jsx global>{`
                @keyframes gridPan {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(-50px, -50px); }
                }
                .moving-grid {
                    animation: gridPan 3s linear infinite;
                }
            `}</style>
        </div>
    );
}