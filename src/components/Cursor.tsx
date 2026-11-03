'use client';
import { useEffect, useRef } from 'react';

/**
 * Gold follower cursor (mouse/trackpad only). Position is written straight to
 * `transform` inside one rAF loop, and the loop goes idle once the dot catches
 * up, so it costs nothing while the mouse is still.
 *
 * Elements can opt into labels: data-cursor="drag" | "view"
 */
export default function Cursor() {
    const ref = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        const label = labelRef.current;
        if (!el || !label) return;
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let tx = 0;
        let ty = 0;
        let x = 0;
        let y = 0;
        let raf = 0;
        let running = false;
        let shown = false;
        let mode = '';

        const tick = () => {
            x += (tx - x) * 0.22;
            y += (ty - y) * 0.22;
            el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            if (Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1) {
                running = false;
                return;
            }
            raf = requestAnimationFrame(tick);
        };

        const wake = () => {
            if (running) return;
            running = true;
            raf = requestAnimationFrame(tick);
        };

        const onMove = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return;
            tx = e.clientX;
            ty = e.clientY;
            if (!shown) {
                shown = true;
                x = tx;
                y = ty;
                el.classList.add('is-visible');
            }
            wake();
        };

        const onOver = (e: PointerEvent) => {
            const target = e.target as Element | null;
            const hit = target?.closest?.('[data-cursor], a, button, [role="button"]') as HTMLElement | null;
            let next = '';
            let text = '';
            if (hit) {
                const custom = hit.dataset.cursor;
                if (custom) {
                    next = custom;
                    text = hit.dataset.cursorLabel || custom;
                } else {
                    next = 'link';
                }
            }
            if (next !== mode) {
                mode = next;
                el.dataset.mode = next;
                label.textContent = text;
            }
        };

        const onLeave = () => {
            shown = false;
            el.classList.remove('is-visible');
        };
        const onDown = () => (el.dataset.down = 'true');
        const onUp = () => (el.dataset.down = 'false');

        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerover', onOver, { passive: true });
        window.addEventListener('pointerdown', onDown, { passive: true });
        window.addEventListener('pointerup', onUp, { passive: true });
        document.documentElement.addEventListener('pointerleave', onLeave);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerover', onOver);
            window.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointerup', onUp);
            document.documentElement.removeEventListener('pointerleave', onLeave);
        };
    }, []);

    return (
        <div ref={ref} className="cursor" aria-hidden="true">
            <div className="cursor__dot">
                <span ref={labelRef} className="cursor__label" />
            </div>
        </div>
    );
}
