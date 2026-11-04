import Hub from '@/components/longform/Hub';
import { PILLAR, SERVICES, STUDIO } from '@/content/routes';
import { pageMetadata } from '@/content/seo';

const DESCRIPTION =
    'SEO, websites, social media, Google and Meta ads, branding, video and content from one Jaipur team. See every service we offer and book a strategy call.';

export const metadata = pageMetadata({ title: 'Marketing and Creative Services in Jaipur', description: DESCRIPTION, path: '/services' });

export default function ServicesHub() {
    return (
        <Hub
            path="/services"
            name="Services"
            eyebrow="Services"
            h1="Marketing and creative services in Jaipur"
            description={DESCRIPTION}
            lede="Everything a growing business needs to be found, chosen and remembered: search, websites, social, ads, brand, video and words. Pick one service or let us plan the mix, with one team owning the result."
            sections={[
                {
                    title: 'Start with the plan',
                    intro: 'Most businesses need two or three channels working together, not all of them at once.',
                    layout: 'feature',
                    items: [{ href: PILLAR.href, label: PILLAR.label, summary: PILLAR.blurb }],
                },
                { title: 'Core services', items: SERVICES.map((s) => ({ href: s.href, label: s.label, summary: s.blurb })) },
                {
                    title: 'Studio',
                    intro: 'Production capabilities that feed every channel.',
                    items: STUDIO.map((s) => ({ href: s.href, label: s.label, summary: s.blurb })),
                },
            ]}
        />
    );
}
