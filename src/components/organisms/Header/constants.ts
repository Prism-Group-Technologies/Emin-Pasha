import { easingTokens, motionTokens } from "@/theme/tokens";

/**
 * Header heights are fixed numbers, not content-driven, for one reason: the
 * header is `position: fixed`, and the spacer that reserves room for it below
 * is sized from `HEADER_HEIGHT` at render time on the server. Both the
 * expanded and condensed heights therefore have to be knowable without
 * measuring the DOM, or the reserved space would be wrong on first paint and
 * the page would shift (CLAUDE.md §8, CLS ≤ 0.05).
 */
export const HEADER_HEIGHT = { xs: 72, md: 96 } as const;
export const HEADER_HEIGHT_CONDENSED = { xs: 56, md: 64 } as const;

/** Mobile-only sticky action bar — its height is reserved at the page foot. */
export const STICKY_BAR_HEIGHT = 64;

/**
 * The one breakpoint at which the site swaps mobile chrome for desktop
 * chrome: drawer + sticky action bar below it, horizontal nav bar + utility
 * row above it. Every surface that takes a side in that swap imports this
 * rather than naming a breakpoint of its own, so the drawer can never be
 * showing at a width where the bar is also trying to.
 *
 * **It is `lg` (1200px), not `md` (900px), and that is a measured number.**
 * The bar's six entries, their disclosures, the lock-up, the utility icons
 * and the BOOK NOW button have an intrinsic width — measured in headless
 * Chrome against the live route, not estimated:
 *
 * | part                                       | old `md` | new `lg` |
 * | ------------------------------------------ | -------: | -------: |
 * | lock-up                                    |    200px |    168px |
 * | primary nav (labels + disclosures)         |   1014px |    751px |
 * | utility row (phone, WhatsApp, toggle, CTA) |    235px |    177px |
 * | toolbar gaps (2 × 8px)                     |     16px |     16px |
 * | **total**                                  | **1465px** | **1112px** |
 *
 * The old `md` switch therefore asked a 900px viewport — 876px of container
 * — to seat 1465px of nowrap content, and still came up ~70px short on a
 * 1512px MacBook. Flexbox cannot refuse: the lock-up link and the nav box
 * shrank below their contents, and their children — all `white-space:
 * nowrap` — spilled straight over their neighbours, which is why a 13" laptop
 * showed the lock-up printed through ACCOMMODATION and CONTACT printed
 * through the phone icon. That is the overlap this constant exists to make
 * structurally impossible, and it is why the breakpoint is derived from the
 * content's own width rather than from a device class: the bar now appears
 * only once there is room for it.
 *
 * At the narrowest width that shows the bar — a 1200px viewport, so 1176px
 * of container — that leaves 64px spare. Verified with no collision and no
 * overflow at 320, 360, 375, 390, 412, 768, 820, 900, 1024, 1180, 1199,
 * 1200, 1240, 1280, 1366, 1440, 1512, 1535, 1536, 1600, 1920 and 2560.
 *
 * 64px is one short entry's worth: **a seventh entry in `headerNavigation`
 * would consume all but a few pixels of it**, and a few pixels is not a
 * margin when the labels may be painted in a fallback face before Inter
 * loads. `headerData.test.ts` asserts the budget, with that fallback held
 * back as reserve, so a seventh entry lands as a failing test rather than
 * as a broken header.
 */
export const NAV_BREAKPOINT = "lg" as const;

export type NavBreakpoint = typeof NAV_BREAKPOINT;

/**
 * Builds the `{ xs, lg }` responsive value for any property that takes a
 * side in that swap, so `NAV_BREAKPOINT` is named once and the two halves
 * can never drift apart. Returns a plain object, so it stays usable from a
 * Server Component (DECISIONS.md D22 forbids the callback form of `sx`).
 */
export function atNav<T>(below: T, above: T): { xs: T } & Record<NavBreakpoint, T> {
  return { xs: below, [NAV_BREAKPOINT]: above } as { xs: T } & Record<NavBreakpoint, T>;
}

/**
 * The bar's horizontal budget, as tokens rather than as numbers scattered
 * across four components.
 *
 * Two bands, not one. Between `lg` and `xl` the bar is working with
 * 1152–1488px of container and has to be compact; from `xl` up there is
 * room to let it breathe back out to the drawn design. Everything here is a
 * step between those two states.
 */
export const NAV_METRICS = {
  /** Between the lock-up, the nav and the utility row. */
  toolbarGap: { xs: 2, lg: 2, xl: 4 },
  /** Between one top-level entry and the next. */
  itemGap: { lg: 2.25, xl: 3.5 },
  /** Between an entry's label and its disclosure chevron. */
  triggerGap: { lg: 0.25, xl: 0.5 },
  /**
   * Between the utility row's own members. Unlike the two above it needs an
   * `xs`: the row is the one part of the bar that renders on *both* sides of
   * `NAV_BREAKPOINT` — below it the phone and WhatsApp icons drop out but
   * the theme toggle and BOOK NOW stay — so leaving the base out would have
   * closed the gap on mobile as a side effect of tightening the desktop bar.
   */
  utilityGap: { xs: 1, lg: 0.25, xl: 1 },
  /** Lead-in before BOOK NOW, which sets it apart from the icon cluster. */
  ctaOffset: { xs: 2, lg: 1, xl: 2 },
} as const;

