import Box from "@mui/material/Box";

import { Icon, type IconName } from "@/components/atoms/Icon";
import { colorTokens, radiusTokens } from "@/theme/tokens";

export type IconBadgeTone = "gold" | "garden";

export interface IconBadgeProps {
  name: IconName;
  tone?: IconBadgeTone;
  /** Diameter in px. Default 48. */
  size?: number;
}

const TONE: Record<IconBadgeTone, { bg: string; fg: string }> = {
  gold: { bg: colorTokens.gold[50], fg: colorTokens.gold[800] },
  garden: { bg: colorTokens.garden[50], fg: colorTokens.garden[700] },
};

/**
 * An icon glyph centred in a soft tinted disc — the warm-contemporary
 * replacement for the bare gold-rule motif on amenity and benefit lists.
 *
 * The tint stops (`gold.50` / `garden.50`) are background-only and carry
 * their paired foreground past AA (see `theme/tokens.ts`). The glyph is
 * `aria-hidden`: every call site pairs it with a real text label, so the
 * badge is decoration over that label.
 */
export function IconBadge({ name, tone = "gold", size = 48 }: IconBadgeProps) {
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
