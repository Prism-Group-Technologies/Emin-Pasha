"use client";

import dynamic from "next/dynamic";

import { useCookieConsent } from "@/hooks/useCookieConsent";

/**
 * Both children are `next/dynamic` with `ssr: false`, which is the whole
 * point rather than an optimisation detail: the banner is required to render
 * after LCP (CLAUDE.md §8), so its JavaScript — MUI `Dialog`, `Modal`,
 * `Switch`, `FormControlLabel` — must not be in the first-load bundle
 * either. Loading them on the idle callback costs the visitor nothing and
 * keeps ~25 KB gz off every route's critical path.
 */
const ConsentBanner = dynamic(
  () => import("@/components/organisms/CookieConsent/ConsentBanner").then((m) => m.ConsentBanner),
  { ssr: false },
);

const ConsentPreferences = dynamic(
  () =>
    import("@/components/organisms/CookieConsent/ConsentPreferences").then(
      (m) => m.ConsentPreferences,
    ),
  { ssr: false },
);

/**
 * CLAUDE.md §6.5. Renders nothing at all until the browser is both hydrated
 * and idle, so no consent markup exists during the load burst that produces
 * LCP — and, because both children are `position: fixed`, nothing it renders
 * afterwards can displace in-flow content.
 *
 * After a decision has been recorded the banner stays gone; only the
 * footer's "Cookie settings" button brings the preferences dialog back.
 *
 * 'use client' justification: reads the persisted consent store and browser
 * idle state.
 */
export function CookieConsent() {
  const consent = useCookieConsent();

  if (!consent.ready) {
    return null;
  }

  return (
    <>
      {!consent.decided && (
        <ConsentBanner
          onAcceptAll={consent.acceptAll}
          onRejectAll={consent.rejectAll}
          onManage={consent.openPreferences}
        />
      )}
      {consent.preferencesOpen && (
        <ConsentPreferences
          open
          preferences={consent.preferences}
          onClose={consent.closePreferences}
          onSave={consent.save}
        />
      )}
    </>
  );
}
