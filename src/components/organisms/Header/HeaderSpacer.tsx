"use client";

import Box from "@mui/material/Box";

import { HEADER_HEIGHT } from "@/components/organisms/Header/constants";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";

/**
 * Reserves the space the fixed header occupies, so page content starts below
 * it instead of underneath it.
 *
 * Two properties make this CLS-neutral (CLAUDE.md §8):
 *   1. It is always the **expanded** height, never the condensed one — the
 *      reserved box therefore never resizes while the header animates.
 *   2. `overHero` comes from `usePathname()`, which resolves during SSR, so
 *      the correct height (0 on the hero route, `HEADER_HEIGHT` elsewhere) is
 *      already in the server HTML. Nothing is measured, nothing changes on
 *      hydration.
 */
export function HeaderSpacer({ heroRoutes }: { heroRoutes: readonly string[] }) {
  const { overHero } = useHeaderScroll(heroRoutes);
  return <Box aria-hidden sx={{ height: overHero ? 0 : HEADER_HEIGHT }} />;
}
