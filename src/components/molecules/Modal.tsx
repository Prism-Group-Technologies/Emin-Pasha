"use client";

import type { ReactNode } from "react";

import MuiDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { Icon } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

/**
 * A dialog — `radius-lg`/`shadow-modal` via `theme/components.ts` (elevation
 * 24, DECISIONS.md D14). MUI's `Dialog` traps focus and restores it to the
 * trigger on close natively; Escape closes it.
 */
export function Modal({ open, onClose, title, children, actions }: ModalProps) {
  return (
    <MuiDialog open={open} onClose={onClose} aria-labelledby="modal-title" fullWidth maxWidth="sm">
      <DialogTitle
        id="modal-title"
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        {title}
        <IconButton aria-label="Close dialog" onClick={onClose} size="small">
          <Icon name="close" fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </MuiDialog>
  );
}
