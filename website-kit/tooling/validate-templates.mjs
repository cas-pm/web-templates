import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const names = ['hospitality','professional','arabian-adventure'];
const sectionTypes = new Set(['hero','services','features','gallery','testimonials','stats','faq','cta','contact','editorial']);
for (const name of names) {
  const dir = path.join(root,'templates',name);
  const {pages} = JSON.parse(fs.readFileSync(path.join(dir,'content/pages.json'),'utf8'));
  const brand = JSON.parse(fs.readFileSync(path.join(dir,'content/home.json'),'utf8'));
  if (pages.length !== 6 || !pages.some(p => p.slug === 'home')) throw new Error(`${name}: expected six pages including home`);
  const slugs = new Set(pages.map(p => p.slug));
  if (slugs.size !== pages.length) throw new Error(`${name}: duplicate page slugs`);
  if (!brand.name || !brand.email) throw new Error(`${name}: missing brand identity`);
  for (const page of pages) {
    if (!page.title || !page.description || !page.sections.length) throw new Error(`${name}/${page.slug}: incomplete page`);
    const ids = new Set();
    for (const section of page.sections) {
      const where = `${name}/${page.slug}/${section.id}`;
      if (!sectionTypes.has(section.type) || !section.label || !/^[a-z][a-z0-9-]*$/.test(section.id) || ids.has(section.id)) throw new Error(`${where}: invalid section`);
      ids.add(section.id);
      const data = section.data;
      if (!data || typeof data !== 'object') throw new Error(`${where}: missing data`);
      if (section.type === 'hero' && (!data.heading || !data.mediaAlt)) throw new Error(`${where}: missing hero content`);
      if (section.type === 'gallery' && (!data.images?.length || data.images.some(image => !image.alt || !image.src))) throw new Error(`${where}: missing gallery content`);
      if (section.type === 'services' && !data.items?.length) throw new Error(`${where}: empty cards`);
      const links = [data.cta?.href, data.secondaryCta?.href, ...(data.items ?? []).map(i => i.href)].filter(Boolean);
      for (const href of links) if (href.startsWith('/') && !slugs.has(href.slice(1)) && href !== '/') throw new Error(`${where}: broken internal link ${href}`);
    }
  }
  console.log(`${name}: ${pages.length} pages, ${pages.reduce((n,p) => n+p.sections.length,0)} named sections verified`);
}
