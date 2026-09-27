import { z } from "zod";
import { HeroPresentationFields } from "../shared/hero-options.js";

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

/** Absolute URL (http/https/mailto/tel) a same-page fragment, or a root-relative internal path ("/contact"). */
export const HrefSchema = z
  .string()
  .min(1)
  .refine(
    (v) => v.startsWith("/") || /^#[^\s]+$/.test(v) || /^(https?|mailto|tel):/.test(v),
    { message: "href must be a fragment, root-relative path or an absolute http(s)/mailto/tel URL" },
  );

/** A CTA link. Editing the label is allowed; changing the href is not (see registry). */
export const CtaSchema = z.object({
  label: z.string().min(1).max(60),
  href: HrefSchema,
});
export type Cta = z.infer<typeof CtaSchema>;

export const HeroBlockSchema = z.object({
  ...HeroPresentationFields,
  type: z.literal("hero"),
  heading: z.string().min(1).max(120),
  subheading: z.string().max(220),
  cta: CtaSchema.optional(),
  /** Optional secondary link rendered beside the primary CTA. */
  secondaryCta: CtaSchema.optional(),
  /** Path to a hero image under public/ (e.g. "/img/hero.jpg"). */
  image: z.string().optional(),
  eyebrow: z.string().max(60).optional(),
});
export type HeroBlock = z.infer<typeof HeroBlockSchema>;

export const RichTextBlockSchema = z.object({
  type: z.literal("richText"),
  eyebrow: z.string().max(60).optional(),
  heading: z.string().max(120).optional(),
  /** Body paragraphs. Each string is one paragraph. */
  body: z.array(z.string().max(1200)).min(1),
});
export type RichTextBlock = z.infer<typeof RichTextBlockSchema>;

export const ServiceCardBlockSchema = z.object({
  type: z.literal("serviceCard"),
  title: z.string().min(1).max(60),
  description: z.string().max(280),
  cta: CtaSchema.optional(),
});
export type ServiceCardBlock = z.infer<typeof ServiceCardBlockSchema>;

/** A grid of services with an optional intro. */
export const ServiceItemSchema = z.object({
  title: z.string().min(1).max(60),
  description: z.string().max(300),
  href: HrefSchema.optional(),
});
export type ServiceItem = z.infer<typeof ServiceItemSchema>;

export const ServicesBlockSchema = z.object({
  type: z.literal("services"),
  eyebrow: z.string().max(60).optional(),
  heading: z.string().max(120).optional(),
  intro: z.string().max(300).optional(),
  items: z.array(ServiceItemSchema).min(1),
});
export type ServicesBlock = z.infer<typeof ServicesBlockSchema>;

/** A call-to-action band. */
export const CtaBlockSchema = z.object({
  type: z.literal("cta"),
  heading: z.string().min(1).max(120),
  body: z.string().max(300).optional(),
  cta: CtaSchema,
});
export type CtaBlock = z.infer<typeof CtaBlockSchema>;

/** FAQ list (also a good candidate for FAQPage JSON-LD via @web/seo). */
export const FaqItemSchema = z.object({
  question: z.string().min(1).max(200),
  answer: z.string().min(1).max(1000),
});
export type FaqItem = z.infer<typeof FaqItemSchema>;

export const FaqBlockSchema = z.object({
  type: z.literal("faq"),
  heading: z.string().max(120).optional(),
  items: z.array(FaqItemSchema).min(1),
});
export type FaqBlock = z.infer<typeof FaqBlockSchema>;

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
  ServicesBlockSchema,
  CtaBlockSchema,
  FaqBlockSchema,
  LegalBlockSchema,
]);
export type Block = z.infer<typeof BlockSchema>;
export type BlockType = Block["type"];

export const PageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  /** Meta description for <head>. */
  description: z.string().max(320).optional(),
  language: z.string().default("en"),
  blocks: z.array(BlockSchema),
});
export type Page = z.infer<typeof PageSchema>;

export const PagesFileSchema = z.object({
  pages: z.array(PageSchema),
});
export type PagesFile = z.infer<typeof PagesFileSchema>;
