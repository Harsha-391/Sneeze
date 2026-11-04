import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '../seo/JsonLd';
import Longform from './Longform';
import { getInfoPage } from '@/content/registry';
import { breadcrumbSchema, faqSchema, metaFor, webPageSchema } from '@/content/seo';

/** Metadata for a static info page whose words live in src/content/pages/<slug>.ts. */
export function infoMetadata(slug: string): Metadata {
    const page = getInfoPage(slug);
    return page ? metaFor(page, `/${slug}`) : {};
}

/** About, Process, Pricing, FAQ, Case studies, Privacy, Terms. */
export default function InfoRoute({ slug, eyebrow, lead }: { slug: string; eyebrow?: string; lead?: React.ReactNode }) {
    const page = getInfoPage(slug);
    if (!page) notFound();
    const path = `/${slug}`;
    const crumbs = [
        { name: 'Home', path: '/' },
        { name: page.name, path },
    ];
    const isFaqHub = page.schemaType === 'FAQPage';
    return (
        <>
            <JsonLd
                data={[
                    ...(isFaqHub ? [] : [webPageSchema(page.schemaType ?? 'WebPage', page.h1, page.description, path)]),
                    breadcrumbSchema(crumbs),
                    ...(page.faq.length ? [faqSchema(page.faq)] : []),
                ]}
            />
            <Longform
                page={page}
                path={path}
                variant="page"
                eyebrow={eyebrow}
                crumbs={crumbs.map((c) => ({ name: c.name, href: c.path }))}
                ctaHref="/contact"
                noToc={page.noToc}
                lead={lead}
                faqEyebrow={isFaqHub ? 'Working with Sneeze Media' : undefined}
            />
        </>
    );
}
