/**
 * SEO quality gate for the production build. Run after `npm run build`:
 *
 *   npm run seo:check
 *
 * Scans every prerendered page in .next/server/app and FAILS on:
 *   missing/duplicate <title>, meta description or H1 · more than one H1 ·
 *   missing or wrong canonical · noindex on an indexable page · invalid
 *   JSON-LD or missing required schema fields · <img> without alt ·
 *   leaked TODO_ placeholders · internal links to pages that don't exist ·
 *   pages missing from (or extra in) sitemap.xml · pages under their
 *   word-count minimum.
 * Prints WARN for: title/description length outside the target range.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const APP = join(ROOT, '.next/server/app');

const MIN_WORDS = [
    [/^\/digital-marketing-agency-jaipur$/, 2000],
    [/^\/services\/(ai-content-creation|product-photography|ugc-video-production)-jaipur$/, 500],
    [/^\/services\/[^/]+$/, 1200],
    [/^\/industries\/[^/]+\/[^/]+$/, 1000],
    [/^\/industries\/[^/]+$/, 1000],
    [/^\/locations\/jaipur$/, 1500],
    [/^\/locations\/[^/]+$/, 1000],
    [/^\/blog\/[^/]+$/, 1500],
];

const REQUIRED = {
    Organization: ['name', 'url', 'logo', 'address'],
    WebSite: ['name', 'url'],
    BreadcrumbList: ['itemListElement'],
    FAQPage: ['mainEntity'],
    Service: ['name', 'provider', 'url'],
    BlogPosting: ['headline', 'datePublished', 'dateModified', 'author', 'publisher', 'image'],
};

function walk(dir, out = []) {
    for (const f of readdirSync(dir)) {
        const p = join(dir, f);
        if (statSync(p).isDirectory()) walk(p, out);
        else if (f.endsWith('.html')) out.push(p);
    }
    return out;
}

const decode = (s) =>
    s
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/&nbsp;/g, ' ');
const strip = (s) => decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const attr = (tag, name) => {
    const m = tag.match(new RegExp(`${name}="([^"]*)"`));
    return m ? decode(m[1]) : null;
};

const files = walk(APP).filter((f) => !/_not-found|_global-error|\/\[/.test(f));
const pages = files.map((f) => {
    const rel = '/' + relative(APP, f).replace(/\.html$/, '');
    const path = rel === '/index' ? '/' : rel;
    return { path, html: readFileSync(f, 'utf8') };
});

const sitemapXml = readFileSync(join(APP, 'sitemap.xml.body'), 'utf8');
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const origin = new URL(sitemapUrls[0]).origin;
const sitemapPaths = new Set(sitemapUrls.map((u) => new URL(u).pathname.replace(/\/$/, '') || '/'));
const built = new Set(pages.map((p) => p.path));

let errors = 0;
let warns = 0;
const err = (path, msg) => {
    errors++;
    console.log(`  ✗ ${path}: ${msg}`);
};
const warn = (path, msg) => {
    warns++;
    console.log(`  ! ${path}: ${msg}`);
};

const seen = { title: new Map(), description: new Map(), h1: new Map() };
const rows = [];

for (const { path, html } of pages) {
    const head = html.slice(0, html.indexOf('</head>'));
    const title = strip(head.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '');
    const description = attr(head.match(/<meta name="description"[^>]*>/)?.[0] ?? '', 'content') ?? '';
    const canonical = attr(head.match(/<link rel="canonical"[^>]*>/)?.[0] ?? '', 'href');
    const robots = attr(head.match(/<meta name="robots"[^>]*>/)?.[0] ?? '', 'content') ?? '';
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => strip(m[1]));

    if (!title) err(path, 'missing <title>');
    if (!description) err(path, 'missing meta description');
    if (h1s.length !== 1) err(path, `${h1s.length} H1 elements (want exactly 1)`);
    const want = origin + (path === '/' ? '' : path);
    if (!canonical) err(path, 'missing canonical');
    else if (canonical.replace(/\/$/, '') !== want.replace(/\/$/, '')) err(path, `canonical ${canonical} ≠ ${want}`);
    if (/noindex/.test(robots)) err(path, `robots meta is "${robots}"`);
    if (title && (title.length < 30 || title.length > 65)) warn(path, `title ${title.length} chars: "${title}"`);
    if (description && (description.length < 120 || description.length > 165)) warn(path, `description ${description.length} chars`);

    for (const [k, v] of [['title', title], ['description', description], ['h1', h1s[0] ?? '']]) {
        if (!v) continue;
        const key = v.toLowerCase();
        if (seen[k].has(key)) err(path, `duplicate ${k} (also on ${seen[k].get(key)})`);
        else seen[k].set(key, path);
    }

    // JSON-LD
    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    const types = [];
    for (const raw of ld) {
        let data;
        try {
            data = JSON.parse(raw);
        } catch (e) {
            err(path, `invalid JSON-LD: ${e.message}`);
            continue;
        }
        const nodes = data['@graph'] ?? [data];
        if (!data['@context']) err(path, 'JSON-LD without @context');
        for (const n of nodes) {
            const t = [].concat(n['@type'] ?? []);
            types.push(...t);
            for (const ty of t)
                for (const f of REQUIRED[ty] ?? []) if (n[f] === undefined || n[f] === '') err(path, `${ty} JSON-LD missing "${f}"`);
            if (t.includes('FAQPage'))
                for (const q of n.mainEntity ?? []) if (!q.name || !q.acceptedAnswer?.text) err(path, 'FAQPage question without name/answer');
            if (t.includes('BreadcrumbList'))
                for (const it of n.itemListElement ?? []) if (!it.item || !it.name || !it.position) err(path, 'BreadcrumbList item incomplete');
        }
    }
    if (!types.includes('Organization')) err(path, 'Organization JSON-LD missing');
    if (path !== '/' && !types.includes('BreadcrumbList')) err(path, 'BreadcrumbList JSON-LD missing on inner page');
    if (path === '/' && !types.includes('WebSite')) err(path, 'WebSite JSON-LD missing on homepage');
    if (/<section[^>]*id="faq"/.test(html) && !types.includes('FAQPage')) err(path, 'FAQ section without FAQPage JSON-LD');
    if (path.startsWith('/blog/') && !types.includes('BlogPosting')) err(path, 'BlogPosting JSON-LD missing');
    if (/^\/(services|industries)\/|^\/digital-marketing-agency-jaipur$|^\/locations\/./.test(path) && !types.includes('Service'))
        err(path, 'Service JSON-LD missing');

    // Images
    for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(m[0])) err(path, `<img> without alt: ${m[0].slice(0, 80)}`);

    // Placeholders must never reach the page
    const leak = html.match(/TODO_[A-Z_]+/);
    if (leak) err(path, `placeholder leaked into HTML: ${leak[0]}`);

    // Internal links
    for (const m of html.matchAll(/<a\b[^>]*href="(\/[^"#?]*)/g)) {
        const target = m[1].replace(/\/$/, '') || '/';
        if (/^\/(_next|og\.png|logo\.png|reel|sitemap|robots|llms)/.test(target)) continue;
        if (!built.has(target)) err(path, `link to missing page ${target}`);
    }

    // Sitemap
    if (!sitemapPaths.has(path)) err(path, 'not in sitemap.xml');

    // Words in <main>
    const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? '';
    const text = strip(main.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, ''));
    const words = (text.match(/[A-Za-z0-9ऀ-ॿ₹%'’-]+/g) || []).length;
    const min = MIN_WORDS.find(([re]) => re.test(path))?.[1];
    if (min && words < min) err(path, `${words} words in <main> (minimum ${min})`);
    rows.push({ path, words, title: title.length, desc: description.length, ld: [...new Set(types)].join(',') });
}

for (const p of sitemapPaths) if (!built.has(p)) err(p, 'in sitemap.xml but no page was built');

const robotsTxt = readFileSync(join(APP, 'robots.txt.body'), 'utf8');
if (!/Allow: \//.test(robotsTxt) || /Disallow: \/\s*$/m.test(robotsTxt)) err('/robots.txt', 'robots.txt does not allow crawling');
if (!robotsTxt.includes(`${origin}/sitemap.xml`)) err('/robots.txt', 'robots.txt does not point at the sitemap');

if (process.argv.includes('--table'))
    for (const r of rows.sort((a, b) => a.path.localeCompare(b.path)))
        console.log(`${r.path.padEnd(58)} ${String(r.words).padStart(5)}w  t${r.title} d${r.desc}  ${r.ld}`);

console.log(`\n${pages.length} pages · ${sitemapPaths.size} sitemap URLs · ${errors} error(s) · ${warns} warning(s)`);
process.exit(errors ? 1 : 0);
