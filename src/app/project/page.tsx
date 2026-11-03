import type { Metadata } from 'next';
import ProjectPage from '@/components/project/ProjectPage';

export const metadata: Metadata = {
    title: 'Start a Project',
    description: 'Tell Sneeze Media about your brand and goals. Call, WhatsApp or send a brief and get a clear proposal.',
};

export default function Page() {
    return <ProjectPage />;
}
