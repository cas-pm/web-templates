# Named website blocks

Twelve theme-aware blocks, previewed in `/blocks/` on every template. The professional library on port 3020 includes a full-width toggle. These use the existing `--mk-*` color, type, and spacing tokens; no extra animation dependency is required.

## Add a block to a curated page

Professional, hospitality, and adventure use `content/pages.json` → `pages[].sections`. Copy a section from `examples.json`, give it a unique `id`, and put it in the desired position. Edit `data` to replace the demo content. The `type` and `data.variant` identify its design; `label` is its human-readable library name.

```json
{
  "id": "rooms",
  "type": "gallery",
  "label": "Gallery · Expanding panels",
  "data": {
    "variant": "expanding-panels",
    "heading": "Stay somewhere different.",
    "intro": "Select a room to explore.",
    "height": 620,
    "durationMs": 700,
    "images": [
      { "src": "/images/suite.jpg", "alt": "Suite overlooking the garden", "title": "Garden suite", "caption": "Sleeps two", "href": "/contact" },
      { "src": "/images/loft.jpg", "alt": "Loft with exposed timber beams", "title": "The loft", "caption": "Sleeps four", "position": "60% 50%" }
    ]
  }
}
```

For direct use in any Astro template (including services-business, whose legacy `blocks[]` format is different):

```astro
---
import Collection from '@web/blocks/collection/Collection.astro';
import section from './my-section.json';
---
<Collection id={section.id} data={section.data} />
```

Include the template's existing DesignSystem/`design.css` so theme tokens are available. Place cinematic heroes outside width-constrained wrappers. The curated renderer does this automatically.

## Variants and editable fields

| Type | Variant | Main settings |
| --- | --- | --- |
| hero | cinematic-reveal | heading, intro, image, optional video URL, cta, overlay (0–.85), durationMs |
| gallery | expanding-panels | heading, intro, images, height (320–1000px), durationMs |
| story | pinned-chapters | heading, intro, chapters: title, body, image |
| projects | hover-preview | heading, intro, projects: image fields, title, caption, category, year, href |
| comparison | before-after | heading, intro, before, after, beforeLabel, afterLabel, initial (0–100) |
| gallery | stacked-photographs | heading, intro, images, durationMs |
| gallery | editorial-mosaic | heading, intro, images (3–7) |
| services | typographic-menu | heading, intro, items: title, description, optional price and link |
| story | image-statement | heading, intro, image, body, optional link |
| details | specification-sheet | heading, intro, image, details: label/value, optional link |
| testimonials | portrait-feature | heading, quote, portrait, name, role |
| contact | final-invitation | heading, intro, cta, details: label/href, note |

Images have `src`, descriptive `alt`, and optional CSS `position` (default `50% 50%`). Gallery photos also have `title`, `caption`, and optional `href`. Links have `label` and `href`. Durations are milliseconds, 100–3000. Required fields, bounds, and defaults are enforced by `schema.ts` at build time.

## Interaction and fallbacks

- Cinematic: widens a crop once when first seen, then brings in the heading. Optional muted video has a play/pause button, pauses offscreen, and does not autoplay under reduced motion. Supply an image even when using video.
- Panels: select by click, touch, or Enter/Space; arrow keys, Home, and End navigate. On phones panels stack vertically.
- Chapters: pinned text on desktop; sequential image/text on phones, reduced-motion devices, or without JavaScript. The original chapter content remains available to screen readers.
- Projects: mouse hover, keyboard focus, or tap selects the image. The separate project link opens the project.
- Comparison: drag anywhere on the image or use the labeled native slider (keyboard arrows/Home/End). Vertical page scrolling remains available on touch. Use two identically framed images; the sample compares monochrome and color, not a claimed renovation.
- Stack: previous/next controls move one photo at a time, announce the active caption, and keep covered links out of the tab order.
- The six static blocks have no entrance or scroll animation.
- With JavaScript disabled, image collections remain readable and comparison images appear sequentially. Reduced motion removes crop/panel/stack animation.

Demo photos use external Unsplash URLs. Replace the stock assets, sample testimonial, contact information, prices, and links with client-approved content. Store client assets under the selected template's `public/images/` for self-hosting. No reference-site media is copied.

The legacy content-assist editing API uses a separate allow-listed schema; these curated blocks are customized through JSON or Astro, not that API.
