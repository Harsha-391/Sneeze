import type { Metadata } from 'next';
import ServicePage from '@/components/service/ServicePage';

export const metadata: Metadata = {
    title: 'AI-Gen Visuals',
    description: 'AI-generated posters, product imagery and video synthesis: studio-grade visuals without the studio.',
};

export default function Page() {
    return <ServicePage slug="ai-visuals" />;
}
