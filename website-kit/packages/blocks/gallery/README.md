# Gallery blocks

Keep `type: "gallery"` for every gallery section. Choose its design with
`data.variant`; give the section an obvious `label` and unique `id`.

| Label | Variant | Behaviour |
| --- | --- | --- |
| Gallery · Horizontal story | `horizontal` (default) | Horizontal scroll-snap images and captions. |
| Gallery · Vertical showcase | `vertical-showcase` | A large centered image, smaller neighbors above/below, and titles moving with each image. |

Both variants appear in every template's `/blocks/` catalogue. Direct link to the
new one: `/blocks/#gallery-vertical-showcase`. Existing page galleries keep their
current design. See `variants.ts` for the named collection and `library.ts` for
catalogue examples. New gallery styles should get their own variant and renderer,
not a new block type.

## Add to a curated page

Copy this into a page's `sections` in `content/pages.json`:

```json
{
  "id": "project-gallery",
  "label": "Gallery · Vertical showcase",
  "type": "gallery",
  "data": {
    "variant": "vertical-showcase",
    "heading": "Selected projects",
    "autoplay": false,
    "intervalMs": 4000,
    "transitionMs": 700,
    "height": 680,
    "inactiveScale": 0.68,
    "images": [
      { "src": "/img/project-one.jpg", "alt": "A house beside a lake", "title": "The lakeside house" },
      { "src": "/img/project-two.jpg", "alt": "A bright open-plan studio", "title": "Room to gather", "href": "/contact" }
    ]
  }
}
```

Replace the example paths with your files. `title` falls back to `alt`; `href` is
optional. `height` is 420–1000px; mobile caps the stage at 580px. `inactiveScale`
(0.4–0.9) sets the neighboring image size. `transitionMs` controls arrow/autoplay
movement (200–2000ms), while native wheel/touch scrolling stays under user control.
`intervalMs` is the autoplay interval (2000–20000ms). Use an interval longer than
the transition duration.

The vertical gallery supports wheel/touch scrolling, keyboard arrows, previous/next
buttons, optional autoplay, and a visible pause button. Autoplay pauses on hover,
keyboard focus, when offscreen, and when the document is hidden. Reduced motion
uses instant selection changes and disables autoplay and image scaling. Without
JavaScript the gallery stays scrollable and all original titles are visible.

For services-business (which uses the older content model), import the component
into an Astro page rather than adding an unsupported `gallery` block to its JSON:

```astro
---
import Gallery from '@web/blocks/gallery/Gallery.astro';
import { GalleryPropsSchema } from '@web/blocks/gallery/schema';
import data from '../content/my-gallery.json';
---
<Gallery id="project-gallery" data={GalleryPropsSchema.parse(data)} />
```

Include `DesignSystem.astro` in the layout as described in the
[customization guide](../../../docs/customization.md).

## Reference

Motion/composition reference: https://www.pinterest.com/pin/5840674512510770/
Inspected as a short video: vertically moving project images, center-image scaling,
and accompanying project titles. Implementation is original browser code; no
reference photos, video, brand text or assets are bundled.
