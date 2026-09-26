# Hero block

**Variants:** split, centered, full-bleed, video

## Files

- `Hero.astro` — presentational component (skeleton).
- `schema.ts` — zod props schema (`HeroProps`).
- `example.json` — sample props, valid against the schema.

## Usage

```astro
---
import Hero from "@web/blocks/hero/Hero.astro";
import example from "@web/blocks/hero/example.json";
---
<Hero data={example} />
```

TODO: document props and styling hooks.
