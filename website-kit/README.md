# website-kit

Monorepo (pnpm workspace) for building and operating client websites.

## Folder map

```
website-kit/
├─ packages/
│  ├─ blocks/          Block component library + the editable content model
│  │  ├─ header/  hero/  features/  services/  logos/  testimonials/
│  │  ├─ stats/  gallery/  pricing/  faq/  cta/  contact/  footer/
│  │  │     each: <Name>.astro · schema.ts · example.json · README.md
│  │  └─ src/          schemas.ts (content model) · registry.ts (editable maps)
│  ├─ motion/          reveal.ts · slider.ts · gsap-presets.ts
│  ├─ seo/             Seo.astro · jsonld/ · sitemap.ts
│  ├─ tokens/          base.ts · themes/ (default, dark)
│  ├─ analytics/       Gtm.astro · events.ts · consent.ts
│  └─ ui/              Button.astro · Card.astro · Section.astro
├─ templates/
│  ├─ services-business/   reference starter (fully wired: pages.json, privacy,
│  │                       cookies, fly.toml, Dockerfile)
│  ├─ hospitality/
│  └─ professional/
├─ apps/               operator UIs (only shipped when the module is sold)
│  ├─ insights-portal/     consumes services/insights-api
│  └─ content-portal/      consumes services/content-assist
├─ services/
│  ├─ insights-api/    Hono + GA4 Data API (analytics)
│  └─ content-assist/  AI propose → validate → publish → deploy (content editing)
├─ tooling/
│  ├─ github-actions/  build-and-deploy.yml template
│  └─ create-client/   copy a template + shared packages into a new client repo
└─ docs/               seo-content-sheet.{md,csv}
```

## Status

Everything here is a **skeleton**: typed interfaces + TODOs, not full
implementations. It compiles/type-checks:

- `pnpm -r typecheck` — all TS packages/services.
- `pnpm --filter <astro project> check` — Astro projects (`astro check`).

## Commands

```sh
pnpm install
pnpm -r typecheck
pnpm --filter @web/template-services-business build

# Scaffold a client repo:
node tooling/create-client/create-client.mjs "Client Name" \
  --dir ../clients/client --template services-business [--with-growth] [--with-assist]
```

## Two things to know about `packages/blocks`

It currently holds **two** models (see `packages/blocks/README.md`):

1. The **component library** (per-block folders) — what renders on the page.
2. The **content model** (`src/schemas.ts` + `src/registry.ts`) — what
   `content/pages.json` stores and what `content-assist` is allowed to edit.

These only overlap on `hero` today. See the open question in the project notes
about whether to unify them.
