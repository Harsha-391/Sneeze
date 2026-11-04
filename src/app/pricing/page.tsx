import InfoRoute, { infoMetadata } from '@/components/longform/InfoRoute';

export const metadata = infoMetadata('pricing');

export default function Page() {
    return <InfoRoute slug="pricing" eyebrow="Pricing" />;
}
