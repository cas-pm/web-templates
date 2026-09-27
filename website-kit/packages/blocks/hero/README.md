# Hero block

**Variants:** split, centered, full-bleed, video

## Files

- `Hero.astro` — responsive presentational component.
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

See [the customization guide](../../../docs/customization.md) for theme tokens, motion settings and layout setup. Parse JSON with the exported props schema to apply defaults before rendering.
