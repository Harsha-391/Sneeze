import type { ReactNode } from 'react';
import Faq from '../Faq';
import Breadcrumbs, { type Crumb } from './Breadcrumbs';
import EndCta from './EndCta';
import LfHero, { type HeroVariant } from './LfHero';
import Related from './Related';
import RevealScope from './RevealScope';
import type { Longform as LongformData } from '@/content/types';
import { Markdown, tocOf, type MdContext } from '@/lib/markdown';
import { BUSINESS, waHref } from '@/config/site';

export function pageCtx(page: LongformData, ctaHref: string, ctaLabel?: string): MdContext {
    return {
        ctaHref,
        ctaLabel: ctaLabel ?? page.cta?.label ?? 'Book a strategy call',
        whatsappHref: waHref(BUSINESS.whatsapp, `Hi Sneeze Media, I'd like to talk about ${page.name}.`),
    };
}

/** Table of contents + Markdown article. Also used under the bespoke service layouts. */
export function LongformBody({ page, ctx, noToc, lead }: { page: LongformData; ctx: MdContext; noToc?: boolean; lead?: ReactNode }) {
    const toc = noToc ? [] : tocOf(page.body);
    return (
        <div className={`wrap lf-body${toc.length > 2 ? '' : ' lf-body--solo'}`}>
            {toc.length > 2 && (
                <nav className="lf-toc" aria-label="On this page">
                    <details open>
                        <summary className="eyebrow">On this page</summary>
                        <ol>
                            {toc.map((t) => (
                                <li key={t.id}>
                                    <a href={`#${t.id}`}>{t.text}</a>
                                </li>
                            ))}
                        </ol>
                    </details>
                </nav>
            )}
            <RevealScope as="article" className="md">
                {lead}
                <Markdown source={page.body} ctx={ctx} />
            </RevealScope>
        </div>
    );
}

/**
 * Shared long-form page: hero → table of contents + article → FAQ → related
 * links → closing CTA. Variants change the hero composition and accents so
 * services, industries, locations and guides don't look like one template.
 */
export default function Longform({
    page,
    path,
    variant,
    crumbs,
    eyebrow,
    panel,
    meta,
    backdrop,
    ctaHref,
    noToc,
    lead,
    faqEyebrow,
}: {
    page: LongformData;
    path: string;
    variant: HeroVariant;
    crumbs: Crumb[];
    eyebrow?: string;
    panel?: ReactNode;
    meta?: ReactNode;
    backdrop?: string;
    ctaHref: string;
    noToc?: boolean;
    lead?: ReactNode;
    faqEyebrow?: string;
}) {
    const ctx = pageCtx(page, ctaHref);
    const highlights =
        panel ??
        (page.highlights ? (
            <div className="lf-panel">
                <p className="lf-panel__title eyebrow">{page.highlights.title}</p>
                <ul>
                    {page.highlights.items.map((it) => (
                        <li key={it}>{it}</li>
                    ))}
                </ul>
            </div>
        ) : undefined);

    return (
        <main className={`lf lf--${variant}`}>
            <LfHero
                variant={variant}
                crumbs={<Breadcrumbs items={crumbs} />}
                eyebrow={eyebrow}
                h1={page.h1}
                lede={page.lede}
                meta={meta}
                panel={highlights}
                backdrop={backdrop}
                primary={{ href: ctaHref, label: ctx.ctaLabel }}
                secondary={variant === 'post' ? undefined : { href: ctx.whatsappHref, label: 'WhatsApp us' }}
            />
            <LongformBody page={page} ctx={ctx} noToc={noToc} lead={lead} />
            {page.faq.length > 0 && (
                <Faq
                    id="faq"
                    eyebrow={faqEyebrow ?? `FAQ · ${page.primaryKeyword}`}
                    title={
                        <>
                            Questions, <em>answered.</em>
                        </>
                    }
                    items={page.faq}
                />
            )}
            <Related refs={page.related} exclude={path} />
            <EndCta
                title={page.cta?.title ?? 'Ready when you are.'}
                text={page.cta?.text ?? `Tell us where you are and where you want to be. We'll come back with a clear plan for ${page.name.toLowerCase()}.`}
                href={ctaHref}
                label={ctx.ctaLabel}
                whatsappHref={ctx.whatsappHref}
            />
        </main>
    );
}
