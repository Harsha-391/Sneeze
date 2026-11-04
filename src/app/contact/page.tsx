import Link from 'next/link';
import ContactForm from '@/components/contact/ContactForm';
import Faq from '@/components/Faq';
import Breadcrumbs from '@/components/longform/Breadcrumbs';
import LfHero from '@/components/longform/LfHero';
import JsonLd from '@/components/seo/JsonLd';
import { addressLine, BUSINESS, isSet, telHref, waHref } from '@/config/site';
import { breadcrumbSchema, faqSchema, pageMetadata, webPageSchema } from '@/content/seo';

const DESCRIPTION =
    'Contact Sneeze Media, a digital marketing agency in Jaipur. Call or WhatsApp +91 99291 03969, or send a short enquiry and a person on our team will reply.';

export const metadata = pageMetadata({ title: 'Contact a Digital Marketing Agency in Jaipur', description: DESCRIPTION, path: '/contact' });

const FAQ = [
    {
        q: 'What is the fastest way to reach Sneeze Media?',
        a: 'WhatsApp or a phone call on +91 99291 03969. Messages sent during working hours usually get a reply the same day.',
    },
    {
        q: 'Can we meet in person in Jaipur?',
        a: 'Yes. We are based in Jaipur and happy to meet once we have had a first call and understand your goals. Clients outside Jaipur work with us over video calls and WhatsApp.',
    },
    {
        q: 'What should I prepare before the first call?',
        a: 'Your website link, what you sell and to whom, what you have tried so far and what you want more of: leads, sales, footfall or visibility. Rough budget ranges help us recommend the right starting point.',
    },
    {
        q: 'What happens on the first call?',
        a: 'The first conversation is simply to understand your business and whether we are a good fit. Detailed audits and strategy documents are scoped in a proposal, so you know exactly what you are paying for before any work starts.',
    },
];

export default function ContactRoute() {
    const crumbs = [
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
    ];
    const address = addressLine();
    return (
        <main className="lf lf--contact">
            <JsonLd data={[webPageSchema('ContactPage', 'Contact Sneeze Media', DESCRIPTION, '/contact'), breadcrumbSchema(crumbs), faqSchema(FAQ)]} />
            <LfHero
                variant="page"
                crumbs={<Breadcrumbs items={crumbs.map((c) => ({ name: c.name, href: c.path }))} />}
                eyebrow="Contact"
                h1="Contact our digital marketing agency in Jaipur"
                lede="Tell us what you sell and what you want more of. You will hear back from a person on our team, usually the same day, with honest next steps rather than a sales script."
            />

            <section className="wrap contact-grid" aria-label="Ways to reach us">
                <div className="contact-grid__form">
                    <h2 className="serif contact-grid__h">Send a short enquiry</h2>
                    <ContactForm />
                    <p className="contact-grid__alt">
                        Have a detailed brief? Use the <Link href="/project" className="uline">project brief form</Link> instead.
                    </p>
                </div>

                <aside className="contact-grid__side">
                    <div className="contact-card">
                        <h2 className="eyebrow">Talk now</h2>
                        <a className="contact-card__big serif" href={waHref(BUSINESS.whatsapp, 'Hi Sneeze Media, I would like to discuss a project.')} target="_blank" rel="noopener noreferrer">
                            WhatsApp us
                        </a>
                        <ul className="contact-card__list">
                            {BUSINESS.phones.map((p) => (
                                <li key={p}>
                                    <a href={telHref(p)} className="uline">
                                        Call {p}
                                    </a>
                                </li>
                            ))}
                            {isSet(BUSINESS.email) && (
                                <li>
                                    <a href={`mailto:${BUSINESS.email}`} className="uline">
                                        {BUSINESS.email}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="contact-card">
                        <h2 className="eyebrow">Find us</h2>
                        <address className="contact-card__addr">
                            <strong>{BUSINESS.name}</strong>
                            <br />
                            {address}
                        </address>
                        {isSet(BUSINESS.openingHours) && <p className="contact-card__hours">Hours: {BUSINESS.openingHours}</p>}
                        <div className="contact-map">
                            {isSet(BUSINESS.mapEmbedUrl) ? (
                                <iframe
                                    src={BUSINESS.mapEmbedUrl}
                                    title={`Map showing ${BUSINESS.name} in Jaipur`}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    width="600"
                                    height="360"
                                />
                            ) : (
                                <div className="contact-map__placeholder" aria-hidden="true">
                                    <span className="display">Jaipur</span>
                                    <small>Rajasthan, India</small>
                                </div>
                            )}
                        </div>
                    </div>
                </aside>
            </section>

            <Faq id="faq" eyebrow="Before you get in touch" title={<>Good to <em>know.</em></>} items={FAQ} />
        </main>
    );
}
