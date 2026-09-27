# Stats block

count-up on reveal

## Files

- `Stats.astro` — responsive presentational component.
- `schema.ts` — zod props schema (`StatsProps`).
- `example.json` — sample props, valid against the schema.

## Usage

```astro
---
import Stats from "@web/blocks/stats/Stats.astro";
import example from "@web/blocks/stats/example.json";
---
<Stats data={example} />
```

See [the customization guide](../../../docs/customization.md) for theme tokens, motion settings and layout setup. Parse JSON with the exported props schema to apply defaults before rendering.
