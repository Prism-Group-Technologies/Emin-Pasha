"use client";

import { forwardRef } from "react";

import MenuItem from "@mui/material/MenuItem";
import MuiTextField, { type TextFieldProps } from "@mui/material/TextField";

export interface SelectOption {
  value: string | number;
  label: string;
}

export type SelectFieldProps = Omit<TextFieldProps, "variant" | "select"> & {
  options: SelectOption[];
};

/**
 * A select field — built on `TextField select` (MUI's own composition of
 * `Select` + label/helper/error, verified against installed @mui/material@6.5.0),
 * not a raw `Select`, so it keeps the same label/error/description API as
 * `TextInput`.
 */
export const SelectField = forwardRef<HTMLInputElement, SelectFieldProps>(function SelectField(
  { options, children, ...props },
  ref,
) {
  return (
    <MuiTextField inputRef={ref} variant="outlined" select {...props}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
      {children}
    </MuiTextField>
  );
});
