# Port package — rajkumarthanudhasan.com redesign

Drop-in replacement for the page layer of the existing Next.js 14 App Router app.
Nothing on the backend changes: the chat still POSTs `{ messages: [{role, content}] }`
to `/api` and reads `{ message }`.

## Files

    app/page.js        the redesigned page (client component, 'use client')
    app/layout.js      root layout — imports the two stylesheets, keeps GA4
    app/modernist.css  design-system tokens + component classes (.btn, .tag, .input, .grayscale)
    app/site.css       body reset, link colors, @keyframes, two hover rules
    public/portrait.jpg

## Install

1. Copy `app/page.js`, `app/modernist.css`, `app/site.css` and `public/portrait.jpg`
   into the repo at the same paths.
2. Merge `app/layout.js`: the only required additions are the two CSS imports.
   If your existing layout already injects GA4, keep yours and ignore the block here.
   The version here reads the measurement id from `NEXT_PUBLIC_GA_ID`.
3. Confirm `public/Rajkumar_Thanudhasan_Resume.pdf` exists — the hero and footer
   link to `/Rajkumar_Thanudhasan_Resume.pdf`.

No new dependencies. Nothing under `app/api/` is touched.

## Notes

- Styling is inline styles plus the design-system classes. Tailwind is no longer
  used by this page; leaving it installed is harmless.
- `app/page.js` contains a small `s()` helper that turns a CSS declaration string
  into a React style object, so the markup carries the same literal values as the
  design source.
- Fonts (Archivo, JetBrains Mono) load via `@import` at the top of `site.css`.
  Switch to `next/font` if you want them self-hosted.
- Resume content is hard-coded in `page.js` and separately in the `/api` route's
  `DATA_RESUME`. Section 19.2 of your design doc recommends a single canonical
  source; that refactor is not part of this package.

## Still open

- Rotate and purge the Azure OpenAI key committed in `environment.env`.
- `/api` is anonymous and unbounded — add rate limiting and a conversation cap.
- Decide the canonical domain (apex vs `www`) and redirect the other.
