import { z } from "zod";
import { CtaSchema } from "../src/schemas.js";

export const PricingPlanSchema = z.object({
  name: z.string().min(1),
  price: z.string().min(1),
  period: z.string().optional(),
  features: z.array(z.string()).default([]),
  cta: CtaSchema,
  featured: z.boolean().default(false),
});

export const PricingPropsSchema = z.object({
  heading: z.string().max(80).optional(),
  plans: z.array(PricingPlanSchema).min(1),
});
export type PricingProps = z.infer<typeof PricingPropsSchema>;
