import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import Longform from '@/components/longform/Longform';
import { COMBO_PAGES, getComboPage } from '@/content/registry';
import { industryHref, linkFor } from '@/content/routes';
import { breadcrumbSchema, faqSchema, metaFor, serviceSchema } from '@/content/seo';

export const dynamicParams = false;
type Props = { params: Promise<{ slug: string; service: string }> };

export function generateStaticParams() {
    return COMBO_PAGES.map((p) => ({ slug: p.industry, service: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, service } = await params;
    const page = getComboPage(slug, service);
    return page ? metaFor(page, `/industries/${slug}/${service}`) : {};
}

/** One service for one industry, e.g. /industries/hospitals/seo. */
export default async function ComboRoute({ params }: Props) {
    const { slug, service } = await params;
    const page = getComboPage(slug, service);
    if (!page) notFound();
    const path = `/industries/${slug}/${service}`;
    const industry = linkFor(industryHref(slug));
    const crumbs = [
        { name: 'Home', path: '/' },
        { name: 'Industries', path: '/industries' },
        { name: industry?.label ?? slug, path: industryHref(slug) },
        { name: page.name, path },
    ];
    return (
        <>
            <JsonLd
                data={[
                    serviceSchema({
                        name: page.primaryKeyword.replace(/^./, (c) => c.toUpperCase()),
                        serviceType: page.name,
                        description: page.description,
                        path,
                        audience: industry?.label,
                        area: [{ type: 'City', name: 'Jaipur' }],
                    }),
                    breadcrumbSchema(crumbs),
                    faqSchema(page.faq),
                ]}
            />
            <Longform
                page={page}
                path={path}
                variant="combo"
                eyebrow={`${industry?.label ?? slug} × ${page.name.replace(/ for .*/i, '')}`}
                crumbs={crumbs.map((c) => ({ name: c.name, href: c.path }))}
                ctaHref={`/contact?service=${page.service}&industry=${slug}`}
            />
        </>
    );
}
