'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaWhatsapp } from 'react-icons/fa';
import Button from '../ui/Button';
import { CONTACTS } from '@/constants';
import { OBJECTIVES, SERVICE_PAGES } from '@/content/services';
import { usePageReady, useReveal } from '@/lib/motion';

// web3forms.com public access key (safe to ship: it only allows sending to the owner's inbox)
const ACCESS_KEY = 'cc43b0dc-0e85-4c41-95a4-7c64e1378e8f';

type Form = { name: string; brand: string; email: string; objective: string; details: string };
const EMPTY: Form = { name: '', brand: '', email: '', objective: 'Brand Identity', details: '' };

const NEXT_STEPS = [
    { title: 'We read your brief', text: 'We go through your goals, audience and references.' },
    { title: 'We get on a call', text: 'A quick conversation to dig into what success looks like.' },
    { title: 'You get a plan', text: 'A clear proposal: what we make, the timeline and the cost.' },
];

function Field({
    label,
    name,
    value,
    onChange,
    type = 'text',
    placeholder,
    textarea,
    autoComplete,
}: {
    label: string;
    name: keyof Form;
    value: string;
    onChange: (name: keyof Form, value: string) => void;
    type?: string;
    placeholder: string;
    textarea?: boolean;
    autoComplete?: string;
}) {
    const id = `f-${name}`;
    return (
        <div className="field rv-fade">
            <label htmlFor={id} className="field__label">
                {label}
            </label>
            {textarea ? (
                <textarea
                    id={id}
                    name={name}
                    required
                    rows={4}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(name, e.target.value)}
                    data-lenis-prevent
                />
            ) : (
                <input
                    id={id}
                    name={name}
                    type={type}
                    required
                    value={value}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    onChange={(e) => onChange(name, e.target.value)}
                />
            )}
            <span className="field__bar" aria-hidden="true" />
        </div>
    );
}

export default function ProjectPage() {
    const ready = usePageReady();
    const heroRef = useRef<HTMLDivElement>(null);
    const asideRef = useReveal<HTMLElement>();
    const formRef = useReveal<HTMLDivElement>();
    const [form, setForm] = useState<Form>(EMPTY);
    const [status, setStatus] = useState<null | 'submitting' | 'success' | 'error'>(null);

    useEffect(() => {
        if (ready) heroRef.current?.classList.add('is-in');
    }, [ready]);

    // Coming from a service page? Pre-select that objective (?service=slug).
    useEffect(() => {
        const slug = new URLSearchParams(window.location.search).get('service');
        const match = SERVICE_PAGES.find((s) => s.slug === slug);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of the URL after mount
        if (match) setForm((f) => ({ ...f, objective: match.objective }));
    }, []);

    const update = (name: keyof Form, value: string) => setForm((f) => ({ ...f, [name]: value }));

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ access_key: ACCESS_KEY, ...form, subject: `New Project Inquiry: ${form.brand}` }),
            });
            const result = await res.json();
            if (result.success) {
                setStatus('success');
                setForm(EMPTY);
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <main className="contact">
            <section ref={heroRef} className="wrap contact__hero" aria-labelledby="contact-title">
                <nav className="crumbs rv-fade" aria-label="Breadcrumb">
                    <Link href="/">Home</Link>
                    <i>/</i>
                    <span aria-current="page">Start a project</span>
                </nav>
                <h1 id="contact-title" className="serif h-hero">
                    <span className="badge hero__kicker rv-fade" style={{ '--d': '60ms' } as React.CSSProperties}>
                        <FaMapMarkerAlt aria-hidden="true" /> Hire a creative agency in Jaipur
                    </span>
                    <span className="sr-only">: </span>
                    <span className="rv-line" style={{ '--d': '100ms' } as React.CSSProperties}>
                        <span>Let&apos;s make{' '}</span>
                    </span>
                    <span className="rv-line" style={{ '--i': 1, '--d': '100ms' } as React.CSSProperties}>
                        <span>
                            some <em>noise.</em>
                        </span>
                    </span>
                </h1>
                <p className="contact__lede rv-fade" style={{ '--d': '450ms' } as React.CSSProperties}>
                    Tell us about your vision. We will handle the rest.
                </p>
            </section>

            <div className="wrap contact__grid">
                <aside ref={asideRef} className="contact__aside">
                    <div className="contact__block rv-fade">
                        <h2 className="eyebrow">Prefer to talk?</h2>
                        <ul className="contact__lines">
                            {CONTACTS.map((c) => (
                                <li key={c.number}>
                                    <a className="contact__line serif" href={`tel:+${c.number.replace(/\D/g, '')}`}>
                                        <FaPhone aria-hidden="true" />
                                        <span className="uline">{c.number}</span>
                                    </a>
                                    <a
                                        className="contact__wa"
                                        href={`https://wa.me/${c.number.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`WhatsApp ${c.number}`}
                                    >
                                        <FaWhatsapp aria-hidden="true" /> WhatsApp
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="contact__block rv-fade" style={{ '--i': 1 } as React.CSSProperties}>
                        <h2 className="eyebrow">What happens next</h2>
                        <ol className="next-steps">
                            {NEXT_STEPS.map((s, i) => (
                                <li key={s.title}>
                                    <span className="next-steps__num display">{String(i + 1).padStart(2, '0')}</span>
                                    <div>
                                        <h3 className="serif">{s.title}</h3>
                                        <p>{s.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </aside>

                <div ref={formRef} className="contact__form-wrap">
                    {status === 'success' ? (
                        <div className="sent" role="status">
                            <svg className="sent__check" viewBox="0 0 52 52" aria-hidden="true">
                                <circle cx="26" cy="26" r="24" pathLength={1} />
                                <path d="M15 27l7 7 15-16" pathLength={1} />
                            </svg>
                            <h2 className="serif h-l">
                                Request <em>received.</em>
                            </h2>
                            <p>We have received your dossier. Our team will contact you shortly.</p>
                            <Button onClick={() => setStatus(null)}>Send Another Request</Button>
                        </div>
                    ) : (
                        <form className="pform" onSubmit={submit}>
                            <div className="pform__row">
                                <Field label="Name" name="name" value={form.name} onChange={update} placeholder="Your name" autoComplete="name" />
                                <Field label="Brand" name="brand" value={form.brand} onChange={update} placeholder="Company / brand" autoComplete="organization" />
                            </div>
                            <Field label="Email" name="email" type="email" value={form.email} onChange={update} placeholder="name@company.com" autoComplete="email" />

                            <fieldset className="field field--opts rv-fade">
                                <legend className="field__label">Objective</legend>
                                <div className="opts">
                                    {OBJECTIVES.map((o) => (
                                        <label key={o} className="opt">
                                            <input
                                                type="radio"
                                                name="objective"
                                                value={o}
                                                checked={form.objective === o}
                                                onChange={() => update('objective', o)}
                                            />
                                            <span>{o}</span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>

                            <Field label="Details" name="details" value={form.details} onChange={update} placeholder="Describe your project goals..." textarea />

                            <div className="pform__actions rv-fade">
                                <Button type="submit" variant="solid" disabled={status === 'submitting'}>
                                    {status === 'submitting' ? 'Transmitting...' : 'Submit Request'}
                                </Button>
                                {status === 'error' && (
                                    <p className="pform__error" role="alert">
                                        Transmission failed. Please try again, or call us directly.
                                    </p>
                                )}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}
