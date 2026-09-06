"use client";

import { useCallback, useState } from "react";

import { addDays, format, parseISO } from "date-fns";
import type { UseFormReturn } from "react-hook-form";
import { useWatch } from "react-hook-form";

import { YCS_DATE_FORMAT } from "@/config/booking";
import { track } from "@/lib/analytics/events";
import { type BookingSearch, nightsBetween } from "@/schemas/booking";

const iso = (date: Date) => format(date, YCS_DATE_FORMAT);

/**
 * Date coupling and the night count, split out of `useBookingForm` to keep
 * both files inside the 120-line limit and to keep one idea per file.
 *
 * Reads through `useWatch` rather than `form.watch`: the installed
 * `eslint-plugin-react-hooks` flags `watch()` as un-memoizable
 * (`react-hooks/incompatible-library`), and `useWatch` is react-hook-form's
 * own subscription API for exactly this — it re-renders on the two fields
 * that matter instead of on every keystroke anywhere in the form.
 */
export function useStayDates(form: UseFormReturn<BookingSearch>) {
  const control = form.control;
  const checkIn = useWatch({ control, name: "checkIn" });
  const checkOut = useWatch({ control, name: "checkOut" });
  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const [awaitingCheckOut, setAwaitingCheckOut] = useState(false);

  /**
   * Moving check-in to or past check-out pushes check-out along rather than
   * leaving an invalid range on screen for the guest to fix, and it preserves
   * the stay length they had already chosen — someone who set four nights and
   * then shifts their arrival still wants four nights.
   */
  const setCheckIn = useCallback(
    (date: Date) => {
      const next = iso(date);
      const held = Math.max(1, nights);
      form.setValue("checkIn", next, { shouldValidate: true, shouldTouch: true });
      if (!checkOut || next >= checkOut) {
        form.setValue("checkOut", iso(addDays(date, held)), { shouldValidate: true });
      }
      track("dates_selected", { field: "checkIn", nights: held });
    },
    [checkOut, form, nights],
  );

  const setCheckOut = useCallback(
    (date: Date) => {
      form.setValue("checkOut", iso(date), { shouldValidate: true, shouldTouch: true });
      track("dates_selected", { field: "checkOut" });
    },
    [form],
  );

  /**
   * One tap on either calendar. The first sets arrival; the next sets
   * departure if it is later, and otherwise becomes the new arrival — which
   * is what people mean when they click backwards, rather than an error.
   * Once a full range exists the next tap starts a new one.
   */
  const selectDate = useCallback(
    (date: Date) => {
      if (!awaitingCheckOut) {
        setCheckIn(date);
        setAwaitingCheckOut(true);
        return;
      }
      if (checkIn && iso(date) > checkIn) {
        setCheckOut(date);
        setAwaitingCheckOut(false);
        return;
      }
      setCheckIn(date);
    },
    [awaitingCheckOut, checkIn, setCheckIn, setCheckOut],
  );

  return {
    nights,
    checkInDate: checkIn ? parseISO(checkIn) : null,
    checkOutDate: checkOut ? parseISO(checkOut) : null,
    setCheckIn,
    setCheckOut,
    selectDate,
  };
}
