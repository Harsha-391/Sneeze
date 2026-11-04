/**
 * Content linter for the data-driven pages.
 *
 *   node --experimental-strip-types scripts/check-content.mts src/content/services/seo-company-jaipur.ts
 *   node --experimental-strip-types scripts/check-content.mts --all
 *
 * Checks every rule from the SEO brief that can be checked mechanically:
 * title/description length, H1 contains the primary keyword, keyword in the
 * first 100 words, word-count minimums, 4–8 FAQs, at least one visual block,
 * valid internal links, no fabricated-claim phrases, no stray TODOs. With
 * --all it also compares pages for duplicated passages (doorway check).
 * Exit code 1 on any error.
 */
import { readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseMarkdown, plainText, wordCount } from '../src/lib/md-core.ts';
import * as R from '../src/content/routes.ts';

const ROOT = resolve(import.meta.dirname, '..');
const CONTENT_DIRS = ['services', 'industries', 'combos', 'locations', 'blog', 'pages'];
const BRAND_SUFFIX = ' | Sneeze Media';

const MIN_WORDS: Record<string, number> = { service: 1200, pillar: 2000, industry: 1000, combo: 1000, location: 1000, post: 1500, page: 300 };
const MIN_WORDS_BY_SLUG: Record<string, number> = { jaipur: 1500 };

const KNOWN = new Set<string>([
    '/',
    R.PILLAR.href,
    ...[R.SERVICES, R.STUDIO, R.INDUSTRIES, R.COMBOS, R.LOCATIONS, R.POSTS, R.RESOURCES, R.COMPANY].flat().map((l) => l.href),
    ...Object.values(R.HUBS).map((h) => h.href),
]);

