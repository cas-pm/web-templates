import { z } from "zod";
import { CtaSchema } from "../src/schemas.js";

export const CtaPropsSchema = z.object({
  heading: z.string().min(1).max(80),
  body: z.string().max(280).optional(),
  cta: CtaSchema,
});
export type CtaProps = z.infer<typeof CtaPropsSchema>;
