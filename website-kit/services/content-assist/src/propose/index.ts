import { z } from "zod";
import type { AllowedField } from "../fields/index.js";

/**
 * propose/: sends ONLY the field value + instruction + brand context to the
 * Claude API. No secrets, no other fields, no page structure. All input
 * (instruction, current value) is treated as untrusted and never interpreted
 * as commands — it is data inside a strict-JSON contract.
 */

export interface ProposeInput {
  field: AllowedField;
  /** Untrusted user instruction, e.g. "make this punchier". */
  instruction: string;
  /** Untrusted current field value. */
  currentValue: string;
  /** Trusted brand context from config (BRAND_CONTEXT). */
  brandContext: string;
}

/** Strict JSON we require the model to return. Anything else is rejected. */
export const ProposalSchema = z.object({
  proposedValue: z.string(),
  rationale: z.string().max(500),
});
export type Proposal = z.infer<typeof ProposalSchema>;

export interface Proposer {
  propose(input: ProposeInput): Promise<Proposal>;
}

/**
 * Build a proposer backed by the Claude API (Anthropic SDK). The API key is
 * read from config by the caller and passed in — this module never reads env.
 */
export function createClaudeProposer(_apiKey: string): Proposer {
  // TODO: new Anthropic({ apiKey: _apiKey }); use a current model id
  // (e.g. "claude-sonnet-4-6"); request strict JSON output; low temperature.
  return {
    async propose(_input: ProposeInput): Promise<Proposal> {
      // TODO: construct a prompt that:
      //   - places brandContext as trusted system guidance
      //   - clearly frames instruction + currentValue as untrusted data
      //   - asks ONLY for JSON matching ProposalSchema
      // Then ProposalSchema.parse(JSON.parse(modelText)).
      throw new Error("not implemented");
    },
  };
}
