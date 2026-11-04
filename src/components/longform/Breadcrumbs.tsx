import Link from 'next/link';

export type Crumb = { name: string; href?: string };

/** Visible breadcrumb trail. Pair with breadcrumbSchema() for JSON-LD. */
export default function Breadcrumbs({ items, className = '' }: { items: Crumb[]; className?: string }) {
    return (
        <nav className={`crumbs rv-fade ${className}`} aria-label="Breadcrumb">
            <ol>
                {items.map((c, i) => {
                    const last = i === items.length - 1;
                    return (
                        <li key={i}>
                            {last || !c.href ? (
                                <span aria-current={last ? 'page' : undefined}>{c.name}</span>
                            ) : (
                                <Link href={c.href} prefetch={false}>
                                    {c.name}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
