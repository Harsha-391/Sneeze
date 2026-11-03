'use client';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

/**
 * Animation helpers built on IntersectionObserver + CSS.
 *
 * Reveals are CSS transitions on transform/opacity that a class toggles, so the
 * compositor runs them and they don't stutter even while JS is busy. Nothing here
 * re-renders React on scroll.
 */

type RevealOptions = {
    /** Keep toggling as the element leaves/enters (default: reveal once). */
    repeat?: boolean;
    rootMargin?: string;
    threshold?: number;
};

/** Adds `is-in` to the element the first time it scrolls into view. */
export function useReveal<T extends Element = HTMLDivElement>(options: RevealOptions = {}) {
    const ref = useRef<T>(null);
    const { repeat = false, rootMargin = '0px 0px -10% 0px', threshold = 0 } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('is-in');
                    if (!repeat) io.disconnect();
                } else if (repeat) {
                    el.classList.remove('is-in');
                }
            },
            { rootMargin, threshold }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [repeat, rootMargin, threshold]);

    return ref;
}

/**
 * Pauses every `.loop` CSS animation inside the element while it is off-screen,
 * so infinite animations only cost GPU time while you can see them.
 */
export function usePauseOffscreen<T extends Element = HTMLDivElement>(rootMargin = '120px') {
    const ref = useRef<T>(null);
    useEffect(() => {
        const el = ref.current as (T & HTMLElement) | null;
        if (!el) return;
        el.dataset.paused = 'true';
        const io = new IntersectionObserver(
            ([entry]) => {
                el.dataset.paused = entry.isIntersecting ? 'false' : 'true';
            },
            { rootMargin }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [rootMargin]);
    return ref;
}

/** Boolean visibility state, for things JS drives (canvas, video). */
export function useIsVisible<T extends Element>(ref: React.RefObject<T | null>, rootMargin = '100px') {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin });
        io.observe(el);
        return () => io.disconnect();
    }, [ref, rootMargin]);
    return visible;
}

const reducedQuery = '(prefers-reduced-motion: reduce)';

function subscribeReduced(cb: () => void) {
    const mq = window.matchMedia(reducedQuery);
    mq.addEventListener('change', cb);
    return () => mq.removeEventListener('change', cb);
}

export function useReducedMotion() {
    return useSyncExternalStore(
        subscribeReduced,
        () => window.matchMedia(reducedQuery).matches,
        () => false
    );
}

const finePointerQuery = '(hover: hover) and (pointer: fine)';

function subscribeFine(cb: () => void) {
    const mq = window.matchMedia(finePointerQuery);
    mq.addEventListener('change', cb);
    return () => mq.removeEventListener('change', cb);
}

export function useFinePointer() {
    return useSyncExternalStore(
        subscribeFine,
        () => window.matchMedia(finePointerQuery).matches,
        () => false
    );
}

/* ------------------------------------------------------------------ */
/* Intro state: the hero waits for the preloader before revealing.     */
/* ------------------------------------------------------------------ */

let introDone = false;
const introListeners = new Set<() => void>();

export const intro = {
    finish() {
        if (introDone) return;
        introDone = true;
        introListeners.forEach((l) => l());
    },
    subscribe(listener: () => void) {
        introListeners.add(listener);
        return () => {
            introListeners.delete(listener);
        };
    },
    isDone() {
        return introDone;
    },
};

export function useIntroDone() {
    return useSyncExternalStore(intro.subscribe, intro.isDone, () => false);
}

/** Live media-query match (false during SSR). */
export function useMediaQuery(query: string) {
    return useSyncExternalStore(
        (cb) => {
            const mq = window.matchMedia(query);
            mq.addEventListener('change', cb);
            return () => mq.removeEventListener('change', cb);
        },
        () => window.matchMedia(query).matches,
        () => false
    );
}
