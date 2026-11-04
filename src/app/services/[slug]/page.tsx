import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import Longform, { LongformBody, pageCtx } from '@/components/longform/Longform';
import Related from '@/components/longform/Related';
import AiVisualsPage from '@/components/service/pages/AiVisuals';
import EditorialPage from '@/components/service/pages/Editorial';
import PerformancePage from '@/components/service/pages/Performance';
import SocialCultsPage from '@/components/service/pages/SocialCults';
import UgcPage from '@/components/service/pages/Ugc';
import WebExperiencePage from '@/components/service/pages/WebExperience';
import { getServicePage, SERVICE_PAGES, STUDIO_ONLY } from '@/content/registry';
import { breadcrumbSchema, faqSchema, metaFor, pageMetadata, serviceSchema } from '@/content/seo';
import { SERVICE_PAGES as STUDIO } from '@/content/studio';

export const dynamicParams = false;

/** Hand-built layouts that sit on top of (or replace) the long-form template. */
const BESPOKE = {
    web: WebExperiencePage,
    social: SocialCultsPage,
    performance: PerformancePage,
    'ai-visuals': AiVisualsPage,
    editorial: EditorialPage,
    ugc: UgcPage,
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return [...SERVICE_PAGES.map((p) => ({ slug: p.slug })), ...Object.keys(STUDIO_ONLY).map((slug) => ({ slug }))];
}

function studio(slug: string) {
    const st = STUDIO_ONLY[slug];
    return st ? { st, copy: STUDIO.find((s) => s.slug === st.id)! } : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const path = `/services/${slug}`;
    const page = getServicePage(slug);
    if (page) return metaFor(page, path);
    const s = studio(slug);
    if (!s) return {};
    return pageMetadata({ title: s.copy.seo.title, description: s.copy.seo.description, path, keywords: s.copy.seo.keywords });
}

export default async function ServiceRoute({ params }: Props) {
    const { slug } = await params;
    const path = `/services/${slug}`;
    const page = getServicePage(slug);

    if (page) {
        const crumbs = [
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: page.name, path },
        ];
        const schema = [
            serviceSchema({ name: page.name, serviceType: page.primaryKeyword, description: page.description, path }),
            breadcrumbSchema(crumbs),
            faqSchema(page.faq),
        ];
        const ctaHref = `/contact?service=${slug}`;

        if (page.bespoke) {
            const Bespoke = BESPOKE[page.bespoke];
            const ctx = pageCtx(page, ctaHref);
            return (
                <>
                    <JsonLd data={schema} />
                    <Bespoke faq={page.faq} after={<Related refs={page.related} exclude={path} />}>
                        <section className="lf-merge" aria-label={`${page.name}: the full guide`}>
                            <LongformBody page={page} ctx={ctx} lead={<p className="md-lead rvb">{page.lede}</p>} />
                        </section>
                    </Bespoke>
                </>
            );
        }

        return (
            <>
                <JsonLd data={schema} />
                <Longform
                    page={page}
                    path={path}
                    variant="service"
                    eyebrow={page.name}
                    crumbs={crumbs.map((c) => ({ name: c.name, href: c.path }))}
                    ctaHref={ctaHref}
                />
            </>
        );
    }

    const s = studio(slug);
    if (!s) notFound();
    const Bespoke = BESPOKE[s.st.id];
    const crumbs = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: s.st.name, path },
    ];
    return (
        <>
            <JsonLd
                data={[
                    serviceSchema({ name: s.st.name, serviceType: s.copy.seo.kicker, description: s.copy.seo.description, path }),
                    breadcrumbSchema(crumbs),
                    faqSchema(s.copy.seo.faq),
                ]}
            />
            <Bespoke after={<Related refs={s.st.related} exclude={path} />} />
        </>
    );
}
