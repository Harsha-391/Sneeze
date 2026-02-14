import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.sneeze.media';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/ai-visuals',
        '/social-cults',
        '/editorial',
        '/performance',
        '/ugc',
        '/web-experience',
        '/project'
    ];

    return routes.map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));
}
