# MindArct website

Next.js (App Router) + Tailwind site for mindarct.com. No database. Contact form posts to a Google Sheet via Google Apps Script. Everything here runs on free tiers.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production check
```

## Edit content

| What | Where |
| --- | --- |
| Company name, email, socials, services, process | `src/data/site.ts` |
| Projects, features, "coming soon" items | `src/data/projects.ts` |
| Screenshots | `public/projects/<slug>/1.svg`, `2.svg`... (current files are generated placeholders) |

To use real screenshots: export them as WebP/PNG (about 1280x800, under 200 KB each), drop them in `public/projects/<slug>/`, and update the `images` list in `src/data/projects.ts` (the `shots()` helper assumes `.svg`). `node scripts/gen-placeholders.mjs` regenerates the placeholders.

## Contact form -> Google Sheet (free)

1. Create a Google Sheet with headers in row 1: `Timestamp | Name | Email | Company | Service | Message`.
2. Extensions > Apps Script, paste `docs/google-apps-script.gs`.
3. Project Settings > Script properties: add `SECRET` with a long random string.
4. Deploy > New deployment > Web app > Execute as **Me**, access **Anyone**. Copy the URL.
5. Set env vars (locally in `.env.local`, and in Vercel):

```
GOOGLE_SCRIPT_URL=<web app url>
GOOGLE_SCRIPT_SECRET=<same value as SECRET>
```

The browser only talks to `/api/contact`; the script URL and secret stay on the server.

## Deploy on Vercel (Hobby, free) with mindarct.com

1. Push this folder to a GitHub repo.
2. vercel.com > Add New Project > import the repo (framework auto-detected as Next.js).
3. Add the two env vars above, then Deploy.
4. Project > Settings > Domains > add `mindarct.com` and `www.mindarct.com`.
5. At your domain registrar's DNS: `A  @  76.76.21.21` and `CNAME  www  cname.vercel-dns.com` (or use the exact values Vercel shows you). HTTPS is issued automatically.
6. Update `site.url` / `site.email` in `src/data/site.ts`.

Note: Vercel's Hobby plan is meant for non-commercial use. If that becomes a concern, the same app can be moved to Cloudflare Pages (also free) later.