const BANNED: [RegExp, string][] = [
    [/\bbest (?:\w+ ){0,3}in india\b/i, 'unverifiable superlative ("best … in India")'],
    [/#\s?1\b|\bnumber one\b|\bno\.\s?1\b/i, 'unverifiable ranking claim (#1 / number one)'],
    [/\bguarantee(?:d|s)?\b/i, 'guarantee language (no guaranteed outcomes)'],
    [/\b100\s?%/i, '100% claim'],
    [/\baward[- ]winning\b|\bawards?\b/i, 'award claim'],
    [/\btrusted by\b|\b\d+\+?\s*(?:happy |satisfied )?clients\b|\bclients served\b/i, 'client-count / trust claim'],
    [/\b\d+\+?\s*years? (?:of )?experience\b/i, 'years-of-experience claim'],
    [/\btestimonial\b.*["“]/i, 'possible testimonial quote'],
    [/\bleading\b|\bworld[- ]class\b|\bindustry[- ]leading\b|\bpremier\b/i, 'empty superlative'],
];

type Page = Record<string, any>;
type Result = { file: string; errors: string[]; warnings: string[]; stats: string };

function listFiles(): string[] {
    const out: string[] = [];
    for (const d of CONTENT_DIRS) {
        const dir = join(ROOT, 'src/content', d);
        try {
            if (!statSync(dir).isDirectory()) continue;
        } catch {
            continue;
        }
        for (const f of readdirSync(dir)) if (f.endsWith('.ts') && f !== 'index.ts') out.push(join(dir, f));
    }
    return out;
}

function check(file: string, p: Page): Result {
    const errors: string[] = [];
    const warnings: string[] = [];
    const need = (k: string, t: string) => {
        if (typeof p[k] !== t) errors.push(`missing/invalid field "${k}" (${t})`);
    };
    ['slug', 'title', 'description', 'h1', 'name', 'primaryKeyword', 'lede', 'summary', 'body', 'updated', 'kind'].forEach((k) => need(k, 'string'));
    if (!Array.isArray(p.keywords)) errors.push('keywords must be an array');
    if (!Array.isArray(p.faq)) errors.push('faq must be an array');
    if (typeof p.related !== 'object') errors.push('related must be an object');
    if (errors.length) return { file, errors, warnings, stats: '' };

    const kind: string = p.kind;
    const isLongform = kind !== 'page';

    // Title + description
    const full = p.title + BRAND_SUFFIX;
    if (full.length < 50 || full.length > 60) (isLongform ? errors : warnings).push(`full title is ${full.length} chars (want 50–60): "${full}"`);
    if (p.description.length < 140 || p.description.length > 160) errors.push(`description is ${p.description.length} chars (want 140–160)`);
    if (/\bTODO/i.test(p.title + p.description + p.h1 + p.lede)) errors.push('TODO text in title/description/h1/lede');

    // Keyword placement
    const kw = p.primaryKeyword.toLowerCase();
    if (!p.h1.toLowerCase().includes(kw)) errors.push(`H1 does not contain the primary keyword "${p.primaryKeyword}"`);
    const first100 = (p.lede + ' ' + plainText(p.body)).split(/\s+/).slice(0, 100).join(' ').toLowerCase();
    if (!first100.includes(kw)) errors.push('primary keyword not in the first 100 words (lede + body)');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(p.updated)) errors.push('updated must be YYYY-MM-DD');
    if (kind === 'post' && !/^\d{4}-\d{2}-\d{2}$/.test(p.published ?? '')) errors.push('published must be YYYY-MM-DD');

    // Structure
    const blocks = parseMarkdown(p.body);
    const h2 = blocks.filter((b) => b.t === 'h2').length;
    if (isLongform && h2 < 4) errors.push(`only ${h2} H2 sections (want 4+)`);
    const visual = blocks.some(
        (b) => b.t === 'table' || (b.t === 'dir' && ['stats', 'steps', 'checklist', 'dodont', 'callout'].includes(b.name))
    );
    if (isLongform && !visual) errors.push('no visual block (:::stats / :::steps / :::checklist / :::dodont / table)');
    if (/^\s*#\s/m.test(p.body)) errors.push('body contains a level-1 "# " heading (the H1 comes from the template)');
    if (/\$\{/.test(p.body)) errors.push('body contains "${" (template literal interpolation)');

    // FAQ
    if (isLongform && (p.faq.length < 4 || p.faq.length > 8)) errors.push(`${p.faq.length} FAQs (want 4–8)`);
    for (const f of p.faq) if (!f.q?.trim().endsWith('?')) warnings.push(`FAQ question without "?": ${f.q}`);

    // Words
    const text = [p.lede, plainText(p.body), ...p.faq.map((f: any) => `${f.q} ${f.a}`)].join(' ');
    const words = wordCount(text);
    const min = MIN_WORDS_BY_SLUG[p.slug] && kind === 'location' ? MIN_WORDS_BY_SLUG[p.slug] : MIN_WORDS[kind] ?? 300;
    if (words < min) errors.push(`${words} words (minimum ${min} for ${kind})`);

    // Links
    const links = [...p.body.matchAll(/\]\((\/[^)\s#]*)(#[^)\s]*)?\)/g)].map((m) => m[1] || '/');
    for (const l of links) if (!KNOWN.has(l)) errors.push(`link to unknown page: ${l}`);
    const uniq = new Set(links);
    if (isLongform && uniq.size < 3) errors.push(`only ${uniq.size} distinct internal links in the body (want 3+)`);
    if (/\]\(\s*\)|click here|read more\]/i.test(p.body)) errors.push('empty link or vague anchor text ("click here"/"read more")');

    // Related refs
    const r = p.related ?? {};
    const refs: string[] = [
        ...(r.services ?? []).map(R.serviceHref),
        ...(r.industries ?? []).map(R.industryHref),
        ...(r.combos ?? []).map(R.comboHref),
        ...(r.locations ?? []).map(R.locationHref),
        ...(r.posts ?? []).map(R.postHref),
    ];
    for (const h of refs) if (!KNOWN.has(h)) errors.push(`related → unknown page: ${h}`);

    // Claims
    const scan = [p.lede, p.body, ...p.faq.map((f: any) => f.a)].join('\n');
    for (const [re, why] of BANNED) {
        const m = scan.match(re);
        if (m) errors.push(`${why}: "…${scan.slice(Math.max(0, m.index! - 40), m.index! + 40).replace(/\s+/g, ' ')}…"`);
    }
    const stray = scan.replace(/:::todo[^\n]*\n(?:[^\n]*\n)*?:::/g, '').match(/TODO[_ ]?\w*/);
    if (stray) errors.push(`TODO outside a :::todo block: ${stray[0]}`);
    const bestHits = (plainText(p.body).match(/\bbest\b/gi) || []).length;
    if (bestHits > 3) warnings.push(`"best" used ${bestHits}× in the body; keep superlatives to titles/headings`);

    // Keyword density (very rough: occurrences per 100 words)
    const occ = (text.toLowerCase().match(new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    const density = (occ / words) * 100;
    if (density > 2.5) errors.push(`primary keyword density ${density.toFixed(1)}% (stuffing; keep under ~2%)`);

    const stats = `${words} words · ${h2} H2 · ${p.faq.length} FAQ · ${uniq.size} links · kw×${occ}`;
    return { file, errors, warnings, stats };
}

function shingles(text: string, n = 6) {
    const w = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
    const s = new Set<string>();
    for (let i = 0; i + n <= w.length; i++) s.add(w.slice(i, i + n).join(' '));
    return s;
}

async function main() {
    const args = process.argv.slice(2);
    const all = args.includes('--all');
    const files = all ? listFiles() : args.filter((a) => !a.startsWith('--')).map((f) => resolve(f));
    if (!files.length) {
        console.error('Usage: check-content.mts <file.ts…> | --all');
        process.exit(2);
    }
    let failed = 0;
    const loaded: { file: string; page: Page }[] = [];
    for (const file of files) {
        let page: Page;
        try {
            page = (await import(pathToFileURL(file).href)).default;
        } catch (e) {
            console.log(`✗ ${file}\n    cannot load: ${(e as Error).message}`);
            failed++;
            continue;
        }
        loaded.push({ file, page });
        const r = check(file, page);
        const rel = file.replace(ROOT + '/', '');
        console.log(`${r.errors.length ? '✗' : '✓'} ${rel}  ${r.stats}`);
        r.errors.forEach((e) => console.log(`    ERROR ${e}`));
        r.warnings.forEach((w) => console.log(`    warn  ${w}`));
        if (r.errors.length) failed++;
    }

    if (all && loaded.length > 1) {
        // Duplicate titles / H1s / descriptions
        for (const k of ['title', 'h1', 'description']) {
            const seen = new Map<string, string>();
            for (const { file, page } of loaded) {
                const v = String(page[k]).toLowerCase();
                if (seen.has(v)) {
                    console.log(`✗ duplicate ${k}: ${file} and ${seen.get(v)}`);
                    failed++;
                } else seen.set(v, file);
            }
        }
        // Shared 6-word passages between pages (find-and-replace / doorway smell)
        const sh = loaded.map(({ file, page }) => ({ file, s: shingles(plainText(page.body)) }));
        for (let i = 0; i < sh.length; i++)
            for (let j = i + 1; j < sh.length; j++) {
                let common = 0;
                for (const x of sh[i].s) if (sh[j].s.has(x)) common++;
                const ratio = common / Math.min(sh[i].s.size, sh[j].s.size);
                if (ratio > 0.06) {
                    console.log(`✗ ${(ratio * 100).toFixed(1)}% shared passages: ${sh[i].file.replace(ROOT + '/', '')} ↔ ${sh[j].file.replace(ROOT + '/', '')}`);
                    failed++;
                }
            }
    }
    console.log(failed ? `\n${failed} problem(s).` : '\nAll content checks passed.');
    process.exit(failed ? 1 : 0);
}

main();
