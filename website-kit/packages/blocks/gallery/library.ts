import { GalleryPropsSchema, type GalleryProps } from './schema.js';
import { galleryVariants } from './variants.js';

/** Demo assets belong to the starter; no images or video are copied from the reference. */
export const galleryDemo = {
  heading: 'Spaces with a point of view.',
  intro: 'Scroll through the images, or use the arrows to explore.',
  images: [
    { src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85', alt: 'Sunlit studio with large windows and a meeting table', title: 'The light-filled studio' },
    { src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85', alt: 'Bright shared workspace with desks and gathering areas', title: 'Room to gather' },
    { src: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1400&q=85', alt: 'A secluded wooden cabin among tall trees', title: 'A quieter place' },
  ],
};

export function createGallerySections(data: Pick<GalleryProps, 'images' | 'heading' | 'intro'> = galleryDemo) {
  return galleryVariants.map(variant => ({
    id: `gallery-${variant.value}`,
    type: 'gallery' as const,
    label: `Gallery · ${variant.name}`,
    data: GalleryPropsSchema.parse({ ...data, variant: variant.value }),
  }));
}
