import { z } from "zod";

/**
 * Merchandising copy for the header's mega-menu panels — the one-line
 * descriptions, section intros and "view all" labels that turn a bare list of
 * hrefs into something worth reading.
 *
 * This is **interface copy, not source-of-truth copy**, and it follows the
 * same rule `shell.ts` follows: every line is written to the §2 tone of voice
 * and carries **no factual claim** — no hours, rates, capacities, distances,
 * awards or superlatives. Where a line paraphrases an approved description
 * (docs/02_CONTENT_SOURCE_OF_TRUTH.md §4–§9) it stays a paraphrase and stays
 * short, because `check:content` rule 4 rejects any string of 60+ characters
 * duplicated across two content modules — restating approved prose verbatim
 * here would fail the build, and rightly so: the fact lives in one place.
 *
 * Status: TODO(EMIN-Q70) — needs client sign-off, exactly as `shell.ts` is
 * pending under TODO(EMIN-Q68).
 */
export const navPanelCopySchema = z.object({
  /** Small caps label above the intro — usually the section's own name. */
  eyebrow: z.string().min(1),
  /** One sentence that frames the section. Kept under ~60 characters. */
  intro: z.string().min(1),
  /** Accessible, specific label for the link to the section index. */
  viewAllLabel: z.string().min(1),
  /** Child href → one-line description. A child may legitimately have none. */
  descriptions: z.record(z.string(), z.string().min(1)),
  /** Child href → `assets.ts` id, for the panel thumbnail. May be partial. */
  assetIds: z.record(z.string(), z.string().min(1)),
});

export type NavPanelCopy = z.infer<typeof navPanelCopySchema>;
