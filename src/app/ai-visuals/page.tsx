import ServicePage from '@/components/service/ServicePage';
import JsonLd from '@/components/seo/JsonLd';
import { serviceMetadata, serviceSchemas } from '@/content/seo';

export const metadata = serviceMetadata('ai-visuals');

export default function Page() {
    return (
        <>
            <JsonLd data={serviceSchemas('ai-visuals')} />
            <ServicePage slug="ai-visuals" />
        </>
    );
}
