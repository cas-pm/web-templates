# Footer block

## Files

- `Footer.astro` — responsive presentational component.
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

See [the customization guide](../../../docs/customization.md) for theme tokens, motion settings and layout setup. Parse JSON with the exported props schema to apply defaults before rendering.
