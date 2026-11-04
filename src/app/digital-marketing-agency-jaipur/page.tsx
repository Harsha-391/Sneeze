import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import Longform from '@/components/longform/Longform';
import { PILLAR_PAGE } from '@/content/registry';
import { breadcrumbSchema, faqSchema, metaFor, serviceSchema } from '@/content/seo';

const PATH = '/digital-marketing-agency-jaipur';

export function generateMetadata(): Metadata {
    return PILLAR_PAGE ? metaFor(PILLAR_PAGE, PATH) : {};
}

/** The pillar: the strongest page for "digital marketing agency in Jaipur". */
export default function PillarRoute() {
    const page = PILLAR_PAGE;
    if (!page) notFound();
    const crumbs = [
        { name: 'Home', path: '/' },
        { name: page.name, path: PATH },
    ];
    return (
        <>
            <JsonLd
                data={[
                    serviceSchema({ name: page.name, serviceType: 'Digital marketing', description: page.description, path: PATH }),
                    breadcrumbSchema(crumbs),
                    faqSchema(page.faq),
                ]}
            />
            <Longform
                page={page}
                path={PATH}
                variant="pillar"
                eyebrow="Digital marketing · Jaipur"
                backdrop="Jaipur"
                crumbs={crumbs.map((c) => ({ name: c.name, href: c.path }))}
                ctaHref="/contact?service=digital-marketing-agency-jaipur"
            />
        </>
    );
}
