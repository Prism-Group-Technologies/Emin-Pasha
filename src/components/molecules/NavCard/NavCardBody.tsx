"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Icon } from "@/components/atoms/Icon";
import { navCardArrowSx } from "@/components/molecules/NavCard/navCardStyles";
import { easingTokens, motionTokens } from "@/theme/tokens";

export interface NavCardBodyProps {
  label: string;
  description?: string;
  active: boolean;
  /** Horizontal rows let the body take the remaining width; tiles do not. */
  fill: boolean;
}

/**
 * Label, hover arrow and the optional one-line description.
 *
 * The arrow is decorative and unlabelled on purpose: the card is already one
 * link with the label as its accessible name, so an "arrow_forward" graphic
 * announcing itself would just add a second, meaningless stop. It appears on
 * hover and focus only, as an affordance for pointer users.
 */
export function NavCardBody({ label, description, active, fill }: NavCardBodyProps) {
  return (
    <Box sx={{ minWidth: 0, flex: fill ? 1 : "none" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography
          className="NavCard-label"
          component="span"
          variant="subtitle2"
          sx={{
            color: active ? "primary.main" : "text.primary",
            transition: `color ${motionTokens.buttonHover}ms ${easingTokens.emin}`,
            "@media (prefers-reduced-motion: reduce)": { transition: "none" },
          }}
        >
          {label}
        </Typography>
        <Icon name="arrow-forward" className="NavCard-arrow" sx={navCardArrowSx} />
      </Box>
      {description && (
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mt: 0.5, fontSize: "0.8125rem", lineHeight: 1.45 }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}
