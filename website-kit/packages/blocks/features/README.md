# Features block

**Variants:** grid, alternating, icon-list

## Files

- `Features.astro` — presentational component (skeleton).
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

TODO: document props and styling hooks.
