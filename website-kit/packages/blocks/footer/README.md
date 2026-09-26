# Footer block

## Files

- `Footer.astro` — presentational component (skeleton).
- `schema.ts` — zod props schema (`FooterProps`).
- `example.json` — sample props, valid against the schema.

## Usage

```astro
---
import Footer from "@web/blocks/footer/Footer.astro";
import example from "@web/blocks/footer/example.json";
---
<Footer data={example} />
```

TODO: document props and styling hooks.
