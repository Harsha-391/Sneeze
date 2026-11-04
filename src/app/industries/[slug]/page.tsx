import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import Longform from '@/components/longform/Longform';
import { getIndustryPage, INDUSTRY_PAGES } from '@/content/registry';
import { breadcrumbSchema, faqSchema, metaFor, serviceSchema } from '@/content/seo';

export const dynamicParams = false;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return INDUSTRY_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const page = getIndustryPage(slug);
    return page ? metaFor(page, `/industries/${slug}`) : {};
}

export default async function IndustryRoute({ params }: Props) {
    const { slug } = await params;
    const page = getIndustryPage(slug);
    if (!page) notFound();
    const path = `/industries/${slug}`;
    const crumbs = [
        { name: 'Home', path: '/' },
        { name: 'Industries', path: '/industries' },
        { name: page.name, path },
    ];
    return (
        <>
            <JsonLd
                data={[
                    serviceSchema({
                        name: page.primaryKeyword.replace(/^./, (c) => c.toUpperCase()),
                        serviceType: 'Digital marketing',
                        description: page.description,
                        path,
                        audience: page.name,
                    }),
                    breadcrumbSchema(crumbs),
                    faqSchema(page.faq),
                ]}
            />
            <Longform
                page={page}
                path={path}
                variant="industry"
                eyebrow={`Industry · ${page.name}`}
                crumbs={crumbs.map((c) => ({ name: c.name, href: c.path }))}
                ctaHref={`/contact?industry=${slug}`}
            />
        </>
    );
}
