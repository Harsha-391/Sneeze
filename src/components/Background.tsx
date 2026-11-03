'use client';
import { useEffect, useRef } from 'react';

/**
 * Fixed grid with a gold "torch" that follows the mouse (used by the service
 * pages).
 *
 * The old version animated `mask-position` on a full-screen layer, which forced
 * a full-viewport repaint on every mouse move. This version moves a small
 * 560px element with `transform` and counter-shifts its background so the gold
 * lines stay locked to the grid. That repaints a small tile instead of the
 * whole screen. There's no blur filter and no animated grain (the global grain
 * overlay is static).
 */
export default function Background() {
    const torchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const torch = torchRef.current;
        if (!torch) return;
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        let tx = window.innerWidth / 2;
        let ty = window.innerHeight / 2;
        let x = tx;
        let y = ty;
        let raf = 0;
        let running = false;
        const GRID = 56;
        const HALF = 280;

        const tick = () => {
            x += (tx - x) * 0.16;
            y += (ty - y) * 0.16;
            torch.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            // keep the torch's grid aligned with the static grid underneath
            torch.style.backgroundPosition = `${-((x - HALF) % GRID)}px ${-((y - HALF) % GRID)}px`;
            if (Math.abs(tx - x) < 0.2 && Math.abs(ty - y) < 0.2) {
                running = false;
                return;
            }
            raf = requestAnimationFrame(tick);
        };

        const onMove = (e: PointerEvent) => {
            tx = e.clientX;
            ty = e.clientY;
            torch.classList.add('is-on');
            if (!running) {
                running = true;
                raf = requestAnimationFrame(tick);
            }
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        return () => {
            window.removeEventListener('pointermove', onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div className="bg-grid" aria-hidden="true">
            <div className="bg-grid__lines" />
            <div ref={torchRef} className="bg-grid__torch" />
        </div>
    );
}
