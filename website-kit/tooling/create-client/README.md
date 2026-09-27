# create-client

Scaffolds a new client website repository from the monorepo templates.

## What it does

1. Creates a new target directory (or repo) for the client.
2. Copies the chosen `templates/<template>` in as the site (Astro static site,
   including `content/pages.json`, the privacy/cookies pages, `fly.toml` and the
   nginx `Dockerfile` for preview deploys). Default `services-business`;
   `hospitality`, `professional` and `arabian-adventure` also available.
3. Copies the shared packages every site needs (`blocks`, `ui`, `seo`,
   `tokens`, `motion`, `analytics`).
4. Copies `docs/seo-content-sheet.{md,csv}` into the client repo.
5. Copies `build-and-deploy.yml` to `.github/workflows/`.
6. Assigns a client package name and, for the service template, a Fly app name.
7. Copies the architecture, reference and prompt guides. The brand settings and demo content must be reviewed and replaced by the operator.

## Optional add-ons (only copied when the module has been sold)

- `--with-growth` — copies the analytics stack into the client repo:
  - `services/insights-api`
  - `apps/insights-portal`
- `--with-assist` — copies the AI content-editing stack into the client repo:
  - `services/content-assist`
  - `apps/content-portal`

Without a flag, the corresponding skeleton is **not** included in the client
repo. This keeps unsold features out of the deliverable.

## Usage

```sh
node tooling/create-client/create-client.mjs <client-name> \
  --dir ../clients/<client-name> \
  [--template services-business|hospitality|professional|arabian-adventure] \
  [--with-growth] \
  [--with-assist]
```

### Options

| Flag | Description |
| --- | --- |
| `--dir <path>` | Target directory for the new client repo (required). |
| `--template <name>` | Starter template: `services-business` (default), `hospitality`, `professional`, `arabian-adventure`. |
| `--with-growth` | Include the analytics stack (insights-api + insights-portal). |
| `--with-assist` | Include the content-assist stack (content-assist + content-portal). |
| `--fly-app <name>` | Fly.io app name for preview deploys (default derived from client name). |
| `--dry-run` | Print planned actions without writing anything. |
| `--help` | Show usage. |
