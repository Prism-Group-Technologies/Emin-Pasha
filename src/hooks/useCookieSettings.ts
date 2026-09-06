"use client";

import { useConsentStore } from "@/stores/consentStore";

/**
 * The footer's one line of state: reopening the consent preferences dialog
 * (CLAUDE.md §6.5 — a visitor who has already accepted must be able to change
 * their mind).
 *
 * Thin on purpose. `CookieSettingsButton` is a presentational leaf, and
 * hooks are the only place store selectors may live (`src/hooks/README.md`),
 * so the subscription belongs here rather than inline in the component —
 * which also means the button can be rendered in a test without a store.
 */
export function useCookieSettings() {
  const openPreferences = useConsentStore((state) => state.openPreferences);

  return { openPreferences };
}
