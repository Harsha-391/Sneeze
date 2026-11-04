import InfoRoute, { infoMetadata } from '@/components/longform/InfoRoute';

export const metadata = infoMetadata('process');

export default function Page() {
    return <InfoRoute slug="process" eyebrow="How we work" />;
}
