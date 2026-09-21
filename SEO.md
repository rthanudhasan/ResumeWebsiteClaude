# SEO — what's in the site, and what you need to do

## In the code (done)

- **Metadata** (`app/layout.js`): title, long-form description with the headline numbers, keyword set,
  canonical URL, `robots: index, follow, max-image-preview: large`, Open Graph (profile type, portrait
  image) and a Twitter summary_large_image card.
- **Structured data**: one JSON-LD `@graph` with `Person` (job title, location, email, phone, LinkedIn
  as `sameAs`, employer, `alumniOf`, `knowsAbout`, four `EducationalOccupationalCredential`
  certifications, `hasOccupation`, and a `seeks` entry for the target role), `WebSite`, and
  `ProfilePage`. This is what powers a knowledge-panel-style result for your name.
- **Crawling**: `app/robots.js` allows everything and points at the sitemap; `app/sitemap.js` publishes
  the one URL with a monthly change frequency.
- **On-page**: single `<h1>` carrying the positioning line, section `<h2>`s in order, descriptive
  portrait `alt` text, semantic `<section>`/`<footer>`, `lang="en"`.

## What you have to do (off-page — this is where the visibility actually comes from)

1. **Google Search Console** — add the property for `rajkumarthanudhasan.com`, verify by DNS, submit
   `https://rajkumarthanudhasan.com/sitemap.xml`, then use *URL Inspection → Request indexing*. Repeat
   in **Bing Webmaster Tools** (it feeds ChatGPT search results too).
2. **Pick one canonical host.** Decide apex (`rajkumarthanudhasan.com`) or `www` and 301 the other to
   it in Azure. Right now the canonical tag and sitemap both say apex — make the server agree.
3. **Link to the site from places that already rank.** LinkedIn profile (Website field *and* the
   Featured section), your GitHub profile README, and any UiPath Forum / community profile. Inbound
   links from indexed pages are the single biggest factor for a personal-name domain.
4. **Make the LinkedIn headline match the site title** — "Lead Developer & Solution Architect,
   Intelligent Automation". Matching strings across profiles strengthen the entity association.
5. **Social preview image** — done: `public/og-card.png` (1200×630, portrait left, name, title and the
   three headline numbers) is what Open Graph and Twitter now point at. After deploying, re-scrape the
   URL in LinkedIn's Post Inspector and Facebook's Sharing Debugger so the old square image is flushed.

6. **Favicon** — replaced with an RT monogram on the Modernist red: `app/favicon.ico` (16/32/48),
   `app/icon.png` (512) and `app/apple-icon.png` (180). Next's app router serves all three
   automatically. Google caches favicons for weeks — requesting indexing in Search Console is the
   fastest way to flush the old one from search results.

## Worth doing later

- **Publish something.** One indexable write-up — the Kindo AI agent, or the Ollama utility-bill
  automation — targets phrases people actually search ("AI agent ServiceNow access review",
  "utility bill extraction ML RPA"). A single page of your own writing outranks a resume site for
  those terms and gives recruiters a reason to link to you.
- **FAQ schema** — if the chat suggestions become visible question/answer text on the page, they can
  be marked up as `FAQPage` and can surface directly in results. Google requires the answers be
  visible without interaction, so it needs the visible section first.
- **Re-check Core Web Vitals** in Search Console after launch; the fonts are the only third-party
  request on the page, so it should pass comfortably.
