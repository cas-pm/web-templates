# Header block

## Files

- `Header.astro` — responsive presentational component.
- `schema.ts` — zod props schema (`HeaderProps`).
- `example.json` — sample props, valid against the schema.

## Usage

```astro
---
import Header from "@web/blocks/header/Header.astro";
import example from "@web/blocks/header/example.json";
---
<Header data={example} />
```

See [the customization guide](../../../docs/customization.md) for theme tokens, motion settings and layout setup. Parse JSON with the exported props schema to apply defaults before rendering.
