/**
 * Tiny server-side Markdown renderer for long-form pages. No dependencies and
 * no dangerouslySetInnerHTML: every node becomes a React element, so the text
 * is in the server HTML and nothing can inject markup.
 *
 * Supported syntax
 * ─────────────────
 *   ## Heading 2            (gets an id → table of contents)
 *   ### Heading 3
 *   Paragraph text, joined across lines until a blank line.
 *   - bullet / * bullet     1. numbered
 *   | table | with | header |   (second row |---|---|)
 *   > A highlighted statement (blockquote; never a fake testimonial)
 *   **bold**   *italic*   [anchor text](/internal-path or https://…)
 *
 * Visual blocks (each page needs at least one):
 *   :::stats                 one item per line:  value | label
 *   :::steps Optional title  one item per line:  Step title | explanation
 *   :::checklist Title       one item per line:  - item
 *   :::dodont                + do this   /   - avoid this
 *   :::compare Caption       a Markdown table, rendered as a comparison table
 *   :::callout Label         paragraph(s) in a highlighted box
 *   :::cta                   mid-page call-to-action band (no content needed)
 *   :::todo TODO_PROVIDE_CASE_STUDY: what is needed
 *                            not rendered; collected into CONTENT_TODOS.md
 * Close every block with a line containing only :::
 */
import Link from 'next/link';
import type { ReactNode } from 'react';
import Button from '@/components/ui/Button';
import { parseMarkdown, type MdBlock } from './md-core';

export { parseMarkdown, plainText, wordCount, tocOf, todosOf, slugify, type MdBlock } from './md-core';

/* ------------------------------------------------------------------ */
/* Inline formatting                                                   */
/* ------------------------------------------------------------------ */

const INLINE = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|\[[^\]]+\]\([^)\s]+\))/g;

export function Inline({ text }: { text: string }) {
    const parts = text.split(INLINE).filter((p) => p !== '');
    return (
        <>
            {parts.map((p, k) => {
                if (p.startsWith('**') && p.endsWith('**')) return <strong key={k}>{p.slice(2, -2)}</strong>;
                if (p.startsWith('*') && p.endsWith('*') && p.length > 2) return <em key={k}>{p.slice(1, -1)}</em>;
                const link = p.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
                if (link) {
                    const [, label, href] = link;
                    if (href.startsWith('/') || href.startsWith('#'))
                        return (
                            <Link key={k} href={href} className="md-link" prefetch={false}>
                                {label}
                            </Link>
                        );
                    return (
                        <a key={k} href={href} className="md-link" target="_blank" rel="noopener noreferrer">
                            {label}
                        </a>
                    );
                }
                return p;
            })}
        </>
    );
}

/* ------------------------------------------------------------------ */
/* Block rendering                                                     */
/* ------------------------------------------------------------------ */

export type MdContext = { ctaHref: string; ctaLabel: string; whatsappHref: string };

const pair = (l: string) => {
    const i = l.indexOf('|');
    return i < 0 ? [l.trim(), ''] : [l.slice(0, i).trim(), l.slice(i + 1).trim()];
};

