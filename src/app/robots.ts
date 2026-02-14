import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.sneeze.media';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    }
}
