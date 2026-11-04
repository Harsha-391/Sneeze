import type { InfoPage } from '../types';

const page: InfoPage = {
    kind: 'page',
    schemaType: 'FAQPage',
    noToc: true,
    slug: 'faq',
    name: 'FAQ',
    title: 'Digital Marketing Agency FAQ for New Clients',
    description:
        'Straight answers about working with Sneeze Media: getting started, contracts, reporting, who owns your accounts, ad spend and what we need from you.',
    h1: 'Digital marketing agency FAQ: straight answers before you call',
    primaryKeyword: 'digital marketing agency FAQ',
    keywords: [
        'working with a marketing agency',
        'agency contract and notice period',
        'who owns the ad account',
        'marketing agency reporting',
        'questions to ask a marketing agency',
        'Sneeze Media FAQ',
    ],
    lede:
        'This digital marketing agency FAQ covers what people usually ask before they hire us: how to start, how contracts and reporting work, who owns what and what we need from you. Questions about a single service, such as SEO timelines or website platforms, are answered on that service page and linked below.',
    summary: 'General questions about starting, contracts, reporting, account ownership, ad spend and working with us remotely, with links to service-specific FAQs.',
    updated: '2026-11-04',
    body: `
## How this FAQ is organised

The questions further down this page are about working with us in general: starting a project, contracts, reporting, account ownership, ad spend, languages and what happens if you ever decide to stop. Business owners raise them on almost every first call, so we have written the answers down in one place.

Answers here are deliberately short. Where a topic needs more room, such as pricing or our step-by-step way of working, we link to the page that covers it properly. If you are comparing agencies, ask everyone on your shortlist these same questions and notice who gives you a straight answer.

## Questions about a specific service

Each service page has its own FAQ with answers that go deeper than we can here.

- [FAQs on our SEO services](/services/seo-company-jaipur)
- [Local SEO and Google Business Profile questions](/services/local-seo-jaipur)
- [Website design and development questions](/services/website-design-development-jaipur)
- [Shopify and e-commerce marketing questions](/services/ecommerce-shopify-marketing-jaipur)
- [Social media marketing questions](/services/social-media-marketing-jaipur)
- [Google Ads and Meta Ads management questions](/services/performance-marketing-jaipur)
- [Branding and logo design questions](/services/branding-logo-design-jaipur)
- [Video production and reels questions](/services/video-production-reels-jaipur)

## Money, process and results

- [How our pricing, retainers and projects work](/pricing)
- [Our six-stage process and onboarding checklist](/process)
- [How we measure and report results](/case-studies)
- [What digital marketing costs in Jaipur](/blog/digital-marketing-cost-jaipur)
- [How to choose a digital marketing agency](/blog/how-to-choose-digital-marketing-agency)

## Before your first call

You do not need a polished brief to talk to us. A few honest answers make the first conversation far more useful, though.

:::checklist Worth having ready
- Your website and main social profiles
- The one result you most want in the next six months
- A rough monthly budget, including any ad spend
- What you have tried before and what happened
- Who on your side will approve work
:::

:::cta Did not find your question here? Ask us directly.
:::
`,
    faq: [
        {
            q: 'How do I get started with Sneeze Media?',
            a: 'Send a brief through the project form, or call or WhatsApp +91 99291 03969. We set up a short call to understand your goals, then send a written proposal with scope, timeline and cost. Nothing starts until you approve it.',
        },
        {
            q: 'What happens on the first call?',
            a: 'We ask about your business, your customers, your goal, your budget and what you have already tried. You can question us just as freely. If we do not think we are the right fit, we say so on the call.',
        },
        {
            q: 'Can we work with you if we are not based in Jaipur?',
            a: 'Yes. We are based in Jaipur, but briefs, calls, reviews and reporting all happen online, so we work with businesses across India. Shoots and in-person meetings are planned case by case.',
        },
        {
            q: 'How much do your services cost?',
            a: 'It depends on scope, channels, content volume and production. We do not publish a rate card because no two scopes are alike; you get a written quote after a short call. Our pricing page explains what drives the cost and how retainers, projects and audits compare.',
        },
        {
            q: 'Is there a minimum contract or notice period?',
            a: 'We agree this in the proposal. Retainers have a term and notice period written down before you sign, and fixed-scope projects run until the agreed deliverables are complete. Nothing is hidden in the fine print.',
        },
        {
            q: 'Who owns the ad accounts, website and content?',
            a: 'You do. Your ad accounts, analytics, Search Console, Google Business Profile, domain and the content we make for you belong to your business. Where we set something up, it goes in your name and we are added as users. Usage terms for stock assets or creator content are spelled out in the proposal.',
        },
        {
            q: 'Is ad spend included in your fees?',
            a: 'No. Ad spend is paid directly to Google, Meta or the other platforms, ideally from your own payment method. Our fee covers strategy, creative, management and reporting, and you always see both numbers separately.',
        },
        {
            q: 'How do you report on results?',
            a: 'You get a written update every week and a report with a call every month. The report measures results against the targets we agreed, using data from Search Console, GA4 and the ad platforms, and covers what did not work as well as what did.',
        },
        {
            q: 'How will we communicate day to day?',
            a: 'Through a shared WhatsApp group for quick questions and approvals, plus the weekly update and the monthly call. Anything agreed out loud is written down, so nobody has to rely on memory.',
        },
        {
            q: 'Which languages do you work in?',
            a: 'English and Hindi. We can write content in either, and in natural Hinglish where that is how your customers actually talk and search.',
        },
        {
            q: 'What do you need from us to start?',
            a: 'User access to the relevant accounts (ads, GA4, Search Console, Google Business Profile and your website), your brand assets, and one person who can approve work. The full onboarding checklist is on our process page.',
        },
        {
            q: 'Can you guarantee leads, sales or rankings?',
            a: 'No, and nobody honestly can, because platforms and customers decide those outcomes. What we commit to is a clear plan, agreed targets, consistent work and transparent reporting on what is moving and what is not.',
        },
        {
            q: 'Do you use AI to make our content?',
            a: 'We use AI-assisted tools for speed, such as drafts, visual concepts and variations for testing. People direct, write, edit and check everything, and nothing is published without your approval.',
        },
        {
            q: 'What happens if we decide to stop working together?',
            a: 'You give notice as agreed in the proposal and we hand over cleanly: files, finished assets, any logins we created and notes on what was working. Your accounts are already in your name, so nothing is held back.',
        },
    ],
    related: {
        services: ['pillar', 'seo-company-jaipur', 'website-design-development-jaipur', 'performance-marketing-jaipur', 'social-media-marketing-jaipur'],
        posts: ['how-to-choose-digital-marketing-agency', 'digital-marketing-cost-jaipur', 'what-is-digital-marketing'],
    },
    cta: {
        title: 'Still have a question?',
        text: 'Call or WhatsApp +91 99291 03969, or send a short brief. We will give you a straight answer, even if that answer is that we are not the right fit.',
        label: 'Ask us directly',
    },
};

export default page;
