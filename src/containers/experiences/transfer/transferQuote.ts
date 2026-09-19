import { type Vehicle, vehicles } from "@/containers/experiences/transfer/copy/fleet";
import {
  TRANSFER_PRICING,
  type TransferAddOn,
  type TransferService,
  transferAddOns,
  transferServices,
} from "@/containers/experiences/transfer/copy/services";
import { formatUsd } from "@/containers/experiences/transfer/currency";
import { capacityWarning, plural } from "@/containers/experiences/transfer/transferCapacity";

export interface TransferQuoteInput {
  service: string;
  vehicle: string;
  passengers: number;
  bags: number;
  hours: number;
  nights: number;
  addOns: readonly string[];
}

export interface TransferQuoteLine {
  label: string;
  amountUsd: number;
}

export interface TransferCatalogue {
  services: readonly TransferService[];
  vehicles: readonly Vehicle[];
  addOns: readonly TransferAddOn[];
}

export interface TransferQuote {
  service: TransferService | undefined;
  vehicle: Vehicle | undefined;
  lines: TransferQuoteLine[];
  totalUsd: number;
  totalLabel: string;
  /** The airport fare is waived for a stay of `complimentaryMinNights`+. */
  complimentary: boolean;
  /** Set when the party or luggage will not fit the chosen car. */
  capacityWarning: string | null;
  /** One desk-ready line — folded into the email and the WhatsApp hand-off. */
  summary: string;
}

export const TRANSFER_QUOTE_PLACEHOLDER = "Choose a service and a car to see your fare.";

const DEFAULT_CATALOGUE: TransferCatalogue = {
  services: transferServices,
  vehicles,
  addOns: transferAddOns,
};

/** The airport fare (per leg, return discounted) or the hourly hire, as one row. */
function baseLine(
  service: TransferService,
  vehicle: Vehicle,
  input: TransferQuoteInput,
  free: boolean,
) {
  if (service.legs === 0) {
    const hours = Math.min(
      Math.max(input.hours, TRANSFER_PRICING.minHours),
      TRANSFER_PRICING.maxHours,
    );
    return {
      label: `${vehicle.className} · ${plural(hours, "hour")}`,
      amountUsd: vehicle.hourlyUsd * hours,
    };
  }
  const discount = service.legs > 1 ? 1 - TRANSFER_PRICING.returnDiscount : 1;
  const fare = Math.round(vehicle.transferUsd * service.legs * discount);
  const suffix = free ? " · complimentary" : service.legs > 1 ? " · 10% off" : "";
  return {
    label: `${vehicle.className} · ${service.label.toLowerCase()}${suffix}`,
    amountUsd: free ? 0 : fare,
  };
}

/** One row per add-on that is valid for this service, scaled per head / per leg. */
function addOnLines(
  catalogue: readonly TransferAddOn[],
  input: TransferQuoteInput,
  service: TransferService,
) {
  return catalogue
    .filter((addOn) => input.addOns.includes(addOn.value))
    .filter((addOn) => (addOn.services as readonly string[]).includes(service.value))
    .map((addOn) => {
      const heads = addOn.perPerson ? Math.max(input.passengers, 1) : 1;
      const legs = addOn.perLeg ? Math.max(service.legs, 1) : 1;
      return { label: addOn.label, amountUsd: addOn.priceUsd * heads * legs };
    });
}

/**
 * The booking form's view model: turns the traveller's choices into priced
 * rows, an indicative USD total, a capacity check and a summary line.
 *
 * Pure and unit-tested (`transferQuote.test.ts`) — the same split as
 * `wellness/poolQuote.ts`. `useTransferJourney` calls it on every change and
 * the API route calls it again on submit, so the emailed fare is recomputed
 * server-side rather than trusted from the browser.
 */
export function buildTransferQuote(
  input: TransferQuoteInput,
  catalogue = DEFAULT_CATALOGUE,
): TransferQuote {
  const service = catalogue.services.find((item) => item.value === input.service);
  const vehicle = catalogue.vehicles.find((item) => item.id === input.vehicle);
  if (!service || !vehicle) {
    const empty = { lines: [], totalUsd: 0, complimentary: false, capacityWarning: null };
    return {
      ...empty,
      service,
      vehicle,
      totalLabel: TRANSFER_QUOTE_PLACEHOLDER,
      summary: TRANSFER_QUOTE_PLACEHOLDER,
    };
  }

  const complimentary = service.legs > 0 && input.nights >= TRANSFER_PRICING.complimentaryMinNights;
  const base = baseLine(service, vehicle, input, complimentary);
  const extras = addOnLines(catalogue.addOns, input, service);
  const lines = [base, ...extras];
  const totalUsd = lines.reduce((sum, line) => sum + line.amountUsd, 0);
  const extraNames = extras.map((line) => line.label.toLowerCase());
  const withText = extraNames.length ? ` · with ${extraNames.join(", ")}` : "";
  const party = `${plural(input.passengers, "passenger")}, ${plural(input.bags, "case")}`;

  return {
    service,
    vehicle,
    lines,
    totalUsd,
    totalLabel: formatUsd(totalUsd),
    complimentary,
    capacityWarning: capacityWarning(vehicle, input.passengers, input.bags, catalogue.vehicles),
    summary: `${base.label} · ${party}${withText} — around ${formatUsd(totalUsd)}, indicative.`,
  };
}
