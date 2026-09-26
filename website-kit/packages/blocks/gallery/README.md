# Gallery block

## Files

- `Gallery.astro` — presentational component (skeleton).
- `schema.ts` — zod props schema (`GalleryProps`).
- `example.json` — sample props, valid against the schema.

## Usage

```astro
---
import Gallery from "@web/blocks/gallery/Gallery.astro";
import example from "@web/blocks/gallery/example.json";
---
<Gallery data={example} />
```

TODO: document props and styling hooks.
