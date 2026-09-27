# Website kit

Four customisable Astro website templates with full-width image/video heroes,
responsive navigation, reusable animated sections and a block library.

**Choose one template for each client.** The client generator copies that template
and its required shared packages into an independent folder. You do not need the
other demos, operator portals, or API services to run a client website.

| Template name | Starting point |
| --- | --- |
| `professional` | Studios, consultants and professional firms |
| `hospitality` | Retreats, accommodation and hospitality |
| `services-business` | Local services and bookkeeping |
| `arabian-adventure` | Tours, experiences and adventure businesses |

## Clone only what one template needs

Requirements: Git, Node.js 22 or newer, and pnpm 10.33.0. If pnpm is missing, install
it with `npm install --global pnpm@10.33.0`.

The following example selects **professional**. Replace `professional` in **both**
the sparse-checkout path and the generator command to choose another template.
Replace `Acme Studio` and `acme-studio` with the client's name and folder name.

```sh
# Fetch main without downloading the other templates' file contents.
git clone --branch main --depth 1 --filter=blob:none --sparse \
  https://github.com/cas-pm/web-templates.git website-kit-source
cd website-kit-source

git sparse-checkout set \
  website-kit/templates/professional \
  website-kit/packages \
  website-kit/docs \
  website-kit/tooling/create-client \
  website-kit/tooling/github-actions

# Create a self-contained client folder outside the source checkout.
cd website-kit
node tooling/create-client/create-client.mjs "Acme Studio" \
  --template professional \
  --dir ../../clients/acme-studio

# Only the new client's dependencies need installing.
cd ../../clients/acme-studio
pnpm install
pnpm check
pnpm build
pnpm dev --host 127.0.0.1 --port 3030
```

Open **http://127.0.0.1:3030**. Visit **/blocks/** to browse available sections.
The destination must be empty or not yet exist. The new client does not depend on
keeping `website-kit-source` around, and changes to it do not change the master kit.
The generator creates files, not a Git repository; initialise and publish a separate
client repository when ready. Keep its generated `pnpm-lock.yaml` in that repository.

The template folder alone is not sufficient: it imports `@web/blocks`, `@web/ui`
and other shared packages. The commands above include those dependencies while
leaving the other templates out. Git sparse checkout also retains the root/config
files needed by the generator.

## Copy-and-paste setup prompt

Use this with a coding assistant in the folder where you want to work. Fill in the
brackets. No existing checkout is required.

```text
Create a new client website using https://github.com/cas-pm/web-templates.git,
branch main.

Business name: [BUSINESS NAME]
Template: [professional | hospitality | services-business | arabian-adventure]
Client folder: [DESTINATION PATH]
Pages: [Home, About, Services, Contact, ...]
Brand style and colours: [DETAILS]
Main call to action: [ACTION]
Business facts, services and contact details: [DETAILS]
Logo and approved image/video files: [LOCAL PATHS]
Local port: 3030

Read the repository's root README. Use a shallow, filtered sparse clone that
includes only the selected template, shared packages, docs, create-client tool
and workflow template. Follow the README's sparse-checkout instructions.

Read website-kit/docs/architecture.md and docs/plug-and-play-prompt.md.
Run tooling/create-client/create-client.mjs with my business name, selected
template and destination. Work in the generated client folder. Keep the source
kit unchanged. Do not include optional portal or API modules.

Check Node.js and pnpm, then install the client's dependencies. Customise its
brand settings and content/pages.json. Keep sections, navigation, full-width
image/video heroes and animation settings easy to edit. Use approved facts
and assets; clearly flag missing client information rather than invent it.

Run pnpm check and pnpm build, fix any failures, and review mobile and desktop
layouts. Start the site on my chosen port and give me the local URL, a short
list of editable files, and any remaining client-specific setup.
```

## Clone the whole kit instead

Use this if you want to browse all four templates or maintain your own master kit:

```sh
git clone https://github.com/cas-pm/web-templates.git
cd web-templates/website-kit
pnpm install --frozen-lockfile
```

Run these in separate terminals from `website-kit`:

```sh
pnpm --filter @web/template-professional dev --port 3020
pnpm --filter @web/template-hospitality dev --port 3021
pnpm --filter @web/template-services-business dev --port 3022
pnpm --filter @web/template-arabian-adventure dev --port 3023
```

## Customise and launch

- **Content:** `content/pages.json` contains pages and sections.
- **Brand and navigation:** `content/home.json` for the curated templates;
  `src/lib/site.ts` for services-business.
- **Assets:** add client images, video and logos to `public/`.
- **Themes and motion:** see the [customization guide](website-kit/docs/customization.md).
- **Client workflow:** see the [architecture guide](website-kit/docs/architecture.md)
  and [detailed design prompt](website-kit/docs/plug-and-play-prompt.md).

Business details and some photographs are demo content. Replace them with approved
client content. Forms require a working submission endpoint. Running locally does
not publish a website; hosting, domain connection and deployment are separate.
The copied GitHub workflow checks/builds the site; its deployment step is a placeholder.
