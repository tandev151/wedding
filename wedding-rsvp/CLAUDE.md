# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Node & Package Manager

Always run `nvm use` before any command — the project requires **Node 20** (see `.nvmrc`).
Use **pnpm** exclusively; do not use npm or yarn.

```bash
nvm use
pnpm dev         # Next.js dev server → localhost:3002
pnpm build       # Next.js production build
pnpm start       # Start production server
pnpm lint        # ESLint (next lint)
pnpm format      # Prettier
```

## Architecture

**Stack:** Next.js 15 (App Router), React 19, TypeScript, Framer Motion. No Axios — uses native fetch.

```
app/
  layout.tsx               # Root layout: next/font, global CSS
  page.tsx                 # Marketing home page
  not-found.tsx            # Global 404
  [slug]/
    page.tsx               # SSR wedding page — async Server Component
    not-found.tsx          # Invalid slug 404
    loading.tsx            # Suspense skeleton
  api/v1/
    event-summary/route.ts # GET mock handler
    rsvp/route.ts          # POST mock handler

src/
  config/env.ts            # process.env (API_BASE_URL, API_MODE)
  features/
    landing/components/    # 10 section components (.tsx + .module.css each)
    home/                  # HomePage.tsx + HomePage.module.css
    rsvp/
      types.ts             # EventSummary, RsvpPayload, RsvpResponse
      actions/submitRsvp.ts  # 'use server' Server Action
      api/rsvpMockData.ts  # Mock data (getEventSummaryBySlug, buildRsvpResponse)
      api/rsvpServerApi.ts # Server-side fetch (used in [slug]/page.tsx)
  shared/styles/
    tokens.css             # :root CSS variables (--c-*, --sp-*, --font-*)
    foundation.css         # Resets + base styles
    layout.css             # .page-shell, .container, .section-eyebrow, .section-heading
```

## Rendering Strategy

| Component | Type | Reason |
|---|---|---|
| `app/[slug]/page.tsx` | Server (async) | Fetches EventSummary, generates SEO metadata |
| `Navbar`, `SiteFooter` | Server Component | Pure display, no hooks |
| `HeroSection`, `EventInfoSection`, `RsvpSection`, `GiftSection` | `'use client'` | useState / useTransition |
| `CoupleSection`, `VideoSection`, `GalleryPreviewSection`, `LoveStorySection` | `'use client'` | Framer Motion |
| `HomePage` | `'use client'` | Form with alert() |

## Data Flow

1. `GET /[slug]` → `page.tsx` calls `getEventSummaryServer(slug)` (server-side)
2. `getEventSummaryServer` → mock mode: calls `rsvpMockData.ts` directly; real mode: fetches `API_BASE_URL/v1/event-summary`
3. Data passed as props to section components across RSC boundary (all props must be serializable)
4. `RsvpSection` owns form state + calls `submitRsvpAction` Server Action
5. `submitRsvpAction` → mock: uses `rsvpMockData`; real: `fetch POST API_BASE_URL/v1/rsvp`

## Environment

- `API_BASE_URL` — backend URL (default: `http://localhost:3000`)
- `API_MODE` — `mock` (default) or `real`
- All env vars are **server-only** (no `NEXT_PUBLIC_*` needed)
- wedding-be runs on port 3000; this Next.js app runs on port 3002

## Styling Conventions

- Global utilities (`.container`, `.section-eyebrow`, `.section-heading`, `.page-shell`) defined in `layout.css` — use as plain strings in JSX
- Component styles: CSS Modules (`.module.css`) — use `styles['class-name']` notation
- Design tokens (`--c-*`, `--sp-*`) defined in `tokens.css`, available everywhere via `:root`
- Animations: Framer Motion `whileInView` with `useReducedMotion()` guard

## Mock Known Slugs

`tan-phat-anh-thu`, `demo-wedding` — defined in `rsvpMockData.ts`

## Test URLs (dev)

- `http://localhost:3002/tan-phat-anh-thu` — wedding page with mock data
- `http://localhost:3002/` — marketing home page
