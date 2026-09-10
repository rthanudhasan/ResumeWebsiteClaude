# rajkumarthanudhasan.com

Personal site for Rajkumar Thanudhasan — RPA lead and intelligent-automation architect.
Next.js 14 (App Router), deployed to Azure Static Web Apps, with a resume assistant backed
by Google Gemini.

## Stack

- Next.js 14.1.4, React 18 — no CSS framework; the page uses inline styles plus a
  design-system stylesheet (`app/modernist.css`)
- `app/api/route.js` — POST handler that brokers to the Gemini `generateContent` API
- Azure Static Web Apps for hosting; Hostinger for DNS

## Layout

    app/page.js        the whole page (client component)
    app/layout.js      root layout, stylesheet imports, GA4
    app/api/route.js   Gemini broker + the resume corpus (DATA_RESUME)
    app/modernist.css  design tokens and component classes (.btn, .tag, .input, .grayscale)
    app/site.css       body reset, link colors, keyframes, hover rules
    public/            portrait, resume PDF

## Local development

    npm install
    cp .env.example .env.local     # fill in GEMINI_API_KEY
    npm run dev

## Environment

| Variable | Where | Notes |
| --- | --- | --- |
| `GEMINI_API_KEY` | server | Google AI Studio key. Set as an Azure SWA application setting. |
| `GEMINI_MODEL` | server | Defaults to `gemini-2.5-flash`. |
| `NEXT_PUBLIC_GA_ID` | client | GA4 measurement id. Optional — analytics is skipped if unset. |

Never commit these. `.gitignore` blocks `.env*` and `environment.env`.

## Deployment

Push to `main` triggers `.github/workflows/azure-static-web-apps.yml`, which needs a
repository secret named `AZURE_STATIC_WEB_APPS_API_TOKEN` — the deployment token from the
Azure Static Web App resource. Linking the repo from the Azure portal will also generate
its own workflow file; if you do that, delete this one so the two don't both deploy.

## The chat contract

The page POSTs to `/api`:

    { "messages": [{ "role": "user" | "assistant", "content": "…" }] }

and reads:

    { "message": "…" }

History is held in the browser and resent each turn. The route trims to the last 20 turns
and rejects any single message over 1500 characters.

## Maintenance

Resume content lives in two places — the copy rendered in `app/page.js` and the
`DATA_RESUME` string in `app/api/route.js`. Update both when the resume changes, or
refactor to a single canonical source.
