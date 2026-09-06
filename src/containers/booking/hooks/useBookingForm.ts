"use client";

import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { BookingWidgetData } from "@/containers/booking/types";
import { track, trackThenNavigate } from "@/lib/analytics/events";
import { submitBooking } from "@/lib/booking";
import { collectUtm } from "@/lib/booking/ycsDeepLink";
import { type BookingSearch, bookingSearchSchema } from "@/schemas/booking";
import { useBookingStore } from "@/stores/bookingStore";

import { seedBookingSearch } from "./bookingDefaults";
import { mapValidationMessage } from "./mapValidationMessage";
import { useStayDates } from "./useStayDates";
import { useSyncBookingStore } from "./useSyncBookingStore";

export type BookingStatus = "idle" | "submitting" | "handoff" | "empty" | "error";

export interface UseBookingFormOptions {
  data: BookingWidgetData;
  /** Pre-selects a room type — `InlineBookingWidget` on a room page. */
  roomTypeId?: string;
}

/**
 * All booking-widget logic. The four variants are presentational shells over
 * this hook, so date coupling, night counting, error mapping and the handoff
 * behave identically whichever one a guest happens to use — CLAUDE.md §5.4.
 */
export function useBookingForm({ data, roomTypeId }: UseBookingFormOptions) {
  const router = useRouter();
  const commit = useBookingStore((state) => state.commit);
  const [status, setStatus] = useState<BookingStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [fallbackHref, setFallbackHref] = useState<string | null>(null);

  // Read once, imperatively. Subscribing to `current` here would re-render
  // this widget on its own keystrokes — `useSyncBookingStore` writes to that
  // very slice — and `defaultValues` is only ever read on mount anyway.
  const [defaults] = useState(() => {
    const { last, current } = useBookingStore.getState();
    return seedBookingSearch({ last, current }, roomTypeId);
  });

  const form = useForm<BookingSearch>({
    resolver: zodResolver(bookingSearchSchema),
    mode: "onTouched",
    defaultValues: defaults,
  });

  useSyncBookingStore(form);

  const dates = useStayDates(form);

  const setGuests = useCallback(
    (field: "adults" | "children" | "rooms", value: number) => {
      form.setValue(field, value, { shouldValidate: true });
      track("guests_changed", { field, value });
    },
    [form],
  );

  const onSubmit = form.handleSubmit(async (values) => {
    setStatus("submitting");
    setMessage(null);
    setFallbackHref(null);
    commit(values);

    const utm = collectUtm(new URLSearchParams(window.location.search));
    const outcome = await submitBooking(values, { utm, bookingUrl: data.bookingUrl });

    if (outcome.kind === "redirect") {
      setStatus("handoff");
      // Same tab, and the conversion event leaves before the navigation does.
      await trackThenNavigate(
        "availability_submitted",
        { outcome: "redirect", nights: dates.nights },
        () => window.location.assign(outcome.url),
      );
      return;
    }

    track("availability_submitted", { outcome: outcome.kind, nights: dates.nights });

    if (outcome.kind === "enquiry") {
      setStatus("empty");
      setFallbackHref(outcome.href);
      setMessage(
        outcome.reason === "no-availability"
          ? data.copy.states.empty
          : data.copy.enquiryFallback.lead,
      );
      router.push(outcome.href);
      return;
    }

    setStatus(outcome.kind === "error" ? "error" : "idle");
    setMessage(outcome.kind === "error" ? outcome.message : null);
  });

  return {
    form,
    onSubmit,
    status,
    message,
    fallbackHref,
    nights: dates.nights,
    checkIn: dates.checkInDate,
    checkOut: dates.checkOutDate,
    setCheckIn: dates.setCheckIn,
    setCheckOut: dates.setCheckOut,
    selectDate: dates.selectDate,
    setGuests,
    errorFor: (field: keyof BookingSearch) =>
      mapValidationMessage(form.formState.errors[field]?.message, data.copy),
  };
}
