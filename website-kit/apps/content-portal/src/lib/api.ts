/**
 * Typed client for content-assist. Shapes mirror the service's modules.
 * The publish/rollback calls carry the separate publish token in addition to
 * the base auth used for every call.
 */

export interface AllowedFieldDto {
  id: string;
  slug: string;
  blockType: string;
  field: string;
  currentValue: string;
}

export interface ProposalDto {
  proposedValue: string;
  rationale: string;
}

export interface PreviewDto {
  fieldId: string;
  oldValue: string;
  newValue: string;
  renderedHtml: string;
}

export interface ChangeLogEntryDto {
  id: string;
  time: string;
  author: string;
  fieldId: string;
  oldValue: string;
  newValue: string;
  status: "pending" | "published" | "build_failed" | "rolled_back";
}

export interface ContentAssistClient {
  listFields(slug: string, lang: string): Promise<AllowedFieldDto[]>;
  propose(fieldId: string, instruction: string): Promise<ProposalDto>;
  preview(fieldId: string, proposedValue: string): Promise<PreviewDto>;
  publish(fieldId: string, newValue: string, idempotencyKey: string): Promise<void>;
  history(): Promise<ChangeLogEntryDto[]>;
  rollback(commitSha: string, idempotencyKey: string): Promise<void>;
}

export function createClient(_baseUrl: string): ContentAssistClient {
  // TODO: implement fetch calls against content-assist; include auth headers,
  // and x-publish-token for publish/rollback.
  throw new Error("not implemented");
}
