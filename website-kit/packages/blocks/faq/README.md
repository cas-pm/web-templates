# Faq block

accordion + FAQ JSON-LD

## Files

- `Faq.astro` — presentational component (skeleton).
- `schema.ts` — zod props schema (`FaqProps`).
- `example.json` — sample props, valid against the schema.

## Usage

```astro
---
import Faq from "@web/blocks/faq/Faq.astro";
import example from "@web/blocks/faq/example.json";
---
<Faq data={example} />
```

TODO: document props and styling hooks.
