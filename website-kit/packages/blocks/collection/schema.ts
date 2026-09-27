import { z } from 'zod';
import { HrefSchema } from '../src/schemas.js';
const image = z.object({ src: z.string().min(1), alt: z.string().min(1), position: z.string().default('50% 50%') });
const link = z.object({ label: z.string().min(1), href: HrefSchema });
const base = { heading: z.string().min(1), intro: z.string().default('') };
const photo = image.extend({ title: z.string().min(1), caption: z.string().default(''), href: HrefSchema.optional() });
const motion = { durationMs: z.number().min(100).max(3000).default(700) };
export const CollectionSchema = z.discriminatedUnion('variant', [
  z.object({ ...base, ...motion, variant: z.literal('cinematic-reveal'), image, video: z.string().min(1).optional(), cta: link.optional(), overlay: z.number().min(0).max(.85).default(.35) }),
  z.object({ ...base, ...motion, variant: z.literal('expanding-panels'), images: z.array(photo).min(2).max(8), height: z.number().min(320).max(1000).default(620) }),
  z.object({ ...base, variant: z.literal('pinned-chapters'), chapters: z.array(z.object({ title:z.string().min(1), body:z.string().min(1), image })).min(2).max(10) }),
  z.object({ ...base, variant: z.literal('hover-preview'), projects: z.array(photo.extend({ category:z.string().default(''), year:z.string().default('') })).min(1).max(20) }),
  z.object({ ...base, variant: z.literal('before-after'), before:image, after:image, beforeLabel:z.string().default('Before'), afterLabel:z.string().default('After'), initial:z.number().min(0).max(100).default(50) }),
  z.object({ ...base, ...motion, variant: z.literal('stacked-photographs'), images:z.array(photo).min(2).max(12) }),
  z.object({ ...base, variant: z.literal('editorial-mosaic'), images:z.array(photo).min(3).max(7) }),
  z.object({ ...base, variant: z.literal('typographic-menu'), items:z.array(z.object({ title:z.string().min(1), description:z.string(), price:z.string().optional(), link:link.optional() })).min(1).max(12) }),
  z.object({ ...base, variant: z.literal('image-statement'), image, body:z.string(), link:link.optional() }),
  z.object({ ...base, variant: z.literal('specification-sheet'), image, details:z.array(z.object({ label:z.string().min(1), value:z.string().min(1) })).min(1), link:link.optional() }),
  z.object({ variant: z.literal('portrait-feature'), quote:z.string().min(1), portrait:image, name:z.string().min(1), role:z.string(), heading:z.string().default('In their words') }),
  z.object({ ...base, variant: z.literal('final-invitation'), cta:link, details:z.array(link).default([]), note:z.string().default('') }),
]);
export type CollectionData = z.infer<typeof CollectionSchema>;
export type VariantData<V extends CollectionData['variant']> = Extract<CollectionData, {variant:V}>;
export const collectionVariants = [
  {type:'hero',variant:'cinematic-reveal',name:'Cinematic reveal'},
  {type:'gallery',variant:'expanding-panels',name:'Expanding panels'},
  {type:'story',variant:'pinned-chapters',name:'Pinned chapters'},
  {type:'projects',variant:'hover-preview',name:'Hover preview'},
  {type:'comparison',variant:'before-after',name:'Before / after'},
  {type:'gallery',variant:'stacked-photographs',name:'Stacked photographs'},
  {type:'gallery',variant:'editorial-mosaic',name:'Editorial mosaic'},
  {type:'services',variant:'typographic-menu',name:'Typographic menu'},
  {type:'story',variant:'image-statement',name:'Image and statement'},
  {type:'details',variant:'specification-sheet',name:'Specification sheet'},
  {type:'testimonials',variant:'portrait-feature',name:'Portrait feature'},
  {type:'contact',variant:'final-invitation',name:'Final invitation'},
] as const;
export function isCollection(data: {variant?:string}) { return collectionVariants.some(item => item.variant === data.variant); }
