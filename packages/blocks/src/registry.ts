import type { z } from "zod";
import {
  type AllowedFormatting,
  type BlockType,
  HeroBlockSchema,
  LegalBlockSchema,
  RichTextBlockSchema,
  ServiceCardBlockSchema,
} from "./schemas.js";

/**
 * Editing policy for a single field within a block. content-assist reads these
 * maps to build the allow-list of what an editor (human or AI-assisted) may
 * change. If a field is not present in a block's `editable` map, it cannot be
 * edited — default deny.
 */
export interface EditableField {
  /** Field key within the block object, e.g. "heading" or "cta.label". */
  readonly field: string;
  /** Zod type kind for quick validation dispatch in content-assist. */
  readonly kind: "text" | "richText";
  readonly maxLength: number;
  /** Formatting marks permitted inside the value (richText only). */
  readonly allowedFormatting: readonly AllowedFormatting[];
  /** Whether changing this field requires a human legal review before publish. */
  readonly requiresLegalReview?: boolean;
}

export interface BlockRegistryEntry {
  readonly type: BlockType;
  readonly schema: z.ZodTypeAny;
  /** Map of editable field key -> policy. Fields absent here are locked. */
  readonly editable: Readonly<Record<string, EditableField>>;
}

/**
 * The block registry. Note that CTA `href` is intentionally NOT editable —
 * content-assist must never let an AI change link targets (see validate/).
 */
export const blockRegistry: Readonly<Record<BlockType, BlockRegistryEntry>> = {
  hero: {
    type: "hero",
    schema: HeroBlockSchema,
    editable: {
      heading: { field: "heading", kind: "text", maxLength: 80, allowedFormatting: [] },
      subheading: { field: "subheading", kind: "text", maxLength: 160, allowedFormatting: [] },
      "cta.label": { field: "cta.label", kind: "text", maxLength: 60, allowedFormatting: [] },
    },
  },
  richText: {
    type: "richText",
    schema: RichTextBlockSchema,
    editable: {
      heading: { field: "heading", kind: "text", maxLength: 80, allowedFormatting: [] },
      body: {
        field: "body",
        kind: "richText",
        maxLength: 2000,
        allowedFormatting: ["bold", "italic", "link"],
      },
    },
  },
  serviceCard: {
    type: "serviceCard",
    schema: ServiceCardBlockSchema,
    editable: {
      title: { field: "title", kind: "text", maxLength: 60, allowedFormatting: [] },
      description: { field: "description", kind: "text", maxLength: 280, allowedFormatting: [] },
      "cta.label": { field: "cta.label", kind: "text", maxLength: 60, allowedFormatting: [] },
    },
  },
  legal: {
    type: "legal",
    schema: LegalBlockSchema,
    editable: {
      heading: { field: "heading", kind: "text", maxLength: 120, allowedFormatting: [], requiresLegalReview: true },
      body: {
        field: "body",
        kind: "richText",
        maxLength: 20000,
        allowedFormatting: ["bold", "italic", "link"],
        requiresLegalReview: true,
      },
    },
  },
};

/** Stable identifier for a single editable field on a page: "<slug>#<blockIndex>.<field>". */
export type FieldId = string;

export function makeFieldId(slug: string, blockIndex: number, field: string): FieldId {
  return `${slug}#${blockIndex}.${field}`;
}

export interface ParsedFieldId {
  slug: string;
  blockIndex: number;
  field: string;
}

export function parseFieldId(id: FieldId): ParsedFieldId | null {
  const hashIdx = id.indexOf("#");
  const dotIdx = id.indexOf(".", hashIdx);
  if (hashIdx < 0 || dotIdx < 0) return null;
  const slug = id.slice(0, hashIdx);
  const blockIndex = Number(id.slice(hashIdx + 1, dotIdx));
  const field = id.slice(dotIdx + 1);
  if (!Number.isInteger(blockIndex) || blockIndex < 0 || field.length === 0) return null;
  return { slug, blockIndex, field };
}
