import InfoRoute, { infoMetadata } from '@/components/longform/InfoRoute';

export const metadata = infoMetadata('terms');

export default function Page() {
    return <InfoRoute slug="terms" eyebrow="Legal" />;
}
