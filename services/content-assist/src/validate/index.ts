import { blockRegistry, parseFieldId, type FieldId } from "@web/blocks/registry";
import type { Page } from "@web/blocks/schemas";
import { isFieldAllowed } from "../fields/index.js";

/**
 * validate/: gate a proposed value before it can be previewed/published.
 * Reuses the block zod schemas (via the registry) plus policy checks:
 *   - field id is in the allow-list (default deny)
 *   - type + maxLength conform to the field policy
 *   - only allowed formatting marks; NO raw HTML/scripts
 *   - link targets (hrefs) are NOT changed by an edit
 */

export interface ValidationError {
  code:
    | "field_not_allowed"
    | "bad_field_id"
    | "too_long"
    | "wrong_type"
    | "html_not_allowed"
    | "formatting_not_allowed"
    | "link_change_not_allowed"
    | "schema_invalid";
  message: string;
}

export interface ValidationResult {
  ok: boolean;
  errors: ValidationError[];
}

export interface ValidateInput {
  page: Page;
  fieldId: FieldId;
  proposedValue: string;
}

const HTML_TAG = /<[^>]+>/;

export function validateProposal(input: ValidateInput): ValidationResult {
  const errors: ValidationError[] = [];
  const parsed = parseFieldId(input.fieldId);

  if (!parsed) {
    return { ok: false, errors: [{ code: "bad_field_id", message: "unparseable field id" }] };
  }
  if (!isFieldAllowed(input.page, input.fieldId)) {
    errors.push({ code: "field_not_allowed", message: `field ${input.fieldId} is not editable` });
    return { ok: false, errors };
  }

  const block = input.page.blocks[parsed.blockIndex];
  if (!block) {
    return { ok: false, errors: [{ code: "bad_field_id", message: "block index out of range" }] };
  }
  const policy = blockRegistry[block.type].editable[parsed.field];
  if (!policy) {
    return { ok: false, errors: [{ code: "field_not_allowed", message: "no policy for field" }] };
  }

  if (input.proposedValue.length > policy.maxLength) {
    errors.push({ code: "too_long", message: `exceeds maxLength ${policy.maxLength}` });
  }
  if (HTML_TAG.test(input.proposedValue)) {
    errors.push({ code: "html_not_allowed", message: "raw HTML/script markup is not allowed" });
  }

  // TODO: parse allowed inline formatting (bold/italic/link) against
  //   policy.allowedFormatting and reject anything else.
  // TODO: extract any link hrefs from proposedValue and confirm they match the
  //   current value's hrefs exactly (link targets must not change).
  // TODO: apply the proposed value to a clone of `block` and run the block's
  //   zod schema (blockRegistry[block.type].schema) — push "schema_invalid" on failure.

  return { ok: errors.length === 0, errors };
}
