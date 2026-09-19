"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { reservationCopy } from "@/containers/dining/copy/reservation";
import { submitEnquiry } from "@/lib/submitEnquiry";
import {
  type DiningReservation,
  type ReservationOutlet,
  diningReservationSchema,
} from "@/schemas/diningReservation";

/**
 * All table-reservation form logic; the form component stays presentational.
 * Same shape as `containers/wellness/hooks/useWellnessEnquiry` — RHF +
 * `zodResolver`, `submitEnquiry` for the success/pending/failure contract,
 * and a plain result string the form renders in an `aria-live` region.
 */
export function useDiningReservation(defaultOutlet: ReservationOutlet) {
  const [result, setResult] = useState<string | null>(null);

  const form = useForm<DiningReservation>({
    resolver: zodResolver(diningReservationSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      outlet: defaultOutlet,
      date: "",
      time: "",
      partySize: 2,
      occasion: "dining",
      message: "",
      consent: false,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setResult(null);
    const response = await submitEnquiry(
      "/api/enquiry/dining",
      values,
      reservationCopy.messages.failed,
    );
    setResult(response.pending ? reservationCopy.messages.pending : response.message);
    if (response.ok && !response.pending) {
      // `reset()` with no args restores the `defaultValues` above, so the
      // pre-selected outlet survives a successful submit.
      form.reset();
    }
  });

  return { form, onSubmit, result, submitting: form.formState.isSubmitting };
}
