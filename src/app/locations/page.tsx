import Hub from '@/components/longform/Hub';
import { LOCATIONS } from '@/content/routes';
import { pageMetadata } from '@/content/seo';

const DESCRIPTION =
    'Sneeze Media is based in Jaipur and works with businesses across Rajasthan, Delhi NCR, Mumbai and the rest of India. See how we approach each market.';

export const metadata = pageMetadata({ title: 'Where We Work: Jaipur, Rajasthan and India', description: DESCRIPTION, path: '/locations' });

export default function LocationsHub() {
    return (
        <Hub
            path="/locations"
            name="Locations"
            eyebrow="Locations"
            h1="Where we work"
            description={DESCRIPTION}
            lede="We are based in Jaipur and know it street by street. Briefs, calls and reviews happen online, so we also work with businesses across Rajasthan, Delhi NCR, Mumbai and beyond."
            sections={[{ title: 'Markets we cover', items: LOCATIONS.map((s) => ({ href: s.href, label: s.label, summary: s.blurb })) }]}
        />
    );
}
