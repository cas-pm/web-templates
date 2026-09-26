/**
 * slider.ts — thin wrapper around Embla for testimonial/logo sliders.
 * Kept dependency-free at the type level; the Embla import is a TODO so the
 * skeleton compiles without the dep installed.
 */

export interface SliderOptions {
  loop?: boolean;
  autoplayMs?: number;
  align?: "start" | "center" | "end";
}

export interface SliderInstance {
  next(): void;
  prev(): void;
  destroy(): void;
}

export function createSlider(root: HTMLElement, _options: SliderOptions = {}): SliderInstance {
  // TODO: import EmblaCarousel from "embla-carousel" and initialise on `root`.
  void root;
  return {
    next() {/* TODO */},
    prev() {/* TODO */},
    destroy() {/* TODO */},
  };
}
