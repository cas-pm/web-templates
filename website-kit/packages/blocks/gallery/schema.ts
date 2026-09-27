import { z } from "zod";

export const GalleryImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

export const GalleryPropsSchema = z.object({
  heading: z.string().max(80).optional(),
  intro: z.string().max(280).optional(),
  images: z.array(GalleryImageSchema).min(1),
});
export type GalleryProps = z.infer<typeof GalleryPropsSchema>;
