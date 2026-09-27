#!/usr/bin/env node
// @ts-check
/**
 * create-client — scaffold a new client website repo from the monorepo
 * templates. See README.md for the full description.
 *
 * Creates an independent client workspace with local shared packages.
 */
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

/** @typedef {{ from: string, to: string }} CopyPlanItem */

/**
 * @typedef {Object} Options
 * @property {string} clientName
 * @property {string} dir
 * @property {"services-business" | "hospitality" | "professional" | "arabian-adventure"} template
 * @property {boolean} withGrowth
 * @property {boolean} withAssist
 * @property {string} flyApp
 * @property {boolean} dryRun
 */

const TEMPLATES = ["services-business", "hospitality", "professional", "arabian-adventure"];
const USAGE = `Usage: create-client <client-name> --dir <path> [--template <${TEMPLATES.join("|")}>] [--with-growth] [--with-assist] [--fly-app <name>] [--dry-run]`;

/**
 * @param {string[]} argv
 * @returns {Options}
 */
export function parseArgs(argv) {
  /** @type {{ dir?: string, template?: string, flyApp?: string, withGrowth: boolean, withAssist: boolean, dryRun: boolean }} */
  const opts = { withGrowth: false, withAssist: false, dryRun: false };
  const positionals = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    switch (arg) {
      case "--with-growth": opts.withGrowth = true; break;
      case "--with-assist": opts.withAssist = true; break;
      case "--dry-run": opts.dryRun = true; break;
      case "--dir": opts.dir = argv[++i]; break;
      case "--template": opts.template = argv[++i]; break;
      case "--fly-app": opts.flyApp = argv[++i]; break;
      case "--help": case "-h": console.log(USAGE); process.exit(0);
      default:
        if (arg.startsWith("--")) { throw new Error(`unknown flag: ${arg}`); }
        positionals.push(arg);
    }
  }

  const clientName = positionals[0];
  if (!clientName) throw new Error(`missing <client-name>\n${USAGE}`);
  if (!opts.dir) throw new Error(`--dir is required\n${USAGE}`);
  const templateRaw = opts.template ?? "services-business";
  if (!TEMPLATES.includes(templateRaw)) {
    throw new Error(`--template must be one of: ${TEMPLATES.join(", ")}`);
  }
  const template = /** @type {Options["template"]} */ (templateRaw);

  return {
    clientName,
    dir: opts.dir,
    template,
    withGrowth: opts.withGrowth,
    withAssist: opts.withAssist,
    flyApp: opts.flyApp ?? `${slugify(clientName)}-preview`,
    dryRun: opts.dryRun,
  };
}

/** @param {string} s */
function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/**
 * Build the list of directories/files to copy given the sold modules.
 * @param {Options} opts
 * @returns {CopyPlanItem[]}
 */
export function buildCopyPlan(opts) {
  /** @type {CopyPlanItem[]} */
  const plan = [
    { from: `templates/${opts.template}`, to: "." },
    { from: ".gitignore", to: ".gitignore" },
    { from: "tsconfig.base.json", to: "tsconfig.base.json" },
    { from: "docs/customization.md", to: "docs/customization.md" },
    { from: "docs/seo-content-sheet.md", to: "docs/seo-content-sheet.md" },
    { from: "docs/seo-content-sheet.csv", to: "docs/seo-content-sheet.csv" },
    // Shared packages every site depends on.
    { from: "packages/blocks", to: "packages/blocks" },
    { from: "packages/ui", to: "packages/ui" },
    { from: "packages/seo", to: "packages/seo" },
    { from: "packages/tokens", to: "packages/tokens" },
    { from: "packages/motion", to: "packages/motion" },
    { from: "packages/analytics", to: "packages/analytics" },
    // CI/CD.
    { from: "tooling/github-actions/build-and-deploy.yml", to: ".github/workflows/build-and-deploy.yml" },
  ];

  // Add-ons are ONLY copied when the module has been sold.
  if (opts.withGrowth) {
    plan.push({ from: "services/insights-api", to: "services/insights-api" });
    plan.push({ from: "apps/insights-portal", to: "apps/insights-portal" });
  }
  if (opts.withAssist) {
    plan.push({ from: "services/content-assist", to: "services/content-assist" });
    plan.push({ from: "apps/content-portal", to: "apps/content-portal" });
  }

  return plan;
}

