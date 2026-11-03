'use client';
import { ReactLenis } from 'lenis/react';
import { ReactNode, useState } from 'react';

/**
 * Lenis smooth scrolling, tuned to feel smooth without floating.
 * - lerp 0.1 is responsive with no rubber-band lag (0.05 felt slow).
 * - Touch keeps native momentum scrolling (syncTouch off), which is the
 *   smoothest option on phones.
 * - Reduced-motion users get native scrolling.
 * Scroll reset between pages is handled by PageTransition (under cover).
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
    const [reduced] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    return (
        <ReactLenis
            root
            options={{
                lerp: reduced ? 1 : 0.1,
                smoothWheel: !reduced,
                wheelMultiplier: 1,
                touchMultiplier: 1,
                syncTouch: false,
                anchors: { offset: -80 },
            }}
        >
            {children}
        </ReactLenis>
    );
}
