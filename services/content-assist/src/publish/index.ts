import type { FieldId } from "@web/blocks/registry";
import type { GitHubClient } from "../lib/github.js";

/**
 * publish/: replace ONLY the one field in content/pages.json, commit via the
 * GitHub API, and trigger the deploy workflow.
 *
 * Guardrails:
 *   - Idempotency key prevents double-publishing the same logical change.
 *   - This route carries its OWN auth check (see routes wiring), separate from
 *     the read/portal auth gate.
 */

export interface PublishInput {
  fieldId: FieldId;
  /** Value that has already passed validate/. */
  newValue: string;
  /** Author subject (from auth) for the change log. */
  author: string;
  /** Client-supplied key; identical key => same result, no second commit. */
  idempotencyKey: string;
}

export interface PublishResult {
  status: "published" | "duplicate";
  commitSha: string;
  workflowRunId?: number;
}

export interface IdempotencyStore {
  /** Returns a prior result if this key was already used. */
  get(key: string): Promise<PublishResult | null>;
  put(key: string, result: PublishResult): Promise<void>;
}

export function createPublisher(gh: GitHubClient, idempotency: IdempotencyStore) {
  return {
    async publish(input: PublishInput): Promise<PublishResult> {
      const existing = await idempotency.get(input.idempotencyKey);
      if (existing) return { ...existing, status: "duplicate" };

      // TODO: GET current content/pages.json (with its blob sha) via gh.octokit.
      // TODO: parse, replace ONLY input.fieldId's value (never touch other fields).
      // TODO: re-validate the whole file against PagesFileSchema before committing.
      // TODO: PUT updated file (commit) referencing the retrieved sha + gh.branch.
      // TODO: trigger the deploy workflow (workflow_dispatch) and capture run id.
      // TODO: idempotency.put(input.idempotencyKey, result) BEFORE returning.
      void gh;
      throw new Error("not implemented");
    },
  };
}
