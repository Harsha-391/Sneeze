import type { InfoPage } from '../types';

const page: InfoPage = {
    kind: 'page',
    schemaType: 'CollectionPage',
    slug: 'case-studies',
    name: 'Case studies',
    title: 'Digital Marketing Case Studies: How We Report',
    description:
        'How we publish digital marketing case studies: verified numbers, a source for every figure and client permission. Ask us for relevant examples on a call.',
    h1: 'Digital marketing case studies, published only with proof and permission',
    primaryKeyword: 'digital marketing case studies',
    keywords: [
        'marketing results',
        'how agencies report results',
        'cost per lead',
        'return on ad spend',
        'organic clicks',
        'verified client results',
    ],
    lede:
        'Our digital marketing case studies follow one rule: if we cannot show where a number came from, and the client has not agreed to share it, it does not go on this page. Below is how we measure results, what every case study will contain and how to see relevant examples now.',
    summary: 'How we measure and report results, and the standard every published case study has to meet.',
    updated: '2026-11-04',
    body: `
## Why this page is short for now

A results page is easy to fill with big percentages and borrowed logos. We would rather publish fewer digital marketing case studies that you can actually trust. Each one has to meet two conditions: the client has agreed in writing, and every number can be traced to its source.

Many businesses are understandably private about their cost per lead, their revenue or what they spend on ads, and we respect that. Verified write-ups will be added to this page as clients approve them. Until then, the most useful thing we can do is explain exactly how results are measured, so you know what you would be getting.

:::todo TODO_PROVIDE_CASE_STUDY: two or three verified case studies with written client approval (client name or anonymised sector, starting point, goal, what we changed, timeline, before-and-after numbers with source screenshots)
:::

## How we measure results

The right metric depends on the goal. We agree the headline number during strategy, before any work begins, and keep it fixed so the report cannot drift towards whatever looks best that month.

| Goal | Headline metric | Supporting metrics | Where the number comes from |
|---|---|---|---|
| More enquiries | Qualified leads and cost per lead (CPL) | Form fills, calls, WhatsApp clicks | GA4, Google Ads, Meta Ads Manager, your lead sheet or CRM |
| Online sales | Revenue and return on ad spend (ROAS) | Conversion rate, average order value | Shopify, GA4 and the ad platforms |
| Organic visibility | Organic clicks | Impressions, average position, pages indexed | Google Search Console |
| Local footfall | Calls and direction requests | Profile views, new reviews | Google Business Profile performance |
| Brand and social | Enquiries and profile actions from social | Saves, shares, watch time, reach | Instagram and YouTube analytics |

Followers and impressions appear in reports as context, never as the headline. Where we can, we connect marketing data to what actually happened in your business, such as calls answered or orders shipped, because a lead who never picks up the phone is not a result. Our page on [how we work and report, week by week](/process) shows where these numbers fit into the monthly cycle.

## What every case study will include

:::checklist Every published case study shows
- The starting point, with the numbers before we began
- The goal we agreed and the metric used to judge it
- What we changed, channel by channel
- The timeline, including the slow months
- Results with their source, such as Search Console, GA4, Ads Manager or Shopify
- Written approval from the client to publish
:::

We will not cherry-pick a date range to flatter a chart, take credit for a seasonal spike without saying so, or put words in a client's mouth. If a result depended on something outside our work, such as a price change or a new product, the case study will say that too.

:::cta Want to see work relevant to your business?
:::

## Ask us for relevant examples

If you are weighing us up, ask on a call. Tell us your sector and your goal, and we will walk you through comparable work where we have it and where the client has agreed we can share it. If we have not done something close to what you need, we will tell you that as well.

You can [contact us to book that call](/contact). Or start with the service you are most interested in, such as [Google Ads and Meta Ads](/services/performance-marketing-jaipur), [SEO](/services/seo-company-jaipur) or [social media marketing](/services/social-media-marketing-jaipur), to see how each one is planned and measured.
`,
    faq: [
        {
            q: 'Why don’t you show client logos or big percentage results?',
            a: 'Because a logo or a percentage without context proves very little. We only publish results with written client approval and a clear source for every number. Until those are ready, we are glad to discuss relevant work on a call.',
        },
        {
            q: 'Can I speak to one of your clients before hiring you?',
            a: 'Ask us on a call. Where a client has agreed to act as a reference, we can put you in touch. We never share anyone’s details without their permission.',
        },
        {
            q: 'What results can I expect from digital marketing?',
            a: 'It depends on your starting point, your market, your budget and how quickly changes go live. We set realistic targets together during strategy, explain the assumptions behind them and report honestly against them every month.',
        },
        {
            q: 'How do I know the numbers in your reports are real?',
            a: 'Every figure comes from a platform you can log into yourself: Search Console, GA4, Google Ads, Meta Ads Manager or Shopify. The accounts are in your name, so you can check any number in our report against its source.',
        },
    ],
    related: {
        services: ['pillar', 'performance-marketing-jaipur', 'seo-company-jaipur', 'social-media-marketing-jaipur', 'ecommerce-shopify-marketing-jaipur'],
        posts: ['how-to-choose-digital-marketing-agency', 'google-ads-vs-meta-ads', 'local-seo-checklist-jaipur'],
    },
    cta: {
        title: 'Ask for examples that match your business.',
        text: 'Tell us your sector and the result you want. On a short call we will share what we can, explain how we would measure success for you and be honest about fit.',
        label: 'Book a call',
    },
};

export default page;
