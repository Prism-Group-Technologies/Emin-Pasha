import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  type ConsentCategory,
  type ConsentPreferences,
  type ConsentRecord,
  defaultConsentRecord,
  isValidConsentRecord,
} from "@/types/consent";

interface ConsentState {
  record: ConsentRecord;
  /** True while the preferences dialog is open — UI state, not persisted. */
  preferencesOpen: boolean;
  decide: (preferences: Omit<ConsentPreferences, "necessary">) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  reset: () => void;
}

function decided(analytics: boolean, marketing: boolean): ConsentRecord {
  return {
    preferences: { necessary: true, analytics, marketing },
    decidedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
}

/**
 * Thin store (CLAUDE.md §5.4) — client/UI state only, never server data.
 * Verified against zustand@5.0.14: `persist` + `createJSONStorage` are the
 * installed middleware's own exported names, and `store.persist.hasHydrated()`
 * is what `useCookieConsent` gates rendering on.
 *
 * `merge` re-validates whatever came out of localStorage rather than
 * trusting it: a stale or hand-edited record (wrong version, `necessary`
 * flipped off, missing field) falls back to defaults, which re-shows the
 * banner instead of silently running scripts on an unparseable "consent".
 */
export const useConsentStore = create<ConsentState>()(
  persist(
    (set) => ({
      record: defaultConsentRecord,
      preferencesOpen: false,
      decide: ({ analytics, marketing }) =>
        set({ record: decided(analytics, marketing), preferencesOpen: false }),
      openPreferences: () => set({ preferencesOpen: true }),
      closePreferences: () => set({ preferencesOpen: false }),
      reset: () => set({ record: defaultConsentRecord, preferencesOpen: false }),
    }),
    {
      name: CONSENT_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: CONSENT_VERSION,
      partialize: (state) => ({ record: state.record }),
      merge: (persisted, current) => {
        const candidate = (persisted as { record?: unknown } | undefined)?.record;
        return {
          ...current,
          record: isValidConsentRecord(candidate) ? candidate : defaultConsentRecord,
        };
      },
    },
  ),
);

/**
 * The typed gate every later step must call before loading a third-party
 * script (CLAUDE.md §6.5/§8). Reads the store outside React so it can be
 * used from a `next/script` loader or an effect, not just a component.
 * Returns false until a decision has actually been recorded.
 */
export function hasConsent(category: ConsentCategory): boolean {
  const { record } = useConsentStore.getState();
  if (category === "necessary") {
    return true;
  }
  return record.decidedAt !== null && record.preferences[category];
}
