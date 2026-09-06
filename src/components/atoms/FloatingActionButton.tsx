import type { ReactNode } from "react";

import Fab from "@mui/material/Fab";
import type { SxProps, Theme } from "@mui/material/styles";

import {
  brandColorTokens,
  colorTokens,
  easingTokens,
  motionTokens,
  shadowTokens,
} from "@/theme/tokens";

export type FloatingActionTone = "brand" | "whatsapp";

/**
 * Both tones are **static** values, never `(theme) => …` callbacks. This atom
 * is rendered from a Server Component (the WhatsApp action is a plain anchor
 * and costs no client JS), and a function cannot cross the Server→Client
 * boundary as a prop into MUI's own client components — DECISIONS.md D22, the
 * same constraint `SkipLink` documents. Palette *strings* (`primary.main`)
 * are fine: MUI resolves those to CSS variables, so `brand` still repaints
 * itself between light and dark without any callback.
 *
 * `brand` reuses `primary.main` on `primary.contrastText` — the exact pair
 * `SkipLink` and the primary `Button` already use, so the control reads as
 * part of the same family. Gold-on-ink measures 8.1:1 for the glyph and is
 * identical in both schemes; the `gold.700` hairline is there because gold
 * itself is only 2.2:1 against sand.50, so without it the button's *edge*
 * would be invisible on a light page (WCAG 1.4.11 again).
 */
const TONE_STYLES: Record<FloatingActionTone, Record<string, unknown>> = {
  brand: {
    bgcolor: "primary.main",
    color: "primary.contrastText",
    border: `1px solid ${colorTokens.gold[700]}`,
    "&:hover": { bgcolor: colorTokens.gold[300] },
  },
  whatsapp: {
    bgcolor: brandColorTokens.whatsapp.main,
    color: brandColorTokens.whatsapp.glyph,
    border: `1px solid ${brandColorTokens.whatsapp.ring}`,
    "&:hover": { bgcolor: brandColorTokens.whatsapp.hover },
  },
};

export interface FloatingActionButtonProps {
  /** Required — a control with only a glyph inside must always carry a name. */
  "aria-label": string;
  /** The glyph. */
  children: ReactNode;
  tone?: FloatingActionTone;
  /** Renders an anchor; `http(s)` targets get the new-tab safety `rel`. */
  href?: string;
  onClick?: () => void;
  /**
   * Painted out and lifted from the tab order when false.
   *
   * `visibility: hidden`, not opacity alone — an invisible button whose
   * buttons stay tabbable is both an axe failure (`aria-hidden-focus`) and a
   * real keyboard trap, which is the bug `StickyBookingBar` documents having
   * shipped once already. The `visibility` transition is delayed by the fade
   * duration on the way out so the element is still painted while it fades,
   * and switches instantly on the way in.
   */
  visible?: boolean;
  sx?: SxProps<Theme>;
}

/**
 * A circular, elevated control that floats over page content — the shared
 * shell behind every member of the floating dock.
 *
 * Sized 48px at `md` and 56px from `lg`: comfortably past the 44×44 minimum
 * WCAG 2.5.5 asks for, and scaled with the viewport rather than fixed, so it
 * stays proportionate on a 13" laptop and does not shrink into the corner of
 * a large display.
 *
 * The two shadow values are the design system's only two (DESIGN_DIRECTION.md
 * §B.4) — resting and lifted — rather than a bespoke elevation, which is also
 * why MUI's own `Fab` elevation is overridden here: the theme's disciplined
 * `shadows` array renders every level below 24 as `none`, so an un-styled Fab
 * would float with no shadow at all.
 */
export function FloatingActionButton({
  "aria-label": ariaLabel,
  children,
  tone = "brand",
  href,
  onClick,
  visible = true,
  sx,
}: FloatingActionButtonProps) {
  const linkProps = href
    ? {
        component: "a" as const,
        href,
        ...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {}),
      }
    : {};

  return (
    <Fab
      aria-label={ariaLabel}
      onClick={onClick}
      {...linkProps}
      sx={[
        {
          width: { md: 48, lg: 56 },
          height: { md: 48, lg: 56 },
          minHeight: 0,
          boxShadow: shadowTokens.hover,
          opacity: visible ? 1 : 0,
          visibility: visible ? "visible" : "hidden",
          transform: visible ? "scale(1)" : "scale(0.8)",
          transition: [
            `opacity ${motionTokens.navFade}ms ${easingTokens.emin}`,
            `transform ${motionTokens.navFade}ms ${easingTokens.emin}`,
            `box-shadow ${motionTokens.buttonHover}ms ${easingTokens.emin}`,
            `visibility 0s linear ${visible ? "0ms" : `${motionTokens.navFade}ms`}`,
          ].join(", "),
          "&:hover": { boxShadow: shadowTokens.modal },
          // The scale-in is decorative; under `reduce` the control simply is
          // or is not there, with no growth and no travel (CLAUDE.md §10).
          "@media (prefers-reduced-motion: reduce)": {
            transition: "none",
            transform: "none",
          },
        },
        TONE_STYLES[tone],
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Fab>
  );
}
