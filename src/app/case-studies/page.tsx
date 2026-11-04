import Link from 'next/link';
import InfoRoute, { infoMetadata } from '@/components/longform/InfoRoute';
import { PUBLISHED_CASE_STUDIES } from '@/content/case-studies';

export const metadata = infoMetadata('case-studies');

export default function Page() {
    const list = PUBLISHED_CASE_STUDIES;
    return (
        <InfoRoute
            slug="case-studies"
            eyebrow="Proof"
            lead={
                list.length ? (
                    <ul className="cs-list rvb">
                        {list.map((c) => (
                            <li key={c.slug}>
                                <Link href={`/case-studies/${c.slug}`}>
                                    <span className="serif">{c.h1}</span>
                                    <small>{c.summary}</small>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : undefined
            }
        />
    );
}
