import { z } from "zod";

/**
 * Zod schemas for every block type. These are the single source of truth for
 * what a block's content looks like. content-assist reuses these to validate
 * proposed edits (see services/content-assist/src/validate).
 *
 * Keep these schemas free of any editing/permission concerns — those live in
 * the block registry (registry.ts), which layers `editable` maps on top.
 */

/** Inline formatting we allow inside rich-text fields. No HTML, no scripts. */
export const AllowedFormatting = z.enum(["bold", "italic", "link"]);
export type AllowedFormatting = z.infer<typeof AllowedFormatting>;

/** Absolute URL (http/https/mailto/tel) or a root-relative internal path ("/contact"). */
export const HrefSchema = z
  .string()
  .min(1)
  .refine(
    (v) => v.startsWith("/") || /^(https?|mailto|tel):/.test(v),
    { message: "href must be a root-relative path or an absolute http(s)/mailto/tel URL" },
  );

/** A CTA link. Editing the label is allowed; changing the href is not (see registry). */
export const CtaSchema = z.object({
  label: z.string().min(1).max(60),
  href: HrefSchema,
});
export type Cta = z.infer<typeof CtaSchema>;

export const HeroBlockSchema = z.object({
  type: z.literal("hero"),
  heading: z.string().min(1).max(80),
  subheading: z.string().max(160),
  cta: CtaSchema.optional(),
});
export type HeroBlock = z.infer<typeof HeroBlockSchema>;

export const RichTextBlockSchema = z.object({
  type: z.literal("richText"),
  heading: z.string().max(80).optional(),
  body: z.string().max(2000),
});
export type RichTextBlock = z.infer<typeof RichTextBlockSchema>;

export const ServiceCardBlockSchema = z.object({
  type: z.literal("serviceCard"),
  title: z.string().min(1).max(60),
  description: z.string().max(280),
  cta: CtaSchema.optional(),
});
export type ServiceCardBlock = z.infer<typeof ServiceCardBlockSchema>;

/** Legal blocks (privacy, cookies) — long-form body, needs client legal review. */
export const LegalBlockSchema = z.object({
  type: z.literal("legal"),
  heading: z.string().min(1).max(120),
  body: z.string().max(20000),
  needsLegalReview: z.boolean().default(true),
});
export type LegalBlock = z.infer<typeof LegalBlockSchema>;

export const BlockSchema = z.discriminatedUnion("type", [
  HeroBlockSchema,
  RichTextBlockSchema,
  ServiceCardBlockSchema,
  LegalBlockSchema,
]);
export type Block = z.infer<typeof BlockSchema>;
export type BlockType = Block["type"];

export const PageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  language: z.string().default("en"),
  blocks: z.array(BlockSchema),
});
export type Page = z.infer<typeof PageSchema>;

export const PagesFileSchema = z.object({
  pages: z.array(PageSchema),
});
export type PagesFile = z.infer<typeof PagesFileSchema>;
