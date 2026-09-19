"use client";

import type { UseFormReturn } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { NumberStepper } from "@/components/molecules/NumberStepper";
import { TextInput } from "@/components/molecules/TextInput";
import { bookingFormCopy } from "@/containers/experiences/transfer/copy/bookingForm";
import { TRANSFER_PRICING } from "@/containers/experiences/transfer/copy/services";
import type { TransferJourney } from "@/containers/experiences/transfer/hooks/useTransferJourney";
import type { TransferBooking } from "@/schemas/transferBooking";

const f = bookingFormCopy.fields;
const twoUp = {
  display: "grid",
  gap: 4,
  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
} as const;
const today = () => new Date().toISOString().slice(0, 10);

/**
 * Date and time, then either the flight number (airport services) or the
 * hours stepper (chauffeur hire) — the form only ever asks for the one that
 * matters. The island is client-only (`ssr: false`), so reading today's date
 * for the `min` attribute cannot cause a hydration mismatch.
 */
export function JourneyFields({
  form,
  journey,
}: {
  form: UseFormReturn<TransferBooking>;
  journey: TransferJourney;
}) {
  const { errors } = form.formState;

  return (
    <Box sx={{ display: "grid", gap: 4 }}>
      <Box sx={twoUp}>
        <TextInput
          {...form.register("date")}
          id="transfer-date"
          type="date"
          label={f.date}
          error={Boolean(errors.date)}
          helperText={errors.date?.message}
          slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: today() } }}
          fullWidth
        />
        <TextInput
          {...form.register("time")}
          id="transfer-time"
          type="time"
          label={f.time}
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
        />
      </Box>
      {journey.isHourly ? (
        <NumberStepper
          id="transfer-hours"
          label={f.hours}
          value={journey.hours}
          onChange={journey.setHours}
          min={TRANSFER_PRICING.minHours}
          max={TRANSFER_PRICING.maxHours}
        />
      ) : (
        <TextInput
          {...form.register("flightNumber")}
          id="transfer-flight"
          label={f.flightNumber}
          error={Boolean(errors.flightNumber)}
          helperText={errors.flightNumber?.message ?? f.flightHint}
          autoComplete="off"
          slotProps={{ htmlInput: { style: { textTransform: "uppercase" } } }}
          fullWidth
        />
      )}
    </Box>
  );
}
