"use client";

import Box from "@mui/material/Box";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { addMonths, isAfter, isBefore, startOfDay } from "date-fns";
// date-fns 4 exposes locales from `date-fns/locale`, not the package root —
// verified against the installed 4.4.0 `exports` map, which has
// `./locale/en-GB` but no root `enGB` export.
import { enGB } from "date-fns/locale";

import { StayDay } from "@/components/organisms/StayDatePicker/StayDay";

export interface StayDatePickerProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onSelect: (date: Date) => void;
  maxDate?: Date;
  /** One scrolling month on mobile, two side by side on desktop. */
  months?: 1 | 2;
}

/**
 * Verified against the installed **@mui/x-date-pickers@7.29.4** before
 * writing: `DateRangePicker`, `StaticDateRangePicker` and `DateRangeCalendar`
 * do not exist in the free package — they ship only in the paid
 * `-pro` tier (DECISIONS.md D20), so `calendars={2}` is not available to us.
 * Two side-by-side `DateCalendar`s driven off one `referenceDate` give the
 * same two-month view; `referenceDate`, `onMonthChange`, `slots` and
 * `shouldDisableDate` were each confirmed present in
 * `DateCalendar.types.d.ts`.
 *
 * `adapterLocale={enGB}` is what makes the grid start on Monday. MUI X ships
 * no `enGB` translation bundle (only `enUS` exists in `locales/`), and its
 * default UI strings are already English, so the locale is applied through
 * the date adapter — which is the part that actually differs.
 */
export function StayDatePicker({
  checkIn,
  checkOut,
  onSelect,
  maxDate,
  months = 2,
}: StayDatePickerProps) {
  const today = startOfDay(new Date());
  const reference = checkIn ?? today;

  const calendarProps = {
    value: null,
    onChange: (date: Date | null) => date && onSelect(date),
    minDate: today,
    maxDate,
    disableHighlightToday: false,
    slots: { day: StayDay },
    slotProps: { day: { checkIn, checkOut } as never },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 0, md: 4 },
          maxHeight: { xs: "60vh", md: "none" },
          overflowY: { xs: "auto", md: "visible" },
        }}
      >
        <DateCalendar {...calendarProps} referenceDate={reference} />
        {months === 2 && (
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <DateCalendar {...calendarProps} referenceDate={addMonths(reference, 1)} />
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
}

/** Exported for the day renderer — keeps range maths in one place. */
export function isWithinStay(day: Date, checkIn: Date | null, checkOut: Date | null): boolean {
  if (!checkIn || !checkOut) {
    return false;
  }
  return isAfter(day, checkIn) && isBefore(day, checkOut);
}
