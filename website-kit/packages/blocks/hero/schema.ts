import { z } from "zod";
import { HeroPresentationFields } from "../shared/hero-options.js";
import { CtaSchema } from "../src/schemas.js";

export const HeroVariant = z.enum(["split", "centered", "full-bleed", "video"]);
export type HeroVariant = z.infer<typeof HeroVariant>;

export const HeroPropsSchema = z.object({
  ...HeroPresentationFields,
  eyebrow: z.string().optional(),
  secondaryCta: CtaSchema.optional(),
  variant: HeroVariant.default("centered"),
  heading: z.string().min(1).max(80),
  subheading: z.string().max(160).optional(),
  cta: CtaSchema.optional(),
  /** Image (split/full-bleed) or video src (video variant). */
  media: z.string().optional(),
  mediaAlt: z.string().optional(),
});
export type HeroProps = z.infer<typeof HeroPropsSchema>;
