import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import Longform from '@/components/longform/Longform';
import { PUBLISHED_CASE_STUDIES } from '@/content/case-studies';
import { breadcrumbSchema, faqSchema, pageMetadata, webPageSchema } from '@/content/seo';

export const dynamicParams = false;
type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => PUBLISHED_CASE_STUDIES.find((c) => c.slug === slug);

export function generateStaticParams() {
    return PUBLISHED_CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const c = find(slug);
    return c ? pageMetadata({ title: c.title, description: c.description, path: `/case-studies/${slug}`, keywords: c.keywords }) : {};
}

/** Case study template: results panel up top, story below. */
export default async function CaseStudyRoute({ params }: Props) {
    const { slug } = await params;
    const c = find(slug);
    if (!c) notFound();
    const path = `/case-studies/${slug}`;
    const crumbs = [
        { name: 'Home', path: '/' },
        { name: 'Case studies', path: '/case-studies' },
        { name: c.name, path },
    ];
    return (
        <>
            <JsonLd data={[webPageSchema('Article', c.h1, c.description, path), breadcrumbSchema(crumbs), ...(c.faq.length ? [faqSchema(c.faq)] : [])]} />
            <Longform
                page={c}
                path={path}
                variant="post"
                eyebrow={`Case study · ${c.client}`}
                crumbs={crumbs.map((x) => ({ name: x.name, href: x.path }))}
                ctaHref="/contact"
                panel={
                    <dl className="lf-results">
                        {c.results.map((r) => (
                            <div key={r.label}>
                                <dt className="display">{r.value}</dt>
                                <dd>
                                    {r.label}
                                    <small>Source: {r.source}</small>
                                </dd>
                            </div>
                        ))}
                    </dl>
                }
            />
        </>
    );
}
