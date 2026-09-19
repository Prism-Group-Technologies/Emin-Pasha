"use client";

import type { UseFormReturn } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { HoneypotField } from "@/components/atoms/HoneypotField";
import { Checkbox } from "@/components/molecules/Checkbox";
import { TextInput } from "@/components/molecules/TextInput";
import { Textarea } from "@/components/molecules/Textarea";
import { bookingFormCopy } from "@/containers/experiences/transfer/copy/bookingForm";
import type { TransferBooking } from "@/schemas/transferBooking";

const f = bookingFormCopy.fields;
const twoUp = {
  display: "grid",
  gap: 4,
  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
} as const;

/** The contact block — same inputs and contract as the story and pool forms, plus the honeypot. */
export function TransferContactFields({ form }: { form: UseFormReturn<TransferBooking> }) {
  const { errors } = form.formState;

  return (
    <Box sx={{ display: "grid", gap: 4 }}>
      <HoneypotField {...form.register("website")} />
      <TextInput
        {...form.register("name")}
        id="transfer-name"
        label={f.name}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        autoComplete="name"
        fullWidth
      />
      <Box sx={twoUp}>
        <TextInput
          {...form.register("email")}
          id="transfer-email"
          type="email"
          label={f.email}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          autoComplete="email"
          fullWidth
        />
        <TextInput
          {...form.register("phone")}
          id="transfer-phone"
          type="tel"
          label={f.phone}
          autoComplete="tel"
          fullWidth
        />
      </Box>
      <Textarea
        {...form.register("notes")}
        id="transfer-notes"
        label={f.notes}
        minRows={3}
        fullWidth
      />
      <Checkbox
        {...form.register("consent")}
        id="transfer-consent"
        label={f.consent}
        error={errors.consent?.message}
      />
    </Box>
  );
}
