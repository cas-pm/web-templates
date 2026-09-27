# Customising the website kit

## Start with a template

From `website-kit`:

```sh
pnpm --filter @web/template-professional dev
# or @web/template-hospitality / @web/template-services-business
```

The professional template includes `/blocks`: a live catalogue with accent colour,
corner radius, entrance speed, replay and CSS download controls. The controls affect
only the current preview; download the CSS to keep your settings. Example figures,
prices and testimonials are demonstration content, not business claims.

## Edit content

- Professional: `templates/professional/content/home.json`
- Hospitality: `templates/hospitality/content/home.json`
- Services business: `templates/services-business/content/pages.json`
- Meridian navigation/contact details: `templates/services-business/src/lib/site.ts`

Change headings, paragraphs, CTA labels/URLs, service items, images and FAQ answers
in those files. Professional/hospitality also expose the header CTA as `navCta`.
Reorder or remove sections in the template's `src/pages/index.astro`.
The services template uses the existing `blocks` array to determine section order.

Professional artwork lives in `public/img/`. Hospitality currently uses remotely
hosted Unsplash sample photos; replace their URLs with your own images under
`public/img/` for a self-contained deployment. Add useful `mediaAlt` text to a hero
image that communicates information; leave decorative images empty.

## Theme every section together

The shared defaults are in `packages/blocks/shared/design.css`.
The professional and hospitality palettes are in `shared/TemplateLayout.astro`.
Add overrides after the shared stylesheet (including downloaded `theme.css`):

```css
.mk-site[data-theme], .mk-site {
  --mk-paper: #f3f5ef;
  --mk-ink: #263f32;
  --mk-muted: #586d60;
  --mk-accent: #365c48;
  --mk-on-accent: #ffffff;
  --mk-surface: #e1e8dc;
  --mk-line: #cbd6c8;
  --mk-radius: 12px;
  --mk-space: clamp(4rem, 8vw, 8rem);
  --mk-duration: 800ms;
  --mk-heading: "Palatino Linotype", Palatino, serif;
  --mk-body: "Avenir Next", "Segoe UI", sans-serif;
}
```

`--mk-duration` controls entrance and count-up duration, in milliseconds. Keep text
and button colours readable against their backgrounds. The preview chooses black
or white button text automatically for your selected accent colour.

For per-section tuning, put custom properties on an enclosing element:

```astro
<div style="--mk-radius: 32px; --mk-duration: 1200ms">
  <Gallery data={gallery} />
</div>
```

## Use a block on another page

Load `DesignSystem` once in your layout's head and put `mk-site` on the body.
The `mk-shell` class controls content width and horizontal gutters. Import the
component and parse editable data with its accompanying schema:

```astro
---
import DesignSystem from '@web/blocks/shared/DesignSystem.astro';
import Services from '@web/blocks/services/Services.astro';
import { ServicesPropsSchema } from '@web/blocks/services/schema';
import content from '../content/services.json';
const services = ServicesPropsSchema.parse(content);
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Our services</title>
    <DesignSystem />
  </head>
  <body class="mk-site">
    <main class="mk-shell"><Services id="services" data={services} /></main>
  </body>
</html>
```

All 13 components accept `data` and an optional section `id`.
Each folder contains the prop schema and example JSON.

| Block | Behaviour / options |
| --- | --- |
| Hero | Split, centered, full-bleed or video; entrance and image reveal. Full-screen video has play/pause controls; autoplay is opt-in. |
| Services | Accessible expandable details; optional eyebrow and intro. |
| Features | Grid, alternating rows or icon-list layouts. Icons are text/glyphs, not icon-library identifiers. |
| Gallery | Responsive horizontal scroll-snap gallery; keyboard and touch scrolling, image reveal. |
| Testimonials | Scroll-snap quotes; previous/next controls and position indicator, no autoplay. |
| Stats | Once-per-view count-up; preserves numeric precision and final values. |
| Logos | Static scroll-snap or continuous marquee with pause, hover/focus pause. |
| Pricing | Responsive plans and optional featured plan. |
| FAQ | Native keyboard-accessible details with opening animation; optional escaped FAQ JSON-LD. |
| CTA | Theme-aware heading, body and action. |
| Contact | Email, phone and WhatsApp links; optional native POST form. |
| Header | Configurable sticky navigation, active links, mobile menu and CTA. |
| Footer | Link columns, legal links and copyright. |

The contact form renders only when `formAction` is supplied. It needs an actual
form-processing endpoint; the kit does not add a submission backend. Demo contact
addresses use `.example` and must be replaced before launch.

## Motion and accessibility

