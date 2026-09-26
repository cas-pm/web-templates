import { z } from "zod";

export const TestimonialItemSchema = z.object({
  quote: z.string().min(1).max(500),
  author: z.string().min(1),
  role: z.string().optional(),
  avatar: z.string().optional(),
});

export const TestimonialsPropsSchema = z.object({
  heading: z.string().max(80).optional(),
  items: z.array(TestimonialItemSchema).min(1),
  // TODO: Embla slider options (loop, autoplay).
});
export type TestimonialsProps = z.infer<typeof TestimonialsPropsSchema>;
