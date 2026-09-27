import { z } from "zod";
import { HrefSchema, CtaSchema } from "../src/schemas.js";

export const NavLinkSchema = z.object({ label: z.string().min(1), href: HrefSchema });

export const HeaderPropsSchema = z.object({
  logoText: z.string().min(1),
  logoHref: HrefSchema.default("/"),
  links: z.array(NavLinkSchema).default([]),
  cta: CtaSchema.optional(),
  sticky: z.boolean().optional(),
  menuLabel: z.string().optional(),
  closeLabel: z.string().optional(),
  logoImage: z.string().optional(),
});
export type HeaderProps = z.infer<typeof HeaderPropsSchema>;
