import ServicePage from '@/components/service/ServicePage';
import JsonLd from '@/components/seo/JsonLd';
import { serviceMetadata, serviceSchemas } from '@/content/seo';

export const metadata = serviceMetadata('ugc');

export default function Page() {
    return (
        <>
            <JsonLd data={serviceSchemas('ugc')} />
            <ServicePage slug="ugc" />
        </>
    );
}
