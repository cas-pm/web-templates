# Pricing block

## Files

- `Pricing.astro` — presentational component (skeleton).
- `schema.ts` — zod props schema (`PricingProps`).
- `example.json` — sample props, valid against the schema.

## Usage

```astro
---
import Pricing from "@web/blocks/pricing/Pricing.astro";
import example from "@web/blocks/pricing/example.json";
---
<Pricing data={example} />
```

TODO: document props and styling hooks.
