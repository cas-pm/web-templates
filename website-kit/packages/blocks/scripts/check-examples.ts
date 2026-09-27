/**
 * Validates every block's example.json against its schema.ts (`*PropsSchema`).
 * Run with: pnpm --filter @web/blocks test:examples
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { z } from "zod";
import { CollectionSchema, collectionVariants } from "../collection/schema.js";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const blocksRoot = path.resolve(scriptDir, "..");

const blocks = readdirSync(blocksRoot, { withFileTypes: true }).filter(
  (d) =>
    d.isDirectory() &&
    existsSync(path.join(blocksRoot, d.name, "schema.ts")) &&
    existsSync(path.join(blocksRoot, d.name, "example.json")),
);

let failures = 0;
let exampleCount = 0;

for (const block of blocks) {
  const dir = path.join(blocksRoot, block.name);
  const mod: Record<string, unknown> = await import(pathToFileURL(path.join(dir, "schema.ts")).href);

  const entry = Object.entries(mod).find(([key]) => key.endsWith("PropsSchema"));
  if (!entry) {
    console.error(`✗ ${block.name}: no *PropsSchema export in schema.ts`);
    failures++;
    continue;
  }

  const schema = entry[1] as z.ZodTypeAny;
  const examples = readdirSync(dir).filter(name => /^example(?:-[\w-]+)?\.json$/.test(name));
  for (const filename of examples) {
    exampleCount++;
    const example: unknown = JSON.parse(readFileSync(path.join(dir, filename), "utf8"));
    const result = schema.safeParse(example);

    if (result.success) {
      console.log(`✓ ${block.name}/${filename}`);
    } else {
      console.error(`✗ ${block.name}/${filename}:`, JSON.stringify(result.error.issues, null, 2));
      failures++;
    }
  }
}

const collectionExamples = JSON.parse(readFileSync(path.join(blocksRoot, 'collection/examples.json'), 'utf8')) as {id:string;type:string;data:unknown}[];
for (const variant of collectionVariants) {
  const example = collectionExamples.find(section => section.id === `${variant.type}-${variant.variant}`);
  const result = CollectionSchema.safeParse(example?.data);
  exampleCount++;
  if (result.success && example?.type === variant.type && result.data.variant === variant.variant) console.log(`✓ collection/${variant.variant}`);
  else { console.error(`✗ collection/${variant.variant}: missing or invalid example`, result.success ? '' : result.error.issues); failures++; }
}

if (failures > 0) {
  console.error(`\n${failures} block example(s) failed validation.`);
  process.exit(1);
}
console.log(`\nAll ${exampleCount} block examples are valid.`);
