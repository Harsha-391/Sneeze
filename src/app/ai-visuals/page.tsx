import AiVisualsPage from '@/components/service/pages/AiVisuals';
import JsonLd from '@/components/seo/JsonLd';
import { serviceMetadata, serviceSchemas } from '@/content/seo';

export const metadata = serviceMetadata('ai-visuals');

export default function Page() {
    return (
        <>
            <JsonLd data={serviceSchemas('ai-visuals')} />
            <AiVisualsPage />
        </>
    );
}
