import { z } from "zod";
import { HrefSchema } from "../src/schemas.js";

export const LogosVariant = z.enum(["scroll-snap", "marquee"]);
export type LogosVariant = z.infer<typeof LogosVariant>;

export const LogoItemSchema = z.object({
  name: z.string().min(1),
  src: z.string().min(1),
  href: HrefSchema.optional(),
});

export const LogosPropsSchema = z.object({
  variant: LogosVariant.default("marquee"),
  items: z.array(LogoItemSchema).min(1),
});
export type LogosProps = z.infer<typeof LogosPropsSchema>;
