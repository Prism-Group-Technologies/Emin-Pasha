import type { ReactNode } from "react";

import Box from "@mui/material/Box";

import { type RevealDirection, revealSx } from "@/theme/motion";

export interface RevealProps {
  children: ReactNode;
  /** Stagger between siblings in a grid — DESIGN_DIRECTION.md §B.5. */
  index?: number;
  /** Where the element travels from. `left`/`right` apply from `md` up. */
  direction?: RevealDirection;
  /** Photography settles down from a slight scale instead of lifting. */
  media?: boolean;
  /**
   * Makes the wrapper fill its grid/flex track.
   *
   * This element sits between a grid item and the card inside it, so a card
   * asking for `height: 100%` otherwise resolves against an auto-height div
   * and every card in the row ends up a different height.
   */
  fill?: boolean;
}

/**
 * Scroll reveal for a subtree that has no element of its own to style — a
 * `.map()` over cards, or a group of siblings that should move together.
 *
 * **Prefer `revealSx` to this component.** Anything that already renders a
 * styled element should spread the mixin into its own `sx` and skip the extra
 * DOM node; `Reveal` exists for the cases where there is genuinely nothing to
 * attach to. Both paths share one implementation, so they cannot drift.
 *
 * A Server Component that ships no JavaScript — see `theme/motion.ts` for why
 * the whole effect is CSS, how it degrades in browsers without scroll-driven
 * animations, and why lateral motion collapses to a vertical rise below `md`.
 */
export function Reveal({
  children,
  index = 0,
  direction = "up",
  media = false,
  fill = false,
}: RevealProps) {
  return <Box sx={revealSx({ direction, index, media, fill })}>{children}</Box>;
}
