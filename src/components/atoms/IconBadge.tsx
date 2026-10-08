import Box from "@mui/material/Box";

import { Icon, type IconName } from "@/components/atoms/Icon";
import { colorTokens, radiusTokens } from "@/theme/tokens";

export type IconBadgeTone = "copper" | "gold" | "maroon";

export interface IconBadgeProps {
  name: IconName;
  tone?: IconBadgeTone;
  /** Diameter in px. Default 48. */
  size?: number;
}

const TONE: Record<IconBadgeTone, { bg: string; fg: string }> = {
  copper: { bg: colorTokens.copper[50], fg: colorTokens.copper[700] },
  gold: { bg: colorTokens.gold[50], fg: colorTokens.gold[700] },
  maroon: { bg: colorTokens.maroon[50], fg: colorTokens.maroon[800] },
};

/**
 * An icon glyph centred in a soft tinted disc — the warm-contemporary
 * replacement for the bare gold-rule motif on amenity and benefit lists.
 *
 * The tint stops (`copper.50` / `gold.50` / `maroon.50`) are background-only
 * and carry their paired foreground past AA — 6.62:1, 6.48:1 and 9.30:1
 * respectively (see `theme/tokens.ts`). The glyph is
 * `aria-hidden`: every call site pairs it with a real text label, so the
 * badge is decoration over that label.
 */
export function IconBadge({ name, tone = "copper", size = 48 }: IconBadgeProps) {
  const { bg, fg } = TONE[tone];
  return (
    <Box
      aria-hidden
      sx={{
        flexShrink: 0,
        width: size,
        height: size,
        display: "grid",
        placeItems: "center",
        borderRadius: `${radiusTokens.pill}px`,
        bgcolor: bg,
        color: fg,
      }}
    >
      <Icon name={name} sx={{ fontSize: Math.round(size * 0.46) }} />
    </Box>
  );
}
