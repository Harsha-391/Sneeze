'use client';
import { ARSENAL } from '@/constants';
import { useReveal } from '@/lib/motion';

export default function Arsenal() {
    const ref = useReveal<HTMLElement>();
    return (
        <section ref={ref} id="arsenal" className="arsenal" aria-labelledby="arsenal-title">
            <div className="wrap">
                <div className="arsenal__frame">
                    <div className="arsenal__title">
                        <p className="eyebrow rv-fade">Tools &amp; platforms</p>
                        <h2 id="arsenal-title" className="serif h-l" style={{ marginTop: 18 }}>
                            <span className="rv-line">
                                <span>The{' '}</span>
                            </span>
                            <span className="rv-line" style={{ '--i': 1 } as React.CSSProperties}>
                                <span>
                                    <em>Arsenal.</em>
                                </span>
                            </span>
                        </h2>
                    </div>
                    <ul className="arsenal__grid">
                        {ARSENAL.map((t, i) => (
                            <li key={t.name} className="tool rv-fade" style={{ '--i': (i % 9) * 0.6 } as React.CSSProperties}>
                                <span>{t.name}</span>
                                <small>{t.kind}</small>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
