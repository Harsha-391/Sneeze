import InfoRoute, { infoMetadata } from '@/components/longform/InfoRoute';

export const metadata = infoMetadata('privacy-policy');

export default function Page() {
    return <InfoRoute slug="privacy-policy" eyebrow="Legal" />;
}
