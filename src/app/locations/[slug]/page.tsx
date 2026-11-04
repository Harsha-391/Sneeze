import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import Longform from '@/components/longform/Longform';
import { getLocationPage, LOCATION_PAGES } from '@/content/registry';
import { breadcrumbSchema, faqSchema, locationArea, metaFor, serviceSchema } from '@/content/seo';

export const dynamicParams = false;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return LOCATION_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const page = getLocationPage(slug);
    return page ? metaFor(page, `/locations/${slug}`) : {};
}

export default async function LocationRoute({ params }: Props) {
    const { slug } = await params;
    const page = getLocationPage(slug);
    if (!page) notFound();
    const path = `/locations/${slug}`;
    const crumbs = [
        { name: 'Home', path: '/' },
        { name: 'Locations', path: '/locations' },
        { name: page.place, path },
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
                        area: locationArea(page),
                    }),
                    breadcrumbSchema(crumbs),
                    faqSchema(page.faq),
                ]}
            />
            <Longform
                page={page}
                path={path}
                variant="location"
                eyebrow={slug === 'jaipur' ? 'Home turf' : 'Where we work'}
                backdrop={page.place}
                crumbs={crumbs.map((c) => ({ name: c.name, href: c.path }))}
                ctaHref={`/contact?location=${slug}`}
            />
        </>
    );
}
