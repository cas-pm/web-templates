# Contact block

form + WhatsApp/tel/mail tracked

## Files

- `Contact.astro` — presentational component (skeleton).
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

TODO: document props and styling hooks.
