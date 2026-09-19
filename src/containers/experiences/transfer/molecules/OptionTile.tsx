"use client";

import type { ReactNode } from "react";

import { Box } from "@/components/atoms/Box";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { radiusTokens } from "@/theme/tokens";

export interface OptionTileProps {
  name: string;
  value: string;
  checked: boolean;
  onSelect: () => void;
  title: string;
  hint?: string;
  icon?: IconName;
  /** Right-aligned detail, e.g. a price. */
  aside?: ReactNode;
}

const tileSx = {
  position: "relative",
  display: "flex",
  alignItems: "flex-start",
  gap: 3,
  p: { xs: 3, sm: 4 },
  height: "100%",
  cursor: "pointer",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: `${radiusTokens.md}px`,
  bgcolor: "background.default",
  transition: "border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease",
  "&:hover": { borderColor: "primary.main" },
  "&:has(input:checked)": { borderColor: "primary.main", bgcolor: "action.selected" },
  "&:has(input:focus-visible)": {
    outline: "2px solid",
    outlineColor: "primary.main",
    outlineOffset: 2,
  },
  "@media (prefers-reduced-motion: reduce)": { transition: "none" },
} as const;

/**
 * A card-sized radio: a native `<input type="radio">` inside its `<label>`,
 * visually hidden but still focusable and arrow-key navigable, so the whole
 * tile is the hit area and a group of them behaves exactly like a radio
 * group for keyboard and screen-reader users. The checked state is styled
 * with `:has(input:checked)`, so there is no second source of truth.
 *
 * Shared by the service and vehicle pickers. Theme tokens only, so it reads
 * correctly in light and dark mode.
 */
export function OptionTile({
  name,
  value,
  checked,
  onSelect,
  title,
  hint,
  icon,
  aside,
}: OptionTileProps) {
  return (
    <Box component="label" sx={tileSx}>
      <Box
        component="input"
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onSelect}
        sx={{ position: "absolute", opacity: 0, width: 1, height: 1, m: 0 }}
      />
      {icon && (
        <Icon
          name={icon}
          aria-hidden
          sx={{ color: checked ? "primary.main" : "text.secondary", mt: "2px" }}
        />
      )}
      <Box sx={{ flex: 1, minWidth: 0, display: "grid", gap: 0.5 }}>
        <Text variant="subtitle2" component="span">
          {title}
        </Text>
        {hint && (
          <Text variant="body2" component="span" color="text.secondary" sx={{ textWrap: "pretty" }}>
            {hint}
          </Text>
        )}
      </Box>
      {aside}
      <Icon
        name="check-circle"
        aria-hidden
        fontSize="small"
        sx={{ color: "primary.main", opacity: checked ? 1 : 0, transition: "opacity 160ms ease" }}
      />
    </Box>
  );
}
