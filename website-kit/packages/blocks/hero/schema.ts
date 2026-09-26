import { z } from "zod";
import { CtaSchema } from "../src/schemas.js";

export const HeroVariant = z.enum(["split", "centered", "full-bleed", "video"]);
export type HeroVariant = z.infer<typeof HeroVariant>;

export const HeroPropsSchema = z.object({
  variant: HeroVariant.default("centered"),
  heading: z.string().min(1).max(80),
  subheading: z.string().max(160).optional(),
  cta: CtaSchema.optional(),
  /** Image (split/full-bleed) or video src (video variant). */
  media: z.string().optional(),
});
export type HeroProps = z.infer<typeof HeroPropsSchema>;
