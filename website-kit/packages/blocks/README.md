# @web/blocks

Two layers live here — keep them straight:

## 1. Block component library (per-block folders)

`header/`, `hero/`, `features/`, `services/`, `logos/`, `testimonials/`,
`stats/`, `gallery/`, `pricing/`, `faq/`, `cta/`, `contact/`, `footer/`.

Each folder is a presentational block:

- `<Name>.astro` — the component (skeleton).
- `schema.ts` — zod schema for the component's **props** (`<Name>Props`).
- `example.json` — sample props, valid against the schema.
- `README.md` — usage.

Templates compose pages from these components.

## 2. Content + editing model (`src/`)

- `src/schemas.ts` — the persisted content schema (`PagesFile`, `Page`, the
  `Block` union) plus shared primitives (`HrefSchema`, `CtaSchema`).
- `src/registry.ts` — `blockRegistry` with `editable` maps: the allow-list that
  `services/content-assist` uses to decide what may be edited.
- `src/index.ts` — package entry.

This is what `content/pages.json` conforms to and what content-assist reads.

The per-block `schema.ts` (props) and the content model (`src/`) are related but
serve different jobs: props = how a block renders; content model = what is
stored and edited. Component prop schemas import shared primitives from `src/`.