The visual components use native browser animation and scrolling APIs; no GSAP or
carousel dependency is required. Content remains readable with JavaScript disabled.
The system respects `prefers-reduced-motion`, includes focus rings, and makes
accordions and horizontal scrollers keyboard accessible. Add `data-motion-disabled`
to the `.mk-site` body to disable motion for that page.

`@web/motion` separately provides `initReveal` and `createSlider` for custom
components. Both return cleanup functions/methods. For an autoplay custom slider,
provide a visible pause control; the supplied testimonial block never autoplays.
GSAP presets remain configuration objects for consumers that choose to add GSAP.

The existing content-assist permissions and content model remain separate from
component props. Professional/hospitality JSON editing is file-based; it is not
wired to the content-assist portal.

## Verify changes

```sh
pnpm --filter './templates/**' build
pnpm --filter './templates/**' check
pnpm -r typecheck
pnpm --filter @web/blocks test:examples
```

## Full-width heroes and navigation

Every homepage now uses an edge-to-edge hero. `.mk-page` leaves hero media
unconstrained; the remaining sections use `--mk-content-width` (1600px by default)
and `--mk-gutter`. Edit those variables to make the rest of the page wider or tighter.

Professional and hospitality settings live in `content/home.json`. Meridian hero
settings live in the home block in `content/pages.json` and its navigation in
`src/lib/site.ts`. Example hero settings:

```json
{
  "variant": "full-bleed",
  "heading": "Somewhere to simply be.",
  "media": "/img/your-landscape.jpg",
  "mediaAlt": "Your image description",
  "height": 100,
  "overlay": 0.55,
  "align": "left",
  "mediaPosition": "center",
  "cta": { "label": "Explore", "href": "#services" },
  "scrollLink": { "label": "Discover more", "href": "#services" }
}
```

- `height`: 50–120 viewport units; 100 makes the media a full viewport tall; the navigation remains above it.
  Content and mobile minimum heights take priority so text never gets clipped.
- `overlay`: 0–0.9, the dark shade that keeps text readable over your media.
- `align`: `left` or `center`.
- `mediaPosition`: `center`, `top`, `bottom`, `left`, `right`, or a corner such as
  `top right`. This determines which part stays visible when the media is cropped.
- `variant`: `full-bleed` for a full-screen image; `video` for full-screen footage.
  `split` and `centered` remain available for other page types.
- `secondaryCta` and `eyebrow` are optional.

For video, set `media` to an MP4/WebM URL, provide a `poster` image, and choose
`autoplay` and `loop`. Background video is muted and has a visible play/pause
button. Autoplay is opt-in, respects reduced-motion preferences, and safely falls
back to manual playback if the browser blocks it. Without JavaScript, native video
controls remain available. Use decorative footage; put meaningful information in
the accompanying page text. The `/blocks#preview-video` example includes original
local studio artwork rendered into a six-second loop, so it needs no external host.

Configure the professional/hospitality navigation in JSON:

```json
{
  "links": [
    { "label": "Our approach", "href": "#services" },
    { "label": "Projects", "href": "#gallery" },
    { "label": "Contact", "href": "#contact" }
  ],
  "navigation": {
    "sticky": true,
    "menuLabel": "Menu",
    "closeLabel": "Close"
  },
  "navCta": { "label": "Let’s talk", "href": "#contact" }
}
```

Set `navigation.logoImage` to an optional logo URL. Brand text comes from `name`.
Links can target page sections, other pages or external URLs. The header marks the
current page or section, becomes a keyboard-accessible menu on mobile, and retains
visible links without JavaScript. The mobile menu is a nonmodal dropdown: Escape
returns focus to its button; leaving it or selecting a link closes it.

The block-library controls also adjust hero height, shading and crop position.
Downloaded CSS includes those hero settings as explicit overrides of JSON values.
Both professional and hospitality use sample remote hero photographs; replace
them with local client assets for a self-contained site.

## Named gallery variants

Gallery styles now have stable names and IDs: **Gallery · Horizontal story**
(`horizontal`) and **Gallery · Vertical showcase** (`vertical-showcase`). Each
template's `/blocks/` library lists them separately. Change `data.variant` to choose
the gallery, retaining `type: "gallery"` and a unique section `id`.

See [the gallery guide](../packages/blocks/gallery/README.md) for copyable JSON,
image titles, animation timing, sizing, autoplay and adding new named variants.

### Twelve additional named blocks

The library now includes Cinematic reveal, Expanding panels, Pinned chapters, Hover preview, Before / after, Stacked photographs, Editorial mosaic, Typographic menu, Image and statement, Specification sheet, Portrait feature, and Final invitation. See [the block collection guide](../packages/blocks/collection/README.md) and its copyable `examples.json` for settings and use in a client template.
