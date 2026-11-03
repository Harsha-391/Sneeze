import type { Metadata } from 'next';
import ServicePage from '@/components/service/ServicePage';

export const metadata: Metadata = {
    title: 'UGC Factory',
    description: 'Creator-led, platform-native UGC at volume: content that looks like a recommendation from a friend.',
};

export default function Page() {
    return <ServicePage slug="ugc" />;
}
