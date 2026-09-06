"use client";

import { forwardRef } from "react";

import MuiTextField, { type TextFieldProps } from "@mui/material/TextField";

export type TextareaProps = Omit<TextFieldProps, "variant" | "multiline"> & {
  minRows?: number;
  maxRows?: number;
};

/** A multi-line text field — same conventions as `TextInput`. */
export const Textarea = forwardRef<HTMLInputElement, TextareaProps>(function Textarea(
  { minRows = 4, ...props },
  ref,
) {
  return <MuiTextField inputRef={ref} variant="outlined" multiline minRows={minRows} {...props} />;
});
