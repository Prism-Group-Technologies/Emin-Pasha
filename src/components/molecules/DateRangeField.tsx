"use client";

import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export interface DateRangeFieldProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onCheckInChange: (date: Date | null) => void;
  onCheckOutChange: (date: Date | null) => void;
  /** @default today */
  minDate?: Date;
}

/**
 * DECISIONS.md D20: MUI X's `DateRangePicker`/`StaticDateRangePicker` need a
 * paid `@mui/x-date-pickers-pro` licence (verified — they don't exist in the
 * free package). Built instead from two linked free `DatePicker` instances,
 * with checkout's `minDate` following check-in so the range can't invert.
 * `dd MMM yyyy` display format per CLAUDE.md §6.5.
 *
 * Imports `AdapterDateFnsV3` (not the plain `AdapterDateFns`) — DECISIONS.md
 * D21: the plain adapter imports `date-fns/_lib/format/longFormatters`, a
 * private path date-fns 4's package `exports` map blocks, breaking the
 * Turbopack build. `AdapterDateFnsV3` imports only public `date-fns/*`
 * subpaths and re-exports under the same `AdapterDateFns` name.
 */
export function DateRangeField({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  minDate = new Date(),
}: DateRangeFieldProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <DatePicker
          label="Check-in"
          value={checkIn}
          onChange={onCheckInChange}
          minDate={minDate}
          format="dd MMM yyyy"
          slotProps={{ textField: { fullWidth: true, id: "check-in-date" } }}
        />
        <DatePicker
          label="Check-out"
          value={checkOut}
          onChange={onCheckOutChange}
          minDate={checkIn ?? minDate}
          format="dd MMM yyyy"
          disabled={!checkIn}
          slotProps={{ textField: { fullWidth: true, id: "check-out-date" } }}
        />
      </Stack>
    </LocalizationProvider>
  );
}
