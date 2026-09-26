import { z } from "zod";
import { HrefSchema } from "../src/schemas.js";

export const NavLinkSchema = z.object({ label: z.string().min(1), href: HrefSchema });

export const HeaderPropsSchema = z.object({
  logoText: z.string().min(1),
  logoHref: HrefSchema.default("/"),
  links: z.array(NavLinkSchema).default([]),
  // TODO: optional CTA button, sticky behaviour, mobile menu config.
});
export type HeaderProps = z.infer<typeof HeaderPropsSchema>;
