"use client";

import { useEffect, useState } from "react";

import { useMounted } from "@/hooks/useMounted";
import { useConsentStore } from "@/stores/consentStore";
import type { ConsentCategory, OptionalConsentCategory } from "@/types/consent";

/**
 * Waits for the browser to go idle before reporting `ready`, so the consent
 * UI cannot mount during the load burst that produces LCP (CLAUDE.md §8 —
 * "renders after LCP"). `requestIdleCallback` is not in Safari's older
 * baseline, so a timeout fallback keeps the banner from never appearing.
 */
function useIdle(): boolean {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if (typeof window.requestIdleCallback !== "function") {
      const timeout = setTimeout(() => setIdle(true), 1000);
      return () => clearTimeout(timeout);
    }
    const handle = window.requestIdleCallback(() => setIdle(true), { timeout: 3000 });
    return () => window.cancelIdleCallback(handle);
  }, []);

  return idle;
}

export function useCookieConsent() {
  const mounted = useMounted();
  const idle = useIdle();
  const record = useConsentStore((state) => state.record);
  const preferencesOpen = useConsentStore((state) => state.preferencesOpen);
  const decide = useConsentStore((state) => state.decide);
  const openPreferences = useConsentStore((state) => state.openPreferences);
  const closePreferences = useConsentStore((state) => state.closePreferences);

  const decided = record.decidedAt !== null;

  return {
    /** Gate every consent-UI render on this — it is false on the server and
     * on the first client pass, so nothing consent-related is ever in the
     * SSR HTML and nothing can shift layout during load. */
    ready: mounted && idle,
    decided,
    preferences: record.preferences,
    preferencesOpen,
    acceptAll: () => decide({ analytics: true, marketing: true }),
    rejectAll: () => decide({ analytics: false, marketing: false }),
    save: (choices: Record<OptionalConsentCategory, boolean>) => decide(choices),
    openPreferences,
    closePreferences,
    /** Typed gate for later steps — mirrors the module-level `hasConsent`. */
    hasConsent: (category: ConsentCategory) =>
      category === "necessary" ? true : decided && record.preferences[category],
  };
}
