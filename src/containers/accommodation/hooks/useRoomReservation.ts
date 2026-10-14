"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { roomReservationCopy } from "@/containers/accommodation/copy/reservation";
import { track } from "@/lib/analytics/events";
import { submitEnquiry } from "@/lib/submitEnquiry";
import { type RoomReservation, roomReservationSchema } from "@/schemas/roomReservation";

/** `YYYY-MM-DD` for a native date input, offset in whole days from today. */
function isoDaysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/**
 * The seeded stay. Dates are pre-filled rather than left empty on purpose: an
 * empty date pair is the single most abandoned field in a booking form, and a
 * guest who is only browsing should still be able to send the request without
 * opening a calendar. Tomorrow-to-the-day-after is a *suggestion* the guest
 * overwrites, not a claim about availability.
 */
const DEFAULT_STAY = { checkIn: 1, checkOut: 2 } as const;

/**
 * All reservation-dialog logic, so the form and the dialog stay
 * presentational — the same shape as `useDiningReservation`: RHF +
 * `zodResolver`, `submitEnquiry` for the success/pending/failure contract, and
 * a plain result string rendered in an `aria-live` region.
 *
 * `succeeded` is tracked separately from `result` because this form lives in a
 * dialog rather than on a page. On a page a confirmation line under the button
 * is enough; in a dialog the guest is holding a layer open over the thing they
 * were reading, and leaving them looking at a filled-in form with a sentence
 * under it gives them nothing to do. The dialog swaps to a confirmation and a
 * way out instead.
 */
export function useRoomReservation(roomId: string) {
  const [result, setResult] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  const form = useForm<RoomReservation>({
    resolver: zodResolver(roomReservationSchema),
    mode: "onTouched",
    defaultValues: {
      roomId,
      name: "",
      email: "",
      phone: "",
      checkIn: isoDaysFromNow(DEFAULT_STAY.checkIn),
      checkOut: isoDaysFromNow(DEFAULT_STAY.checkOut),
      adults: 2,
      children: 0,
      message: "",
      consent: false,
      website: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setResult(null);
    const response = await submitEnquiry(
      "/api/enquiry/room",
      values,
      roomReservationCopy.messages.failed,
    );
    const message = response.pending ? roomReservationCopy.messages.pending : response.message;
    setResult(message);
    setSucceeded(response.ok);
    track("room_reservation_submitted", { roomId, ok: response.ok });
  });

  return { form, onSubmit, result, succeeded, submitting: form.formState.isSubmitting };
}
