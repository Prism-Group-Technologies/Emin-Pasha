/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { IconName } from "@/components/atoms/Icon";

/**
 * What can be booked and what it costs to add. Type-only imports, so the
 * quote engine, the schema, the route and the client pickers can all share
 * one list and never drift (D25).
 *
 * `legs` is how many airport runs a service is — `0` for hourly hire, which
 * is priced on `hourlyUsd` instead. The complimentary benefit (approved §8:
 * "complimentary on stays of more than one week") zeroes the airport fare
 * from `complimentaryMinNights`; add-ons and hourly hire stay priced.
 */
export const TRANSFER_PRICING = {
  returnDiscount: 0.1,
  minHours: 3,
  maxHours: 12,
  complimentaryMinNights: 8,
  maxPassengers: 40,
  maxBags: 60,
  maxNights: 90,
} as const;

export interface TransferService {
  value: string;
  label: string;
  hint: string;
  icon: IconName;
  legs: 0 | 1 | 2;
}

export const transferServices = [
  {
    value: "arrival",
    label: "Airport pickup",
    hint: "Entebbe (EBB) to the hotel",
    icon: "flight",
    legs: 1,
  },
  {
    value: "departure",
    label: "Airport drop-off",
    hint: "The hotel to Entebbe (EBB)",
    icon: "flight-takeoff",
    legs: 1,
  },
  {
    value: "return",
    label: "Return transfer",
    hint: "Both ways — save 10%",
    icon: "route",
    legs: 2,
  },
  {
    value: "hourly",
    label: "Chauffeur by the hour",
    hint: "Around Kampala, from 3 hours",
    icon: "car",
    legs: 0,
  },
] as const satisfies readonly TransferService[];

export type TransferServiceId = (typeof transferServices)[number]["value"];

export interface TransferAddOn {
  value: string;
  label: string;
  hint: string;
  priceUsd: number;
  /** Multiply by the number of passengers. */
  perPerson: boolean;
  /** Multiply by the number of airport legs (a return is two). */
  perLeg: boolean;
  /** Services the add-on can be booked with. */
  services: readonly TransferServiceId[];
}

const AIRPORT: readonly TransferServiceId[] = ["arrival", "departure", "return"];
const EVERY: readonly TransferServiceId[] = ["arrival", "departure", "return", "hourly"];

export const transferAddOns = [
  {
    value: "vip-meet-assist",
    label: "VIP meet & assist",
    hint: "Met at the aircraft door, fast-tracked through immigration, a porter for your bags",
    priceUsd: 60,
    perPerson: true,
    perLeg: true,
    services: AIRPORT,
  },
  {
    value: "child-seat",
    label: "Child or booster seat",
    hint: "Fitted and checked before we collect you",
    priceUsd: 10,
    perPerson: false,
    perLeg: false,
    services: EVERY,
  },
  {
    value: "extra-stop",
    label: "A stop on the way",
    hint: "A forex bureau, a pharmacy or a colleague's office",
    priceUsd: 15,
    perPerson: false,
    perLeg: false,
    services: AIRPORT,
  },
  {
    value: "sim-card",
    label: "Local SIM with data, waiting in the car",
    hint: "Registered and loaded with 10GB, so you are online before Kajjansi",
    priceUsd: 20,
    perPerson: false,
    perLeg: false,
    services: ["arrival", "return"],
  },
] as const satisfies readonly TransferAddOn[];

export type TransferAddOnId = (typeof transferAddOns)[number]["value"];
