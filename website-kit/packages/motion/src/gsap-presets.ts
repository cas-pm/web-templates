/**
 * gsap-presets.ts — reusable GSAP animation presets as plain config objects.
 * Consumers apply these with gsap.to/from (gsap import kept as a TODO).
 */

export interface Preset {
  from?: Record<string, number | string>;
  to?: Record<string, number | string>;
  duration: number;
  ease: string;
  stagger?: number;
}

export const fadeUp: Preset = {
  from: { opacity: 0, y: 24 },
  to: { opacity: 1, y: 0 },
  duration: 0.6,
  ease: "power2.out",
};

export const staggerFadeUp: Preset = {
  ...fadeUp,
  stagger: 0.08,
};

export const countUp: Preset = {
  duration: 1.2,
  ease: "power1.out",
};

export const presets = { fadeUp, staggerFadeUp, countUp };

// TODO: export an apply(preset, target) helper once gsap is added as a dep.
