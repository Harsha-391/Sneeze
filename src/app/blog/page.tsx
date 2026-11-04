import Hub from '@/components/longform/Hub';
import { POST_PAGES } from '@/content/registry';
import { pageMetadata } from '@/content/seo';
import { formatDate } from '@/lib/dates';

const DESCRIPTION =
    'Practical guides on SEO, websites, social media, ads and budgets for businesses in Jaipur and across India. Plain language, honest numbers, no fluff.';

export const metadata = pageMetadata({ title: 'Digital Marketing Guides for Indian Businesses', description: DESCRIPTION, path: '/blog' });

export default function BlogHub() {
    return (
        <Hub
            path="/blog"
            name="Blog"
            eyebrow="Blog & guides"
            h1="Digital marketing guides"
            description={DESCRIPTION}
            lede="What things cost, how to choose, what actually works and what to avoid. Written by the team that does the work, for business owners who want straight answers."
            sections={[
                {
                    title: 'Latest guides',
                    layout: 'list',
                    items: POST_PAGES.map((p) => ({ href: `/blog/${p.slug}`, label: p.h1, summary: p.summary, meta: `${p.category} · ${formatDate(p.published)}` })),
                },
            ]}
        />
    );
}
