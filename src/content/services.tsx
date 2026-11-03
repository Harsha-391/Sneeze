import React from 'react';
import {
    FaRobot, FaBolt, FaInfinity, FaCameraRetro, FaLayerGroup, FaMagic, FaFilm, FaCube, FaPaintBrush,
    FaFire, FaGhost, FaLaughSquint, FaUsers, FaBullhorn, FaGlobe, FaBomb,
    FaEye, FaFingerprint, FaImage, FaGem,
    FaChartLine, FaBrain, FaHandPaper, FaFlask, FaMoneyBillWave, FaRocket, FaPercent,
    FaUserFriends, FaClipboardList, FaCut, FaVideo, FaMobileAlt,
    FaSearch, FaMousePointer, FaServer, FaCode, FaLaptopCode,
} from 'react-icons/fa';

/**
 * Copy for the six service pages. Everything renders through
 * <ServicePage />, so each page shares one design and you only edit words here.
 *
 * Heading conventions: `em` is the gold italic word, `strike` is crossed out,
 * `ember` is the warm "bad" word in the before/after section.
 */

export type Line = { text: string; em?: string; strike?: string; ember?: string; after?: string };

export type ServiceContent = {
    slug: string;
    href: string;
    title: string;
    index: string;
    icon: React.ReactNode;
    badge: string;
    hero: Line[];
    lede: string;
    cta: string;
    /** project form objective this service pre-selects */
    objective: string;
    glow: string;
    ticker: string[];
    features: { title: Line; sub: string; items: { icon: React.ReactNode; title: string; desc: string }[] };
    shift: {
        oldIcon: React.ReactNode;
        oldWays: string[];
        stamp: [string, string];
        title: Line[];
        text: string;
        values: { icon: React.ReactNode; title: string; text: string }[];
    };
    steps: { title: Line; items: { title: string; desc: string }[] };
    promise: { icon: React.ReactNode; title: Line[]; text: React.ReactNode; chips: string[] };
};

