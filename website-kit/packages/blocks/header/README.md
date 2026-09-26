# Header block

## Files

- `Header.astro` — presentational component (skeleton).
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

TODO: document props and styling hooks.
