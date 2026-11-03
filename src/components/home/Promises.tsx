'use client';
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { PROMISES } from '@/constants';
import { useReveal } from '@/lib/motion';

/**
 * Drag slider where the cards lean with drag velocity (spring-smoothed),
 * which gives the row a physical, swinging feel.
 */
export default function Promises() {
    const headRef = useReveal<HTMLDivElement>();
    const stageRef = useReveal<HTMLDivElement>();
    const trackRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const velocity = useVelocity(x);
    const lean = useSpring(useTransform(velocity, [-2500, 0, 2500], [7, 0, -7], { clamp: true }), {
        stiffness: 180,
        damping: 22,
    });
    const [left, setLeft] = useState(0);

    useEffect(() => {
        const track = trackRef.current;
        const stage = stageRef.current;
        if (!track || !stage) return;
        const measure = () => setLeft(-Math.max(0, track.scrollWidth - stage.clientWidth));
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(stage);
        return () => ro.disconnect();
    }, [stageRef]);

    return (
        <section className="promises" aria-labelledby="promises-title">
            <div ref={headRef} className="wrap promises__title">
                <h2 id="promises-title" className="serif h-xl">
                    <span className="rv-line">
                        <span>Our{' '}</span>
                    </span>
                    <span className="rv-line" style={{ '--i': 1 } as React.CSSProperties}>
                        <span>
                            <em>Promises</em>
                        </span>
                    </span>
                </h2>
            </div>

            <div ref={stageRef} className="promises__stage" data-cursor="drag" data-cursor-label="Drag">
                <motion.div
                    ref={trackRef}
                    className="promises__track"
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left, right: 0 }}
                    dragElastic={0.1}
                    dragTransition={{ power: 0.3, timeConstant: 300 }}
                >
                    {PROMISES.map((p, i) => (
                        // Reveal (CSS transition) and lean (JS transform) live on
                        // separate elements so they never fight over `transform`.
                        <div key={p.title} className="promise-slot rv-fade" style={{ '--i': i } as React.CSSProperties}>
                            <motion.article className="promise" style={{ rotate: lean }}>
                                <h3 className="serif">{p.title}</h3>
                                <p>{p.text}</p>
                                <span className="promise__tag">{p.tag}</span>
                            </motion.article>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
