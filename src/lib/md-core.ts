/**
 * Markdown parsing core (no JSX, no runtime imports) so it can run in the
 * Next build and in plain Node (scripts/check-content.mts). Syntax notes are
 * at the top of src/lib/markdown.tsx.
 */

export type MdBlock =
    | { t: 'h2' | 'h3'; text: string; id: string }
    | { t: 'p'; text: string }
    | { t: 'ul' | 'ol'; items: string[] }
    | { t: 'table'; head: string[]; rows: string[][]; caption?: string; compare?: boolean }
    | { t: 'quote'; text: string }
    | { t: 'dir'; name: string; arg: string; lines: string[] };

export const slugify = (s: string) =>
    s
        .toLowerCase()
        .replace(/[*_[\]()]/g, '')
        .replace(/&/g, ' and ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 64);

function dedent(src: string) {
    const lines = src.replace(/\r\n?/g, '\n').split('\n');
    const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^ */)![0].length);
    const min = indents.length ? Math.min(...indents) : 0;
    return lines.map((l) => l.slice(min).replace(/\s+$/, ''));
}

const isTableRow = (l: string) => /^\|.*\|$/.test(l.trim());
const splitRow = (l: string) =>
    l
        .trim()
        .replace(/^\||\|$/g, '')
        .split('|')
        .map((c) => c.trim());

function parseTable(rows: string[]): { head: string[]; rows: string[][] } {
    const cells = rows.filter((r) => !/^\|?\s*:?-{2,}/.test(r.trim())).map(splitRow);
    return { head: cells[0] ?? [], rows: cells.slice(1) };
}

export function parseMarkdown(src: string): MdBlock[] {
    const lines = dedent(src);
    const out: MdBlock[] = [];
    const used = new Set<string>();
    const uid = (text: string) => {
        const base = slugify(text) || 'section';
        let id = base;
        let n = 2;
        while (used.has(id)) id = `${base}-${n++}`;
        used.add(id);
        return id;
    };

    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        const tline = line.trim();
        if (!tline) {
            i++;
            continue;
        }

        // ::: directive blocks
        const dir = tline.match(/^:::\s*([a-z]+)\s*(.*)$/);
        if (dir) {
            const body: string[] = [];
            i++;
            while (i < lines.length && lines[i].trim() !== ':::') body.push(lines[i++]);
            i++; // closing :::
            const [, name, arg] = dir;
            if (name === 'compare') {
                const t = parseTable(body.filter((l) => isTableRow(l)));
                out.push({ t: 'table', ...t, caption: arg || undefined, compare: true });
            } else {
                out.push({ t: 'dir', name, arg: arg.trim(), lines: body.map((l) => l.trim()).filter(Boolean) });
            }
            continue;
        }

        const h = tline.match(/^(#{2,3})\s+(.+)$/);
        if (h) {
            const text = h[2].trim();
            out.push({ t: h[1].length === 2 ? 'h2' : 'h3', text, id: uid(text) });
            i++;
            continue;
        }

        if (isTableRow(tline)) {
            const rows: string[] = [];
            while (i < lines.length && isTableRow(lines[i])) rows.push(lines[i++]);
            out.push({ t: 'table', ...parseTable(rows) });
            continue;
        }

        if (/^[-*]\s+/.test(tline)) {
            const items: string[] = [];
            while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) items.push(lines[i++].trim().replace(/^[-*]\s+/, ''));
            out.push({ t: 'ul', items });
            continue;
        }

        if (/^\d+[.)]\s+/.test(tline)) {
            const items: string[] = [];
            while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) items.push(lines[i++].trim().replace(/^\d+[.)]\s+/, ''));
            out.push({ t: 'ol', items });
            continue;
        }

        if (tline.startsWith('>')) {
            const buf: string[] = [];
            while (i < lines.length && lines[i].trim().startsWith('>')) buf.push(lines[i++].trim().replace(/^>\s?/, ''));
            out.push({ t: 'quote', text: buf.join(' ') });
            continue;
        }

        const buf: string[] = [];
        while (
            i < lines.length &&
            lines[i].trim() &&
            !/^(#{2,3}\s|:::|[-*]\s|\d+[.)]\s|>|\|)/.test(lines[i].trim())
        )
            buf.push(lines[i++].trim());
        out.push({ t: 'p', text: buf.join(' ') });
    }
    return out;
}

/** Plain text of a Markdown string (for word counts and descriptions). */
export function plainText(src: string) {
    return parseMarkdown(src)
        .map((b) => {
            switch (b.t) {
                case 'h2':
                case 'h3':
                case 'p':
                case 'quote':
                    return b.text;
                case 'ul':
                case 'ol':
                    return b.items.join(' ');
                case 'table':
                    return [...b.head, ...b.rows.flat()].join(' ');
                case 'dir':
                    return b.name === 'todo' ? '' : b.lines.join(' ').replace(/[|+]/g, ' ');
            }
        })
        .join(' ')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[*_>#]+/g, ' ')
        .replace(/(^|\s)-+(?=\s|$)/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

export const wordCount = (s: string) => (s.match(/[A-Za-z0-9ऀ-ॿ₹%'’-]+/g) || []).length;

export function tocOf(src: string) {
    return parseMarkdown(src)
        .filter((b): b is Extract<MdBlock, { id: string }> => b.t === 'h2')
        .map((b) => ({ id: b.id, text: b.text.replace(/[*_]/g, '') }));
}

/** Every :::todo line in a body (for CONTENT_TODOS.md and the QA script). */
export function todosOf(src: string) {
    return parseMarkdown(src)
        .filter((b): b is Extract<MdBlock, { t: 'dir' }> => b.t === 'dir' && b.name === 'todo')
        .map((b) => [b.arg, ...b.lines].filter(Boolean).join(' '));
}
