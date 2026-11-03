import type { Metadata } from 'next';
import ServicePage from '@/components/service/ServicePage';

export const metadata: Metadata = {
    title: 'Web Experiences',
    description: 'Fast, SEO-optimised, animated websites built on Next.js that feel like apps and rank like encyclopedias.',
};

export default function Page() {
    return <ServicePage slug="web-experience" />;
}
