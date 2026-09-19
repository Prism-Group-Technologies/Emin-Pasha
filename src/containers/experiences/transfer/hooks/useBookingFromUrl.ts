"use client";

import { useEffect } from "react";

import type { UseFormSetValue } from "react-hook-form";

import { BOOKING_PRESELECT_EVENT, BOOKING_QUERY } from "@/containers/experiences/transfer/anchors";
import {
  type TransferBooking,
  transferServiceEnum,
  transferVehicleEnum,
} from "@/schemas/transferBooking";

/**
 * Pre-selects the car or service from `?vehicle=premium-suv` /
 * `?service=hourly`, so a fleet card or a premium-service card can drop the
 * traveller into the form with their choice already made.
 *
 * Reads `window.location` rather than `useSearchParams` — the same reasoning
 * as `contact/hooks/useIntentFromUrl`: the form is a client-only deferred
 * island, and `useSearchParams` would force a Suspense boundary onto an
 * otherwise static route. It re-reads on mount (a shared link, or a card
 * clicked before the island hydrated) and on `BOOKING_PRESELECT_EVENT`
 * (a card clicked afterwards). Unknown values are ignored, so a hand-typed
 * URL can never put the form in a state the schema rejects.
 */
export function useBookingFromUrl(setValue: UseFormSetValue<TransferBooking>) {
  useEffect(() => {
    const apply = () => {
      const params = new URLSearchParams(window.location.search);
      const vehicle = transferVehicleEnum.safeParse(params.get(BOOKING_QUERY.vehicle));
      const service = transferServiceEnum.safeParse(params.get(BOOKING_QUERY.service));
      if (vehicle.success) {
        setValue("vehicle", vehicle.data);
      }
      if (service.success) {
        setValue("service", service.data);
      }
    };
    apply();
    window.addEventListener(BOOKING_PRESELECT_EVENT, apply);
    return () => window.removeEventListener(BOOKING_PRESELECT_EVENT, apply);
  }, [setValue]);
}
