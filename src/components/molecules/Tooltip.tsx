"use client";

import MuiTooltip, { type TooltipProps as MuiTooltipProps } from "@mui/material/Tooltip";

export type TooltipProps = MuiTooltipProps;

/** Appears on hover AND keyboard focus (MUI's native behaviour) — never hover-only (CLAUDE.md §7). */
export function Tooltip(props: TooltipProps) {
  return <MuiTooltip {...props} />;
}
