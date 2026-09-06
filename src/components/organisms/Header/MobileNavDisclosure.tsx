"use client";

import Box from "@mui/material/Box";

import { Icon } from "@/components/atoms/Icon";
import { easingTokens, motionTokens } from "@/theme/tokens";

export interface MobileNavDisclosureProps {
  label: string;
  controls: string;
  expanded: boolean;
  submenuHint: string;
  onToggle: () => void;
}

/**
 * The +/− control that expands one drawer section.
 *
 * It is a circle rather than a bare glyph so it reads as a control at a glance
 * and gives the thumb a target with a visible edge — at 44px it is the
 * minimum comfortable tap area, and the ring makes that area legible instead
 * of merely present. Gold border and glyph while expanded, so the open section
 * is identifiable without relying on the icon shape alone.
 *
 * The accessible label never changes; `aria-expanded` carries the state, so a
 * screen reader announces the change rather than re-reading a different name
 * for the same control.
 */
export function MobileNavDisclosure({
  label,
  controls,
  expanded,
  submenuHint,
  onToggle,
}: MobileNavDisclosureProps) {
  return (
    <Box
      component="button"
      type="button"
      aria-expanded={expanded}
      aria-controls={controls}
      aria-label={`${label} — ${submenuHint}`}
      onClick={onToggle}
      sx={{
        width: 44,
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        border: "1px solid",
        borderColor: expanded ? "primary.main" : "divider",
        borderRadius: "50%",
        background: "none",
        color: expanded ? "primary.main" : "text.primary",
        cursor: "pointer",
        transition: [
          `border-color ${motionTokens.buttonHover}ms ${easingTokens.emin}`,
          `color ${motionTokens.buttonHover}ms ${easingTokens.emin}`,
        ].join(", "),
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "primary.main",
          outlineOffset: 2,
        },
        "@media (prefers-reduced-motion: reduce)": { transition: "none" },
      }}
    >
      <Icon name={expanded ? "remove" : "add"} fontSize="small" />
    </Box>
  );
}
