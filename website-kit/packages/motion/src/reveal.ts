/**
 * reveal.ts — reveal elements on scroll via IntersectionObserver.
 * Add `data-reveal` to any element; it gets `data-revealed` when in view.
 */

export interface RevealOptions {
  /** Fraction of the element visible before it reveals. */
  threshold?: number;
  /** Reveal only once (default) or every time it re-enters. */
  once?: boolean;
  rootMargin?: string;
}

export function initReveal(options: RevealOptions = {}): () => void {
  const { threshold = 0.15, once = true, rootMargin = "0px 0px -10% 0px" } = options;
  const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-revealed", "");
        // TODO: optionally trigger count-up (stats) / staggered children here.
        if (once) observer.unobserve(entry.target);
      }
    },
    { threshold, rootMargin },
  );

  targets.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}
