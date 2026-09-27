# Contact block

form + WhatsApp/tel/mail tracked

## Files

- `Contact.astro` — responsive presentational component.
- `schema.ts` — zod props schema (`ContactProps`).
- `example.json` — sample props, valid against the schema.

## Usage

```astro
---
import Contact from "@web/blocks/contact/Contact.astro";
import example from "@web/blocks/contact/example.json";
---
<Contact data={example} />
```

See [the customization guide](../../../docs/customization.md) for theme tokens, motion settings and layout setup. Parse JSON with the exported props schema to apply defaults before rendering.
