# Content to-dos for the owner

Everything below is something only you can supply or confirm. Nothing on the site has been invented to fill these gaps: placeholders stay hidden from visitors and from the structured data until you fill them.

After editing, run these and keep both at zero errors:

```bash
npm run content:check
```

```bash
npm run build && npm run seo:check
```

## 0. Brand font: Druk Condensed (licensed)

Headlines, big statements, the logo and the SNEEZE wordmark are set in **Druk Condensed**. Druk is a paid font from Commercial Type, so the files can't be downloaded for you. Until they're added, browsers use Druk if it's installed on the viewer's computer, and everyone else sees **Anton**, the closest free condensed face.

To switch the whole site to Druk:
1. Get the **web licence** files from Commercial Type (`.woff2`, plus `.woff` if you have them).
2. Create the folder `public/fonts/druk/` and put the files in it. Keep the weight in each file name, e.g. `DrukCond-Super-Web.woff2` or `DrukCond-SuperItalic-Web.woff2`.
3. Push. At build time the site detects the files: weight comes from the name (Medium, Bold, Heavy, Super) and italic from "Italic". It writes the `@font-face` rules and preloads the main weight. Headlines use the Super (900) weight.

## 1. Business details: `src/config/site.ts`

Every value starting with `TODO_` is automatically left out of the footer, contact page and JSON-LD until you replace it.

