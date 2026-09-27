# Features block

**Variants:** grid, alternating, icon-list

## Files

- `Features.astro` — responsive presentational component.
- `schema.ts` — zod props schema (`FeaturesProps`).
- `example.json` — sample props, valid against the schema.

## Usage

```astro
---
import Features from "@web/blocks/features/Features.astro";
import example from "@web/blocks/features/example.json";
---
<Features data={example} />
```

See [the customization guide](../../../docs/customization.md) for theme tokens, motion settings and layout setup. Parse JSON with the exported props schema to apply defaults before rendering.
