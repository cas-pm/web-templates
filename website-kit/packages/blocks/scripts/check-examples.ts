/**
 * Validates every block's example.json against its schema.ts (`*PropsSchema`).
 * Run with: pnpm --filter @web/blocks test:examples
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { z } from "zod";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const blocksRoot = path.resolve(scriptDir, "..");

const blocks = readdirSync(blocksRoot, { withFileTypes: true }).filter(
  (d) =>
    d.isDirectory() &&
    existsSync(path.join(blocksRoot, d.name, "schema.ts")) &&
    existsSync(path.join(blocksRoot, d.name, "example.json")),
);

let failures = 0;

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
  const example: unknown = JSON.parse(readFileSync(path.join(dir, "example.json"), "utf8"));
  const result = schema.safeParse(example);

  if (result.success) {
    console.log(`✓ ${block.name}`);
  } else {
    console.error(`✗ ${block.name}:`, JSON.stringify(result.error.issues, null, 2));
    failures++;
  }
}

if (failures > 0) {
  console.error(`\n${failures} block example(s) failed validation.`);
  process.exit(1);
}
console.log(`\nAll ${blocks.length} block examples are valid.`);
