import { z } from "zod";
import { HrefSchema } from "../src/schemas.js";

export const ServiceItemSchema = z.object({
  title: z.string().min(1).max(60),
  description: z.string().max(280),
  href: HrefSchema.optional(),
  icon: z.string().optional(),
});

export const ServicesPropsSchema = z.object({
  eyebrow: z.string().max(80).optional(),
  heading: z.string().max(80).optional(),
  intro: z.string().max(280).optional(),
  items: z.array(ServiceItemSchema).min(1),
});
export type ServicesProps = z.infer<typeof ServicesPropsSchema>;
