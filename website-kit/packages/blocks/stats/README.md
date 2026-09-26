# Stats block

count-up on reveal

## Files

- `Stats.astro` — presentational component (skeleton).
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

TODO: document props and styling hooks.
