"use client";

import { useCallback } from "react";

import { track } from "@/lib/analytics/events";

export interface CtaTracker {
  /** Attach to a CTA's `onClick`. Fire-and-forget; never blocks navigation. */
  onCtaClick: (label: string, destination: string) => void;
}

/**
 * Reports which homepage CTA was pressed and where it pointed.
 *
 * Deliberately **not** `trackThenNavigate`: that helper delays navigation by
 * up to 150ms so a beacon can leave, which is the right trade for the single
 * booking conversion but the wrong one for the dozen ordinary section links on
 * this page — a page where every link costs a tenth of a second feels broken.
 * These are `next/link` client-side navigations, so the document is not torn
 * down and a plain `dataLayer.push` survives the transition anyway.
 *
 * Consent is enforced inside `track()`, not here.
 */
export function useCtaTracking(section: string): CtaTracker {
  const onCtaClick = useCallback(
    (label: string, destination: string) => {
      track("home_section_cta_clicked", { section, label, destination });
    },
    [section],
  );

  return { onCtaClick };
}
