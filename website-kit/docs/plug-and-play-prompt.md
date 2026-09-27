# Client site prompt — copy and fill in the brackets

> You are working in this Astro website kit. Read `docs/architecture.md`, `docs/design-references.md` and the chosen template's `content/pages.json` first. Build a complete [BUSINESS NAME] site using `templates/[TEMPLATE]` and the shared block components. Audience: [AUDIENCE]. Main action: [CTA]. Brand voice: [VOICE]. Palette: [COLOURS]. Pages: [PAGES]. Approved claims: [CLAIMS]. Services/experiences: [LIST]. Licensed assets: [LOCAL FILE PATHS]. Contact details: [CONTACT]. SEO search themes: [KEYWORDS].
>
> Create a new client copy with `node tooling/create-client/create-client.mjs "[BUSINESS NAME]" --dir [DESTINATION] --template [TEMPLATE]`. Do not edit the source demo. Edit the new client's brand config and `content/pages.json`. Keep each section's `id`, `label`, `type`, `data` obvious; choose and reorder shared sections (hero, services, editorial, gallery, features, testimonials, stats, FAQ, CTA, contact). Use `/blocks/` to inspect section names. Give every page a clear heading, useful original copy, relevant CTA, meta description, and correct links. Do not invent customer reviews, awards, statistics, prices, licenses or safety claims. Use approved local assets only, with meaningful alt text, responsive crop and readable overlay. Avoid a form unless a working backend and privacy flow are provided; use email or phone links. Run `pnpm check` and `pnpm build`, then review desktop and mobile pages and report what remains client-dependent.

## Section snippets

- **Hero · Immersive:** `type: "hero"` — heading, subheading, CTA, media and overlay.
- **Offerings · Three cards:** `type: "services"` — short, scannable options with real links.
- **Story · Editorial split:** `type: "editorial"` — two paragraphs and a distinct point of view.
- **Gallery · Horizontal story:** `type: "gallery"` — licensed images with descriptive alt text.
- **Benefits · Icon grid:** `type: "features"` — specific benefits, no unsupported metrics.
- **Journey · Three steps:** `type: "services"` — use for an explainable process.
- **Questions · Accordion:** `type: "faq"` — precise answers to real customer questions.
- **Action · Invitation:** `type: "cta"` — one next step with a working link.

See the actual data shape in each template's `content/pages.json`; paste a whole section entry and edit it rather than guessing a schema.
