'use client';
import Link from 'next/link';
import React from 'react';

type Props = {
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
    children: string;
    variant?: 'solid' | 'outline' | 'ghost';
    className?: string;
    external?: boolean;
    type?: 'button' | 'submit';
    disabled?: boolean;
};

export function Arrow() {
    return (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

/**
 * Pill button: a gold fill wipes up from below on hover and the label rolls
 * to a second copy. Every transition here is transform-only.
 */
export default function Button({ href, onClick, children, variant = 'outline', className = '', external, type = 'button', disabled }: Props) {
    const cls = `btn ${variant === 'solid' ? 'btn--solid' : ''} ${variant === 'ghost' ? 'btn--ghost' : ''} ${className}`;
    const inner = (
        <>
            <span className="roll" aria-hidden="true">
                <span>{children}</span>
                <span>{children}</span>
            </span>
            <span className="sr-only">{children}</span>
            {variant !== 'ghost' && (
                <span className="btn__arrow" aria-hidden="true">
                    <Arrow />
                </span>
            )}
        </>
    );

    if (href) {
        if (external || href.startsWith('http') || href.startsWith('tel:')) {
            return (
                <a href={href} className={cls} onClick={onClick} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                    {inner}
                </a>
            );
        }
        return (
            <Link href={href} className={cls} onClick={onClick}>
                {inner}
            </Link>
        );
    }

    return (
        <button type={type} className={cls} onClick={onClick} disabled={disabled} aria-busy={disabled || undefined}>
            {inner}
        </button>
    );
}
