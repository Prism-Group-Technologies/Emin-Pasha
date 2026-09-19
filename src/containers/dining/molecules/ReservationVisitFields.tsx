"use client";

import type { UseFormReturn } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { Checkbox } from "@/components/molecules/Checkbox";
import { SelectField } from "@/components/molecules/SelectField";
import { TextInput } from "@/components/molecules/TextInput";
import { Textarea } from "@/components/molecules/Textarea";
import { occasionOptions, reservationCopy } from "@/containers/dining/copy/reservation";
import type { DiningReservation } from "@/schemas/diningReservation";

const f = reservationCopy.fields;
const PARTY_SIZES = Array.from({ length: 20 }, (_, index) => ({
  value: index + 1,
  label: index + 1 === 20 ? "20+" : String(index + 1),
}));
const OCCASION_OPTIONS = occasionOptions.map((o) => ({ value: o.value, label: o.label }));
const twoUp = { display: "grid", gap: 4, gridTemplateColumns: { sm: "1fr 1fr" } } as const;

/** When, how many, and any notes — the second half of the reservation form. */
export function ReservationVisitFields({ form }: { form: UseFormReturn<DiningReservation> }) {
  const { errors } = form.formState;

  return (
    <>
      <Box sx={twoUp}>
        <TextInput
          {...form.register("date")}
          id="dining-date"
          type="date"
          label={f.date}
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
        />
        <TextInput
          {...form.register("time")}
          id="dining-time"
          type="time"
          label={f.time}
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
        />
      </Box>

      <Box sx={twoUp}>
        <SelectField
          {...form.register("partySize", { valueAsNumber: true })}
          id="dining-party-size"
          label={f.partySize}
          options={PARTY_SIZES}
          error={Boolean(errors.partySize)}
          helperText={errors.partySize?.message}
          fullWidth
        />
        <SelectField
          {...form.register("occasion")}
          id="dining-occasion"
          label={f.occasion}
          options={OCCASION_OPTIONS}
          fullWidth
        />
      </Box>

      <Textarea
        {...form.register("message")}
        id="dining-message"
        label={f.message}
        minRows={3}
        fullWidth
      />
      <Checkbox
        {...form.register("consent")}
        id="dining-consent"
        label={f.consent}
        error={errors.consent?.message}
      />
    </>
  );
}
