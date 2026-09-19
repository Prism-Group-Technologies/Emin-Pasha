import type { OptionalConsentCategory } from "@/types/consent";

/**
 * Pure helpers behind the /cookie-settings panel — no React, no store — so
 * the rules for "what counts as changed" and how a saved date reads are
 * unit-tested on their own.
 */

export type ConsentChoices = Record<OptionalConsentCategory, boolean>;

/** Necessary is always on, so the count starts at one. */
export function countActiveCategories(choices: ConsentChoices): number {
  return 1 + Number(choices.analytics) + Number(choices.marketing);
}

export function choicesDiffer(a: ConsentChoices, b: ConsentChoices): boolean {
  return a.analytics !== b.analytics || a.marketing !== b.marketing;
}

/** "15 September 2026, 14:05" — or null for no decision / an unparseable value. */
export function formatDecidedAt(iso: string | null, locale = "en-GB"): string | null {
  if (!iso) {
    return null;
  }
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return new Intl.DateTimeFormat(locale, { dateStyle: "long", timeStyle: "short" }).format(date);
}

/** Replaces `{key}` tokens from a closed values map. Unknown tokens are left intact. */
export function fillTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (token, key: string) =>
    key in values ? String(values[key]) : token,
  );
}
