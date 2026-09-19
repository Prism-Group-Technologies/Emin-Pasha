"use client";

import { useMemo } from "react";

import { type UseFormReturn, useWatch } from "react-hook-form";

import { TRANSFER_PRICING, transferAddOns } from "@/containers/experiences/transfer/copy/services";
import { buildTransferQuote } from "@/containers/experiences/transfer/transferQuote";
import type {
  TransferAddOnValue,
  TransferBooking,
  TransferServiceValue,
  TransferVehicleValue,
} from "@/schemas/transferBooking";

const PRICED = ["service", "vehicle", "passengers", "bags", "hours", "nights", "addOns"] as const;

type CountField = "passengers" | "bags" | "hours" | "nights";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * The priced half of the booking form: watches the fields that change the
 * fare, derives the quote from the tested `buildTransferQuote`, and exposes
 * plain setters for the pickers and steppers. The pickers never touch
 * react-hook-form directly, so they stay presentational.
 *
 * Setters validate only once the form has been submitted, so a traveller
 * isn't shown errors for a field while they are still choosing.
 */
export function useTransferJourney(form: UseFormReturn<TransferBooking>) {
  const [service, vehicle, passengers, bags, hours, nights, addOns] = useWatch({
    control: form.control,
    name: PRICED,
  });

  const quote = useMemo(
    () => buildTransferQuote({ service, vehicle, passengers, bags, hours, nights, addOns }),
    [service, vehicle, passengers, bags, hours, nights, addOns],
  );

  const opts = () => ({ shouldDirty: true, shouldValidate: form.formState.isSubmitted });
  const setCount = (name: CountField, min: number, max: number) => (value: number) =>
    form.setValue(name, clamp(value, min, max), opts());

  const availableAddOns = transferAddOns.filter((addOn) =>
    (addOn.services as readonly string[]).includes(service),
  );

  return {
    quote,
    service,
    vehicle,
    passengers,
    bags,
    hours,
    nights,
    availableAddOns,
    isHourly: service === "hourly",
    setService: (value: TransferServiceValue) => form.setValue("service", value, opts()),
    setVehicle: (value: TransferVehicleValue) => form.setValue("vehicle", value, opts()),
    setPassengers: setCount("passengers", 1, TRANSFER_PRICING.maxPassengers),
    setBags: setCount("bags", 0, TRANSFER_PRICING.maxBags),
    setHours: setCount("hours", TRANSFER_PRICING.minHours, TRANSFER_PRICING.maxHours),
    setNights: setCount("nights", 0, TRANSFER_PRICING.maxNights),
    isAddOnSelected: (value: TransferAddOnValue) => addOns.includes(value),
    toggleAddOn: (value: TransferAddOnValue) =>
      form.setValue(
        "addOns",
        addOns.includes(value) ? addOns.filter((id) => id !== value) : [...addOns, value],
        opts(),
      ),
  };
}

export type TransferJourney = ReturnType<typeof useTransferJourney>;
