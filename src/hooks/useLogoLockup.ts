import { useMemo } from "react";

import { brandLockupSizes, brandLockupWidth } from "@/config/brand";
import { easingTokens, motionTokens } from "@/theme/tokens";

export interface UseLogoLockupArgs {
  condensed: boolean;
}

/** Plain values only — no MUI types, so the hook stays outside the boundary. */
export interface LogoLockup {
  width: { xs: number; md: number };
  sizes: string;
  transition: string;
}

/**
 * Every derived value the brand lock-up renders from, in one place.
 *
 * `Logo` and `BrandMark` are presentational — props in, JSX out (CLAUDE.md
 * §5.4) — so the header's scrolled state is resolved to measurements here
 * instead of being re-derived with ternaries at each call site.
 *
 * This used to take a `variant` and return four colour and type values with
 * it. Those existed for the live-text wordmark, which resolved MUI palette
 * *paths* so it could answer the light/dark colour scheme with no JS. The
 * delivered lock-up carries its wordmark as artwork, so that job moved into
 * the asset — `variant` now picks between two derived files inside
 * `BrandMark` (see `scripts/derive-logo.ts`) rather than between two palette
 * paths, and there is nothing left for this hook to derive from it.
 */
export function useLogoLockup({ condensed }: UseLogoLockupArgs): LogoLockup {
  return useMemo(
    () => ({
      width: condensed ? brandLockupWidth.condensed : brandLockupWidth.expanded,
      sizes: brandLockupSizes,
      // Matches the header's own condense timing so the lock-up and the bar
      // resize as one movement rather than two. `width`/`height` only now —
      // `font-size`, `opacity` and `color` animated the wordmark that is no
      // longer text, and a transition naming properties nothing changes is a
      // lie the next reader has to disprove.
      transition: ["width", "height"]
        .map((prop) => `${prop} ${motionTokens.navFade}ms ${easingTokens.emin}`)
        .join(", "),
    }),
    [condensed],
  );
}