/**
 * Nav label type, overriding the `overline` variant the triggers render as.
 *
 * `overline` is a 13px/0.18em display role — at six entries that tracking
 * alone is ~155px of the bar's width, more than the lock-up costs. Caps need
 * *some* tracking to stay legible, but the typographic range for that is
 * roughly 0.05–0.08em; 0.18em was spending a quarter of the nav's width on
 * air. Stepping to 12px/0.08em under `xl` and 13px/0.1em above it recovers
 * the width while keeping the labels unmistakably tracked caps.
 *
 * Nothing here goes below 12px, and the labels remain `rem`-based, so a
 * visitor's own text-size setting still scales them (WCAG 1.4.4).
 */
export const NAV_LABEL_TYPE = {
  fontSize: { lg: "0.75rem", xl: "0.8125rem" },
  letterSpacing: { lg: "0.08em", xl: "0.1em" },
} as const;

/**
 * The disclosure chevron's box.
 *
 * It was a 44px square — five of them, 220px, a fifth of the whole bar — on
 * the reasoning that every control here clears the 44px AAA target
 * (WCAG 2.5.5). But this control is pointer-only: it renders from
 * `NAV_BREAKPOINT` up, is never shown on a touch viewport, and on a touch
 * viewport the same sections are opened by the drawer's full-width rows
 * instead. For a pointer the governing criterion is 2.5.8 Target Size
 * (Minimum), which is 24×24 — and the `height` below stays at 44 regardless,
 * so the box is only narrowed, never shortened.
 */
export const NAV_CHEVRON_SIZE = { width: 26, height: 44 } as const;

/**
 * How far the chevron's *hit area* extends past its box, to the right only.
 *
 * A 26px-wide box is fine for a mouse and clears WCAG 2.5.8, but a 1366px
 * iPad in landscape is both wide enough to get the desktop bar and a touch
 * device — so the control should still be a comfortable 44px to a finger.
 * An absolutely-positioned `::after` gives it that without the box itself
 * growing, which is the whole point: widening the box would put 90px back
 * into a budget with 24px to spare, and would do it on *every* device to
 * serve one.
 *
 * Rightwards only, and 16 rather than 18. Leftwards it would swallow the
 * last few characters of its own section link, which is a different
 * destination; rightwards it reaches into `itemGap` (18px at `lg`) and stops
 * 2px short of the next entry.
 */
export const NAV_CHEVRON_HIT_INSET = "0 -16px 0 0";

export const HEADER_TRANSITION = [
  `height ${motionTokens.navFade}ms ${easingTokens.emin}`,
  `background-color ${motionTokens.navFade}ms ${easingTokens.emin}`,
  `border-color ${motionTokens.navFade}ms ${easingTokens.emin}`,
  `color ${motionTokens.navFade}ms ${easingTokens.emin}`,
].join(", ");

/**
 * The header floats over a full-bleed hero video, and "fully transparent"
 * cannot on its own guarantee the 4.5:1 the nav links need (CLAUDE.md
 * §6.2/§10) — the contrast of white-on-video depends on the frame, which CSS
 * cannot know. This `ink/900` scrim holds a near-constant 0.62 across the
 * band the nav actually occupies before falling away, which is as far as a
 * scrim can go without becoming an opaque bar and defeating the floating
 * treatment the brief asks for.
 *
 * **The scrim is necessary but not sufficient.** Measured against a
 * worst-case white video frame, `sand/50` text over a 0.62 scrim is ~2.4:1 —
 * a fail. AA at this transparency is therefore a **requirement on the
 * footage**, not on this file: the top ~140px of the hero video must be
 * graded dark. Registered as TODO(EMIN-Q69) against the Q43 video delivery,
 * and logged as DECISIONS.md D26.
 */
export const HERO_SCRIM = [
  "linear-gradient(180deg,",
  "rgba(8,5,3,0.68) 0%,",
  "rgba(8,5,3,0.62) 55%,",
  "rgba(8,5,3,0.30) 85%,",
  "rgba(8,5,3,0) 100%)",
].join(" ");

/**
 * `sizes` for a mega-menu panel thumbnail. The panel only exists at `md` and
 * up, so the first clause tells the browser the image is never painted below
 * 900px and no candidate is fetched there at all; above that a card is roughly
 * a fifth of a container that itself caps at the `xl` breakpoint.
 */
export const PANEL_IMAGE_SIZES = "(max-width: 899px) 0px, (max-width: 1536px) 20vw, 300px";

/**
 * `sizes` for a drawer row thumbnail — a fixed 88px square, so it is stated
 * as a fixed size rather than a viewport fraction. 2x covers retina.
 */
export const DRAWER_IMAGE_SIZES = "176px";
