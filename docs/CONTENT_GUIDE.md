# Sneeze Media content guide

This is for anyone writing pages in `src/content/**`. Every page is a typed TypeScript file whose `body` is Markdown. The reference example is `src/content/services/seo-company-jaipur.ts`: match its structure, depth and tone.

Check any file with:

```bash
node --experimental-strip-types --no-warnings scripts/check-content.mts src/content/<dir>/<file>.ts
```

Check everything, including duplicate passages across pages, with:

```bash
npm run content:check
```

## Content rules (rankings are won or lost here)

- **Write for humans first.** Natural, confident and specific. Match the brand voice: short sentences, plain words, a little edge, never fluffy or salesy. Second person ("you"). Indian English spelling (optimise, colour, programme), ₹ for money.
- **Headings.** One H1 per page, containing the primary keyword. The template renders it from `h1`, so never write `# ` in the body. The body uses `##` for H2 and `###` for H3, in a logical order.
- **Keyword placement.**
  - The primary keyword appears in the first 100 words (lede plus the start of the body).
  - Semantic and related terms appear throughout.
  - Vary the phrasing. Keyword density must read naturally; the checker fails anything over about 2%.
  - Hinglish phrasings people really type (for example "jaipur me website banane wala") may appear once where natural. Never as stuffing.
- **Readability.** Short paragraphs (2–4 sentences) and scannable sections.
- **Required sections.** Every page needs all of these:
  - an FAQ of 4–8 real questions, phrased the way people search, in `faq` (not in the body);
  - a "how we do it" or proof section;
  - at least one visual block (`:::stats`, `:::steps`, `:::checklist`, `:::dodont`, `:::compare` or a table);
  - a `:::cta` block somewhere mid-page. The template already adds CTAs above and below the fold.
- **No fabrication.**
  - Never invent client names, testimonials, ratings, reviews, awards, revenue figures, years in business, team size, numbers of clients or projects, rankings, or "results achieved" percentages.
  - Where proof belongs, insert `:::todo TODO_PROVIDE_CASE_STUDY: <what is needed>` followed by a line with `:::`. It is not rendered and is collected into `CONTENT_TODOS.md`.
  - Market statistics are only allowed if they are widely known, stable public facts. When in doubt, leave the number out.
- **No unverifiable superlatives.**
  - No "best in India", "#1", "leading", "world-class", "award-winning", "guaranteed", "100%".
  - "Best digital marketing agency in Jaipur" may appear only as a target phrase in a title, heading or FAQ question, backed by real differentiators in the copy.
- **E-E-A-T.**
  - Show expertise: process, frameworks, tools (Google Search Console, GA4, Meta Ads Manager, Google Ads, Shopify, Next.js, etc.) and honest expectations and timelines.
  - Show trust: transparency, what we will not do, how we report.
- **Healthcare pages** (hospitals, doctors, clinics) must not promise medical outcomes, use before/after claims, patient testimonials about results, or superlatives about doctors. They must reflect India's norms for medical professionals' advertising (NMC professional-conduct rules) and the Drugs and Magic Remedies Act. Frame everything as patient education, access and trust.
- **Education pages.** No placement or result guarantees, no rank claims ("100% selection").
- **Real estate.** Mention RERA registration numbers being shown in ads and pages. No assured-return language.
- **Internal links.**
  - At least 3 distinct internal links in the body, with descriptive anchor text: never "click here" or "read more".
  - Link only to paths listed in `src/content/routes.ts`.
  - Link down to specific pages (services, industries, combos, guides) and up to the pillar `/digital-marketing-agency-jaipur` where natural.
- **Uniqueness.**
  - Every page must be genuinely different: its own angle, examples, pain points, tactics, KPIs and FAQs.
  - Never reuse paragraphs between pages or swap a city or industry name into the same text. The checker compares pages for shared six-word passages.

## Facts we can state (from the business)

- **Location.** Sneeze Media is a creative and digital marketing agency based in Jaipur, Rajasthan, India. It works with businesses across India; briefs, calls and reviews happen online.
- **Phones and WhatsApp.** +91 99291 03969 and +91 95497 91480.
- **Services.**
  - SEO, local SEO and Google Business Profile.
  - Website design and development (custom Next.js/React; also Shopify, WordPress and Wix).
  - E-commerce and Shopify marketing.
  - Social media marketing (Instagram Reels, YouTube Shorts, community).
  - Performance marketing (Google Ads, Meta Ads, YouTube, LinkedIn).
  - Branding and logo design.
  - Video production and reels.
  - Content marketing and copywriting.
  - AI-assisted content creation.
  - Product and fashion photography.
  - UGC video production.
- **Working style** (stated on the homepage):
  - One team for strategy, production and performance.
  - AI-assisted production for speed.
  - Campaigns judged on leads, return on ad spend (ROAS) and revenue rather than vanity metrics.
  - "No templates", "Speed is a feature", "Numbers over noise", "Real humans", "One team".
- **Process** (homepage): Discover → Strategise → Create → Launch → Optimise → Scale.
- **Leads.** Enquiries come through the project form, phone and WhatsApp.

Anything else (founding year, team size, clients, results, awards, office address, pricing figures) is unknown. Do not state it.

## File format

```ts
import type { ServicePage } from '../types';   // or IndustryPage, ComboPage, LocationPage, Post, InfoPage, PillarPage

const page: ServicePage = {
    kind: 'service',
    slug: '…',                 // must match the file name and the URL
    name: '…',                 // short label
    title: '…',                // WITHOUT " | Sneeze Media": 35–45 chars so the full title is 50–60
    description: '…',          // 140–160 chars, benefit + call to action
    h1: '…',                   // contains primaryKeyword (case-insensitive, exact phrase)
    primaryKeyword: '…',
    keywords: ['…'],           // 5–8 secondary/semantic terms
    lede: '…',                 // 40–70 words, contains primaryKeyword
    summary: '…',              // 1–2 sentences for cards
    highlights: { title: '…', items: ['…'] },   // optional hero panel, 4–6 short items
    updated: '2026-11-04',
    body: `
## …
`,
    faq: [{ q: '…?', a: '…' }],                 // 4–8
    related: { services: [], industries: [], combos: [], locations: [], posts: [] },  // slugs only
    cta: { title: '…', text: '…', label: '…' }, // label: 2–4 words, e.g. "Request an SEO audit"
};

export default page;
```

- Use double or single quotes for short strings and a backtick template literal for `body`.
- Inside `body`, never use a backtick or `${`.
- Escape apostrophes in single-quoted strings, or use typographic ’.

## Markdown syntax

- **Structure.**
  - `## H2`, `### H3`, paragraphs, `- bullets`, `1. numbered`, `> statement` (never a fake testimonial).
  - Tables use `| a | b |` with a `|---|---|` row.
  - Inline: `**bold**`, `*italic*`, `[anchor](/path)`.
- **Visual blocks.** Close each with a line containing only `:::`.

```
:::stats
value | label                      (2–4 lines; values must be true: process facts, not invented results)
:::
:::steps Optional title
Step name | what happens           (3–7 lines)
:::
:::checklist Title
- item
:::
:::dodont Do / Avoid
+ something to do
- something to avoid
:::
:::compare Caption
| | Option A | Option B |
|---|---|---|
| Row | … | … |
:::
:::callout Label
A short highlighted paragraph.
:::
:::cta Optional heading text for the mid-page call to action
:::
:::todo TODO_PROVIDE_CASE_STUDY: what proof is needed here
:::
```
