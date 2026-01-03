import React from 'react'; // Ensure React is imported if using JSX in constants (for icons)
import { FaRobot, FaInstagram, FaCameraRetro, FaBullhorn, FaCode, FaFingerprint, FaSkull, FaBolt, FaEye, FaFire, FaGem, FaGhost } from 'react-icons/fa';

export const COLORS = {
    gold: '#D4AF37',
    black: '#050505',
    text: '#ffffff',
    textMuted: '#888888',
};

// Added 'href' to each item
export const SERVICES_DATA = [
    {
        title: "AI-Gen Visuals",
        href: "/ai-visuals", //
        iconMain: <FaRobot />,
        iconHover: <FaSkull />,
        desc: "We engineer imaginable posters and AI video synthesis.",
        tags: ["MidJourney", "Runway"]
    },
    {
        title: "Social Cults",
        href: "/social-cults",
        iconMain: <FaInstagram />,
        iconHover: <FaFire />,
        desc: "Algorithm-hacking reels and community warfare.",
        tags: ["Reels", "Viral"]
    },
    {
        title: "Editorial Stills",
        href: "/editorial",
        iconMain: <FaCameraRetro />,
        iconHover: <FaEye />,
        desc: "Editorial grade photography. Texture, grain, and vibe.",
        tags: ["Fashion", "Product"]
    },
    {
        title: "Performance Ads",
        href: "/performance",
        iconMain: <FaBullhorn />,
        iconHover: <FaBolt />,
        desc: "High-CTR creatives designed purely for conversion.",
        tags: ["ROAS", "PPC"]
    },
    {
        title: "UGC Factory",
        href: "/ugc",
        iconMain: <FaFingerprint />,
        iconHover: <FaGhost />,
        desc: "Authenticity scales. Creators that look like friends.",
        tags: ["TikTok", "Raw"]
    },
    {
        title: "Web Experiences",
        href: "/web-experience",
        iconMain: <FaCode />,
        iconHover: <FaGem />,
        desc: "Fast, SEO-optimized, and animated digital headquarters.",
        tags: ["Next.js", "React"]
    }
];