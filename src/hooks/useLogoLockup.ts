import { useMemo } from "react";

import { brandMarkHeight, brandMarkSizes } from "@/config/brand";
import { easingTokens, motionTokens } from "@/theme/tokens";

export interface UseLogoLockupArgs {
  /** The light lock-up sits over the hero video; the dark one over the page. */
  variant: "light" | "dark";
  condensed: boolean;
}

/** Plain values only — no MUI types, so the hook stays outside the boundary. */
export interface LogoLockup {
  markHeight: { xs: number; md: number };
  markSizes: string;
  nameColor: string;
  suffixColor: string;
  nameSize: { xs: string; md: string };
  suffixHidden: boolean;
  transition: string;
}

/**
 * Every derived value the brand lock-up renders from, in one place.
 *
 * `Logo`, `BrandMark` and `LogoWordmark` are presentational — props in, JSX
 * out (CLAUDE.md §5.4) — so the two axes the lock-up actually varies on
 * (`variant`: over the hero video or over the page; `condensed`: the header's
 * scrolled state) are resolved here instead of being re-derived with
 * ternaries at three separate call sites.
 *
 * Colours are returned as MUI palette *paths*, not hex. On the `dark`
 * variant `text.primary`/`text.secondary` resolve through the CSS-variables
 * theme, so the wordmark answers the light/dark colour scheme on its own with
 * no JS and no hydration mismatch (theme/index.ts, `cssVariables`). The
 * `light` variant is pinned to `common.white` in both schemes because it sits
 * on `HERO_SCRIM`, which is dark regardless of the scheme.
 *
 * The mark itself is unfiltered in every context: it is a warm sepia
 * portrait on transparency and reads on both `sand/50` and `ink/900`, and the
 * wordmark that needed a colour is live text, not pixels (DECISIONS.md D76).
 */
export function useLogoLockup({ variant, condensed }: UseLogoLockupArgs): LogoLockup {
  return useMemo(() => {
    const light = variant === "light";
    return {
      markHeight: condensed ? brandMarkHeight.condensed : brandMarkHeight.expanded,
      markSizes: brandMarkSizes,
      nameColor: light ? "common.white" : "text.primary",
      suffixColor: light ? "common.white" : "text.secondary",
      nameSize: condensed ? { xs: "1rem", md: "1.125rem" } : { xs: "1.0625rem", md: "1.375rem" },
      suffixHidden: condensed,
      // Matches the header's own condense timing so the mark, the wordmark
      // and the bar resize as one movement rather than three.
      transition: ["height", "width", "font-size", "opacity", "color"]
        .map((prop) => `${prop} ${motionTokens.navFade}ms ${easingTokens.emin}`)
        .join(", "),
    };
  }, [variant, condensed]);
}
