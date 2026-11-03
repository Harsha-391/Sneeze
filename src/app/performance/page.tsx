import type { Metadata } from 'next';
import ServicePage from '@/components/service/ServicePage';

export const metadata: Metadata = {
    title: 'Performance Ads',
    description: 'High-CTR ad creatives for Meta, TikTok and YouTube, tested to destruction and scaled on ROAS.',
};

export default function Page() {
    return <ServicePage slug="performance" />;
}
