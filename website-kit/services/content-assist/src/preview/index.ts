import type { FieldId } from "@web/blocks/registry";
import type { Page } from "@web/blocks/schemas";

/**
 * preview/: return old vs new value plus a rendered preview of the affected
 * block, so an editor can eyeball the change before publishing.
 */

export interface PreviewInput {
  page: Page;
  fieldId: FieldId;
  proposedValue: string;
}

export interface PreviewResult {
  fieldId: FieldId;
  oldValue: string;
  newValue: string;
  /** Rendered HTML of the block with the proposed value applied (sanitized). */
  renderedHtml: string;
}

export function buildPreview(_input: PreviewInput): PreviewResult {
  // TODO: read the current value at fieldId, apply proposedValue to a clone of
  // the block, and render it with the shared block renderer (sanitized output).
  throw new Error("not implemented");
}
