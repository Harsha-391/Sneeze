import Link from 'next/link';
import type { Related as RelatedRefs } from '@/content/types';
import { comboHref, industryHref, linkFor, locationHref, postHref, serviceHref, type RouteLink } from '@/content/routes';
import RevealScope from './RevealScope';

function resolve(refs: RelatedRefs, exclude?: string) {
    const pick = (hrefs: string[] | undefined) =>
        (hrefs ?? []).map((h) => linkFor(h)).filter((l): l is RouteLink => !!l && l.href !== exclude);
    return [
        { title: 'Related services', links: pick(refs.services?.map(serviceHref)) },
        { title: 'Industries we work with', links: pick([...(refs.combos ?? []).map(comboHref), ...(refs.industries ?? []).map(industryHref)]) },
        { title: 'Where we work', links: pick(refs.locations?.map(locationHref)) },
        { title: 'Guides worth reading', links: pick(refs.posts?.map(postHref)) },
    ].filter((g) => g.links.length);
}

/**
 * Hub-and-spoke internal links with descriptive anchor text. Every long-form
 * page ends with this block, so services ⇄ industries ⇄ locations ⇄ guides
 * all link to each other.
 */
export default function Related({ refs, exclude }: { refs: RelatedRefs; exclude?: string }) {
    const groups = resolve(refs, exclude);
    if (!groups.length) return null;
    return (
        <section className="lf-related" aria-labelledby="related-title">
            <RevealScope className="wrap">
                <h2 id="related-title" className="eyebrow rvb">
                    Keep exploring
                </h2>
                <div className="lf-related__grid">
                    {groups.map((g) => (
                        <div key={g.title} className="lf-related__group rvb">
                            <h3>{g.title}</h3>
                            <ul>
                                {g.links.map((l) => (
                                    <li key={l.href}>
                                        <Link href={l.href} className="lf-related__link" prefetch={false}>
                                            <span className="serif">{l.label}</span>
                                            {l.blurb && <small>{l.blurb}</small>}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </RevealScope>
        </section>
    );
}
