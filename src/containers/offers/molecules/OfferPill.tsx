import type { ReactNode } from "react";

import { Box } from "@/components/atoms/Box";
import { colorTokens } from "@/theme/tokens";

export type OfferPillTone = "overlay" | "gold" | "garden";

const { gold, ink, sand, garden } = colorTokens;

/**
 * Fixed pairs, identical in both colour schemes on purpose: each pill carries
 * its own ground, so it needs no scheme switch to stay legible. `overlay` is
 * the translucent ink used over photography; `gold` is gold/500 under ink/900
 * (primary + its contrastText); `garden` is garden/500 under sand/50 — the
 * only garden fill verified safe under light text (see `theme/palette.ts`).
 */
const TONE: Record<OfferPillTone, { bg: string; fg: string }> = {
  overlay: { bg: "rgba(11,11,10,0.72)", fg: sand[50] },
  gold: { bg: gold[500], fg: ink[900] },
  garden: { bg: garden[500], fg: sand[50] },
};

/**
 * A short uppercase marker — the category over a photo, the soft-urgency
 * flag ("Only 6 suites a month") or the saving ("Save 20%").
 */
export function OfferPill({
  children,
  tone = "gold",
}: {
  children: ReactNode;
  tone?: OfferPillTone;
}) {
  const { bg, fg } = TONE[tone];
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 2.5,
        py: 0.75,
        borderRadius: 999,
        bgcolor: bg,
        color: fg,
        fontFamily: "var(--font-cartographic)",
        fontSize: "0.6875rem",
        fontWeight: 600,
        letterSpacing: "0.1em",
        lineHeight: 1.3,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </Box>
  );
}
