'use client';
import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Thin client wrapper around server-rendered content. One IntersectionObserver
 * adds `is-in` to each `.rvb` block as it enters the viewport. The content is
 * plain server HTML; without JS (html:not(.js)) every block is simply visible.
 */
export default function RevealScope({ children, className, as: Tag = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'article' | 'section' }) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const root = ref.current;
        if (!root) return;
        const items = root.querySelectorAll<HTMLElement>('.rvb');
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        e.target.classList.add('is-in');
                        io.unobserve(e.target);
                    }
                }
            },
            { rootMargin: '0px 0px -8% 0px' }
        );
        items.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
    return (
        <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className}>
            {children}
        </Tag>
    );
}
