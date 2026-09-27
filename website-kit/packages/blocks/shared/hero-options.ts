import { z } from 'zod';

/** Shared by component props and the editable services content model. */
export const HeroPresentationFields = {
  variant: z.enum(['split', 'centered', 'full-bleed', 'video']).optional(),
  media: z.string().optional(),
  mediaAlt: z.string().optional(),
  poster: z.string().optional(),
  height: z.number().min(50).max(120).optional(),
  overlay: z.number().min(0).max(0.9).optional(),
  align: z.enum(['left', 'center']).optional(),
  mediaPosition: z.enum(['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right']).optional(),
  autoplay: z.boolean().optional(),
  loop: z.boolean().optional(),
  scrollLink: z.object({ label: z.string(), href: z.string().regex(/^#[^\s]+$/) }).optional(),
};
