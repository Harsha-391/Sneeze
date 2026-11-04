'use client';
import { useLenis } from 'lenis/react';
import type Lenis from 'lenis';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { linkFor } from '@/content/routes';
import { pageTransition } from '@/lib/motion';

/**
 * Page transitions that flow instead of cutting.
 *
 *   1. LEAVE  — the current page drifts up while a gold-edged curtain sweeps
 *               over it from below; the destination's name rises into view.
 *   2. SWAP   — under full cover we navigate, reset the scroll, and wait for the
 *               new route to commit and paint.
 *   3. ENTER  — the curtain sweeps off the top (dark panel first, then gold),
 *               the new page settles up into place and its hero reveals.
 *
 * Every frame of this is transform-only (two full-screen panels + one page
 * wrapper), driven by CSS transitions, so it stays smooth even while the next
 * route is loading. Internal <a>/<Link> clicks are intercepted globally;
 * add `data-no-transition` to opt a link out.
 */

const HUB_LABELS: Record<string, string> = {
    '/': 'Home',
    '/services': 'Services',
    '/industries': 'Industries',
    '/locations': 'Locations',
    '/blog': 'Blog',
};
const labelFor = (path: string) => HUB_LABELS[path] ?? linkFor(path)?.label ?? 'Sneeze Media';

const COVER_MS = 750;
const REVEAL_MS = 1000;

const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));
const nextPaint = () => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));

type Pending = { path: string; hash: string; resolve: () => void };

export default function PageTransition() {
    const router = useRouter();
    const pathname = usePathname();
    const lenis = useLenis();

    const rootRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const lenisRef = useRef<Lenis | undefined>(undefined);
    const pending = useRef<Pending | null>(null);
    const busy = useRef(false);
    const lastPath = useRef<string | null>(null);

    useEffect(() => {
        lenisRef.current = lenis;
    }, [lenis]);

    // --- Intercept internal link clicks -----------------------------------
    useEffect(() => {
        const html = document.documentElement;
        const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const navigate = async (url: URL) => {
            const el = rootRef.current;
            if (busy.current || !el) return;
            busy.current = true;
            const fast = reduced();
            // From now on heroes wait for the curtain (JS reveal), not the first paint.
            html.classList.remove('first-load');

            if (labelRef.current) labelRef.current.textContent = labelFor(url.pathname);

            // 1. LEAVE
            pageTransition.start();
            lenisRef.current?.stop();
            html.classList.add('pt-leave');
            el.dataset.state = 'cover';
            await wait(fast ? 0 : COVER_MS);

            // 2. SWAP — resolves from the layout effect once the new route has committed
            await new Promise<void>((resolve) => {
                pending.current = { path: url.pathname, hash: url.hash, resolve };
                router.push(url.pathname + url.search + url.hash, { scroll: false });
                window.setTimeout(resolve, 6000); // never get stuck behind the curtain
            });
            pending.current = null;
            await nextPaint();

            // 3. ENTER
            el.dataset.state = 'reveal';
            html.classList.remove('pt-enter-from');
            html.classList.add('pt-enter');
            lenisRef.current?.start();
            pageTransition.ready();
            await wait(fast ? 0 : REVEAL_MS);

            el.dataset.state = 'idle';
            html.classList.remove('pt-enter');
            busy.current = false;
        };

        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
            if (!a) return;
            if (a.target && a.target !== '_self') return;
            if (a.hasAttribute('download') || a.dataset.noTransition !== undefined) return;
            const url = new URL(a.href, window.location.href);
            if (url.origin !== window.location.origin) return;
            // Same page (incl. #anchors): leave it to Lenis / the link's own handler.
            if (url.pathname === window.location.pathname) return;
            e.preventDefault();
            e.stopPropagation();
            if (busy.current) return;
            navigate(url);
        };

        // Prefetch on hover/touch so the swap is near-instant.
        const onIntent = (e: Event) => {
            const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
            if (!a) return;
            const url = new URL(a.href, window.location.href);
            if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
                router.prefetch(url.pathname);
            }
        };

        document.addEventListener('click', onClick, true);
        document.addEventListener('pointerover', onIntent, { passive: true });
        document.addEventListener('touchstart', onIntent, { passive: true });
        return () => {
            document.removeEventListener('click', onClick, true);
            document.removeEventListener('pointerover', onIntent);
            document.removeEventListener('touchstart', onIntent);
        };
    }, [router]);

    // --- Route committed ---------------------------------------------------
    useLayoutEffect(() => {
        const prev = lastPath.current;
        lastPath.current = pathname;
        if (prev === null || prev === pathname) return;

        const html = document.documentElement;
        html.classList.remove('first-load');
        const p = pending.current;
        const l = lenisRef.current;

        if (p && p.path === pathname) {
            // Our navigation: still covered. Jump to top (or the #hash) and
            // park the new page slightly low so it can settle up on reveal.
            const target = p.hash ? document.querySelector(p.hash) : null;
            if (l) l.scrollTo((target as HTMLElement) ?? 0, { immediate: true, force: true, offset: target ? -40 : 0 });
            else window.scrollTo(0, target ? (target as HTMLElement).offsetTop - 40 : 0);
            html.classList.remove('pt-leave');
            html.classList.add('pt-enter-from');
            p.resolve();
            return;
        }

        // Back/forward button: no leave phase, but still wipe the new page in.
        const el = rootRef.current;
        if (!el || busy.current) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        busy.current = true;
        if (labelRef.current) labelRef.current.textContent = labelFor(pathname);
        el.dataset.state = 'covered';
        html.classList.add('pt-enter-from');
        nextPaint().then(async () => {
            el.dataset.state = 'reveal';
            html.classList.remove('pt-enter-from');
            html.classList.add('pt-enter');
            await wait(REVEAL_MS);
            el.dataset.state = 'idle';
            html.classList.remove('pt-enter');
            busy.current = false;
        });
    }, [pathname]);

    return (
        <div ref={rootRef} className="pt" data-state="idle" aria-hidden="true">
            <div className="pt__panel pt__gold" />
            <div className="pt__panel pt__dark">
                <div className="pt__center">
                    <span className="pt__eyebrow">Next up</span>
                    <span className="pt__mask">
                        <span ref={labelRef} className="pt__label serif" />
                    </span>
                </div>
                <span className="pt__brand">
                    Sneeze<span>.</span>
                </span>
                <span className="pt__bar" />
            </div>
        </div>
    );
}
