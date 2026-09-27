# Testimonials block

Embla slider

## Files

- `Testimonials.astro` — responsive presentational component.
- `schema.ts` — zod props schema (`TestimonialsProps`).
- `example.json` — sample props, valid against the schema.

## Usage

```astro
---
import Testimonials from "@web/blocks/testimonials/Testimonials.astro";
import example from "@web/blocks/testimonials/example.json";
---
<Testimonials data={example} />
```

See [the customization guide](../../../docs/customization.md) for theme tokens, motion settings and layout setup. Parse JSON with the exported props schema to apply defaults before rendering.
