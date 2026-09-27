import { z } from "zod";
import { HrefSchema } from "../src/schemas.js";

export const GalleryImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  title: z.string().max(100).optional(),
  href: HrefSchema.optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

export const GalleryPropsSchema = z.object({
  variant: z.enum(["horizontal", "vertical-showcase"]).default("horizontal"),
  autoplay: z.boolean().default(false),
  intervalMs: z.number().int().min(2000).max(20000).default(4000),
  transitionMs: z.number().int().min(200).max(2000).default(700),
  height: z.number().int().min(420).max(1000).default(680),
  inactiveScale: z.number().min(0.4).max(0.9).default(0.68),
  heading: z.string().max(80).optional(),
  intro: z.string().max(280).optional(),
  images: z.array(GalleryImageSchema).min(1),
});
export type GalleryProps = z.infer<typeof GalleryPropsSchema>;
