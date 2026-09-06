"use client";

import { useEffect, useRef } from "react";

import type { UseFormReturn } from "react-hook-form";

import type { BookingSearch } from "@/schemas/booking";
import { useBookingStore } from "@/stores/bookingStore";

import { seedBookingSearch } from "./bookingDefaults";

/**
 * Refills a widget from the shared store each time it comes back into play.
 *
 * `defaultValues` is read once, at mount, and both the hero widget and the
 * sticky bar mount at hydration — long before either is the one the guest is
 * actually using. Without this, whichever widget the guest edited second held
 * the truth and the other showed whatever it captured at mount: pick dates in
 * the hero, scroll down, and the bar offered tomorrow again.
 *
 * Edge-triggered on `active` going false → true, never on the store changing,
 * so a widget can never overwrite what the guest is typing into it.
 */
export function useReseedFromStore(form: UseFormReturn<BookingSearch>, active: boolean): void {
  const wasActive = useRef(active);

  useEffect(() => {
    if (active && !wasActive.current) {
      const { last, current } = useBookingStore.getState();
      form.reset(seedBookingSearch({ last, current }), { keepDefaultValues: true });
    }
    wasActive.current = active;
  }, [active, form]);
}
