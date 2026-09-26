import { z } from "zod";

export const FeaturesVariant = z.enum(["grid", "alternating", "icon-list"]);
export type FeaturesVariant = z.infer<typeof FeaturesVariant>;

export const FeatureItemSchema = z.object({
  title: z.string().min(1).max(60),
  description: z.string().max(280),
  icon: z.string().optional(),
});

export const FeaturesPropsSchema = z.object({
  variant: FeaturesVariant.default("grid"),
  heading: z.string().max(80).optional(),
  items: z.array(FeatureItemSchema).min(1),
});
export type FeaturesProps = z.infer<typeof FeaturesPropsSchema>;
