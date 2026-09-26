import { PagesFileSchema, type Page } from "@web/blocks/schemas";
import pagesJson from "../../content/pages.json";

/** Parse + validate the content file at build time against the shared schema. */
const pagesFile = PagesFileSchema.parse(pagesJson);

export function getPage(slug: string): Page {
  const page = pagesFile.pages.find((p) => p.slug === slug);
  if (!page) throw new Error(`page not found: ${slug}`);
  return page;
}
