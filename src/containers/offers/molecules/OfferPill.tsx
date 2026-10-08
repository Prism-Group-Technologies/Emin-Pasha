import type { ReactNode } from "react";

import { Box } from "@/components/atoms/Box";
import { colorTokens } from "@/theme/tokens";

export type OfferPillTone = "overlay" | "gold" | "copper" | "maroon";

const { gold, ink, sand, copper, maroon } = colorTokens;

/**
 * Fixed pairs, identical in both colour schemes on purpose: each pill carries
 * its own ground, so it needs no scheme switch to stay legible.
 *
 * `overlay` is the translucent ink used over photography. `gold` is the brand
 * gold under an ink label (9.28:1) — gold can never take a white one. `copper`
 * is the darkened copper under white (7.03:1), the same fill the contained
 * button uses. `maroon` is the brand maroon under white (9.93:1), and is the
 * pill that marks a saving or a closed date: a small, meaningful use of a
 * colour the system otherwise keeps in reserve.
 */
const TONE: Record<OfferPillTone, { bg: string; fg: string }> = {
  overlay: { bg: "rgba(8,5,3,0.72)", fg: sand[50] },
  gold: { bg: gold[300], fg: ink[900] },
  copper: { bg: copper[700], fg: ink.contrastCopy },
  maroon: { bg: maroon[800], fg: ink.contrastCopy },
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
