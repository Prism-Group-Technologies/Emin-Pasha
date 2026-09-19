"use client";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { enGB } from "date-fns/locale";

export interface DateFieldProps {
  id: string;
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  onBlur?: () => void;
  /** @default today */
  minDate?: Date;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

/**
 * One free-tier MUI X `DatePicker` with the site's conventions baked in:
 * `dd MMM yyyy` display (CLAUDE.md §6.5), a Monday-first `enGB` calendar
 * (same adapter setup as `StayDatePicker`, DECISIONS.md D21), past dates
 * disabled, and the `TextField` label / error / helper API every other form
 * molecule shares — so a controlled react-hook-form field wires up the same
 * way as `TextInput`.
 *
 * Colours follow the theme's colour scheme, so the popover calendar is
 * correct in light and dark mode with no local overrides.
 */
export function DateField({
  id,
  label,
  value,
  onChange,
  onBlur,
  minDate = new Date(),
  disabled,
  error,
  helperText,
}: DateFieldProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        onClose={onBlur}
        minDate={minDate}
        disabled={disabled}
        format="dd MMM yyyy"
        slotProps={{
          textField: { id, fullWidth: true, error, helperText, onBlur },
          field: { clearable: true },
        }}
      />
    </LocalizationProvider>
  );
}
