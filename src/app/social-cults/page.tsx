import ServicePage from '@/components/service/ServicePage';
import JsonLd from '@/components/seo/JsonLd';
import { serviceMetadata, serviceSchemas } from '@/content/seo';

export const metadata = serviceMetadata('social-cults');

export default function Page() {
    return (
        <>
            <JsonLd data={serviceSchemas('social-cults')} />
            <ServicePage slug="social-cults" />
        </>
    );
}
