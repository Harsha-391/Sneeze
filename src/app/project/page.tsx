import ProjectPage from '@/components/project/ProjectPage';
import JsonLd from '@/components/seo/JsonLd';
import { PROJECT_SEO } from '@/content/site';
import { breadcrumbSchema, pageMetadata } from '@/content/seo';

export const metadata = pageMetadata({
    title: PROJECT_SEO.title,
    description: PROJECT_SEO.description,
    path: '/project',
    keywords: ['hire a creative agency in Jaipur', 'contact digital marketing agency Jaipur', 'website design quote Jaipur'],
});

export default function Page() {
    return (
        <>
            <JsonLd
                data={[
                    {
                        '@context': 'https://schema.org',
                        '@type': 'ContactPage',
                        name: 'Start a project with Sneeze Media',
                        url: 'https://www.sneeze.media/project',
                        about: { '@id': 'https://www.sneeze.media/#organization' },
                    },
                    breadcrumbSchema([
                        { name: 'Home', path: '' },
                        { name: 'Start a project', path: '/project' },
                    ]),
                ]}
            />
            <ProjectPage />
        </>
    );
}
