# Pricing block

## Files

- `Pricing.astro` — responsive presentational component.
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

See [the customization guide](../../../docs/customization.md) for theme tokens, motion settings and layout setup. Parse JSON with the exported props schema to apply defaults before rendering.
