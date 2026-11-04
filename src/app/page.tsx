import Preloader from '@/components/home/Preloader';
import Hero from '@/components/home/Hero';
import StatsStrip from '@/components/home/StatsStrip';
import Manifesto from '@/components/home/Manifesto';
import ServicesGrid from '@/components/home/ServicesGrid';
import BigWords from '@/components/home/BigWords';
import Process from '@/components/home/Process';
import Decrypt from '@/components/home/Decrypt';
import Arsenal from '@/components/home/Arsenal';
import Promises from '@/components/home/Promises';
import LocalSeo from '@/components/home/LocalSeo';
import Directory from '@/components/home/Directory';
import Faq from '@/components/Faq';
import JsonLd from '@/components/seo/JsonLd';
import { HOME_SEO } from '@/content/site';
import { faqSchema, pageMetadata, websiteSchema } from '@/content/seo';

export const metadata = pageMetadata({
    title: HOME_SEO.title,
    description: HOME_SEO.description,
    path: '/',
    keywords: HOME_SEO.keywords,
    absoluteTitle: true,
});

export default function Home() {
    return (
        <main className="home">
            <JsonLd data={[websiteSchema(), faqSchema(HOME_SEO.faq)]} />
            <Preloader />
            <Hero />
            <StatsStrip />
            <Manifesto />
            <ServicesGrid />
            <BigWords />
            <Process />
            <Decrypt />
            <Arsenal />
            <Promises />
            <LocalSeo />
            <Directory />
            <Faq
                id="faq"
                eyebrow="FAQ · Creative agency in Jaipur"
                title={
                    <>
                        Questions, <em>answered.</em>
                    </>
                }
                items={HOME_SEO.faq}
            />
        </main>
    );
}
