# SEO launch checklist

Work through the sections in order. Everything in the code is ready. These are the steps only you can do in Vercel, Google, Bing and the directories.

## 1. Domain and canonical URL (do this first)

- [ ] **Connect the domain.** In Vercel → Project → Settings → Domains, add the custom domain (e.g. `www.sneeze.media`). Pick **one** primary host, `www` or bare, and set the other to redirect to it.
- [ ] **Retire the vercel.app address.** Add `sneeze-kappa.vercel.app` as a domain that **redirects** to the primary domain, so Google never indexes two copies of the site.
- [ ] **Set `SITE_URL`.** The site resolves `SITE_URL` automatically (`next.config.ts`):
  1. `NEXT_PUBLIC_SITE_URL` (Vercel → Settings → Environment Variables, e.g. `https://www.sneeze.media`). Setting it explicitly is the safest option.
  2. Otherwise, Vercel's production domain (the custom domain once attached).
  3. Fallback: `https://www.sneeze.media`.
- [ ] **Redeploy.** `SITE_URL` is baked in at build time, so changing the domain needs a new deployment.
- [ ] **Verify on the live site:**
  - `view-source:` of the homepage shows `<link rel="canonical" href="https://<your-domain>">`.
  - `/sitemap.xml` lists about 57 URLs on your domain.
  - `/robots.txt` points at that sitemap.
  - `/llms.txt` lists the new URLs.
- [ ] **Check the redirects.** The six old URLs (`/web-experience`, `/social-cults`, `/performance`, `/ai-visuals`, `/editorial`, `/ugc`) should return **301** to their `/services/...` pages.
- [ ] **Fill the business details.** Complete `src/config/site.ts` (address, PIN, email, socials, map): see `CONTENT_TODOS.md` §1. NAP must match Google Business Profile exactly.

## 2. Google Search Console

- [ ] **Add the property.** Add a **Domain property** (DNS TXT record at your registrar) so http/https and www/non-www are all covered.
- [ ] **Submit the sitemap.** Sitemaps → submit `https://<your-domain>/sitemap.xml`.
- [ ] **Request indexing for key pages.** Use URL Inspection → Request indexing for:
  - `/`
  - `/digital-marketing-agency-jaipur`
  - `/services/seo-company-jaipur`
  - `/services/website-design-development-jaipur`
  - `/locations/jaipur`
  - `/services`
  - `/industries`
  - `/blog`
- [ ] **Check after 1–2 weeks:**
  - Pages → "Indexed" grows towards about 57.
  - Investigate anything under "Crawled – currently not indexed".
- [ ] **Watch the reports:**
  - Enhancements: Breadcrumbs.
  - Core Web Vitals (field data appears once traffic builds).
  - HTTPS.

  Google only shows FAQ rich results for a narrow set of sites, but the FAQ markup still helps answer engines and AI search.
- [ ] **Link Search Console to GA4** (Admin → Product links).

## 3. Bing Webmaster Tools

- [ ] Sign in at bing.com/webmasters → **Import from Google Search Console** (fastest), or verify by DNS.
- [ ] Submit the sitemap.
- [ ] Bing also feeds several AI assistants, so keep it verified.
- [ ] Optional: enable IndexNow in Bing to get faster recrawls after content updates.

## 4. Google Analytics 4 and conversion tracking

- [ ] **Create the property.** In GA4, create a property and web data stream for the domain, and copy the Measurement ID (`G-XXXXXXX`).
- [ ] **Turn on tracking.** In Vercel, add the environment variable `NEXT_PUBLIC_GA_ID=G-XXXXXXX` and redeploy. The site then loads GA4 after the page is interactive, so first paint is unaffected. It sends `generate_lead` events for:
  - calls (`method: phone`)
  - WhatsApp clicks (`method: whatsapp`)
  - form submissions (`method: form`)
- [ ] **Mark the key event.** In GA4 → Admin → Events, mark `generate_lead` as a **key event**.
- [ ] **Update the privacy policy.** Confirm `/privacy-policy` matches what is now live (it currently says "may use Google Analytics").
- [ ] **If you run Google Ads:** link GA4 ↔ Google Ads and import `generate_lead`.
- [ ] **Web3Forms:** add your email in the Web3Forms dashboard if you haven't, and send a test enquiry from `/contact` and `/project`.

## 5. Google Business Profile (the single biggest local lever)

- [ ] **Claim and verify** the profile for Sneeze Media at the real office address. If you have no public office, set it up as a service-area business covering Jaipur and the nearby districts you serve.
- [ ] **Categories.** Primary: **Marketing agency**. Additional categories that match what you sell:
  - Internet marketing service
  - Website designer
  - Advertising agency
  - Social media agency
  - Video production service
  - Graphic designer
