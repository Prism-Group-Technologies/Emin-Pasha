"use client";

import { forwardRef } from "react";

import MuiChip, { type ChipProps as MuiChipProps } from "@mui/material/Chip";

export type ChipProps = MuiChipProps;

/** Radius capped at `radius-sm` via `theme/components.ts` — never MUI's default full pill. */
export const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(props, ref) {
  return <MuiChip ref={ref} {...props} />;
});
