import type { Metadata } from 'next';
import ServicePage from '@/components/service/ServicePage';

export const metadata: Metadata = {
    title: 'Social Cults',
    description: 'Algorithm-hacking reels, trend jacking and community building that turns scrollers into evangelists.',
};

export default function Page() {
    return <ServicePage slug="social-cults" />;
}
