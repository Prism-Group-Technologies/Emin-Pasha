/**
 * ⚠️ EDITORIAL FRAMING ONLY — NOT THE POLICY ITSELF. See ./index.ts.
 *
 * The spa etiquette page renders the approved §14 "Spa etiquette" policy
 * section **verbatim** — that wording is what a guest is held to and is not
 * paraphrased. This file adds only the presentation scaffold around it: a
 * short lede, three at-a-glance facts, and an icon + a plain-language title
 * for each policy clause, matched to `policies` by position. Change the
 * policy text in `content/policies.ts`, never here.
 */
import type { IconName } from "@/components/atoms/Icon";

export const etiquetteIntro =
  "A treatment at the Swanky Spa works best when the room is calm and nothing is a surprise. These are the house rules — arrival, phones, health, ages and pool safety — set out plainly so you can read them once and forget them.";

export interface EtiquetteFact {
  value: string;
  label: string;
}

/** The three things worth knowing before you leave the house. Verified §6 / §14 facts. */
export const etiquetteFacts: EtiquetteFact[] = [
  { value: "15 min", label: "arrive before your treatment" },
  { value: "16+", label: "spa & health club minimum age" },
  { value: "1.60m", label: "pool depth · no lifeguard on duty" },
];

export interface EtiquetteRuleMeta {
  icon: IconName;
  /** Plain-language heading for the clause — the policy text sits under it. */
  title: string;
}

/**
 * One entry per clause in the `spa-etiquette` policy section, in the same
 * order. If a clause is added or reordered in `content/policies.ts`, update
 * this list to match — `EtiquetteRulesSection` zips the two together.
 */
export const etiquetteRuleMeta: EtiquetteRuleMeta[] = [
  { icon: "event", title: "Arrival" },
  { icon: "close", title: "Mobile phones" },
  { icon: "info", title: "Personal items & liability" },
  { icon: "verified", title: "Health & disclosure" },
  { icon: "groups", title: "Minimum age" },
  { icon: "warning", title: "Pool safety" },
  { icon: "error-outline", title: "Smoking" },
];
