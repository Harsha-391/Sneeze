import EditorialPage from '@/components/service/pages/Editorial';
import JsonLd from '@/components/seo/JsonLd';
import { serviceMetadata, serviceSchemas } from '@/content/seo';

export const metadata = serviceMetadata('editorial');

export default function Page() {
    return (
        <>
            <JsonLd data={serviceSchemas('editorial')} />
            <EditorialPage />
        </>
    );
}