/** @param {Options} opts */
async function main(opts) {
  const plan = buildCopyPlan(opts);
  const targetDir = path.resolve(opts.dir);

  console.log(`Client:   ${opts.clientName}`);
  console.log(`Target:   ${targetDir}`);
  console.log(`Template: ${opts.template}`);
  console.log(`Fly app:  ${opts.flyApp}`);
  console.log(`Growth:   ${opts.withGrowth ? "yes" : "no"}`);
  console.log(`Assist:   ${opts.withAssist ? "yes" : "no"}`);
  console.log("Copy plan:");
  for (const item of plan) {
    console.log(`  ${path.join(REPO_ROOT, item.from)}  ->  ${path.join(targetDir, item.to)}`);
  }

  if (opts.dryRun) {
    console.log("(dry run — no changes written)");
    return;
  }

  const entries = await fs.readdir(targetDir).catch(error => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  if (entries.length) throw new Error(`target must be empty: ${targetDir}`);
  await fs.mkdir(targetDir, { recursive: true });
  try {
    for (const item of plan) {
      const from = path.join(REPO_ROOT, item.from);
      const to = path.join(targetDir, item.to);
      await fs.mkdir(path.dirname(to), { recursive: true });
      await fs.cp(from, to, { recursive: true, filter: src => !src.split(path.sep).some(part => ["node_modules", "dist", ".astro", ".git", ".DS_Store"].includes(part)) });
    }
    const pkgPath = path.join(targetDir, "package.json");
    const pkg = JSON.parse(await fs.readFile(pkgPath, "utf8"));
    const originalName = pkg.name;
    pkg.name = `@client/${slugify(opts.clientName)}`;
    pkg.packageManager = "pnpm@10.33.0";
    pkg.engines = { ...pkg.engines, node: ">=22" };
    const kitPackage = JSON.parse(await fs.readFile(path.join(REPO_ROOT, "package.json"), "utf8"));
    pkg.devDependencies = { ...kitPackage.devDependencies, ...pkg.devDependencies };
    await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
    const workspace = ["packages/*"];
    if (opts.withGrowth || opts.withAssist) workspace.push("services/*", "apps/*");
    await fs.writeFile(path.join(targetDir, "pnpm-workspace.yaml"), `packages:\n${workspace.map(item => `  - "${item}"`).join("\n")}\n`);
    await fs.writeFile(path.join(targetDir, "README.md"), `# ${opts.clientName}\n\nBased on the ${opts.template} starter.\n\nRun \`pnpm install\`, \`pnpm dev\`, \`pnpm check\`, and \`pnpm build\`. Review \`docs/architecture.md\` and \`/blocks/\` for section editing. Replace demo claims, images and contact details before publishing.\n`);
    await fs.copyFile(path.join(REPO_ROOT, "docs/architecture.md"), path.join(targetDir, "docs/architecture.md"));
    await fs.copyFile(path.join(REPO_ROOT, "docs/plug-and-play-prompt.md"), path.join(targetDir, "docs/plug-and-play-prompt.md"));
    await fs.copyFile(path.join(REPO_ROOT, "docs/design-references.md"), path.join(targetDir, "docs/design-references.md"));
    if (opts.template === "services-business") {
      const flyFile = path.join(targetDir, "fly.toml");
      let fly = await fs.readFile(flyFile, "utf8");
      fly = fly.replace(/^app\s*=.*$/m, `app = "${opts.flyApp}"`);
      await fs.writeFile(flyFile, fly);
    }
    // Lockfile is generated for the isolated workspace by pnpm install.
    console.log(`Created ${targetDir} (${originalName} → ${pkg.name}). Run pnpm install.`);
  } catch (error) {
    await fs.rm(targetDir, { recursive: true, force: true });
    throw error;
  }
}

// Only run when invoked directly (not when imported by tests).
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    await main(parseArgs(process.argv.slice(2)));
  } catch (err) {
    console.error(String(err instanceof Error ? err.message : err));
    process.exit(1);
  }
}
