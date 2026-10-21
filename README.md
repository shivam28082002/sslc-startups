# SSLC Startup — marketing website

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion (LazyMotion).

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build && npm start
```

## Structure

```
src/
  app/                 layout (metadata, JSON-LD), page, sitemap, robots, icons, OG image
    api/inquiry/       POST endpoint for the project-inquiry form
  content/site.ts      ALL copy and data — services, case studies, process, contact details
  lib/                 inquiry submission, prefill signal, site URL, cn()
  components/
    navigation/        sticky glass header + fullscreen mobile menu
    hero/              black hero: wireframe tunnel, headline, quick inquiry form, stats
    work/ why/ services/ faq/ mockups/ contact/ footer/
    assistant/         floating WhatsApp button
    ui/                buttons, reveal, logo, icons, spotlight, magnetic
brand/                 original logo source file
```

Design tokens (colours, type scale, motion, textures) live in `src/app/globals.css` under `@theme`.

## Configuration

Copy `.env.example` to `.env.local` (or set in your host):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production origin, used for canonical URLs, sitemap, Open Graph and JSON-LD. Auto-detected on Vercel. |
| `INQUIRY_WEBHOOK_URL` | Where project inquiries are delivered (JSON POST). Works with Formspree, Zapier, Make, n8n, Slack webhooks or your CRM. |

### Project inquiries

`submitProjectInquiry()` (`src/lib/inquiry.ts`) posts to `/api/inquiry`, which validates the
brief and forwards it to `INQUIRY_WEBHOOK_URL`. **Until that variable is set, nothing is
delivered server-side** — the visitor instead gets a pre-written email to
`business@sslctstartup.com` containing their full brief, so no lead is lost.

## Content still to supply

Everything below is wired to render automatically once filled in `src/content/site.ts`:

- **Real client projects** — add `caseStudies` entries with `kind: "project"` (only verified facts and metrics).
- **Real product screenshots** — the solution-card visuals are illustrative CSS mock-ups (`components/mockups/mockups.tsx`).
- **Social profiles** — `company.social[].href` (LinkedIn, Instagram, GitHub are hidden while empty).

The three "Solution blueprint" cards describe how SSLC builds each class of system; they are not client work.

## Client portal (`/portal`)

Clients sign in at **/portal/login** to see their projects (status, dates, milestones) and payments
(scheduled, due, overdue, paid). SSLC admins manage everything at **/portal/admin**.

- **Database:** Neon Postgres (Vercel Marketplace). Schema in `db/schema.sql`; apply with `npm run db:migrate`.
- **Auth:** email + password (bcrypt), signed HTTP-only session cookie (`AUTH_SECRET`), login throttling,
  sessions revoked on password change. Server code in `src/lib/portal/`, pages in `src/app/portal/`.
- **Admin account:** `npm run portal:admin -- you@sslctstartup.com "Your Name"` prints a temporary password.
- **Clients:** create them in the admin panel — a temporary password is shown once; share it with the client.
- **Payments:** stored in paise; admins mark payments paid (method + UTR). The `gateway*` columns are reserved
  for the upcoming Razorpay/Stripe integration.
- `/portal` is `noindex` and disallowed in robots.txt.
