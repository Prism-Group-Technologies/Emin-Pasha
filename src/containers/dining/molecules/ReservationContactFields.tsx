"use client";

import type { UseFormReturn } from "react-hook-form";

import { SelectField } from "@/components/molecules/SelectField";
import { TextInput } from "@/components/molecules/TextInput";
import { outletOptions, reservationCopy } from "@/containers/dining/copy/reservation";
import type { DiningReservation } from "@/schemas/diningReservation";

const f = reservationCopy.fields;
const OUTLET_OPTIONS = outletOptions.map((option) => ({
  value: option.value,
  label: option.label,
}));

/** Who is booking and where — the first half of the reservation form. */
export function ReservationContactFields({ form }: { form: UseFormReturn<DiningReservation> }) {
  const { errors } = form.formState;

  return (
    <>
      <TextInput
        {...form.register("name")}
        id="dining-name"
        label={f.name}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        autoComplete="name"
        fullWidth
      />
      <TextInput
        {...form.register("email")}
        id="dining-email"
        type="email"
        label={f.email}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        autoComplete="email"
        fullWidth
      />
      <TextInput
        {...form.register("phone")}
        id="dining-phone"
        type="tel"
        label={f.phone}
        autoComplete="tel"
        fullWidth
      />
      <SelectField
        {...form.register("outlet")}
        id="dining-outlet"
        label={f.outlet}
        options={OUTLET_OPTIONS}
        fullWidth
      />
    </>
  );
}
