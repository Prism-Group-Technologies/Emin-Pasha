"use client";

import { Controller, type UseFormReturn } from "react-hook-form";

import { DateField } from "@/components/molecules/DateField";
import { fromIsoDate, toIsoDate } from "@/containers/contact/utils/isoDate";
import type { SpacesEnquiry } from "@/schemas/spacesEnquiry";

/**
 * The shared `DateField` bound to the reservation form's ISO `date` string —
 * the same crossing as the contact page's `ControlledDateField`, via the one
 * `utils/isoDate` pair.
 */
export function SpacesDateField({
  form,
  label,
}: {
  form: UseFormReturn<SpacesEnquiry>;
  label: string;
}) {
  return (
    <Controller
      control={form.control}
      name="date"
      render={({ field, fieldState }) => (
        <DateField
          id="spaces-date"
          label={label}
          value={fromIsoDate(field.value)}
          onChange={(date) => field.onChange(toIsoDate(date))}
          onBlur={field.onBlur}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
}
