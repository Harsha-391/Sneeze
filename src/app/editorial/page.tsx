import type { Metadata } from 'next';
import ServicePage from '@/components/service/ServicePage';

export const metadata: Metadata = {
    title: 'Editorial Stills',
    description: 'Editorial-grade photography and art direction: texture, grain and visuals that stop the scroll.',
};

export default function Page() {
    return <ServicePage slug="editorial" />;
}
