import WebExperiencePage from '@/components/service/pages/WebExperience';
import JsonLd from '@/components/seo/JsonLd';
import { serviceMetadata, serviceSchemas } from '@/content/seo';

export const metadata = serviceMetadata('web-experience');

export default function Page() {
    return (
        <>
            <JsonLd data={serviceSchemas('web-experience')} />
            <WebExperiencePage />
        </>
    );
}
