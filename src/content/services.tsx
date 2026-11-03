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
    /** Jaipur SEO: meta title (50-60 chars with the template), description (150-160), H1 kicker, FAQs */
    seo: { title: string; description: string; kicker: string; keywords: string[]; faq: { q: string; a: string }[] };
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
        seo: {
            title: "AI Content Creation Agency in Jaipur",
            description: "AI-generated product photos, posters and video from a Jaipur creative agency. Studio-grade visuals in hours, not weeks, with up to 40% less spend. Start today.",
            kicker: "AI content creation agency in Jaipur",
            keywords: ["AI content creation agency in Jaipur", "AI product photography Jaipur", "AI video production Jaipur", "creative agency in Jaipur"],
            faq: [
                { q: "What is AI-generated content?", a: "AI-generated content is imagery, video or copy produced with generative AI models such as Midjourney and Runway, guided by human prompts and art direction. At Sneeze Media we use it to create product shots, campaign visuals and short videos that would be expensive or impossible to stage physically." },
                { q: "Is AI content good enough for real brand campaigns?", a: "Yes, when humans stay in control. We calibrate generations to your brand guidelines and products, then our retouching team upscales, corrects and polishes every final image, so the output is consistent, on-brand and ready for ads, websites and print." },
                { q: "Do you offer AI content creation for businesses in Jaipur?", a: "Yes. Sneeze Media is based in Jaipur and creates AI visuals for local and national brands, from product context shots and lookbooks to social clips and storyboards, without the cost of studio rent, crews or travel." },
            ],
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
        seo: {
            title: "Social Media Marketing Agency in Jaipur",
            description: "Instagram Reels, YouTube Shorts and community building from a social media marketing agency in Jaipur. We turn scrollers into fans. Start your campaign today.",
            kicker: "Social media marketing agency in Jaipur",
            keywords: ["social media marketing agency in Jaipur", "Instagram marketing agency in Jaipur", "Instagram reels agency in Jaipur", "social media management Jaipur"],
            faq: [
                { q: "What does a social media marketing agency in Jaipur do?", a: "A social media marketing agency plans, creates and publishes content that grows your audience and sales. Sneeze Media researches your audience, produces Reels and posts, manages communities and measures what drives reach and enquiries, for brands in Jaipur and across India." },
                { q: "Do you create Instagram Reels for Jaipur businesses?", a: "Yes. Short-form video is our core format. We script hooks, shoot or generate footage, edit natively for Instagram Reels and YouTube Shorts, and publish at volume so we learn quickly which ideas the algorithm rewards." },
                { q: "How do you measure social media results?", a: "We track reach, watch time, saves, shares and follower growth and, most importantly, the enquiries and sales that social drives. Winning ideas get repeated and scaled; anything that does not perform is dropped quickly." },
            ],
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
        seo: {
            title: "Product & Fashion Photography in Jaipur",
            description: "Editorial-grade product, fashion and brand photography in Jaipur, with art direction and signature colour grading. Visuals that stop the scroll. Book a shoot.",
            kicker: "Product & fashion photography in Jaipur",
            keywords: ["product photography in Jaipur", "fashion photography in Jaipur", "commercial photography Jaipur", "brand shoot Jaipur"],
            faq: [
                { q: "Do you offer product photography in Jaipur?", a: "Yes. We shoot product, e-commerce and lifestyle photography for brands in Jaipur, handling concept, lighting, styling and retouching, and deliver images sized for websites, marketplaces, social media and print." },
                { q: "Can you shoot fashion lookbooks and brand campaigns?", a: "Yes. From moodboards and art direction to the shoot and the final grade, we produce lookbooks, campaign imagery and social assets with a consistent, premium look that makes your brand instantly recognisable." },
                { q: "Can you combine real photography with AI visuals?", a: "Yes. Many projects mix both: we shoot the hero product for accuracy, then use AI to place it in new scenes, seasons or locations. That gives you far more usable images from a single shoot day." },
            ],
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
        seo: {
            title: "Performance Marketing & Ads Agency in Jaipur",
            description: "Performance marketing agency in Jaipur for Meta, Google and YouTube ads. High-CTR creatives, rapid testing and ROAS-focused scaling. Talk to our team today.",
            kicker: "Performance marketing agency in Jaipur",
            keywords: ["performance marketing agency in Jaipur", "Google ads agency in Jaipur", "Meta ads agency in Jaipur", "advertising agency in Jaipur"],
            faq: [
                { q: "What is performance marketing?", a: "Performance marketing is advertising where you pay for, and optimise towards, measurable results such as leads, sales or app installs. Sneeze Media runs performance campaigns on Meta, Google and YouTube, testing many creative variations and scaling the ads with the best return on ad spend." },
                { q: "Which ad platforms do you manage?", a: "We create and manage ads on Meta (Facebook and Instagram), Google Search and YouTube, plus LinkedIn for B2B brands. We also produce the ad creative itself, including UGC-style videos, so testing never stalls waiting for new assets." },
                { q: "How quickly will I see results from ads?", a: "Results depend on budget, offer and market. Campaigns start gathering data from day one, and we review performance weekly, cutting losing creatives and scaling winners, so results compound over the first few months." },
            ],
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
        seo: {
            title: "UGC Video Production Agency in Jaipur",
            description: "UGC video production agency in Jaipur: creator-led unboxings, testimonials and how-tos that feel like a friend’s recommendation and perform as ads. Start now.",
            kicker: "UGC video production in Jaipur",
            keywords: ["UGC video production agency in Jaipur", "UGC content creators Jaipur", "influencer marketing agency in Jaipur"],
            faq: [
                { q: "What is UGC content?", a: "UGC (user-generated content) is video or photo content made by real people rather than a brand studio, such as unboxings, reviews and how-tos. Because it feels like a recommendation from a friend, UGC is trusted more than polished ads and often performs better in paid social." },
                { q: "Can you produce UGC videos for Jaipur brands?", a: "Yes. We match your brand with creators who fit your audience, write the briefs, handle product seeding and contracts, then edit the raw footage into ready-to-run ads and organic posts." },
                { q: "How is UGC different from influencer marketing?", a: "Influencer marketing pays for access to a creator’s audience. UGC pays for the content itself, which your brand then publishes on its own channels and in ads. The two can work together, but UGC builds a steady library of assets for your brand." },
            ],
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
        lede: 'Fast, SEO-optimized, and animated digital headquarters, designed and built in Jaipur. We build sites that feel like apps and rank like encyclopedias.',
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
        seo: {
            title: "Best Web Designing Agency in Jaipur",
            description: "Looking for the best web designing agency in Jaipur? Sneeze Media builds fast, SEO-ready websites on Next.js, Shopify and WordPress. Get your proposal today.",
            kicker: "Web design & development agency in Jaipur",
            keywords: ["best web designing agency in Jaipur", "website development company in Jaipur", "website design in Jaipur", "SEO services in Jaipur", "Shopify developer in Jaipur"],
            faq: [
                { q: "What makes a good web designing agency in Jaipur?", a: "A good web design agency builds fast, mobile-first sites, handles on-page SEO and designs for conversions, not just looks. Sneeze Media builds custom Next.js and React websites for Jaipur businesses, with Core Web Vitals, structured data and analytics set up from day one." },
                { q: "Do you build e-commerce and Shopify websites?", a: "Yes. We build Shopify stores, WordPress and Wix sites and fully custom Next.js storefronts, choosing the platform that fits your catalogue, budget and team, and we can take care of product photography and launch ads too." },
                { q: "Will my new website be SEO-friendly?", a: "Yes. Every build ships with clean semantic HTML, unique titles and meta descriptions, schema markup, a sitemap and fast load times, so it is ready to rank for searches in Jaipur and across India." },
            ],
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
