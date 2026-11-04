import React from 'react';
import {
    FaRobot, FaInstagram, FaCameraRetro, FaBullhorn, FaCode, FaFingerprint,
    FaSkull, FaBolt, FaEye, FaFire, FaGem, FaGhost, FaInfinity, FaLayerGroup,
} from 'react-icons/fa';

export const COLORS = {
    gold: '#D4AF37',
    black: '#0b0a08',
    text: '#f4efe3',
    textMuted: '#8f8a80',
};

export const CONTACTS = [
    { label: 'Primary', number: '+91 9929103969' },
    { label: 'Secondary', number: '+91 9549791480' },
];

export type Service = {
    title: string;
    href: string;
    iconMain: React.ReactNode;
    iconHover: React.ReactNode;
    desc: string;
    tags: string[];
    /** aspect ratio of the card visual on the home grid */
    ratio: string;
    /** glow colour + position for the card scene */
    glow: string;
    glowAt: [string, string];
};

export const SERVICES_DATA: Service[] = [
    {
        title: 'AI-Gen Visuals',
        href: '/services/ai-content-creation-jaipur',
        iconMain: <FaRobot />,
        iconHover: <FaSkull />,
        desc: 'We engineer imaginative posters and AI video synthesis.',
        tags: ['MidJourney', 'Runway'],
        ratio: '545 / 610',
        glow: 'rgba(212, 175, 55, 0.55)',
        glowAt: ['30%', '25%'],
    },
    {
        title: 'Social Cults',
        href: '/services/social-media-marketing-jaipur',
        iconMain: <FaInstagram />,
        iconHover: <FaFire />,
        desc: 'Algorithm-hacking reels and community warfare.',
        tags: ['Reels', 'Viral'],
        ratio: '545 / 515',
        glow: 'rgba(255, 120, 60, 0.45)',
        glowAt: ['70%', '30%'],
    },
    {
        title: 'Editorial Stills',
        href: '/services/product-photography-jaipur',
        iconMain: <FaCameraRetro />,
        iconHover: <FaEye />,
        desc: 'Editorial-grade photography. Texture, grain and vibe.',
        tags: ['Fashion', 'Product'],
        ratio: '545 / 420',
        glow: 'rgba(244, 239, 227, 0.32)',
        glowAt: ['50%', '70%'],
    },
    {
        title: 'Performance Ads',
        href: '/services/performance-marketing-jaipur',
        iconMain: <FaBullhorn />,
        iconHover: <FaBolt />,
        desc: 'High-CTR creatives designed purely for conversion.',
        tags: ['ROAS', 'PPC'],
        ratio: '545 / 420',
        glow: 'rgba(242, 212, 126, 0.5)',
        glowAt: ['20%', '60%'],
    },
    {
        title: 'UGC Factory',
        href: '/services/ugc-video-production-jaipur',
        iconMain: <FaFingerprint />,
        iconHover: <FaGhost />,
        desc: 'Authenticity scales. Creators that look like friends.',
        tags: ['TikTok', 'Raw'],
        ratio: '545 / 515',
        glow: 'rgba(212, 120, 55, 0.5)',
        glowAt: ['65%', '65%'],
    },
    {
        title: 'Web Experiences',
        href: '/services/website-design-development-jaipur',
        iconMain: <FaCode />,
        iconHover: <FaGem />,
        desc: 'Fast, SEO-optimised, animated digital headquarters.',
        tags: ['Next.js', 'React'],
        ratio: '545 / 610',
        glow: 'rgba(212, 175, 55, 0.45)',
        glowAt: ['45%', '20%'],
    },
];

