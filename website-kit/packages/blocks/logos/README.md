# Logos block

**Variants:** scroll-snap, marquee

## Files

- `Logos.astro` — responsive presentational component.
- `schema.ts` — zod props schema (`LogosProps`).
- `example.json` — sample props, valid against the schema.

## Usage

```astro
---
import Logos from "@web/blocks/logos/Logos.astro";
import example from "@web/blocks/logos/example.json";
---
<Logos data={example} />
```

See [the customization guide](../../../docs/customization.md) for theme tokens, motion settings and layout setup. Parse JSON with the exported props schema to apply defaults before rendering.
