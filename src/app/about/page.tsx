import InfoRoute, { infoMetadata } from '@/components/longform/InfoRoute';

export const metadata = infoMetadata('about');

export default function Page() {
    return <InfoRoute slug="about" eyebrow="About us" />;
}