export const STATS = [
    { icon: <FaRobot />, label: 'AI Visuals', value: 40, prefix: '', suffix: '%', text: 'Lower production spend with AI-generated visuals.' },
    { icon: <FaBolt />, label: 'Speed', value: 10, prefix: '', suffix: 'x', text: 'Faster creative turnaround than traditional shoots.' },
    { icon: <FaCode />, label: 'Web', value: 100, prefix: '', suffix: '', text: 'The Core Web Vitals score every build is engineered towards.' },
    { icon: <FaBullhorn />, label: 'Ads', value: 24, prefix: '', suffix: '/7', text: 'An always-on content engine across every platform.' },
    { icon: <FaLayerGroup />, label: 'Studio', value: 6, prefix: '', suffix: '', text: 'Disciplines under one roof: AI, social, editorial, ads, UGC and web.' },
    { icon: <FaInfinity />, label: 'Scale', value: 0, prefix: '∞', suffix: '', text: 'Creative variations, generated and tested at speed.' },
];

export const BIG_WORDS = [
    { word: 'Content', subs: ['AI-gen visuals', 'Editorial stills', 'UGC factory', 'Video synthesis'] },
    { word: 'Social', subs: ['Reels & shorts', 'Community warfare', 'Trend hijacking', 'Creator collabs'] },
    { word: 'Ads', subs: ['Meta & Google', 'TikTok & LinkedIn', 'Retargeting', 'ROAS optimisation'] },
    { word: 'Web', subs: ['Next.js & React', 'Shopify', 'WordPress & Wix', 'SEO & speed'] },
];

export const PROCESS = [
    { title: 'Discover', text: 'We dig into your brand, audience and competitors until we find the angle nobody is using.' },
    { title: 'Strategise', text: 'A sharp plan: channels, formats, hooks and the numbers we will be judged on.' },
    { title: 'Create', text: 'AI visuals, shoots, reels and UGC, produced fast without cutting corners.' },
    { title: 'Launch', text: 'Content and campaigns go live everywhere your customers actually scroll.' },
    { title: 'Optimise', text: 'We test, read the data and double down on what converts. Every week.' },
    { title: 'Scale', text: 'Winning creative gets multiplied across platforms, markets and budgets.' },
];

export const DECRYPT = [
    { from: 'Obscurity', to: 'Authority' },
    { from: 'Noise', to: 'Signal' },
    { from: 'Follower', to: 'Leader' },
];

export const ARSENAL = [
    { name: 'MidJourney', kind: 'AI' },
    { name: 'Runway', kind: 'AI video' },
    { name: 'Remotion', kind: 'Motion' },
    { name: 'Instagram Reels', kind: 'Social' },
    { name: 'TikTok', kind: 'Social' },
    { name: 'YouTube Shorts', kind: 'Social' },
    { name: 'Meta Ads', kind: 'Ads' },
    { name: 'Google Ads', kind: 'Ads' },
    { name: 'LinkedIn Ads', kind: 'Ads' },
    { name: 'Retargeting', kind: 'Ads' },
    { name: 'Analytics', kind: 'Data' },
    { name: 'SEO', kind: 'Search' },
    { name: 'Next.js', kind: 'Web' },
    { name: 'React', kind: 'Web' },
    { name: 'Shopify', kind: 'Commerce' },
    { name: 'WordPress', kind: 'Web' },
    { name: 'Wix', kind: 'Web' },
    { name: 'Editorial Shoots', kind: 'Photo' },
];

export const PROMISES = [
    { title: 'No templates.', text: 'Every visual is engineered for your brand, never recycled from the last client.', tag: 'Originality' },
    { title: 'Speed is a feature.', text: 'Briefs become finished creative in days, not months. AI does the heavy lifting; we do the taste.', tag: 'Velocity' },
    { title: 'Numbers over noise.', text: 'We report on ROAS, retention and revenue, not vanity metrics that look nice in a deck.', tag: 'Performance' },
    { title: 'Real humans.', text: 'Creators who look like friends, not ads. Authenticity is what scales.', tag: 'UGC' },
    { title: 'Big-brand polish.', text: 'Fortune 500 aesthetics on a startup budget. Stop burning cash on logistics.', tag: 'Value' },
    { title: 'One team.', text: 'AI, social, editorial, ads and web under one roof, so your brand speaks with one voice.', tag: 'Full stack' },
];
