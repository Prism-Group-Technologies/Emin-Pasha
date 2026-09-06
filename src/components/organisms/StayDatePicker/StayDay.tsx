"use client";

import { PickersDay, type PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { isSameDay } from "date-fns";

export interface StayDayProps extends PickersDayProps<Date> {
  checkIn?: Date | null;
  checkOut?: Date | null;
}

interface DayPosition {
  isStart: boolean;
  isEnd: boolean;
  isBetween: boolean;
}

function positionOf(day: Date, checkIn?: Date | null, checkOut?: Date | null): DayPosition {
  const isStart = Boolean(checkIn && isSameDay(day, checkIn));
  const isEnd = Boolean(checkOut && isSameDay(day, checkOut));
  const isBetween = Boolean(checkIn && checkOut && day > checkIn && day < checkOut);
  return { isStart, isEnd, isBetween };
}

/**
 * Paints the selected stay across the two calendars. The free `DateCalendar`
 * has no concept of a range, so the highlight is drawn here through the
 * documented `slots.day` override rather than by reaching into MUI's classes.
 *
 * The range is announced, not just coloured: both endpoints carry
 * `aria-current="date"`, so a screen-reader user is told where their stay
 * starts and ends instead of being left with a visual-only cue
 * (CLAUDE.md §10).
 */
export function StayDay({ checkIn, checkOut, ...props }: StayDayProps) {
  const { day, outsideCurrentMonth } = props;
  const { isStart, isEnd, isBetween } = positionOf(day, checkIn, checkOut);
  const isEndpoint = isStart || isEnd;

  return (
    <PickersDay
      {...props}
      selected={isEndpoint}
      aria-current={isEndpoint ? "date" : undefined}
      sx={{
        ...(isBetween && !outsideCurrentMonth
          ? { bgcolor: "action.selected", borderRadius: 0 }
          : {}),
        ...(isStart ? { borderTopRightRadius: 0, borderBottomRightRadius: 0 } : {}),
        ...(isEnd ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {}),
      }}
    />
  );
}
