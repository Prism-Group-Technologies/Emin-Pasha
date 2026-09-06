import Box from "@mui/material/Box";

export interface RuleProps {
  orientation?: "vertical" | "horizontal";
  /** CSS length for the rule's run — a fixed value, or "100%" to fill its container. */
  length?: string | number;
}

/**
 * The Equatorial Line — DESIGN_DIRECTION.md §B.6, the site's one signature
 * element. This atom is the bare 1px gold hairline only; the coordinate
 * markers and timeline behaviour it carries on specific pages are organisms
 * built on top of this, not part of the primitive. `theme.palette.primary.main`
 * (gold/500) only — never a raw hex (CLAUDE.md §5.4).
 */
export function Rule({ orientation = "vertical", length = "100%" }: RuleProps) {
  const isVertical = orientation === "vertical";
  return (
    <Box
      role="presentation"
      sx={{
        backgroundColor: "primary.main",
        width: isVertical ? "1px" : length,
        height: isVertical ? length : "1px",
        flexShrink: 0,
      }}
    />
  );
}
