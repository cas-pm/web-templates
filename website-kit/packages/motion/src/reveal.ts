/** Mark visible elements for CSS reveals; safe without observer support. */
export interface RevealOptions {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}
export function initReveal(options: RevealOptions = {}): () => void {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const showAll = () => targets.forEach(el => el.setAttribute('data-revealed', ''));
  if (reduced.matches || !('IntersectionObserver' in window)) { showAll(); return () => {}; }
  const { threshold = .15, once = true, rootMargin = '0px' } = options;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.setAttribute('data-revealed', '');
        if (once) observer.unobserve(entry.target);
      } else if (!once) entry.target.removeAttribute('data-revealed');
    }
  }, { threshold, rootMargin });
  const onChange = () => { if (reduced.matches) { observer.disconnect(); showAll(); } };
  reduced.addEventListener('change', onChange);
  targets.forEach(el => observer.observe(el));
  return () => { observer.disconnect(); reduced.removeEventListener('change', onChange); };
}
