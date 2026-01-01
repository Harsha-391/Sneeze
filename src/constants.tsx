import { FaRobot, FaInstagram, FaCameraRetro, FaBullhorn, FaCode, FaFingerprint, FaSkull, FaBolt, FaEye, FaFire, FaGem, FaGhost } from 'react-icons/fa';

export const COLORS = {
    gold: '#D4AF37',
    black: '#050505',
    text: '#ffffff',
    textMuted: '#888888',
};

export const SERVICES_DATA = [
    { title: "AI-Gen Visuals", iconMain: <FaRobot />, iconHover: <FaSkull />, desc: "We engineer imaginable posters and AI video synthesis.", tags: ["MidJourney", "Runway"] },
    { title: "Social Cults", iconMain: <FaInstagram />, iconHover: <FaFire />, desc: "Algorithm-hacking reels and community warfare.", tags: ["Reels", "Viral"] },
    { title: "Editorial Stills", iconMain: <FaCameraRetro />, iconHover: <FaEye />, desc: "Editorial grade photography. Texture, grain, and vibe.", tags: ["Fashion", "Product"] },
    { title: "Performance Ads", iconMain: <FaBullhorn />, iconHover: <FaBolt />, desc: "High-CTR creatives designed purely for conversion.", tags: ["ROAS", "PPC"] },
    { title: "UGC Factory", iconMain: <FaFingerprint />, iconHover: <FaGhost />, desc: "Authenticity scales. Creators that look like friends.", tags: ["TikTok", "Raw"] },
    { title: "Web Experiences", iconMain: <FaCode />, iconHover: <FaGem />, desc: "Fast, SEO-optimized, and animated digital headquarters.", tags: ["Next.js", "React"] }
];