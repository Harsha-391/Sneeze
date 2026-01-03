'use client';
import { ReactLenis } from 'lenis/react'; // Updated import for latest versions
import { ReactNode } from 'react';

interface SmoothScrollProps {
    children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.05,        // Lowered for a high-end, slow-glide feel
                duration: 1.5,     // Smooths out the transition over time
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                normalizeWheel: true,
            }}
        >
            {children}
        </ReactLenis>
    );
}