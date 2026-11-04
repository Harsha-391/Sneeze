/**
 * Prints every :::todo placeholder in the content files, grouped by page, as
 * Markdown. Used to build CONTENT_TODOS.md:
 *   node --experimental-strip-types --no-warnings scripts/list-todos.mts
 */
import { readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { todosOf } from '../src/lib/md-core.ts';

const ROOT = resolve(import.meta.dirname, '..');
const URL_OF: Record<string, (p: any) => string> = {
    service: (p) => `/services/${p.slug}`,
    pillar: () => '/digital-marketing-agency-jaipur',
    industry: (p) => `/industries/${p.slug}`,
    combo: (p) => `/industries/${p.industry}/${p.slug}`,
    location: (p) => `/locations/${p.slug}`,
    post: (p) => `/blog/${p.slug}`,
    page: (p) => `/${p.slug}`,
};
for (const d of ['services', 'industries', 'combos', 'locations', 'blog', 'pages']) {
    const dir = join(ROOT, 'src/content', d);
    for (const f of readdirSync(dir).filter((x) => x.endsWith('.ts') && x !== 'index.ts').sort()) {
        const p = (await import(pathToFileURL(join(dir, f)).href)).default;
        for (const t of todosOf(p.body)) {
            const [tag, ...rest] = t.split(':');
            console.log(`| \`${URL_OF[p.kind](p)}\` | \`${tag.trim()}\` | ${rest.join(':').trim().replace(/\|/g, '/')} | \`src/content/${d}/${f}\` |`);
        }
    }
}
