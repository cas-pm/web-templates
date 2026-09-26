import { z } from "zod";

/** Contact channels. Each click is tracked (see packages/analytics). */
export const ContactChannelsSchema = z.object({
  whatsapp: z.string().optional(),
  tel: z.string().optional(),
  email: z.string().email().optional(),
});

export const ContactPropsSchema = z.object({
  heading: z.string().max(80).optional(),
  channels: ContactChannelsSchema.default({}),
  /** Endpoint the contact form POSTs to. */
  formAction: z.string().optional(),
});
export type ContactProps = z.infer<typeof ContactPropsSchema>;
