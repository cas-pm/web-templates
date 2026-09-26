import { z } from "zod";

export const StatItemSchema = z.object({
  label: z.string().min(1),
  value: z.number(),
  suffix: z.string().optional(),
  prefix: z.string().optional(),
});

export const StatsPropsSchema = z.object({
  heading: z.string().max(80).optional(),
  items: z.array(StatItemSchema).min(1),
  // TODO: count-up duration; triggered on reveal (see packages/motion).
});
export type StatsProps = z.infer<typeof StatsPropsSchema>;
