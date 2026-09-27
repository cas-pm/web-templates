/** Add a named entry and renderer here when expanding the gallery collection. */
export const galleryVariants = [
  { value: 'horizontal', name: 'Horizontal story', description: 'A horizontal strip of images with captions and native scroll snapping.' },
  { value: 'vertical-showcase', name: 'Vertical showcase', description: 'A vertical carousel with a growing central image, smaller neighbors and moving project titles.' },
] as const;
export type GalleryVariant = (typeof galleryVariants)[number]['value'];
