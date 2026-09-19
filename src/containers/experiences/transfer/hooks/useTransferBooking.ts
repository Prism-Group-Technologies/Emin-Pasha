"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { bookingFormCopy } from "@/containers/experiences/transfer/copy/bookingForm";
import { useBookingFromUrl } from "@/containers/experiences/transfer/hooks/useBookingFromUrl";
import { useTransferJourney } from "@/containers/experiences/transfer/hooks/useTransferJourney";
import { submitEnquiry } from "@/lib/submitEnquiry";
import { type TransferBooking, transferBookingSchema } from "@/schemas/transferBooking";

const DEFAULTS: TransferBooking = {
  service: "arrival",
  vehicle: "executive-saloon",
  date: "",
  time: "",
  flightNumber: "",
  hours: 3,
  passengers: 2,
  bags: 2,
  nights: 0,
  addOns: [],
  name: "",
  email: "",
  phone: "",
  notes: "",
  consent: false,
  website: "",
};

/**
 * Everything the transfer booking form does, kept out of the organism:
 * react-hook-form with the shared `transferBookingSchema`, URL pre-selection
 * (`useBookingFromUrl`), the priced journey state and live quote
 * (`useTransferJourney`), and submission through `submitEnquiry` so the
 * success / pending / failure contract matches every other form on the site.
 *
 * On success the contact block resets but the journey choices stay — a
 * traveller booking an arrival often books the matching departure next.
 */
export function useTransferBooking() {
  const [result, setResult] = useState<string | null>(null);

  const form = useForm<TransferBooking>({
    resolver: zodResolver(transferBookingSchema),
    mode: "onTouched",
    defaultValues: DEFAULTS,
  });

  useBookingFromUrl(form.setValue);
  const journey = useTransferJourney(form);

  const onSubmit = form.handleSubmit(async (values) => {
    setResult(null);
    const response = await submitEnquiry(
      "/api/enquiry/transfer",
      values,
      bookingFormCopy.messages.failed,
    );
    setResult(response.pending ? bookingFormCopy.messages.pending : response.message);
    if (response.ok && !response.pending) {
      form.reset({
        ...form.getValues(),
        name: "",
        email: "",
        phone: "",
        notes: "",
        consent: false,
      });
    }
  });

  return { form, journey, onSubmit, result, submitting: form.formState.isSubmitting };
}

export type TransferBookingController = ReturnType<typeof useTransferBooking>;
