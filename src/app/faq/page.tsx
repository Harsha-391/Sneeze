import InfoRoute, { infoMetadata } from '@/components/longform/InfoRoute';

export const metadata = infoMetadata('faq');

export default function Page() {
    return <InfoRoute slug="faq" eyebrow="FAQ" />;
}
