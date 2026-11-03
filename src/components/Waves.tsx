'use client';
import { useEffect, useRef } from 'react';

/**
 * Gold line field that ripples like fabric and bulges toward the cursor.
 *
 * Kept cheap on purpose:
 * - plain Canvas 2D (no WebGL/WebGPU), ~40 lines × ~70 points
 * - capped devicePixelRatio (1.5) so 4K screens don't draw 4× the pixels
 * - the loop only runs while the canvas is on screen and the tab is visible
 * - reduced-motion users get one static frame
 */
export default function Waves({ flip = false }: { flip?: boolean }) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        let w = 0;
        let h = 0;
        let raf = 0;
        let visible = false;
        let t0 = performance.now();
        const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, power: 0, target: 0 };

        const resize = () => {
            const r = wrap.getBoundingClientRect();
            w = Math.max(1, Math.round(r.width));
            h = Math.max(1, Math.round(r.height));
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            if (!raf) draw(performance.now());
        };

        const draw = (now: number) => {
            const t = (now - t0) / 1000;
            mouse.x += (mouse.tx - mouse.x) * 0.08;
            mouse.y += (mouse.ty - mouse.y) * 0.08;
            mouse.power += (mouse.target - mouse.power) * 0.05;

            ctx.clearRect(0, 0, w, h);
            const lines = w < 700 ? 24 : 40;
            const pts = w < 700 ? 44 : 72;
            const radius = Math.max(140, w * 0.14);

            for (let i = 0; i < lines; i++) {
                const p = i / (lines - 1); // 0 top → 1 bottom
                const depth = flip ? 1 - p : p;
                // lines get denser + brighter toward the "horizon"
                const baseY = h * (0.08 + Math.pow(p, 1.6) * 0.92);
                const amp = 6 + depth * 26;
                const alpha = 0.08 + depth * 0.55;
                ctx.beginPath();
                for (let j = 0; j <= pts; j++) {
                    const x = (j / pts) * w;
                    const nx = j / pts;
                    let y =
                        baseY +
                        Math.sin(nx * 6.2 + t * 0.9 + i * 0.35) * amp * 0.55 +
                        Math.sin(nx * 13.1 - t * 0.6 + i * 0.12) * amp * 0.25 +
                        Math.cos(nx * 2.4 + t * 0.35) * amp * 0.35;
                    // cursor bulge
                    const dx = x - mouse.x;
                    const dy = baseY - mouse.y;
                    const d2 = dx * dx + dy * dy;
                    if (mouse.power > 0.01 && d2 < radius * radius * 4) {
                        const f = Math.exp(-d2 / (radius * radius));
                        y -= f * 46 * mouse.power * (dy > 0 ? 1 : -0.6);
                    }
                    if (j === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.strokeStyle = `rgba(212, 175, 55, ${alpha.toFixed(3)})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        };

        const loop = (now: number) => {
            draw(now);
            raf = requestAnimationFrame(loop);
        };

        const start = () => {
            if (raf || reduced || !visible || document.hidden) return;
            raf = requestAnimationFrame(loop);
        };
        const stop = () => {
            cancelAnimationFrame(raf);
            raf = 0;
        };

        const io = new IntersectionObserver(
            ([e]) => {
                visible = e.isIntersecting;
                if (visible) start();
                else stop();
            },
            { rootMargin: '100px' }
        );
        const ro = new ResizeObserver(resize);
        const onVis = () => (document.hidden ? stop() : start());
        const onMove = (e: PointerEvent) => {
            const r = canvas.getBoundingClientRect();
            mouse.tx = e.clientX - r.left;
            mouse.ty = e.clientY - r.top;
            if (mouse.x < -9000) {
                mouse.x = mouse.tx;
                mouse.y = mouse.ty;
            }
            mouse.target = 1;
        };
        const onLeave = () => (mouse.target = 0);

        resize();
        t0 = performance.now() - 4000;
        draw(performance.now());
        io.observe(wrap);
        ro.observe(wrap);
        document.addEventListener('visibilitychange', onVis);
        wrap.addEventListener('pointermove', onMove, { passive: true });
        wrap.addEventListener('pointerleave', onLeave);

        return () => {
            stop();
            io.disconnect();
            ro.disconnect();
            document.removeEventListener('visibilitychange', onVis);
            wrap.removeEventListener('pointermove', onMove);
            wrap.removeEventListener('pointerleave', onLeave);
        };
    }, [flip]);

    return (
        <div ref={wrapRef} className="waves" aria-hidden="true">
            <canvas ref={canvasRef} />
        </div>
    );
}
