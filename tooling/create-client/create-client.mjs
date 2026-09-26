#!/usr/bin/env node
// @ts-check
/**
 * create-client — scaffold a new client website repo from the monorepo
 * templates. See README.md for the full description.
 *
 * This is a skeleton: argument parsing and the plan are real; the filesystem/
 * git operations are marked TODO so the flow is clear without side effects yet.
 */
import { fileURLToPath } from "node:url";
import path from "node:path";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

/** @typedef {{ from: string, to: string }} CopyPlanItem */

/**
 * @typedef {Object} Options
 * @property {string} clientName
 * @property {string} dir
 * @property {boolean} withGrowth
 * @property {boolean} withAssist
 * @property {string} flyApp
 * @property {boolean} dryRun
 */

const USAGE = `Usage: create-client <client-name> --dir <path> [--with-growth] [--with-assist] [--fly-app <name>] [--dry-run]`;

/**
 * @param {string[]} argv
 * @returns {Options}
 */
export function parseArgs(argv) {
  /** @type {Partial<Options> & { withGrowth: boolean, withAssist: boolean, dryRun: boolean }} */
  const opts = { withGrowth: false, withAssist: false, dryRun: false };
  const positionals = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    switch (arg) {
      case "--with-growth": opts.withGrowth = true; break;
      case "--with-assist": opts.withAssist = true; break;
      case "--dry-run": opts.dryRun = true; break;
      case "--dir": opts.dir = argv[++i]; break;
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

  return {
    clientName,
    dir: opts.dir,
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
    { from: "templates/services-business", to: "." },
    { from: "docs/seo-content-sheet.md", to: "docs/seo-content-sheet.md" },
    { from: "docs/seo-content-sheet.csv", to: "docs/seo-content-sheet.csv" },
    { from: "packages/blocks", to: "packages/blocks" },
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

  // TODO: mkdir targetDir; refuse if it exists and is non-empty.
  // TODO: copy each plan item (recursive), skipping node_modules/dist/.astro.
  // TODO: rewrite fly.toml `app`, package.json name, and site title using
  //       opts.clientName / opts.flyApp.
  // TODO: write a client-scoped package.json + pnpm-workspace.yaml so only the
  //       copied packages are wired up.
  // TODO: git init && initial commit.
  throw new Error("filesystem/git operations not implemented (skeleton)");
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
