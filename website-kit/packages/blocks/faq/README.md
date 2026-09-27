# Faq block

accordion + FAQ JSON-LD

## Files

- `Faq.astro` — responsive presentational component.
- `schema.ts` — zod props schema (`FaqProps`).
- `example.json` — sample props, valid against the schema.

## Usage

```astro
---
import Faq from "@web/blocks/faq/Faq.astro";
import example from "@web/blocks/faq/example.json";
---
<Faq data={example} />
```

See [the customization guide](../../../docs/customization.md) for theme tokens, motion settings and layout setup. Parse JSON with the exported props schema to apply defaults before rendering.
