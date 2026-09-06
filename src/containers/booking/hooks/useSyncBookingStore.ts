"use client";

import { useEffect } from "react";

import type { UseFormReturn } from "react-hook-form";
import { useWatch } from "react-hook-form";

import type { BookingSearch } from "@/schemas/booking";
import { useBookingStore } from "@/stores/bookingStore";

/**
 * Mirrors a widget's live form values into `bookingStore.current`, so every
 * other variant can seed from them. Previously only `commit` (on submit) wrote
 * to the store, which meant a guest who picked dates in the hero widget and
 * then scrolled found the sticky bar back on tomorrow's defaults.
 *
 * The effect depends on the five **primitives**, not on the object `useWatch`
 * returns. That object has a fresh identity every render, so an object-keyed
 * effect would re-fire on any render caused by the store update it just
 * triggered — a render loop between this hook and its own subscribers.
 */
export function useSyncBookingStore(form: UseFormReturn<BookingSearch>): void {
  const setCurrent = useBookingStore((state) => state.setCurrent);
  const values = useWatch({ control: form.control });
  const { checkIn, checkOut, adults, rooms } = values;
  const childGuests = values.children;

  useEffect(() => {
    setCurrent({ checkIn, checkOut, adults, children: childGuests, rooms });
  }, [checkIn, checkOut, adults, childGuests, rooms, setCurrent]);
}
