import type { GitHubClient } from "../lib/github.js";

/**
 * status/: poll the deploy workflow run for a publish/rollback. On build
 * failure the previously deployed version stays live (deploys are atomic and
 * only swap in on success) — this module only reports; it does not roll back.
 */

export type WorkflowStatus = "queued" | "in_progress" | "success" | "failure";

export interface DeployStatus {
  workflowRunId: number;
  status: WorkflowStatus;
  /** True when a failed build left the previous version serving. */
  previousVersionStillLive: boolean;
}

export function createStatus(gh: GitHubClient) {
  return {
    async poll(workflowRunId: number): Promise<DeployStatus> {
      // TODO: gh.octokit.actions.getWorkflowRun({ run_id: workflowRunId }) and
      // map conclusion/status. On failure, previousVersionStillLive = true.
      void gh;
      return { workflowRunId, status: "queued", previousVersionStillLive: true };
    },
  };
}
