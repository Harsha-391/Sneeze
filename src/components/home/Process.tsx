'use client';
import { animate, motion, MotionValue, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { PROCESS } from '@/constants';
import { useReveal } from '@/lib/motion';

/**
 * Draggable carousel whose cards ride an arc: each card's lift and tilt is
 * derived from its distance to the centre of the screen. It's all transforms
 * from a single motion value (the track's x), so dragging stays at 60fps+.
 */
function Oval({
    index,
    x,
    layout,
}: {
    index: number;
    x: MotionValue<number>;
    layout: { offset: number[]; width: number; viewport: number };
}) {
    const step = PROCESS[index];
    const offset = layout.offset[index] ?? 0;
    const half = layout.width / 2;
    const vw = layout.viewport || 1;

    // distance of card centre from viewport centre, normalised to -1..1
    const dist = useTransform(x, (v) => (offset + half + v - vw / 2) / (vw / 2));
    const rotate = useTransform(dist, (d) => d * 9);
    const y = useTransform(dist, (d) => d * d * 70);
    const scale = useTransform(dist, (d) => 1 - Math.min(0.12, Math.abs(d) * 0.08));

    return (
        <motion.article className="oval" style={{ rotate, y, scale }}>
            <div className="oval__inner">
                <span className="oval__num">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="oval__title serif">{step.title}</h3>
                <p className="oval__text">{step.text}</p>
            </div>
        </motion.article>
    );
}

export default function Process() {
    const headRef = useReveal<HTMLDivElement>();
    const stageRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const [layout, setLayout] = useState<{ offset: number[]; width: number; viewport: number }>({
        offset: [],
        width: 400,
        viewport: 1440,
    });
    const [bounds, setBounds] = useState({ left: 0, right: 0 });

    // Measure card positions so each card knows where it sits on the arc.
    useEffect(() => {
        const track = trackRef.current;
        const stage = stageRef.current;
        if (!track || !stage) return;
        const measure = () => {
            const cards = Array.from(track.children) as HTMLElement[];
            const offset = cards.map((c) => c.offsetLeft);
            const width = cards[0]?.offsetWidth ?? 400;
            const viewport = stage.clientWidth;
            setLayout({ offset, width, viewport });
            const max = track.scrollWidth - viewport;
            setBounds({ left: -Math.max(0, max), right: 0 });
            // Start with the second card centred so the arc reads immediately.
            const target = viewport / 2 - (offset[1] + width / 2);
            x.set(Math.max(-max, Math.min(0, target)));
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(stage);
        return () => ro.disconnect();
    }, [x]);

    // Keyboard support: arrow keys step between cards.
    const stepTo = (dir: 1 | -1) => {
        const next = Math.max(bounds.left, Math.min(bounds.right, x.get() - dir * (layout.width + 24)));
        animate(x, next, { type: 'spring', stiffness: 120, damping: 22 });
    };

    return (
        <section id="process" className="process" aria-labelledby="process-title">
            <div ref={headRef} className="wrap process__head">
                <h2 id="process-title" className="serif h-xl">
                    <span className="rv-line">
                        <span>Ideas spread.</span>
                    </span>
                    <span className="rv-line" style={{ '--i': 1 } as React.CSSProperties}>
                        <span>
                            Like a <em>sneeze</em>.
                        </span>
                    </span>
                </h2>
                <svg className="process__smile rv-draw" viewBox="-5 -5 1156 300" fill="none" aria-hidden="true" style={{ '--d': '300ms' } as React.CSSProperties}>
                    <path pathLength={1} d="M996 40C996 189 807 290 575 290S154 189 154 40" stroke="currentColor" vectorEffect="non-scaling-stroke" />
                    <path pathLength={1} d="M1144 20c-14 39-76 53-138 31-62-23-100-73-86-112" stroke="currentColor" vectorEffect="non-scaling-stroke" />
                    <path pathLength={1} d="M1 20c14 39 76 53 138 31 62-23 100-73 86-112" stroke="currentColor" vectorEffect="non-scaling-stroke" />
                </svg>
            </div>

            <div
                ref={stageRef}
                className="process__stage"
                data-cursor="drag"
                data-cursor-label="Drag"
                tabIndex={0}
                role="region"
                aria-roledescription="carousel"
                aria-label="Our process, six steps. Use left and right arrow keys to move."
                onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') stepTo(1);
                    if (e.key === 'ArrowLeft') stepTo(-1);
                }}
            >
                <motion.div
                    ref={trackRef}
                    className="process__track"
                    style={{ x }}
                    drag="x"
                    dragConstraints={bounds}
                    dragElastic={0.08}
                    dragTransition={{ power: 0.35, timeConstant: 320, bounceStiffness: 260, bounceDamping: 30 }}
                >
                    {PROCESS.map((_, i) => (
                        <Oval key={i} index={i} x={x} layout={layout} />
                    ))}
                </motion.div>
            </div>
            <p className="process__hint">← Drag to explore →</p>
        </section>
    );
}
