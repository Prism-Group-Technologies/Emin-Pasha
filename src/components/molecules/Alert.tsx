"use client";

import MuiAlert, { type AlertProps as MuiAlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export type AlertProps = MuiAlertProps;

/** An inline status message — success/warning/error/info map onto `theme/palette.ts` tokens. */
export function Alert(props: AlertProps) {
  return <MuiAlert role="alert" {...props} />;
}

export interface ToastProps extends AlertProps {
  open: boolean;
  onClose: () => void;
  autoHideDuration?: number;
}

/** A transient, auto-dismissing notification — same severity tokens as `Alert`. */
export function Toast({ open, onClose, autoHideDuration = 6000, ...alertProps }: ToastProps) {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <MuiAlert role="status" onClose={onClose} {...alertProps} />
    </Snackbar>
  );
}
