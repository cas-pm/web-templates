# Cta block

## Files

- `Cta.astro` — responsive presentational component.
- `schema.ts` — zod props schema (`CtaProps`).
- `example.json` — sample props, valid against the schema.

## Usage

```astro
---
import Cta from "@web/blocks/cta/Cta.astro";
import example from "@web/blocks/cta/example.json";
---
<Cta data={example} />
```

See [the customization guide](../../../docs/customization.md) for theme tokens, motion settings and layout setup. Parse JSON with the exported props schema to apply defaults before rendering.
