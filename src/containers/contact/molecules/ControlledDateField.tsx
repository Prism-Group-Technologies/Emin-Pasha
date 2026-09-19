"use client";

import { Controller, type UseFormReturn } from "react-hook-form";

import { DateField } from "@/components/molecules/DateField";
import { fromIsoDate, toIsoDate } from "@/containers/contact/utils/isoDate";
import type { ContactValues } from "@/schemas/contact";

export interface ControlledDateFieldProps {
  form: UseFormReturn<ContactValues>;
  name: "arrival" | "departure" | "eventDate";
  label: string;
  /** e.g. departure's floor is the chosen arrival. */
  minDate?: Date;
}

/**
 * The shared `DateField` bound to react-hook-form. The picker needs a
 * controlled `Date`, the form stores an ISO string — `utils/isoDate` does the
 * crossing both ways, so no component handles a raw `Date` → string itself.
 */
export function ControlledDateField({ form, name, label, minDate }: ControlledDateFieldProps) {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <DateField
          id={`contact-${name}`}
          label={label}
          value={fromIsoDate(field.value)}
          onChange={(date) => field.onChange(toIsoDate(date))}
          onBlur={field.onBlur}
          minDate={minDate}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
}
