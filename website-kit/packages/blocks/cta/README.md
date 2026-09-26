# Cta block

## Files

- `Cta.astro` — presentational component (skeleton).
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

TODO: document props and styling hooks.
