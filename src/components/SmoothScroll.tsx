'use client';
import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

interface SmoothScrollProps {
    children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.05,        // "Buttery" slow-glide feel
                duration: 1.5,     // Smooths out transitions
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                // normalizeWheel: true, // REMOVED: This was causing the Type Error
            }}
        >
            {children}
        </ReactLenis>
    );
}