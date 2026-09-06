/**
 * Cookie-consent model — CLAUDE.md §6.5 ("granular categories: necessary /
 * analytics / marketing, no scripts before consent, choice persisted,
 * reopenable from the footer").
 *
 * **Why this is not a Zod schema.** CLAUDE.md §4 puts Zod on forms, env
 * vars, content files and API payloads. A consent record is none of those:
 * it is a three-field object read back from `localStorage` on the client, in
 * a module (`stores/consentStore.ts`) that the header and footer both pull
 * into the first-load bundle. Importing Zod here costs **65 KB gzipped on
 * every route** — measured, not estimated — to validate three booleans and a
 * date string. The hand-written guard below does the same job in a dozen
 * lines. See DECISIONS.md D25.
 */
export type ConsentCategory = "necessary" | "analytics" | "marketing";

/** The two categories a visitor can actually toggle. */
export const optionalConsentCategories = ["analytics", "marketing"] as const;
export type OptionalConsentCategory = (typeof optionalConsentCategories)[number];

export interface ConsentPreferences {
  /** Always `true` — not a choice, and deliberately not representable as false. */
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

/**
 * `decidedAt: null` means "banner not answered yet" — distinct from
 * "answered, everything rejected", which is an ISO timestamp with both
 * optional categories false. Scripts must key off `decidedAt !== null`,
 * never off the flags alone.
 */
export interface ConsentRecord {
  preferences: ConsentPreferences;
  decidedAt: string | null;
  version: number;
}

/** Bump when the cookie categories change — invalidates stored consent. */
export const CONSENT_VERSION = 1;

export const CONSENT_STORAGE_KEY = "emin-pasha-consent";

export const defaultConsentRecord: ConsentRecord = {
  preferences: { necessary: true, analytics: false, marketing: false },
  decidedAt: null,
  version: CONSENT_VERSION,
};

/**
 * Validates a record read back from storage. Anything that fails — a stale
 * version, a hand-edited `necessary: false`, a missing field, a non-object —
 * is rejected, which re-shows the banner rather than letting an unparseable
 * value be treated as consent.
 */
export function isValidConsentRecord(value: unknown): value is ConsentRecord {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const record = value as Partial<ConsentRecord>;
  const prefs = record.preferences;
  return (
    record.version === CONSENT_VERSION &&
    (record.decidedAt === null || typeof record.decidedAt === "string") &&
    typeof prefs === "object" &&
    prefs !== null &&
    prefs.necessary === true &&
    typeof prefs.analytics === "boolean" &&
    typeof prefs.marketing === "boolean"
  );
}
