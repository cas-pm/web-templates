import type { GitHubClient } from "../lib/github.js";

/**
 * rollback/: revert a previous change by git-reverting its commit, then
 * triggering a redeploy. Reverting is itself a new commit (auditable in
 * history/).
 */

export interface RollbackInput {
  /** Commit sha to revert (from history/). */
  commitSha: string;
  author: string;
  idempotencyKey: string;
}

export interface RollbackResult {
  status: "reverted" | "duplicate";
  revertCommitSha: string;
  workflowRunId?: number;
}

export function createRollback(gh: GitHubClient) {
  return {
    async rollback(_input: RollbackInput): Promise<RollbackResult> {
      // TODO: create a revert commit for _input.commitSha on gh.branch via the
      // GitHub API (build the inverse tree/commit), then trigger deploy.
      void gh;
      throw new Error("not implemented");
    },
  };
}
