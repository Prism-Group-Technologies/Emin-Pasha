import { z } from "zod";

import { bookingFormCopy } from "@/containers/experiences/transfer/copy/bookingForm";
import { vehicles } from "@/containers/experiences/transfer/copy/fleet";
import {
  TRANSFER_PRICING,
  transferAddOns,
  transferServices,
} from "@/containers/experiences/transfer/copy/services";

const { errors } = bookingFormCopy;

/**
 * Lead capture for the Airport Transfer page — shared by the client form
 * (`zodResolver`) and `/api/enquiry/transfer`, the same single-schema pattern
 * as `storyEnquiry.ts`.
 *
 * `service`, `vehicle` and `addOns` are closed enums built from the same
 * lists the pickers render (`containers/experiences/transfer/copy`), so the
 * form and the validator cannot drift. The priced fields are numbers the
 * steppers set; the route recomputes the fare from them with
 * `buildTransferQuote` rather than trusting a total from the browser.
 *
 * A flight number is required for the two services that meet a plane
 * (pickup and return) — a transfer we cannot track is the one that goes
 * wrong — and optional for a drop-off. It is format-checked loosely (IATA
 * two-character carrier code + 1–4 digits) so "KQ414", "kq 414" and "5Z 601"
 * all pass. `website` is the honeypot the shared route pipeline checks.
 */
const tuple = <T extends string>(values: readonly T[]) => values as unknown as [T, ...T[]];

export const transferServiceEnum = z.enum(tuple(transferServices.map((item) => item.value)));
export const transferVehicleEnum = z.enum(tuple(vehicles.map((item) => item.id)));
export const transferAddOnEnum = z.enum(tuple(transferAddOns.map((item) => item.value)));

const FLIGHT_NUMBER = /^[A-Z0-9]{2}\s?\d{1,4}[A-Z]?$/i;
const MEETS_A_FLIGHT = new Set<string>(["arrival", "return"]);

const count = (min: number, max: number) => z.number().int().min(min).max(max);

export const transferBookingSchema = z
  .object({
    service: transferServiceEnum,
    vehicle: transferVehicleEnum,
    date: z.string().trim().min(1, { error: errors.date }).max(20),
    time: z.string().trim().max(10).optional(),
    flightNumber: z.string().trim().max(12).optional(),
    hours: count(TRANSFER_PRICING.minHours, TRANSFER_PRICING.maxHours),
    passengers: count(1, TRANSFER_PRICING.maxPassengers),
    bags: count(0, TRANSFER_PRICING.maxBags),
    nights: count(0, TRANSFER_PRICING.maxNights),
    addOns: z.array(transferAddOnEnum).max(transferAddOns.length),
    name: z.string().trim().min(2, { error: errors.name }),
    email: z.email({ error: errors.email }),
    phone: z.string().trim().max(40).optional(),
    notes: z.string().trim().max(600).optional(),
    consent: z.boolean().refine((value) => value, { error: errors.consent }),
    website: z.string().max(0).optional(),
  })
  .superRefine((values, ctx) => {
    const flight = values.flightNumber ?? "";
    if (flight && !FLIGHT_NUMBER.test(flight)) {
      ctx.addIssue({ code: "custom", path: ["flightNumber"], message: errors.flightFormat });
    } else if (!flight && MEETS_A_FLIGHT.has(values.service)) {
      ctx.addIssue({ code: "custom", path: ["flightNumber"], message: errors.flightNumber });
    }
  });

export type TransferBooking = z.infer<typeof transferBookingSchema>;
export type TransferServiceValue = z.infer<typeof transferServiceEnum>;
export type TransferVehicleValue = z.infer<typeof transferVehicleEnum>;
export type TransferAddOnValue = z.infer<typeof transferAddOnEnum>;
