# Services block

## Files

- `Services.astro` — presentational component (skeleton).
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

TODO: document props and styling hooks.
