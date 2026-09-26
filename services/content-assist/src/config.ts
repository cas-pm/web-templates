import { z } from "zod";

/**
 * content-assist secrets. Each secret is its OWN env var. Critically,
 * content-assist NEVER receives GA4 credentials — there is intentionally no
 * GA4 field in this schema. Analytics live in insights-api only.
 */
export const ConfigSchema = z.object({
  /** Anthropic API key for the Claude API (propose/). */
  ANTHROPIC_API_KEY: z.string().min(1),
  /** Fine-grained GitHub token, contents write scope on the content repo only. */
  GITHUB_TOKEN: z.string().min(1),
  GITHUB_REPO_OWNER: z.string().min(1),
  GITHUB_REPO_NAME: z.string().min(1),
  /** Branch commits land on (usually the deploy branch). */
  GITHUB_BRANCH: z.string().default("main"),
  /** Path to the content file within the repo. */
  CONTENT_PATH: z.string().default("content/pages.json"),
  /** Shared secret guarding the publish route (separate from the read auth gate). */
  PUBLISH_AUTH_TOKEN: z.string().min(1),
  /** Brand context injected into propose prompts (untrusted user input is never trusted). */
  BRAND_CONTEXT: z.string().default(""),
});
export type Config = z.infer<typeof ConfigSchema>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  return ConfigSchema.parse(env);
}
