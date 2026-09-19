"use client";

import type { UseFormRegisterReturn } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { radiusTokens } from "@/theme/tokens";

export interface RadioTileProps {
  registration: UseFormRegisterReturn;
  value: string;
  label: string;
  description?: string;
  icon?: IconName;
}

const EASE = "cubic-bezier(0.16,1,0.3,1)";

const tileSx = {
  position: "relative",
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  alignItems: { xs: "flex-start", sm: "center" },
  gap: { xs: 1.5, sm: 3 },
  minHeight: 56,
  p: { xs: 3, sm: 3.5 },
  cursor: "pointer",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: `${radiusTokens.md}px`,
  bgcolor: "background.default",
  transition: `border-color 200ms ${EASE}, box-shadow 200ms ${EASE}, background-color 200ms ${EASE}`,
  "&:hover": { borderColor: "primary.main" },
  "&:has(input:checked)": {
    borderColor: "primary.main",
    boxShadow: "inset 0 0 0 1px var(--mui-palette-primary-main)",
    bgcolor: "action.selected",
  },
  "&:has(input:checked) .tile-icon": { color: "primary.main" },
  "&:has(input:focus-visible)": {
    outline: "2px solid",
    outlineColor: "primary.main",
    outlineOffset: 2,
  },
  "@media (prefers-reduced-motion: reduce)": { transition: "none" },
} as const;

/** Clip-hidden, not `display: none` — the radio must stay focusable and announced. */
const inputSx = { position: "absolute", opacity: 0, width: 1, height: 1, m: 0 } as const;

/**
 * One option in a radio group, drawn as a selectable tile. The native
 * `<input type="radio">` stays inside the `<label>`, so arrow-key navigation,
 * the checked state and the group's accessible name all come from the
 * browser; the tile only paints `:has(input:checked)` and
 * `:has(input:focus-visible)`. Stacks icon-over-label on phones and lays out
 * in a row from `sm`, where the description has room to show.
 */
export function RadioTile({ registration, value, label, description, icon }: RadioTileProps) {
  return (
    <Box component="label" sx={tileSx}>
      <Box component="input" type="radio" value={value} {...registration} sx={inputSx} />
      {icon && (
        <Icon
          name={icon}
          className="tile-icon"
          sx={{ color: "text.secondary", fontSize: 24, transition: `color 200ms ${EASE}` }}
        />
      )}
      <Box sx={{ display: "grid", gap: 0.25, minWidth: 0 }}>
        <Text variant="body2" component="span" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
          {label}
        </Text>
        {description && (
          <Text
            variant="caption"
            component="span"
            color="text.secondary"
            sx={{ display: { xs: "none", sm: "block" }, lineHeight: 1.35 }}
          >
            {description}
          </Text>
        )}
      </Box>
    </Box>
  );
}
