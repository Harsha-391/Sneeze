import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import { BUSINESS, telHref, waHref } from '@/config/site';

/**
 * Persistent WhatsApp (and, on phones, call) buttons. position: fixed, so it
 * never shifts layout (no CLS). Server-rendered; no JS needed.
 */
export default function FloatingContact() {
    return (
        <div className="float-cta">
            <a className="float-cta__btn float-cta__btn--call" href={telHref(BUSINESS.phones[0])} aria-label={`Call Sneeze Media on ${BUSINESS.phones[0]}`}>
                <FaPhone aria-hidden="true" />
            </a>
            <a
                className="float-cta__btn float-cta__btn--wa"
                href={waHref(BUSINESS.whatsapp, 'Hi Sneeze Media, I found you on your website.')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Sneeze Media on WhatsApp"
            >
                <FaWhatsapp aria-hidden="true" />
                <span className="float-cta__label">WhatsApp us</span>
            </a>
        </div>
    );
}
