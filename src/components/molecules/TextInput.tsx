"use client";

import { forwardRef } from "react";

import MuiTextField, { type TextFieldProps } from "@mui/material/TextField";

export type TextInputProps = Omit<TextFieldProps, "variant" | "multiline">;

/**
 * A single-line text field. Uses MUI TextField's own `label`/`helperText`/
 * `error` props directly (not `FormField` — that wrapper is for custom
 * controls without MUI's built-in label pattern, e.g. `NumberStepper`).
 * `ref` forwards through to the `<input>` — react-hook-form's `register()`
 * spreads its `ref`/`onChange`/`onBlur`/`name` straight onto this component.
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(props, ref) {
    return <MuiTextField inputRef={ref} variant="outlined" {...props} />;
  },
);
