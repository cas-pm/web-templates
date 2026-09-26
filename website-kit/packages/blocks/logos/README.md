# Logos block

**Variants:** scroll-snap, marquee

## Files

- `Logos.astro` — presentational component (skeleton).
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

TODO: document props and styling hooks.
