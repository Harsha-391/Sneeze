import Hub from '@/components/longform/Hub';
import { COMBOS, INDUSTRIES } from '@/content/routes';
import { pageMetadata } from '@/content/seo';

const DESCRIPTION =
    'How we market hospitals, clinics, schools, real estate, jewellery brands, restaurants, coaching institutes, exporters and startups. Find your industry here.';

export const metadata = pageMetadata({ title: 'Digital Marketing for Every Industry We Serve', description: DESCRIPTION, path: '/industries' });

export default function IndustriesHub() {
    return (
        <Hub
            path="/industries"
            name="Industries"
            eyebrow="Industries"
            h1="Digital marketing by industry"
            description={DESCRIPTION}
            lede="A hospital, a jewellery brand and a coaching institute need very different marketing. Each page below covers the pain points, tactics, numbers and rules that matter in that industry."
            sections={[
                { title: 'Industries we work with', items: INDUSTRIES.map((s) => ({ href: s.href, label: s.label, summary: s.blurb })) },
                { title: 'Specialist pages', intro: 'One service, one industry, in depth.', layout: 'list', items: COMBOS.map((s) => ({ href: s.href, label: s.label })) },
            ]}
        />
    );
}
