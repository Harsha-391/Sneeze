'use client';
import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { FORM_ACCESS_KEY, FORM_ENDPOINT } from '@/config/site';
import { OBJECTIVES, OBJECTIVE_BY_SLUG } from '@/content/objectives';

type Form = { name: string; phone: string; email: string; interest: string; message: string };
const EMPTY: Form = { name: '', phone: '', email: '', interest: OBJECTIVES[0], message: '' };

/** Short enquiry form (the long brief lives at /project). Posts to Web3Forms. */
export default function ContactForm() {
    const [form, setForm] = useState<Form>(EMPTY);
    const [status, setStatus] = useState<null | 'sending' | 'sent' | 'error'>(null);

    // Arriving from a service page (?service=slug) pre-selects the interest.
    useEffect(() => {
        const slug = new URLSearchParams(window.location.search).get('service');
        const match = slug ? OBJECTIVE_BY_SLUG[slug] : undefined;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of the URL after mount
        if (match) setForm((f) => ({ ...f, interest: match }));
    }, []);

    const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    access_key: FORM_ACCESS_KEY,
                    subject: `Website enquiry: ${form.interest}`,
                    from_name: 'sneeze.media contact form',
                    ...form,
                    page: typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/contact',
                }),
            });
            const out = await res.json();
            setStatus(out.success ? 'sent' : 'error');
            if (out.success) setForm(EMPTY);
        } catch {
            setStatus('error');
        }
    };

    if (status === 'sent')
        return (
            <div className="cform__done" role="status">
                <p className="serif">Thanks, we have your message.</p>
                <p>A person on our team will get back to you soon. For anything urgent, call or WhatsApp us.</p>
            </div>
        );

    return (
        <form className="cform" onSubmit={submit} aria-describedby="cform-note">
            <div className="cform__row">
                <label className="cfield">
                    <span>Your name</span>
                    <input name="name" required autoComplete="name" value={form.name} onChange={set('name')} />
                </label>
                <label className="cfield">
                    <span>Phone or WhatsApp</span>
                    <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" value={form.phone} onChange={set('phone')} />
                </label>
            </div>
            <label className="cfield">
                <span>Email (optional)</span>
                <input name="email" type="email" autoComplete="email" value={form.email} onChange={set('email')} />
            </label>
            <label className="cfield">
                <span>What do you need help with?</span>
                <select name="interest" value={form.interest} onChange={set('interest')}>
                    {OBJECTIVES.map((o) => (
                        <option key={o}>{o}</option>
                    ))}
                </select>
            </label>
            <label className="cfield">
                <span>Tell us a little about your business</span>
                <textarea name="message" rows={4} required value={form.message} onChange={set('message')} data-lenis-prevent />
            </label>
            <p id="cform-note" className="cform__note">
                We use these details only to reply to you. See our <a href="/privacy-policy" className="uline">privacy policy</a>.
            </p>
            <Button type="submit" variant="solid" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send enquiry'}
            </Button>
            {status === 'error' && (
                <p className="cform__error" role="alert">
                    Something went wrong. Please call or WhatsApp us instead.
                </p>
            )}
        </form>
    );
}
