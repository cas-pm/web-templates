# Website kit architecture

## Choose a starting point

| Folder | Purpose | Content source | Pages |
| --- | --- | --- | --- |
| `templates/services-business` | Service company, Meridian demo | `content/pages.json`, `src/lib/site.ts` | Home, Services, About, Contact, Privacy, Cookies |
| `templates/hospitality` | Retreat or hotel, Stillwater demo | `content/pages.json`, `content/home.json` | Home, Stays, About, Gallery, FAQ, Contact |
| `templates/professional` | Creative / professional practice, Forma demo | same | Home, Services, About, Work, FAQ, Contact |
| `templates/arabian-adventure` | UAE desert travel prospect concept | same | Home, Experiences, About, Gallery, FAQ, Contact |

All templates expose `/blocks/` with a named sidebar. The professional template also keeps `/theme-lab/` for live palette and hero controls. In `content/pages.json`, each page owns an ordered `sections` array; each section has a unique `id`, visible `label`, component `type`, and `data` object. `content/home.json` stores brand metadata and the original home examples. **On the three curated templates, `content/pages.json` is the rendered source of truth.** Update that file when editing website copy. Keep `home.json` for name, description, email and branding. The renderer validates section IDs and component content at build time.

`packages/blocks/shared/CuratedSections.astro` renders curated page sections. Individual reusable UI components live at `packages/blocks/<section>/`. `packages/blocks/src/schemas.ts` and `registry.ts` describe a separate, restricted editable model for the content assistant; this assistant currently targets the services-business pages only. Do not assume the assistant can edit curated page sections. `packages/tokens`, `seo`, `motion`, `analytics` and `ui` hold cross-template concerns. `apps/` and `services/` are optional operator modules; neither is required to run a static website.

## Client workflow

1. Run `node tooling/create-client/create-client.mjs "Client Name" --dir ../client-name --template arabian-adventure` (or another template).
2. Open the new directory, run `pnpm install`, then `pnpm dev`.
3. Browse `/blocks/`; choose and order entries in `content/pages.json`. Change `content/home.json` branding, all images, links and factual claims. For services-business, also change `src/lib/site.ts` and legal drafts.
4. Run `pnpm check` and `pnpm build`. Review every page at desktop and mobile widths. Verify links, image licenses, alt text, SEO titles, contact channels and consent before launch.
5. A preview can run on your own hosting. Production hosting is decided per client; the bundled workflow is a build gate, not a configured deployment.

The Pinterest links in `docs/design-references.md` are moodboard references. Their exact artwork could not be retrieved during this build. Do not copy an image or layout from a pin without permission. The sample photos use remote Unsplash URLs for previews; replace them with licensed, optimized client images before launch.
