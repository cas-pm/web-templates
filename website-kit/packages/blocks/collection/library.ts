import { CollectionSchema, collectionVariants } from './schema.js';
const studio = {src:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85',alt:'Sunlight entering a studio through tall windows'};
const lounge = {src:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85',alt:'An open workspace with tables and places to gather'};
const cabin = {src:'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1600&q=85',alt:'A timber cabin framed by trees'};
const photos = [
  {...studio,title:'Light, from morning onwards',caption:'The studio / Amsterdam',href:'/work'},
  {...lounge,title:'A place to stay a little longer',caption:'The gathering room / Rotterdam',href:'/work'},
  {...cabin,title:'Away from the everyday',caption:'The woodland retreat / Veluwe',href:'/work'},
];
const examples: Record<string,unknown> = {
  'cinematic-reveal':{heading:'A different pace.\nA place of your own.',intro:'Considered spaces for the way you want to live.',image:studio,cta:{label:'Explore our spaces',href:'/work'},durationMs:1400},
  'expanding-panels':{heading:'Find your kind of somewhere.',intro:'Three places, each with a character of its own. Select a photograph to explore.',images:photos},
  'pinned-chapters':{heading:'From first thought to a place that feels right.',intro:'Our process',chapters:[
    {title:'Listen to the everyday.',body:'How you arrive. Where the light falls. Who gathers around the table. We begin with the small things that make a place yours.',image:studio},
    {title:'Make room for possibility.',body:'Plans become conversations, samples become palettes, and the spaces between things become as considered as the things themselves.',image:lounge},
    {title:'Leave space for living.',body:'Natural materials, useful details, and a quieter rhythm. A finished space is only the beginning of its story.',image:cabin},
  ]},
  'hover-preview':{heading:'Selected places.',intro:'A few recent explorations in space, light, and belonging.',projects:photos.map((photo,i)=>({...photo,category:['Workplace','Hospitality','Residential'][i],year:'2026'}))},
  'before-after':{heading:'The same space. A different feeling.',intro:'Move the divider to compare monochrome and color treatments of the same photograph.',before:{...studio,src:studio.src+'&sat=-100',alt:'Studio photograph with a monochrome treatment'},after:studio,beforeLabel:'Monochrome',afterLabel:'Color'},
  'stacked-photographs':{heading:'Notes from a slower afternoon.',intro:'A small collection of spaces worth remembering.',images:photos},
  'editorial-mosaic':{heading:'Spaces, in good company.',intro:'A window, a gathering place, a quiet escape. Details from our recent work.',images:photos},
  'typographic-menu':{heading:'What we can shape together.',intro:'From a single room to a complete change of direction.',items:[
    {title:'Spatial direction',description:'A clear concept, material palette, and plan for how your space can work.',price:'From €1,800',link:{label:'Discuss a concept',href:'/contact'}},
    {title:'Interior design',description:'Detailed spaces, thoughtfully specified and ready to become real.',price:'Quoted per project',link:{label:'Plan your interior',href:'/contact'}},
    {title:'Finishing touches',description:'Furniture, lighting, and the objects that make it feel like yours.',link:{label:'Find the details',href:'/contact'}},
  ]},
  'image-statement':{heading:'The best spaces leave room for you.',intro:'Our point of view',image:cabin,body:'We work with light, natural materials, and the way people actually live. The result should feel personal from the first day, and grow more familiar with time.',link:{label:'Meet the studio',href:'/about'}},
  'specification-sheet':{heading:'The gathering room.',intro:'An open, light-filled setting for a working day or an evening together.',image:lounge,details:[{label:'Floor area',value:'145 m²'},{label:'Capacity',value:'Up to 24 guests'},{label:'Materials',value:'Oak, linen, brushed steel'},{label:'Included',value:'Meeting table, lounge, kitchenette'},{label:'Location',value:'Rotterdam, Netherlands'}],link:{label:'Ask about this space',href:'/contact'}},
  'portrait-feature':{quote:'They understood how we wanted to feel in the space before we knew how to put it into words.',portrait:{src:'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85',alt:'Portrait accompanying the sample client testimonial'},name:'Alex Morgan',role:'Sample client / Residential project'},
  'final-invitation':{heading:'Tell us what\nyou have in mind.',intro:'A new space, a different direction, or an idea that needs a little room.',cta:{label:'Start a conversation',href:'mailto:hello@example.com'},details:[{label:'hello@example.com',href:'mailto:hello@example.com'},{label:'+31 20 555 0100',href:'tel:+31205550100'}],note:'Based in Amsterdam. Working wherever the story takes us.'},
};
export function createCollectionSections() {return collectionVariants.map(item=>({id:`${item.type}-${item.variant}`,type:item.type,label:`${item.type==='testimonials'?'Testimonial':item.type.charAt(0).toUpperCase()+item.type.slice(1)} · ${item.name}`,data:CollectionSchema.parse({...examples[item.variant] as object,variant:item.variant})}));}
