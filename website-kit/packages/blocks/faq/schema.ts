import { z } from "zod";

export const FaqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const FaqPropsSchema = z.object({
  heading: z.string().max(80).optional(),
  items: z.array(FaqItemSchema).min(1),
  /** When true, emit FAQPage JSON-LD (see packages/seo/jsonld). */
  emitJsonLd: z.boolean().default(true),
});
export type FaqProps = z.infer<typeof FaqPropsSchema>;
