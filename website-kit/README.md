# Website kit workspace

For clone commands, selecting only one template and the reusable client-setup
prompt, start with the [repository README](../README.md).

## Templates

| Template | Demo | Pages |
| --- | --- | --- |
| `services-business` | Meridian bookkeeping | Home, Services, About, Contact, Privacy, Cookies |
| `hospitality` | Stillwater retreat | Home, Stays, About, Gallery, FAQ, Contact |
| `professional` | Forma design studio | Home, Services, About, Work, FAQ, Contact |
| `arabian-adventure` | UAE desert prospect concept | Home, Experiences, About, Gallery, FAQ, Contact |

Each template includes a `/blocks/` catalogue. Curated templates render
`content/pages.json` and use `content/home.json` for brand details. The services
business uses the restricted editor model with `src/lib/site.ts` for branding.

## Folder map

- `templates/`: the four client starters.
- `packages/blocks/`: reusable Astro sections, prop schemas, sample data and shared layouts.
- `packages/motion/`: reveal and slider helpers.
- `packages/ui/`, `tokens/`, `seo/`, `analytics/`: shared supporting packages.
- `tooling/create-client/`: generates an independent client workspace.
- `apps/` and `services/`: optional portal/API scaffolds, not required for static sites.
- `docs/`: architecture, customization, design references and client prompts.

## Commands

Run from this directory:

```sh
pnpm install --frozen-lockfile
pnpm --filter @web/template-professional dev --port 3020
pnpm --filter './templates/**' check
pnpm --filter './templates/**' build
pnpm -r typecheck
pnpm --filter @web/blocks test:examples
node tooling/validate-templates.mjs

node tooling/create-client/create-client.mjs "Client Name" \
  --dir ../clients/client --template professional
```

The client generator includes the chosen template and its required shared
packages. Add `--with-growth` or `--with-assist` only when those optional scaffold
modules are needed. Replace demo content and assets before launch.

Component prop schemas and the restricted content-assist schemas serve different
purposes; see [the blocks README](packages/blocks/README.md).

## Guides

- [Architecture and editing workflow](docs/architecture.md)
- [Customization, full-width heroes and navigation](docs/customization.md)
- [Reusable client design prompt](docs/plug-and-play-prompt.md)
- [Design references](docs/design-references.md)