export const SERVICE_PAGES: ServiceContent[] = [
    {
        slug: 'ai-visuals',
        href: '/ai-visuals',
        title: 'AI-Gen Visuals',
        index: '01',
        icon: <FaRobot />,
        badge: 'Neural Studio v1.0',
        hero: [{ text: 'The studio is ', strike: 'dead.' }, { text: 'Long live ', em: 'imagination.' }],
        lede: 'We bypass the physics of production to deliver studio-grade visuals at the speed of thought. No cameras. No limits. Just pure signal.',
        cta: 'Start Generating',
        objective: 'AI-Gen Visuals',
        glow: 'rgba(212, 175, 55, 0.55)',
        ticker: ['Hyper-realistic fashion editorial on Mars', 'Cyberpunk street food vendor in neon rain', 'Luxury perfume bottle floating in liquid gold', 'Cinematic drone shot of a glass city'],
        features: {
            title: { text: 'Deployment ', em: 'vectors.' },
            sub: 'Where we apply synthetic intelligence to solve creative problems.',
            items: [
                { icon: <FaCameraRetro />, title: 'Editorial Stills', desc: 'Hyper-realistic fashion, lifestyle, and portrait photography without a single shutter click. Perfect for campaigns that need impossible locations.' },
                { icon: <FaCube />, title: 'Product Context', desc: 'Place your product anywhere. On the moon, deep underwater, or in a cyberpunk Tokyo apartment. No travel budget required.' },
                { icon: <FaFilm />, title: 'Video Synthesis', desc: 'Text-to-video generation for social clips, background loops, and teaser content. The uncanny valley is finally behind us.' },
                { icon: <FaPaintBrush />, title: 'Storyboarding', desc: 'Visualize 50 disparate concepts in the time it takes to sketch one. Rapid prototyping for directors and creative leads.' },
            ],
        },
        shift: {
            oldIcon: <FaCameraRetro />,
            oldWays: ['Studio Rent', 'Lighting Crew', 'Permits', 'Travel Costs'],
            stamp: ['Eliminate', 'the grind'],
            title: [{ text: "We don't rent studios." }, { text: '', em: 'We generate them.' }],
            text: 'Forget the heavy lifting. No more full-day shoots, expensive equipment rentals, or logistical nightmares. We take the "production" out of production.',
            values: [
                { icon: <FaBolt />, title: 'Speed of Light', text: 'From concept to final render in hours, not weeks.' },
                { icon: <FaLayerGroup />, title: '40% Budget Recovery', text: 'Reallocate production bloat into media spend.' },
            ],
        },
        steps: {
            title: { text: 'The ', em: 'Protocol.' },
            items: [
                { title: 'Ingestion & Calibration', desc: 'We analyze your moodboards, brand guidelines, and product assets. We train our models on your specific aesthetic DNA.' },
                { title: 'Neural Synthesis', desc: 'We run hundreds of generations, exploring lighting, composition, and texture variants that would be impossible to stage physically.' },
                { title: 'Human Polish', desc: 'AI is the engine, but we are the steering wheel. Our retouching team upscales, corrects, and perfects the final output.' },
            ],
        },
        promise: {
            icon: <FaInfinity />,
            title: [{ text: 'We will never bind' }, { text: '', em: 'your hands.' }],
            text: (
                <>
                    If you can articulate it, we can visualize it. We don&apos;t say &ldquo;no, that shot is too expensive.&rdquo; We say:{' '}
                    <strong>&ldquo;Generating now.&rdquo;</strong>
                </>
            ),
            chips: ['Hyper-realistic fashion editorial on Mars', 'Cyberpunk street food vendor in neon rain', 'Luxury perfume bottle floating in liquid gold', 'Cinematic drone shot of a glass city'],
        },
    },
    {
        slug: 'social-cults',
        href: '/social-cults',
        title: 'Social Cults',
        index: '02',
        icon: <FaFire />,
        badge: 'Viral Engineering',
        hero: [{ text: "We don't build followers." }, { text: 'We build ', em: 'cults.' }],
        lede: "Algorithms are the new battleground. We hack the feed to turn passive scrollers into obsessed evangelists. Your brand isn't a product. It's a movement.",
        cta: 'Join The Cult',
        objective: 'Social Media Dominance',
        glow: 'rgba(255, 120, 60, 0.5)',
        ticker: ['Viral Reel Campaign', 'Discord Community Setup', 'Twitter/X Raids', 'Influencer Seeding', 'Meme Strategy'],
        features: {
            title: { text: 'Weapons of ', em: 'influence.' },
            sub: 'Tools designed to penetrate the noise and command attention.',
            items: [
                { icon: <FaBolt />, title: 'Algorithmic Warfare', desc: 'Reverse-engineering the recommendation engine to guarantee reach. We feed the algorithm exactly what it craves.' },
                { icon: <FaUsers />, title: 'Community Design', desc: 'From Discord to DMs, we build spaces where your brand is the religion. Fostering deep, unbreakable loyalty.' },
                { icon: <FaGlobe />, title: 'Trend Jacking', desc: 'Identify and ride cultural waves before they crest. We insert your narrative into the global conversation instantly.' },
                { icon: <FaLaughSquint />, title: 'Meme Engineering', desc: 'Weaponized humor that travels faster than ads. Content that people actually share, ensuring organic virality.' },
            ],
        },
        shift: {
            oldIcon: <FaBullhorn />,
            oldWays: ['Vanilla Posts', 'Generic Hashtags', 'Begging for Likes', 'Safe Branding'],
            stamp: ['Burn the', 'boring'],
            title: [{ text: 'Safety is ', ember: 'suicide.' }, { text: '', em: 'Polarize to magnetize.' }],
            text: "In the attention economy, indifference is death. If they aren't talking about you, you don't exist. We create the spark that starts the wildfire.",
            values: [
                { icon: <FaBomb />, title: 'Explosive Growth', text: 'Campaigns designed to break the internet, not just exist on it.' },
                { icon: <FaGhost />, title: 'Shadow Influence', text: 'Subtle seeding in communities that feels organic, not corporate.' },
            ],
        },
        steps: {
            title: { text: 'The ', em: 'Ritual.' },
            items: [
                { title: 'Culture Audit', desc: 'We infiltrate the subcultures your audience lives in. We learn their language, their jokes, and their fears.' },
                { title: 'Content Bombardment', desc: 'High-volume, high-variance content testing. We throw everything at the wall and scientifically measure what sticks.' },
                { title: 'Loop Optimization', desc: 'Once a winner is found, we double down. We optimize the feedback loop until the algorithm has no choice but to promote you.' },
            ],
        },
        promise: {
            icon: <FaFire />,
            title: [{ text: 'Attention is the' }, { text: 'only ', em: 'currency.' }],
            text: (
                <>
                    Don&apos;t pay for attention. <strong>Command it.</strong>
                </>
            ),
            chips: ['Viral Reel Campaign', 'Discord Community Setup', 'Twitter/X Raids', 'Influencer Seeding', 'Meme Strategy'],
        },
    },
    {
        slug: 'editorial',
        href: '/editorial',
        title: 'Editorial Stills',
        index: '03',
        icon: <FaCameraRetro />,
        badge: 'Visual Alchemy',
        hero: [{ text: 'Silence the noise.' }, { text: 'Visuals that ', em: 'scream.' }],
        lede: 'We blend high fashion aesthetics with raw, gritty textures. Imagery that isn’t just seen, it’s felt.',
        cta: 'Book A Shoot',
        objective: 'Editorial / Product Shoots',
        glow: 'rgba(244, 239, 227, 0.35)',
        ticker: ['Lookbook Shoot', 'Product Editorial', 'Brand Campaign', 'Social Media Assets', 'Billboards'],
        features: {
            title: { text: 'The ', em: 'aesthetic.' },
            sub: 'A curated approach to visual dominance.',
            items: [
                { icon: <FaMagic />, title: 'Art Direction', desc: "Conceptualizing the impossible and making it real. We don't just shoot; we build worlds." },
                { icon: <FaEye />, title: 'High Fidelity', desc: 'Every pixel perfected. From mobile screens to Times Square billboards, quality is non-negotiable.' },
                { icon: <FaFingerprint />, title: 'Mood Engineering', desc: "Dialing in the exact emotional resonance of your brand through color, shadow, and composition." },
                { icon: <FaPaintBrush />, title: 'Post-Production', desc: 'Where good becomes legendary. Our retouching and grading process is our secret sauce.' },
            ],
        },
        shift: {
            oldIcon: <FaImage />,
            oldWays: ['Stock Photos', 'Flat Lighting', 'Safe Angles', 'Boring Composition'],
            stamp: ['No more', 'mediocre'],
            title: [{ text: 'Generic is ', ember: 'invisible.' }, { text: '', em: 'Own your aesthetic.' }],
            text: 'In a sea of sameness, only the bold survive. We create visuals that stop the scroll and imprint your brand into the retina of your audience.',
            values: [
                { icon: <FaGem />, title: 'Premium Polish', text: 'Visuals that scream "luxury" and "authority" instantly.' },
                { icon: <FaFilm />, title: 'Cinematic Storytelling', text: "Every image tells a story. We make sure it's an epic." },
            ],
        },
        steps: {
            title: { text: 'The ', em: 'Workflow.' },
            items: [
                { title: 'Concept Extraction', desc: "We dig deep into your brand's soul to extract the visual core. Moodboards, lighting references, and style guides." },
                { title: 'The Shoot / Gen', desc: 'Whether physical photography or AI synthesis, we execute with precision. Capturing the raw material for greatness.' },
                { title: 'The Grade', desc: 'Applying our signature color science and texture overlays. This is where the magic happens.' },
            ],
        },
        promise: {
            icon: <FaEye />,
            title: [{ text: 'Your brand, in' }, { text: '', em: 'high definition.' }],
            text: (
                <>
                    Ready to upgrade your <strong>visual language?</strong>
                </>
            ),
            chips: ['Lookbook Shoot', 'Product Editorial', 'Brand Campaign', 'Social Media Assets', 'Billboards'],
        },
    },
    {
        slug: 'performance',
        href: '/performance',
        title: 'Performance Ads',
        index: '04',
        icon: <FaBullhorn />,
        badge: 'Revenue Engines',
        hero: [{ text: 'Creative that converts.' }, { text: '', em: 'Period.' }],
        lede: 'We don’t make “ads”. We make revenue engines. High-CTR creatives tested to destruction. If it doesn’t sell, it dies.',
        cta: 'Boost ROAS',
        objective: 'Performance Ads',
        glow: 'rgba(242, 212, 126, 0.5)',
        ticker: ['Meta Ads', 'TikTok Ads', 'YouTube Shorts', 'Dynamic Creative', 'UGC Ads'],
        features: {
            title: { text: 'Growth ', em: 'levers.' },
            sub: 'Scientific methodology applied to creativity.',
            items: [
                { icon: <FaFlask />, title: 'A/B Testing', desc: 'Darwinism for your ads. We test hundreds of variations to ensure only the strongest survive.' },
                { icon: <FaChartLine />, title: 'Data-Driven', desc: 'Decisions made by spreadsheets, not hunches. We follow the ROAS wherever it leads.' },
                { icon: <FaHandPaper />, title: 'Scroll Stoppers', desc: 'Visual hooks designed to arrest the thumb in 0.3 seconds. Attention is zero-sum, and we take it all.' },
                { icon: <FaBrain />, title: 'Psychological Triggers', desc: 'Copy and visuals that speak directly to desire and pain points. We bypass logic and speak to the lizard brain.' },
            ],
        },
        shift: {
            oldIcon: <FaMoneyBillWave />,
            oldWays: ['Brand Awareness', 'Vanity Metrics', 'Burning Cash', 'Hope Marketing'],
            stamp: ['Stop', 'guessing'],
            title: [{ text: 'Art is ', ember: 'optional.' }, { text: '', em: 'Profit is mandatory.' }],
            text: 'We appreciate beauty, but we worship efficiency. Every pixel on the screen must justify its existence by contributing to the bottom line.',
            values: [
                { icon: <FaRocket />, title: 'Scale Up', text: 'Once we find a winner, we pour fuel on the fire.' },
                { icon: <FaPercent />, title: 'Predictable Growth', text: 'Turn your ad spend into a vending machine. $1 in, $5 out.' },
            ],
        },
        steps: {
            title: { text: 'The ', em: 'Algorithm.' },
            items: [
                { title: 'Hypothesis Generation', desc: 'We analyze the data and market trends to formulate creative angles that serve specific audience segments.' },
                { title: 'Rapid Production', desc: 'We create dozens of variations (different hooks, different pacing, different CTAs) to find the local maximum.' },
                { title: 'Kill & Scale', desc: 'We kill loser creatives immediately. We scale winners aggressively. No mercy for underperformance.' },
            ],
        },
        promise: {
            icon: <FaChartLine />,
            title: [{ text: 'Stop burning' }, { text: '', em: 'cash.' }],
            text: <strong>Start printing it.</strong>,
            chips: ['Meta Ads', 'TikTok Ads', 'YouTube Shorts', 'Dynamic Creative', 'UGC Ads'],
        },
    },
    {
        slug: 'ugc',
        href: '/ugc',
        title: 'UGC Factory',
        index: '05',
        icon: <FaFingerprint />,
        badge: 'Human Scale',
        hero: [{ text: 'Scale authenticity.' }, { text: 'The anti-ad ', em: 'machine.' }],
        lede: "People trust people, not brands. We build armies of creators that look, sound, and feel like your customer's best friend.",
        cta: 'Start Seeding',
        objective: 'UGC Content',
        glow: 'rgba(212, 120, 55, 0.5)',
        ticker: ['Unboxing Videos', 'Testimonials', 'How-To Guides', 'Reaction Videos', 'ASMR'],
        features: {
            title: { text: 'The ', em: 'factory.' },
            sub: 'Systems for mass-producing trust.',
            items: [
                { icon: <FaUserFriends />, title: 'Creator Matching', desc: 'Finding faces that fit your demographic perfectly. Moms for moms, gamers for gamers, weirdos for weirdos.' },
                { icon: <FaClipboardList />, title: 'Briefing Architecture', desc: 'Structured freedom. We give creators the sandbox and the guardrails, they build the castle.' },
                { icon: <FaCut />, title: 'Native Editing', desc: 'Cuts that feel native to the feed. No polish, just pure retention edits. Jump cuts, subtitles, and chaos.' },
                { icon: <FaLayerGroup />, title: 'Volume Production', desc: "Flooding the zone with hundreds of unique assets per month. You'll never run out of ads again." },
            ],
        },
        shift: {
            oldIcon: <FaVideo />,
            oldWays: ['Over-produced', 'Scripted Lines', 'Fake Smiles', 'Actor Vibes'],
            stamp: ['Kill the', 'script'],
            title: [{ text: 'Perfection is ', ember: 'suspicious.' }, { text: '', em: 'Flaws are trustworthy.' }],
            text: 'When everything looks like an ad, nothing works. We create content that looks like it belongs on the For You Page, because it does.',
            values: [
                { icon: <FaMobileAlt />, title: 'Relatability', text: 'Content that feels like a recommendation from a friend.' },
                { icon: <FaUserFriends />, title: 'Diverse Faces', text: 'Representing every corner of your potential market.' },
            ],
        },
        steps: {
            title: { text: 'The ', em: 'Pipeline.' },
            items: [
                { title: 'Persona Mapping', desc: "We define exactly who your customer trusts. We don't just guess; we look at the data." },
                { title: 'Creator Seeding', desc: 'Sending your product to 50+ vetted creators. We handle the logistics, the contracts, and the chasing.' },
                { title: 'Asset Harvesting', desc: 'Collecting and organizing the flood of raw files. Editing them into high-performance paid media assets.' },
            ],
        },
        promise: {
            icon: <FaFingerprint />,
            title: [{ text: 'Make content' }, { text: '', em: 'real again.' }],
            text: (
                <>
                    Join the <strong>authenticity revolution.</strong>
                </>
            ),
            chips: ['Unboxing Videos', 'Testimonials', 'How-To Guides', 'Reaction Videos', 'ASMR'],
        },
    },
    {
        slug: 'web-experience',
        href: '/web-experience',
        title: 'Web Experiences',
        index: '06',
        icon: <FaCode />,
        badge: 'Digital Dominion',
        hero: [{ text: 'Not just a website.' }, { text: 'Your digital ', em: 'empire.' }],
        lede: 'Fast, SEO-optimized, and animated digital headquarters. We build sites that feel like apps and rank like encyclopedias.',
        cta: 'Launch Project',
        objective: 'Web Development',
        glow: 'rgba(212, 175, 55, 0.45)',
        ticker: ['SaaS Landing Page', 'Portfolio Site', 'E-commerce Store', 'WebGL Experience', 'Corporate Site'],
        features: {
            title: { text: 'Technical ', em: 'superiority.' },
            sub: 'Under the hood, we are ferocious.',
            items: [
                { icon: <FaCube />, title: 'WebGL / 3D', desc: 'Immersive experiences that keep users glued to the screen. Not just scrolling, but exploring.' },
                { icon: <FaSearch />, title: 'SEO Mechanics', desc: 'Built on Next.js for perfect Lighthouse scores. We structure your data so Google falls in love.' },
                { icon: <FaMousePointer />, title: 'Motion Design', desc: 'Micro-interactions that make every click feel expensive. Smooth transitions, hover states, and animations.' },
                { icon: <FaServer />, title: 'Headless CMS', desc: 'You control the content, we control the code. Infinite scalability without the WordPress bloat.' },
            ],
        },
        shift: {
            oldIcon: <FaLaptopCode />,
            oldWays: ['WordPress Agency', 'Slow Loading', 'Template Hell', 'Bloated Plugins'],
            stamp: ['Delete the', 'template'],
            title: [{ text: 'Templates are for ', ember: 'amateurs.' }, { text: '', em: 'You need bespoke.' }],
            text: "Your website is your 24/7 salesman. If it's slow, ugly, or generic, you are losing money while you sleep. We fix that permanently.",
            values: [
                { icon: <FaRocket />, title: 'Blazing Fast', text: 'Sub-second load times that keep visitors engaged.' },
                { icon: <FaCode />, title: 'Clean Code', text: 'Maintainable, scalable, and built for the future.' },
            ],
        },
        steps: {
            title: { text: 'The ', em: 'Build.' },
            items: [
                { title: 'Architecture & UX', desc: 'We map the user journey to ensure friction-free conversion. Every button, link, and page is placed with intent.' },
                { title: 'Development', desc: 'We write clean, semantic code using the latest frameworks (Next.js, React). No drag-and-drop builders allowed.' },
                { title: 'Optimization', desc: 'We deploy to the edge, compress every asset, and fine-tune your SEO tags for maximum visibility.' },
            ],
        },
        promise: {
            icon: <FaGlobe />,
            title: [{ text: 'Build your' }, { text: '', em: 'cathedral.' }],
            text: (
                <>
                    A digital home that <strong>commands respect.</strong>
                </>
            ),
            chips: ['SaaS Landing Page', 'Portfolio Site', 'E-commerce Store', 'WebGL Experience', 'Corporate Site'],
        },
    },
];

export function getService(slug: string) {
    const i = SERVICE_PAGES.findIndex((s) => s.slug === slug);
    if (i < 0) throw new Error(`Unknown service: ${slug}`);
    return { service: SERVICE_PAGES[i], next: SERVICE_PAGES[(i + 1) % SERVICE_PAGES.length] };
}

/** Objectives offered on the project form (services map onto these). */
export const OBJECTIVES = [
    'Brand Identity',
    ...SERVICE_PAGES.map((s) => s.objective),
    'Other',
];
