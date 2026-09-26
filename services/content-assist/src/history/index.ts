import type { FieldId } from "@web/blocks/registry";
import type { GitHubClient } from "../lib/github.js";

/**
 * history/: change log derived from git — no separate database. Each publish is
 * a commit; we read the commit history for the content file and map it to
 * change-log entries.
 */

export type ChangeStatus = "pending" | "published" | "build_failed" | "rolled_back";

export interface ChangeLogEntry {
  /** Commit sha of the change. */
  id: string;
  time: string;
  author: string;
  fieldId: FieldId;
  oldValue: string;
  newValue: string;
  status: ChangeStatus;
}

export function createHistory(gh: GitHubClient) {
  return {
    async list(_limit = 50): Promise<ChangeLogEntry[]> {
      // TODO: gh.octokit.repos.listCommits({ path: gh.contentPath }) and, per
      // commit, derive the field/old/new from the diff + commit metadata.
      void gh;
      return [];
    },
  };
}