- [ ] **NAP.** Name, address and phone must be **identical** to the site footer and `src/config/site.ts`.
- [ ] **Website link.** Point it to the homepage with tracking, e.g. `https://<domain>/?utm_source=google&utm_medium=organic&utm_campaign=gbp`.
- [ ] **Services.** List services that mirror the site's service pages, using the same names.
- [ ] **Description** (up to 750 characters): what you do, for whom, where. No keyword stuffing, URLs or promotional claims.
- [ ] **Photos.** Logo, cover, team, office, work samples (real, not stock). Add new ones monthly.
- [ ] **Posts.** One a week, rotating: a guide from `/blog`, a service, an offer or event.
- [ ] **Q&A.** Seed it with real questions from the `/faq` page, where the feature is available.
- [ ] **Reviews.** Ask every happy client personally and send the review link. Never offer incentives or filter who you ask (Google prohibits both). Reply to every review, good or bad.
- [ ] Add the profile URL to `social.googleBusinessProfile` in `src/config/site.ts`.

## 6. Citations and backlinks (India-first)

Rules:
- Same NAP everywhere.
- No paid link packages, PBNs or link exchanges.
- One quality listing beats twenty spammy ones.

**Core citations (week 1–2)**
- [ ] Google Business Profile, Bing Places, Apple Business Connect
- [ ] Justdial, Sulekha, IndiaMART (as a service provider), TradeIndia
- [ ] Facebook page, Instagram, LinkedIn company page, YouTube channel, all with identical NAP and the site link
- [ ] Foursquare, Hotfrog India

**Agency directories and review platforms (weeks 2–4)**
- [ ] Clutch, GoodFirms, DesignRush, Sortlist, The Manifest. Complete the profiles fully and ask 2–3 clients for reviews there.
- [ ] Behance and Dribbble for design and web portfolio work (link back to the relevant service pages)

**Local and ecosystem links (month 2–3)**
- [ ] Local business associations and chambers you are eligible to join; most have member directories.
- [ ] Rajasthan's startup ecosystem (e.g. iStart Rajasthan), if eligible.
- [ ] Partner pages: hosting, Shopify partner directory (if you become a partner), printers, photographers and developers you work with. Ask for a "recommended partners" link.
- [ ] Client "website by" credits in footers, where clients agree.

**Earned links**
- [ ] "Best digital marketing agencies in Jaipur" listicles: email the authors with genuinely useful information (no payment for placement).
- [ ] Local news and business publications: pitch data-free stories that are still newsworthy. Examples: a festival-season marketing guide for Jaipur shops, or the healthcare marketing compliance explainer.
- [ ] Guest guides on industry sites (healthcare, education, real estate, exports), linking to the matching `/industries/...` page.

## 7. 90-day content and link calendar

| Weeks | Content | Links and listings | Measure |
|---|---|---|---|
| 1–2 | Fill `CONTENT_TODOS.md` §1 and §3 (NAP, socials, author names). Replace 2–3 case-study placeholders with real proof. | Domain, GSC, Bing, GA4, GBP live. Core citations. | Pages indexed, GBP verified |
| 3–4 | New guide: *Google Business Profile optimisation guide*. Refresh the homepage FAQ from real client questions. | Clutch, GoodFirms, DesignRush profiles; ask 3 clients for reviews | GBP calls and direction requests, first GSC impressions |
| 5–6 | Guides: *How much does SEO cost in India?* and *WhatsApp marketing for local businesses*. First full case study page. | Behance/Dribbble portfolio; 2 partner-page links | Impressions and average position for service keywords |
| 7–8 | Guides: *Festival and wedding-season marketing calendar for Jaipur businesses* and *Performance Max for Indian e-commerce stores*. | Outreach to 10 "top agencies in Jaipur" lists and local publications | New referring domains (Search Console → Links) |
| 9–10 | Guides: *Instagram marketing for jewellery brands* and *RERA-compliant real estate ads: a checklist*. Second case study. | 1–2 guest guides on industry sites | Organic enquiries in GA4 (`generate_lead` by source) |
| 11–12 | **Refresh:** in GSC → Performance, find pages ranking 8–20 and improve them (better answers to the queries shown, internal links, FAQs). Update their `updated` dates. | Chase pending reviews and listings; one local PR pitch | Clicks, leads and ranking movement vs week 1 |

Rhythm after day 90:
- 2 guides a month.
- 1 case study a quarter.
- A content refresh every quarter.
- GBP posts weekly.
- Review requests after every project.

## 8. Ongoing hygiene

- [ ] **Re-check after every content edit:**
  - `npm run content:check` (keyword placement, word counts, duplicate passages, banned claims).
  - `npm run build && npm run seo:check` (titles, H1s, canonicals, schema, sitemap, links, word minimums).
- [ ] **Bump dates.** When a page changes meaningfully, update its `updated` date. The sitemap `lastModified` follows it.
- [ ] **Add new pages only when you have real content.**
  - **Services or industries:** a new service or industry is a new file in its `src/content/...` folder, plus one line in `src/content/routes.ts`. The sitemap, menus, related links and `llms.txt` pick it up.
  - **Cities:** add a city only when you have real local work or insight there, to avoid doorway pages.
- [ ] **Watch for cannibalisation.** In GSC → Performance → Queries, check that each main query maps to one page. Example: "digital marketing agency in Jaipur" → `/digital-marketing-agency-jaipur`, and "digital marketing services in Jaipur" → `/locations/jaipur`.
- [ ] **Run Lighthouse quarterly** on the homepage and one page per template. SEO should stay at 100 and inner pages in the green.
