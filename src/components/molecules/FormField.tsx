import type { ReactNode } from "react";

import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";

export interface FormFieldProps {
  /** Must match the control's `id` for the label to associate correctly. */
  htmlFor: string;
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

/**
 * Label + control + description + error, with `aria-describedby` wiring —
 * CLAUDE.md §10 ("form errors linked via `aria-describedby`"). Presentational
 * only: the control itself carries the actual react-hook-form `register`/
 * `Controller` binding (passed in as `children`), not this wrapper.
 */
export function FormField({
  htmlFor,
  label,
  description,
  error,
  required,
  children,
}: FormFieldProps) {
  const descriptionId = description ? `${htmlFor}-description` : undefined;
  const errorId = error ? `${htmlFor}-error` : undefined;

  return (
    <Stack spacing={0.5}>
      <FormLabel htmlFor={htmlFor} required={required} error={Boolean(error)}>
        {label}
      </FormLabel>
      {children}
      {description && !error && <FormHelperText id={descriptionId}>{description}</FormHelperText>}
      {error && (
        <FormHelperText id={errorId} error role="alert">
          {error}
        </FormHelperText>
      )}
    </Stack>
  );
}

export function fieldDescribedBy(htmlFor: string, hasDescription: boolean, hasError: boolean) {
  const ids = [
    hasDescription && !hasError && `${htmlFor}-description`,
    hasError && `${htmlFor}-error`,
  ].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}
