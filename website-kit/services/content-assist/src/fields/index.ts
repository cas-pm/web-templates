import { blockRegistry, makeFieldId, type EditableField, type FieldId } from "@web/blocks/registry";
import type { Page } from "@web/blocks/schemas";

/**
 * fields/: builds the allowed field list for a given page + language from the
 * block registry's `editable` maps. This is the allow-list every other module
 * (propose, validate, publish) is constrained by.
 */

export interface AllowedField {
  id: FieldId;
  slug: string;
  blockIndex: number;
  blockType: string;
  field: string;
  policy: EditableField;
  /** Current value, for display in the field picker. */
  currentValue: string;
}

/** Enumerate every editable field on a page according to the registry. */
export function listAllowedFields(page: Page): AllowedField[] {
  const out: AllowedField[] = [];
  page.blocks.forEach((block, blockIndex) => {
    const entry = blockRegistry[block.type];
    for (const [field, policy] of Object.entries(entry.editable)) {
      out.push({
        id: makeFieldId(page.slug, blockIndex, field),
        slug: page.slug,
        blockIndex,
        blockType: block.type,
        field,
        policy,
        // TODO: resolve dotted `field` path (e.g. "cta.label") against block.
        currentValue: "",
      });
    }
  });
  return out;
}

/** True if the given field id is editable per the registry. Default deny. */
export function isFieldAllowed(page: Page, id: FieldId): boolean {
  return listAllowedFields(page).some((f) => f.id === id);
}
