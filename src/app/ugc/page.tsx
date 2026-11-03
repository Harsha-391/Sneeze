import UgcPage from '@/components/service/pages/Ugc';
import JsonLd from '@/components/seo/JsonLd';
import { serviceMetadata, serviceSchemas } from '@/content/seo';

export const metadata = serviceMetadata('ugc');

export default function Page() {
    return (
        <>
            <JsonLd data={serviceSchemas('ugc')} />
            <UgcPage />
        </>
    );
}
