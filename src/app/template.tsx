'use client';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';

// Remembers the last path across template remounts, so the curtain only
// plays on client-side navigation (never on the first page load).
let lastPath: string | null = null;

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [curtain, setCurtain] = useState(false);

    useLayoutEffect(() => {
        const navigated = lastPath !== null && lastPath !== pathname;
        lastPath = pathname;
        if (!navigated) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- must cover the new page before first paint
        setCurtain(true);
        const t = window.setTimeout(() => setCurtain(false), 1300);
        return () => window.clearTimeout(t);
    }, [pathname]);

    return (
        <>
            {curtain && (
                <div className="curtain" aria-hidden="true">
                    <span>SNEEZE.</span>
                </div>
            )}
            {children}
        </>
    );
}
