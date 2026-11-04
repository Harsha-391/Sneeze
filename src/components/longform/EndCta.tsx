'use client';
import Button from '../ui/Button';
import { useReveal } from '@/lib/motion';

/** Closing statement + the page's call to action (reuses the .send layout). */
export default function EndCta({
    title,
    text,
    href,
    label,
    whatsappHref,
}: {
    title: string;
    text: string;
    href: string;
    label: string;
    whatsappHref: string;
}) {
    const ref = useReveal<HTMLElement>();
    return (
        <section ref={ref} className="send lf-end" aria-labelledby="end-title">
            <div className="wrap send__grid">
                <h2 id="end-title" className="send__title serif">
                    <span className="rv-line">
                        <span>{title}</span>
                    </span>
                </h2>
                <div className="send__side">
                    <p className="send__text rv-fade" style={{ '--d': '200ms' } as React.CSSProperties}>
                        {text}
                    </p>
                    <div className="lf-end__actions rv-fade" style={{ '--d': '320ms' } as React.CSSProperties}>
                        <Button href={href} variant="solid">
                            {label}
                        </Button>
                        <a className="uline" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                            WhatsApp us instead
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
