"use client";

import type { ReactNode } from "react";

import MuiDrawer from "@mui/material/Drawer";

import { Icon } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  anchor?: "left" | "right" | "top" | "bottom";
  title: string;
  children: ReactNode;
}

/** A slide-out panel — mobile nav, the full-screen date-range sheet (CLAUDE.md §6.5). */
export function Drawer({ open, onClose, anchor = "right", title, children }: DrawerProps) {
  return (
    <MuiDrawer open={open} onClose={onClose} anchor={anchor} role="dialog" aria-label={title}>
      <IconButton aria-label="Close" onClick={onClose} sx={{ alignSelf: "flex-end", m: 1 }}>
        <Icon name="close" />
      </IconButton>
      {children}
    </MuiDrawer>
  );
}
