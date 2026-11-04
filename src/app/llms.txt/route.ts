import { BUSINESS, SITE_URL } from '@/config/site';
import { COMBO_PAGES, INDUSTRY_PAGES, LOCATION_PAGES, PILLAR_PAGE, POST_PAGES, SERVICE_PAGES, STUDIO_ONLY } from '@/content/registry';
import { STUDIO } from '@/content/routes';

export const dynamic = 'force-static';

/**
 * /llms.txt: a plain-language map of the site for AI assistants and answer
 * engines, generated from the same registries as the sitemap.
 */
export function GET() {
    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    const line = (label: string, path: string, text: string) => `- [${cap(label)}](${SITE_URL}${path}): ${text}`;
    const body = [
        `# ${BUSINESS.name}`,
        '',
        `> ${BUSINESS.description}`,
        '',
        `- Location: ${BUSINESS.address.locality}, ${BUSINESS.address.region}, India`,
        `- Phone / WhatsApp: ${BUSINESS.phones.join(', ')}`,
        `- Website: ${SITE_URL}`,
        `- Contact: ${SITE_URL}/contact`,
        '',
        '## Services',
        '',
        ...(PILLAR_PAGE ? [line(PILLAR_PAGE.primaryKeyword, '/digital-marketing-agency-jaipur', PILLAR_PAGE.summary)] : []),
        ...SERVICE_PAGES.map((p) => line(p.name, `/services/${p.slug}`, p.summary)),
        ...STUDIO.filter((s) => STUDIO_ONLY[s.href.split('/').pop()!]).map((s) => line(s.label, s.href, s.blurb ?? '')),
        '',
        '## Industries',
        '',
        ...INDUSTRY_PAGES.map((p) => line(p.primaryKeyword, `/industries/${p.slug}`, p.summary)),
        ...COMBO_PAGES.map((p) => line(p.primaryKeyword, `/industries/${p.industry}/${p.slug}`, p.summary)),
        '',
        '## Locations',
        '',
        ...LOCATION_PAGES.map((p) => line(p.place, `/locations/${p.slug}`, p.summary)),
        '',
        '## Guides',
        '',
        ...POST_PAGES.map((p) => line(p.h1, `/blog/${p.slug}`, p.summary)),
        '',
        '## How we work',
        '',
        `See ${SITE_URL}/process: Discover, Strategise, Create, Launch, Optimise, Scale.`,
        '',
    ].join('\n');
    return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
