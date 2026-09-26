import { z } from "zod";
import { HrefSchema } from "../src/schemas.js";

export const FooterLinkSchema = z.object({ label: z.string().min(1), href: HrefSchema });
export const FooterColumnSchema = z.object({
  title: z.string().min(1),
  links: z.array(FooterLinkSchema).default([]),
});

export const FooterPropsSchema = z.object({
  columns: z.array(FooterColumnSchema).default([]),
  legalLinks: z.array(FooterLinkSchema).default([]),
  copyright: z.string().optional(),
});
export type FooterProps = z.infer<typeof FooterPropsSchema>;