| Key | What to enter | Where it appears |
|---|---|---|
| `email` | Public enquiry email | Footer, contact page, Organization schema |
| `address.streetAddress` | Office or registered street address | Footer NAP, contact page, schema (needed for Google Business Profile consistency) |
| `address.postalCode` | PIN code | Same as above |
| `geo.lat`, `geo.lng` | Office coordinates (right-click the pin in Google Maps) | Organization schema (GeoCoordinates) |
| `openingHours` | e.g. `Mo-Sa 10:00-19:00` | Contact page, schema |
| `mapEmbedUrl` | Google Maps → Share → Embed a map → the iframe `src` | Contact page map (shows a placeholder until set) |
| `foundingYear` | Year the agency started | Schema `foundingDate` |
| `legalName` | Registered business name (proprietorship / LLP / Pvt Ltd) | Schema, privacy policy and terms |
| `social.googleBusinessProfile` | Your Google Business Profile URL | Schema `sameAs`, footer |
| `social.instagram`, `linkedin`, `facebook`, `youtube`, `x` | Full profile URLs (leave any you don't use as `TODO_` or delete the key) | Schema `sameAs`, footer |

Phone numbers (+91 99291 03969, +91 95497 91480) are already set and used everywhere.

## 2. Proof: case studies and testimonials (40 placeholders)

These are the highest-value additions for rankings and conversions. Each placeholder marks where a real, client-approved result belongs.

How to add one:
1. Replace the `:::todo` block in the page's file with a short proof section (2–4 sentences plus a `:::stats` block of real numbers with their source).
2. Optionally create a full case study. Add a file to `src/content/case-studies/`, set `approved: true` and register it in `src/content/case-studies/index.ts`. It then appears on `/case-studies` with its own URL and is added to the sitemap automatically.
3. Use only numbers you can show from Search Console, GA4, Ads Manager or a CRM, and only with the client's written permission. Patient, student and child data must never appear.

| Page | Placeholder | What is needed | File |
|---|---|---|---|
| `/services/branding-logo-design-jaipur` | `TODO_PROVIDE_CASE_STUDY` | one branding or rebranding project (industry, the brief, before/after logo and packaging, what changed and why, with client permission) | `src/content/services/branding-logo-design-jaipur.ts` |
| `/services/content-marketing-copywriting-jaipur` | `TODO_PROVIDE_CASE_STUDY` | one content marketing result (industry, content produced, Search Console clicks or leads attributed to content before/after over a stated period, with permission) | `src/content/services/content-marketing-copywriting-jaipur.ts` |
| `/digital-marketing-agency-jaipur` | `TODO_PROVIDE_CASE_STUDY` | one integrated multi-channel engagement (business type, starting point, the channel mix we chose and why, leads or revenue before and after the first 90 days, with client permission) | `src/content/services/digital-marketing-agency-jaipur.ts` |
| `/services/ecommerce-shopify-marketing-jaipur` | `TODO_PROVIDE_CASE_STUDY` | one D2C store result (product category, channels used, change in RTO rate or conversion rate, revenue or ROAS before/after over a stated period, with permission) | `src/content/services/ecommerce-shopify-marketing-jaipur.ts` |
| `/services/local-seo-jaipur` | `TODO_PROVIDE_CASE_STUDY` | one local SEO result (business type and Jaipur area, profile changes made, GBP calls and direction requests before/after over a stated period, with permission) | `src/content/services/local-seo-jaipur.ts` |
| `/services/performance-marketing-jaipur` | `TODO_PROVIDE_CASE_STUDY` | one paid campaign (industry, platform, budget range, CPL or ROAS before and after the tracking and structure changes, with permission) | `src/content/services/performance-marketing-jaipur.ts` |
| `/services/seo-company-jaipur` | `TODO_PROVIDE_CASE_STUDY` | one SEO client result (industry, starting position, what we changed, Search Console clicks or enquiries before/after, with permission) | `src/content/services/seo-company-jaipur.ts` |
| `/services/social-media-marketing-jaipur` | `TODO_PROVIDE_CASE_STUDY` | one social media account (industry, starting point, content pillars used, shares, saves and DM leads before and after three months, with permission) | `src/content/services/social-media-marketing-jaipur.ts` |
| `/services/video-production-reels-jaipur` | `TODO_PROVIDE_CASE_STUDY` | one video or reels project (brand and platform, the brief, sample reel, watch-time or ad metrics before/after, with client permission) | `src/content/services/video-production-reels-jaipur.ts` |
| `/services/website-design-development-jaipur` | `TODO_PROVIDE_CASE_STUDY` | one website build or redesign (industry, platform chosen and why, Core Web Vitals and monthly enquiries before and after launch, with permission) | `src/content/services/website-design-development-jaipur.ts` |
| `/industries/coaching-edtech` | `TODO_PROVIDE_CASE_STUDY` | one coaching institute or EdTech campaign (exam or course category, batch, cost per counselling session and cost per enrolment across two intakes, with the institute's written permission) | `src/content/industries/coaching-edtech.ts` |
| `/industries/doctors-clinics` | `TODO_PROVIDE_CASE_STUDY` | one clinic engagement (speciality, area of Jaipur, what changed in the Google profile, website or WhatsApp flow, and calls or booked appointments before and after), shared with the doctor's written permission | `src/content/industries/doctors-clinics.ts` |
| `/industries/hospitals` | `TODO_PROVIDE_CASE_STUDY` | one hospital engagement (type of hospital, departments covered, what changed, appointment requests and calls by source before and after), shared with written permission and with no patient-identifiable information | `src/content/industries/hospitals.ts` |
| `/industries/it-startups` | `TODO_PROVIDE_CASE_STUDY` | one IT services or SaaS engagement (company type, positioning change, demos or SQLs and pipeline before and after, with written permission) | `src/content/industries/it-startups.ts` |
| `/industries/jewellery-fashion` | `TODO_PROVIDE_CASE_STUDY` | one jewellery, textile or fashion brand result (brand type, channels used, ROAS, average order value or repeat rate before/after, with permission) | `src/content/industries/jewellery-fashion.ts` |
| `/industries/manufacturers-exporters` | `TODO_PROVIDE_CASE_STUDY` | one manufacturer or exporter result (product category, target country, qualified RFQs or sample requests before and after, with written permission) | `src/content/industries/manufacturers-exporters.ts` |
| `/industries/real-estate` | `TODO_PROVIDE_CASE_STUDY` | one real estate project campaign (project type, corridor, launch or sustenance phase, cost per qualified lead and cost per site visit before/after, with the developer's permission) | `src/content/industries/real-estate.ts` |
| `/industries/restaurants-cafes` | `TODO_PROVIDE_CASE_STUDY` | one restaurant or cafe result (venue type, area of Jaipur, change in reservations, calls or direction requests over three to six months, with the owner's permission) | `src/content/industries/restaurants-cafes.ts` |
| `/industries/schools-colleges` | `TODO_PROVIDE_CASE_STUDY` | one school or college admission season (type of institution, area, channels used, enquiries, visits and admissions by source, cost per enquiry), shared with written permission and without identifying any child | `src/content/industries/schools-colleges.ts` |
| `/industries/doctors-clinics/website-design` | `TODO_PROVIDE_CASE_STUDY` | a doctor or clinic website we built, with permission (pages, booking method, Core Web Vitals and appointment enquiries before/after) | `src/content/combos/doctors-clinics--website-design.ts` |
| `/industries/hospitals/seo` | `TODO_PROVIDE_CASE_STUDY` | hospital SEO result with permission (departments covered, organic appointment requests before/after from GA4 or the call centre, timeframe) | `src/content/combos/hospitals--seo.ts` |
| `/industries/jewellery-fashion/website-design` | `TODO_PROVIDE_CASE_STUDY` | one jewellery website build (brand type, platform, catalogue size, what we built, conversion rate, enquiries or page speed before and after, with permission) | `src/content/combos/jewellery-fashion--website-design.ts` |
| `/industries/real-estate/google-ads` | `TODO_PROVIDE_CASE_STUDY` | real estate Google Ads result with permission (project type and locality, cost per verified lead and per site visit before/after offline conversion import) | `src/content/combos/real-estate--google-ads.ts` |
| `/industries/restaurants-cafes/social-media-marketing` | `TODO_PROVIDE_CASE_STUDY` | one restaurant or cafe social media result (outlet type, area of Jaipur, what we posted, bookings, calls or offer redemptions before and after, with permission) | `src/content/combos/restaurants-cafes--social-media-marketing.ts` |
| `/locations/delhi-ncr` | `TODO_PROVIDE_CASE_STUDY` | one Delhi NCR client (area, industry, channel mix, cost per lead or qualified pipeline before and after, with permission) | `src/content/locations/delhi-ncr.ts` |
| `/locations/jaipur` | `TODO_PROVIDE_CASE_STUDY` | two or three Jaipur case studies with permission (for example a cafe, a jewellery showroom and a clinic or real estate project), with neighbourhood, starting point, what we changed, and tracked calls, WhatsApp enquiries or bookings before and after | `src/content/locations/jaipur.ts` |
| `/locations/mumbai` | `TODO_PROVIDE_CASE_STUDY` | one Mumbai brand (sector, creative tests run, cost per purchase or qualified site visits before and after, with permission) | `src/content/locations/mumbai.ts` |
| `/locations/rajasthan` | `TODO_PROVIDE_CASE_STUDY` | one Rajasthan client outside Jaipur (city, industry, what we changed, enquiries or bookings before and after, with permission) | `src/content/locations/rajasthan.ts` |
| `/blog/digital-marketing-cost-jaipur` | `TODO_PROVIDE_CASE_STUDY` | an anonymised client budget breakdown (fee, ad spend, production, tools) with the enquiries and cost per lead it produced over the first 90 days, shared with permission | `src/content/blog/digital-marketing-cost-jaipur.ts` |
| `/blog/digital-marketing-for-exporters` | `TODO_PROVIDE_CASE_STUDY` | an exporter or manufacturer project (sector, target countries, website and campaign changes, qualified enquiries or RFQs before and after, with client permission) | `src/content/blog/digital-marketing-for-exporters.ts` |
| `/blog/ethical-hospital-marketing-guidelines` | `TODO_PROVIDE_CASE_STUDY` | an anonymised hospital or clinic engagement showing the compliance review process and the enquiry metrics tracked (calls, WhatsApp bookings, Google Business Profile actions), shared with permission | `src/content/blog/ethical-hospital-marketing-guidelines.ts` |
| `/blog/google-ads-vs-meta-ads` | `TODO_PROVIDE_CASE_STUDY` | one client running Google search and Meta together (category, how budget was split, tracked leads or sales by source over a defined period, with permission) | `src/content/blog/google-ads-vs-meta-ads.ts` |
| `/blog/how-to-choose-digital-marketing-agency` | `TODO_PROVIDE_CASE_STUDY` | an anonymised sample monthly report (with client permission) showing enquiries, cost per lead and work completed, to illustrate what good agency reporting looks like | `src/content/blog/how-to-choose-digital-marketing-agency.ts` |
| `/blog/instagram-reels-strategy-local-brands` | `TODO_PROVIDE_CASE_STUDY` | one local brand reels engagement (category, posting rhythm, change in DMs, calls or store visits over a defined period, with permission) | `src/content/blog/instagram-reels-strategy-local-brands.ts` |
| `/blog/local-seo-checklist-jaipur` | `TODO_PROVIDE_CASE_STUDY` | a local SEO result for a Jaipur business (category, area, what was fixed, Google Business Profile calls and direction requests before and after), shared with permission | `src/content/blog/local-seo-checklist-jaipur.ts` |
| `/blog/real-estate-lead-generation-jaipur` | `TODO_PROVIDE_CASE_STUDY` | one real estate project (project type, channels used, leads to site visits to bookings, cost per site visit trend over a defined period, with permission) | `src/content/blog/real-estate-lead-generation-jaipur.ts` |
| `/blog/school-admissions-online-marketing` | `TODO_PROVIDE_CASE_STUDY` | one school or college admissions campaign (type of institution, channels used, enquiries, campus visits and admissions before and after, shared with permission and without student images) | `src/content/blog/school-admissions-online-marketing.ts` |
| `/blog/shopify-store-seo-guide` | `TODO_PROVIDE_CASE_STUDY` | one Shopify store SEO result (product category, what we changed on collections and product pages, Search Console clicks or organic revenue before and after, shared with permission) | `src/content/blog/shopify-store-seo-guide.ts` |
| `/blog/website-cost-jaipur` | `TODO_PROVIDE_CASE_STUDY` | one website project (type of business, platform chosen, scope and timeline, what changed in enquiries or sales after launch, shared with permission) | `src/content/blog/website-cost-jaipur.ts` |
| `/case-studies` | `TODO_PROVIDE_CASE_STUDY` | two or three verified case studies with written client approval (client name or anonymised sector, starting point, goal, what we changed, timeline, before-and-after numbers with source screenshots) | `src/content/pages/case-studies.ts` |

**Testimonials:** the pillar page has a `TODO_PROVIDE_TESTIMONIAL` slot. Provide 2–3 client quotes (name, business, city, written permission). Do not use healthcare patient testimonials about treatment outcomes.

## 3. Brand, team and pricing

| Page | Placeholder | What is needed | File |
|---|---|---|---|
| `/about` | `TODO_FOUNDER_STORY` | how and why Sneeze Media started, the founding year and the founders' backgrounds, in their own words | `src/content/pages/about.ts` |
| `/about` | `TODO_TEAM_BIOS` | names, roles, photos and two-line bios of the founders and core team, with LinkedIn links and permission to publish | `src/content/pages/about.ts` |
| `/pricing` | `TODO_PRICING_RANGES` | indicative starting ranges in ₹ (excluding GST and ad spend) for a monthly retainer, a fixed-scope project and an audit or sprint, if the owner wants to publish them | `src/content/pages/pricing.ts` |

Also needed:
- **Blog authors.** Every guide is bylined "Sneeze Media Team". For stronger E-E-A-T, give each guide a named author with a one-line bio and photo. Change `author` in `src/content/blog/*.ts`; the schema switches to a `Person` automatically.
- **Pricing ranges** ("starting from" or ranges per service), only if you are comfortable publishing them. The pricing page and the cost guides currently explain the factors with no figures.
- **Real photography.** Team, office and work-in-progress photos for About and Contact. Add them with `next/image`, real dimensions and descriptive alt text.

## 4. Legal

| Page | Placeholder | What is needed | File |
|---|---|---|---|
| `/privacy-policy` | `TODO_LEGAL_REVIEW` | have a lawyer review this privacy policy before relying on it. Check it against the DPDP Act, 2023, the DPDP Rules as they come into force and the IT Act, 2000; confirm real retention periods; confirm whether Google Analytics 4 or any other cookies, pixels or embeds are actually live and update the analytics wording to match. | `src/content/pages/privacy-policy.ts` |
| `/privacy-policy` | `TODO_LEGAL_ENTITY_NAME` | add the registered legal name and type of the business that operates Sneeze Media (proprietorship, partnership, LLP or private limited company), its registered address and, if applicable, its CIN or GSTIN. | `src/content/pages/privacy-policy.ts` |
| `/privacy-policy` | `TODO_GRIEVANCE_OFFICER` | name the person responsible for data-protection requests and grievances, with their email, postal address and committed response time once the DPDP Rules timelines are confirmed. | `src/content/pages/privacy-policy.ts` |
| `/privacy-policy` | `TODO_EMAIL` | add a dedicated email address for privacy requests and show it in this section and on the Contact page. | `src/content/pages/privacy-policy.ts` |
| `/terms` | `TODO_LEGAL_REVIEW` | have a lawyer review these terms of use before relying on them, in particular the limitation of liability, indemnity and jurisdiction clauses, and check they sit well with the standard client proposal or agreement. | `src/content/pages/terms.ts` |
| `/terms` | `TODO_LEGAL_ENTITY_NAME` | add the registered legal name and type of the business that operates Sneeze Media, and its registered address. | `src/content/pages/terms.ts` |
| `/terms` | `TODO_EMAIL` | add the business email address for legal and general questions and show it in this section. | `src/content/pages/terms.ts` |

- Have a lawyer review `/privacy-policy` and `/terms` before relying on them.
- Confirm whether analytics or other cookies are live once GA4 is added; the policy currently says "may use".
- Confirm data-retention periods.

## 5. Statements to confirm or edit

The writers kept to the facts in `docs/CONTENT_GUIDE.md`, but these sentences describe how you work or give estimates. Check that they are true for you, and edit or delete them if not.

| Statement | Where |
|---|---|
| Clients keep ad accounts, analytics, domain and files in their own name, and keep them if the engagement ends (stated as a written commitment in the agency-choice guide) | Pillar page, `/faq`, `/blog/how-to-choose-digital-marketing-agency`, website design page |
| One point of contact per account | SEO page, `/process`, `/about` |
| Onboarding "usually within a couple of weeks" once access arrives; number of revision rounds set in the proposal; a first-three-months strategy | `/process` |
| Single-doctor website "typically four to six weeks" | `/industries/doctors-clinics/website-design` |
| Jewellery site timelines: Shopify 4–8 weeks, Shopify + live metal pricing 6–10, custom B2B + B2C 10–16 | `/industries/jewellery-fashion/website-design` |
| "Jaipur shoots generally cost less than Mumbai" (qualitative) | `/locations/mumbai` |
| MahaRERA expects a QR code on project ads (the copy already says "we confirm the current format before launch") | `/locations/mumbai` |
| Example CAC payback figure (₹60,000 to win a customer bringing ₹10,000/month margin), labelled as an illustration | `/industries/it-startups` |
| Languages: English and Hindi | `/about`, schema |

## 6. Optional upgrades

- A unique Open Graph image per page (currently all pages share `/og.png`).
- An SVG version of the logo for the schema `logo` field.
- Google Business Profile posts and photos that mirror the services on the site.
