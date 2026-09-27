/** Native scroll-snap slider. Root children are slides; style widths in CSS. */
export interface SliderOptions { loop?: boolean; autoplayMs?: number; align?: 'start' | 'center' | 'end' }
export interface SliderInstance { next(): void; prev(): void; destroy(): void }
export function createSlider(root: HTMLElement, options: SliderOptions = {}): SliderInstance {
  const slides = Array.from(root.children) as HTMLElement[];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  let timer: ReturnType<typeof setInterval> | undefined;
  let destroyed = false;
  const positions = () => slides.map(slide => {
    const left = slide.getBoundingClientRect().left - root.getBoundingClientRect().left + root.scrollLeft;
    return left - (options.align === 'center' ? (root.clientWidth - slide.clientWidth) / 2 : options.align === 'end' ? root.clientWidth - slide.clientWidth : 0);
  });
  function move(delta: number) {
    if (destroyed || !slides.length) return;
    const points = positions();
    const current = points.reduce((best, point, i) => Math.abs(point-root.scrollLeft) < Math.abs((points[best] ?? 0)-root.scrollLeft) ? i : best, 0);
    const index = options.loop ? (current + delta + slides.length) % slides.length : Math.max(0, Math.min(slides.length - 1, current + delta));
    root.scrollTo({ left: points[index], behavior: reduced.matches ? 'instant' : 'smooth' });
  }
  const pause = () => { paused = true; };
  const resume = () => { paused = root.matches(':hover') || root.contains(document.activeElement); };
  root.addEventListener('mouseenter', pause); root.addEventListener('mouseleave', resume);
  root.addEventListener('focusin', pause); root.addEventListener('focusout', resume);
  if (options.autoplayMs && options.autoplayMs > 0) timer = setInterval(() => {
    if (!paused && !document.hidden && !reduced.matches) move(1);
  }, Math.max(1000, options.autoplayMs));
  return { next: () => move(1), prev: () => move(-1), destroy() {
    destroyed = true; clearInterval(timer);
    root.removeEventListener('mouseenter', pause); root.removeEventListener('mouseleave', resume);
    root.removeEventListener('focusin', pause); root.removeEventListener('focusout', resume);
  } };
}
