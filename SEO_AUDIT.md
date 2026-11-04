# Sneeze Media SEO audit (Phase 0)

Audited on 2026-11-04 against a local production build of `main` (commit `879e18a`).

## Stack

- Next.js 16.1.1, **App Router** (`src/app`), React 19, Turbopack, React Compiler.
- All routes are statically prerendered.
- Animation uses framer-motion (scroll-linked transforms), Lenis smooth scroll, and a CSS reveal system (`.rv-line`, `.rv-fade`, `.rv-scale`). The `.is-in` class is added by an IntersectionObserver.
- Page transitions use a custom curtain (`PageTransition.tsx`), which intercepts internal `<a>` clicks and calls `router.push`.
- Fonts use `next/font` (Oswald, Inter, Instrument Serif) with `display: swap`.
- Design tokens are in `globals.css` (`--bg`, `--ink`, `--gold`, `--muted`, `--line`, `--pad`).
- Shared primitives: `Button`, `Faq`, `JsonLd`, `useReveal`, `Lines`, `Kicker`, `Crumbs`.

No new UI library is needed. Everything below reuses these.

## Findings (ordered by impact)

| # | Finding | Impact | Fix |
|---|---------|--------|-----|
| 1 | **Content is hidden until JavaScript runs.** `.rv-fade`, `.rv-scale` and `.rv-line > span` are `opacity: 0` or translated out of view in the initial CSS. Only JS (`.is-in`) reveals them: 73 elements on the homepage, including headings and body copy. With JS off, or if hydration fails, the page looks empty. The preloader also covers the page for 4.5 s without JS. | High | Gate every hidden start state behind `html.js`, set by a tiny inline `<head>` script before first paint. No JS means everything is visible and the preloader is skipped. Animations are unchanged for real users. |
| 2 | **Canonical domain may be wrong.** `SITE_URL` is hard-coded to `https://www.sneeze.media`, but the site is served from `sneeze-kappa.vercel.app`. Until that domain is connected, every canonical, `og:url` and sitemap URL points at a host that doesn't serve this site. | High | One `SITE_URL` in `src/config/site.ts`, resolved in this order: `NEXT_PUBLIC_SITE_URL`, then Vercel's `VERCEL_PROJECT_PRODUCTION_URL` (switches to the custom domain automatically once attached), then the fallback. |
| 3 | **Thin topical coverage.** There are 8 indexable URLs. Service pages have 580–680 words. There are no pages for SEO, branding, video, e-commerce, content or local SEO services, and none for industries, locations or blog/informational queries. | High | Build the URL map below (about 60 pages). |
| 4 | **Weak internal linking.** The header has 4 links, 3 of them homepage `#anchors`. Service pages are reachable only from the homepage grid, the footer and a "next service" chain. There are no hub pages. | High | Add a crawlable mega-menu (real `<a href>`), hub pages (`/services`, `/industries`, `/locations`, `/blog`), related-content blocks and footer link columns. |
| 5 | **E-E-A-T gaps.** There is no About, team, case studies, street address, email, Privacy Policy or Terms. The `/project` form collects personal data without a privacy policy (relevant under India's DPDP Act, 2023). | High | Add trust pages. Put placeholders in `CONTENT_TODOS.md`. |
| 6 | **404 page is the Next.js default.** It is unbranded, has the title "404: This page could not be found." and no links. | Medium | Add a branded `not-found.tsx` with links to hubs. Unknown slugs return 404 via `dynamicParams = false`. |
| 7 | **Sitemap is hand-maintained.** It is a static list of 8 URLs with one shared `lastModified`. `robots.txt` is fine (allow all, plus sitemap). `Host:` is Yandex-only but harmless. | Medium | Generate the sitemap from the content registries, using per-page `updated` dates. |
| 8 | **Homepage headings.** One H1 with a keyword is good. The H2s are slogans ("Content that hits different.", "Six ways we make noise.") and carry little topical signal. The footer statement is an **H2 repeated on every page**. | Medium | Add descriptive sections to the homepage (services, industries, locations) and make the footer statement a `<p>`. |
| 9 | **Structured data.** Organization plus ProfessionalService is site-wide, which is good. `WebSite` is also emitted on every page; it should be on the homepage only. The service breadcrumb's "Services" item points at `/#services`, a fragment URL. Email, street address, postal code, `sameAs` and opening hours are missing. | Medium | Move `WebSite` to the homepage. Point breadcrumbs at real hubs. Add `TODO_` placeholders in one config file and leave them out of the schema until filled. |
| 10 | **Unused public files:** `herovideo.webm`, `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` (create-next-app leftovers). The OG image is 290 KB. | Low | Delete the leftovers. |
| 11 | **Conversion.** Phone numbers sit behind header dropdowns. There is no `/contact` page and no persistent WhatsApp/call action on mobile. | Medium | Add `/contact` and a fixed floating WhatsApp/call button. Fixed positioning causes no layout shift. |

What is already good:

- Server HTML contains all text, H1s and JSON-LD.
- FAQ answers are always in the DOM.
- Meta title is 55 characters and the description 159.
- OG/Twitter cards and `lang="en-IN"` are set.
- No `noindex` anywhere.
- The hero video has a poster, is muted and uses `preload="metadata"`.
- No raster `<img>` without alt text exists.
- Scrolling measured at 60 fps with zero long tasks (2026-11-03).

## URL map (fits the App Router; all routes are static)

Dynamic segments use `generateStaticParams` plus `dynamicParams = false`, so unknown slugs return 404.

| Route | Source | Primary keyword |
|---|---|---|
| `/` | `app/page.tsx` | best creative agency in Jaipur (+ brand) |
| `/digital-marketing-agency-jaipur` | `app/digital-marketing-agency-jaipur/page.tsx` (pillar) | best digital marketing agency in Jaipur |
| `/services` | hub | digital marketing services in Jaipur |
| `/services/seo-company-jaipur` | `services/[slug]` | SEO company in Jaipur |
| `/services/website-design-development-jaipur` | `services/[slug]` + existing bespoke layout | website design company in Jaipur |
| `/services/social-media-marketing-jaipur` | `services/[slug]` + existing bespoke layout | social media marketing agency in Jaipur |
| `/services/performance-marketing-jaipur` | `services/[slug]` + existing bespoke layout | Google Ads & Meta Ads agency in Jaipur |
| `/services/branding-logo-design-jaipur` | `services/[slug]` | branding agency in Jaipur |
| `/services/video-production-reels-jaipur` | `services/[slug]` | video production & reels agency in Jaipur |
| `/services/ecommerce-shopify-marketing-jaipur` | `services/[slug]` | Shopify & e-commerce marketing agency |
| `/services/content-marketing-copywriting-jaipur` | `services/[slug]` | content marketing agency in Jaipur |
| `/services/local-seo-jaipur` | `services/[slug]` | local SEO & Google Business Profile in Jaipur |
| `/services/ai-content-creation-jaipur` | existing bespoke page (moved) | AI content creation agency in Jaipur |
| `/services/product-photography-jaipur` | existing bespoke page (moved) | product photography in Jaipur |
| `/services/ugc-video-production-jaipur` | existing bespoke page (moved) | UGC video production in Jaipur |
| `/industries` | hub | digital marketing by industry |
| `/industries/{hospitals, doctors-clinics, schools-colleges, real-estate, jewellery-fashion, restaurants-cafes, coaching-edtech, manufacturers-exporters, it-startups}` | `industries/[slug]` | digital marketing for {industry} |
| `/industries/hospitals/seo` | `industries/[slug]/[service]` | SEO for hospitals in Jaipur |
| `/industries/doctors-clinics/website-design` | combo | website design for doctors in Jaipur |
| `/industries/real-estate/google-ads` | combo | Google Ads for real estate in Jaipur |
| `/industries/restaurants-cafes/social-media-marketing` | combo | social media marketing for restaurants in Jaipur |
| `/industries/jewellery-fashion/website-design` | combo | jewellery website design in Jaipur |
| `/locations` | hub | where we work |
| `/locations/jaipur` | `locations/[slug]` (flagship) | marketing agency in Jaipur, by neighbourhood (local intent) |
| `/locations/{rajasthan, delhi-ncr, mumbai}` | `locations/[slug]` | digital marketing agency for {area} businesses |
| `/about`, `/process`, `/pricing`, `/contact`, `/faq`, `/privacy-policy`, `/terms` | static pages | brand and trust |
| `/case-studies` and `/case-studies/[slug]` | index + template | (filled when real case studies exist) |
| `/blog` and `/blog/[slug]` (12 posts) | index + template | informational queries |
| `/project` | existing | hire a creative agency in Jaipur (detailed brief form) |

**301 redirects** (`next.config.ts`):

- `/web-experience` → `/services/website-design-development-jaipur`
- `/social-cults` → `/services/social-media-marketing-jaipur`
- `/performance` → `/services/performance-marketing-jaipur`
- `/ai-visuals` → `/services/ai-content-creation-jaipur`
- `/editorial` → `/services/product-photography-jaipur`
- `/ugc` → `/services/ugc-video-production-jaipur`

## Cannibalisation plan

Each Jaipur page owns one intent:

- **Homepage:** creative agency in Jaipur and the brand.
- **Pillar:** digital marketing agency or company in Jaipur.
- **`/locations/jaipur`:** hyper-local intent ("marketing agency near me" by neighbourhood, Jaipur market specifics).
- **`/services/seo-company-jaipur`:** organic search as a whole.
- **`/services/local-seo-jaipur`:** map pack, Google Business Profile, reviews and citations.
- **Website design** covers business sites. **E-commerce** covers Shopify stores and growth.
- **Video production** covers brand-made reels and films. **UGC** covers creator-made content.

## Decisions taken without asking (change any of them later)

1. **Branch.** Work happens on `seo-expansion`, one commit per phase. That branch is pushed; `main` is not touched.
2. **Content format.** Typed TypeScript content files. Long-form bodies are Markdown strings rendered on the server by a small in-house renderer, with no new dependency and no `dangerouslySetInnerHTML`. Visual blocks (stats, steps, checklist, comparison table, callout) use `:::` directives that map to existing styled components.
3. **Existing bespoke service designs are kept.**
   - Social, performance and web keep their layouts at the new `/services/...` URLs, with the long-form content added below.
   - AI visuals, product photography and UGC keep their current content and move under `/services/`.
4. **Locations.** Only Jaipur, Rajasthan, Delhi NCR and Mumbai. Other cities were skipped because they would be doorway pages without real local examples.
5. **Pricing** explains how pricing works, with no rupee figures until you confirm ranges.
6. **Case studies.** The template ships with zero entries; nothing is invented. The index explains how results are measured and reported.
7. **Blog byline** is "Sneeze Media Team" until real author names and bios are provided.
8. **No fabricated facts.** No client names, testimonials, ratings, awards, years in business or results. Stat blocks use process facts or well-known public platform facts only.

---

## Results after the expansion (Phase 7 QA, 2026-11-04)

| Check | Result |
|---|---|
| `npm run build` (incl. TypeScript) and `eslint src` | Pass. 65 routes prerendered as static HTML. |
| `npm run content:check` (47 content files) | Pass. Every page meets its word minimum, has the keyword in its H1 and first 100 words, has 4–8 FAQs, a visual block and 3+ internal links. No duplicate titles, H1s or descriptions, no shared 6-word passages and no banned claims. |
| `npm run seo:check` (built HTML, 57 indexable pages) | 0 errors, 0 warnings. One H1 per page; unique titles (50–61 chars) and descriptions (148–160); canonical on every page; no noindex; valid JSON-LD with required fields; every page in the sitemap and vice versa; no broken internal links; no `TODO_` leaked into HTML. |
| JSON-LD per template | Organization + ProfessionalService on every page. WebSite (home). Service + BreadcrumbList + FAQPage (services, industries, combos, locations, pillar). BlogPosting + BreadcrumbList + FAQPage (blog). AboutPage / ContactPage / CollectionPage / WebPage on the info pages. |
| Content without JavaScript | All text visible on 13 sampled pages: reveals, FAQ answers and the manifesto all show, and the preloader is skipped. |
| Phone width (390 px) | All 57 pages: no horizontal overflow. |
| Lighthouse, mobile (SEO / A11y / Best practices / Performance) | SEO **100** on every template. Inner pages: performance **92–97**, accessibility 96–100, best practices 100, CLS 0. Homepage: performance 86, held back by the intentional intro preloader (LCP about 4 s); accessibility 92, because of the low-contrast manifesto words that light up on scroll by design. |
| Scroll smoothness (frame timing, 4× CPU throttle) | 60 fps with 0 long tasks on the longest pages (pillar, Jaipur, blog, website design). |
| Transitions | Curtain transitions, mega-menu, contents anchors, related links, 301s from old URLs and 404 for unknown slugs all verified. |

Page count went from 8 to 57 indexable URLs, with about 85,000 words of unique, checked content. What's still needed from the owner is in `CONTENT_TODOS.md`; the steps after deploy are in `SEO_LAUNCH_CHECKLIST.md`.
