# Services block

## Files

- `Services.astro` — responsive presentational component.
- `schema.ts` — zod props schema (`ServicesProps`).
- `example.json` — sample props, valid against the schema.

## Usage

```astro
---
import Services from "@web/blocks/services/Services.astro";
import example from "@web/blocks/services/example.json";
---
<Services data={example} />
```

See [the customization guide](../../../docs/customization.md) for theme tokens, motion settings and layout setup. Parse JSON with the exported props schema to apply defaults before rendering.
