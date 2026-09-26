# Testimonials block

Embla slider

## Files

- `Testimonials.astro` — presentational component (skeleton).
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

TODO: document props and styling hooks.
