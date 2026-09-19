"use client";

import { useState } from "react";

import {
  type ConsentChoices,
  choicesDiffer,
  countActiveCategories,
  formatDecidedAt,
} from "@/containers/legal/consentStatus";
import { useMounted } from "@/hooks/useMounted";
import { useConsentStore } from "@/stores/consentStore";
import type { OptionalConsentCategory } from "@/types/consent";

export type PanelStatus = "idle" | "saved";

/**
 * All state behind the /cookie-settings panel. It drives the **same** consent
 * store as the banner and the dialog, so a choice saved here is instantly the
 * site's choice everywhere.
 *
 * `ready` is false on the server and the first client pass: the persisted
 * record only exists in this browser, so rendering switches before hydration
 * would flash the defaults and mismatch. A local `draft` holds unsaved
 * toggles; `null` means "showing what is saved".
 */
export function useCookieSettingsPanel() {
  const ready = useMounted();
  const record = useConsentStore((state) => state.record);
  const decide = useConsentStore((state) => state.decide);
  const [draft, setDraft] = useState<ConsentChoices | null>(null);
  const [status, setStatus] = useState<PanelStatus>("idle");

  const saved: ConsentChoices = {
    analytics: record.preferences.analytics,
    marketing: record.preferences.marketing,
  };
  const choices = draft ?? saved;

  const commit = (next: ConsentChoices) => {
    decide(next);
    setDraft(null);
    setStatus("saved");
  };

  return {
    ready,
    choices,
    decided: record.decidedAt !== null,
    savedAt: formatDecidedAt(record.decidedAt),
    activeCount: countActiveCategories(choices),
    dirty: choicesDiffer(choices, saved),
    status,
    toggle: (id: OptionalConsentCategory, checked: boolean) => {
      setDraft({ ...choices, [id]: checked });
      setStatus("idle");
    },
    save: () => commit(choices),
    acceptAll: () => commit({ analytics: true, marketing: true }),
    rejectAll: () => commit({ analytics: false, marketing: false }),
  };
}

export type CookieSettingsPanelState = ReturnType<typeof useCookieSettingsPanel>;