function Directive({ b, ctx }: { b: Extract<MdBlock, { t: 'dir' }>; ctx: MdContext }): ReactNode {
    switch (b.name) {
        case 'stats':
            return (
                <dl className="md-stats rvb">
                    {b.lines.map((l, k) => {
                        const [value, label] = pair(l);
                        return (
                            <div key={k}>
                                <dt className="display">
                                    <Inline text={value} />
                                </dt>
                                <dd>
                                    <Inline text={label} />
                                </dd>
                            </div>
                        );
                    })}
                </dl>
            );
        case 'steps':
            return (
                <div className="md-steps rvb">
                    {b.arg && <p className="md-steps__title eyebrow">{b.arg}</p>}
                    <ol>
                        {b.lines.map((l, k) => {
                            const [title, text] = pair(l);
                            return (
                                <li key={k}>
                                    <span className="md-steps__n" aria-hidden="true">
                                        {String(k + 1).padStart(2, '0')}
                                    </span>
                                    <strong>
                                        <Inline text={title} />
                                    </strong>
                                    {text && (
                                        <span className="md-steps__text">
                                            <Inline text={text} />
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </div>
            );
        case 'checklist':
            return (
                <div className="md-check rvb">
                    {b.arg && <p className="md-check__title serif">{b.arg}</p>}
                    <ul>
                        {b.lines.map((l, k) => (
                            <li key={k}>
                                <span className="md-check__box" aria-hidden="true" />
                                <span>
                                    <Inline text={l.replace(/^[-*]\s*(\[[ x]\]\s*)?/, '')} />
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        case 'dodont': {
            const dos = b.lines.filter((l) => l.startsWith('+')).map((l) => l.replace(/^\+\s*/, ''));
            const donts = b.lines.filter((l) => l.startsWith('-')).map((l) => l.replace(/^-\s*/, ''));
            return (
                <div className="md-dodont rvb">
                    <div>
                        <p className="md-dodont__h">{b.arg ? b.arg.split('/')[0].trim() : 'Do'}</p>
                        <ul>
                            {dos.map((l, k) => (
                                <li key={k}>
                                    <Inline text={l} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="md-dodont__h md-dodont__h--no">{b.arg?.includes('/') ? b.arg.split('/')[1].trim() : 'Avoid'}</p>
                        <ul>
                            {donts.map((l, k) => (
                                <li key={k}>
                                    <Inline text={l} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        }
        case 'callout':
            return (
                <aside className="md-callout rvb">
                    {b.arg && <p className="md-callout__label eyebrow">{b.arg}</p>}
                    {b.lines.map((l, k) => (
                        <p key={k}>
                            <Inline text={l} />
                        </p>
                    ))}
                </aside>
            );
        case 'cta':
            return (
                <aside className="md-cta rvb">
                    <p className="serif">{b.arg || 'Want this plan for your business?'}</p>
                    <div className="md-cta__actions">
                        <Button href={ctx.ctaHref} variant="solid">
                            {ctx.ctaLabel}
                        </Button>
                        <a className="uline" href={ctx.whatsappHref} target="_blank" rel="noopener noreferrer">
                            Or message us on WhatsApp
                        </a>
                    </div>
                </aside>
            );
        case 'todo':
            return null;
        default:
            return null;
    }
}

function Table({ b }: { b: Extract<MdBlock, { t: 'table' }> }) {
    return (
        <div className={`md-table rvb${b.compare ? ' md-table--compare' : ''}`}>
            <table>
                {b.caption && <caption>{b.caption}</caption>}
                <thead>
                    <tr>
                        {b.head.map((h, k) => (
                            <th key={k} scope="col">
                                <Inline text={h} />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {b.rows.map((r, k) => (
                        <tr key={k}>
                            {r.map((c, j) =>
                                j === 0 ? (
                                    <th key={j} scope="row">
                                        <Inline text={c} />
                                    </th>
                                ) : (
                                    <td key={j}>
                                        <Inline text={c} />
                                    </td>
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function Markdown({ source, ctx }: { source: string; ctx: MdContext }) {
    const blocks = parseMarkdown(source);
    return (
        <>
            {blocks.map((b, k) => {
                switch (b.t) {
                    case 'h2':
                        return (
                            <h2 key={k} id={b.id} className="md-h2 serif rvb">
                                <Inline text={b.text} />
                            </h2>
                        );
                    case 'h3':
                        return (
                            <h3 key={k} id={b.id} className="md-h3 rvb">
                                <Inline text={b.text} />
                            </h3>
                        );
                    case 'p':
                        return (
                            <p key={k} className="rvb">
                                <Inline text={b.text} />
                            </p>
                        );
                    case 'ul':
                        return (
                            <ul key={k} className="md-ul rvb">
                                {b.items.map((it, j) => (
                                    <li key={j}>
                                        <Inline text={it} />
                                    </li>
                                ))}
                            </ul>
                        );
                    case 'ol':
                        return (
                            <ol key={k} className="md-ol rvb">
                                {b.items.map((it, j) => (
                                    <li key={j}>
                                        <Inline text={it} />
                                    </li>
                                ))}
                            </ol>
                        );
                    case 'quote':
                        return (
                            <blockquote key={k} className="md-quote serif rvb">
                                <Inline text={b.text} />
                            </blockquote>
                        );
                    case 'table':
                        return <Table key={k} b={b} />;
                    case 'dir':
                        return <Directive key={k} b={b} ctx={ctx} />;
                }
            })}
        </>
    );
}
