import { Octokit } from "@octokit/rest";
import type { Config } from "../config.js";

/**
 * Thin GitHub wrapper shared by publish/history/rollback/status. Uses the
 * fine-grained token from config (contents write on the content repo only).
 * The content file and its change history live in git — there is no database.
 */
export interface GitHubClient {
  octokit: Octokit;
  owner: string;
  repo: string;
  branch: string;
  contentPath: string;
}

export function createGitHubClient(config: Config): GitHubClient {
  return {
    octokit: new Octokit({ auth: config.GITHUB_TOKEN }),
    owner: config.GITHUB_REPO_OWNER,
    repo: config.GITHUB_REPO_NAME,
    branch: config.GITHUB_BRANCH,
    contentPath: config.CONTENT_PATH,
  };
}
