"use client";

import type { UseFormReturn } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { HoneypotField } from "@/components/atoms/HoneypotField";
import { Checkbox } from "@/components/molecules/Checkbox";
import { TextInput } from "@/components/molecules/TextInput";
import { Textarea } from "@/components/molecules/Textarea";
import { enquiryCopy } from "@/containers/spaces/copy/enquiry";
import type { SpacesEnquiry } from "@/schemas/spacesEnquiry";

const f = enquiryCopy.fields;
const twoUp = { display: "grid", gap: 4, gridTemplateColumns: { sm: "1fr 1fr" } } as const;

/** The "who you are" half of the reservation form, plus the honeypot and consent. */
export function SpacesContactFields({ form }: { form: UseFormReturn<SpacesEnquiry> }) {
  const { errors } = form.formState;

  return (
    <>
      <HoneypotField {...form.register("website")} />
      <TextInput
        {...form.register("name")}
        id="spaces-name"
        label={f.name}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        autoComplete="name"
        fullWidth
      />
      <Box sx={twoUp}>
        <TextInput
          {...form.register("email")}
          id="spaces-email"
          type="email"
          label={f.email}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          autoComplete="email"
          fullWidth
        />
        <TextInput
          {...form.register("phone")}
          id="spaces-phone"
          type="tel"
          label={f.phone}
          error={Boolean(errors.phone)}
          helperText={errors.phone?.message}
          autoComplete="tel"
          fullWidth
        />
      </Box>
      <Textarea
        {...form.register("message")}
        id="spaces-message"
        label={f.message}
        minRows={3}
        fullWidth
      />
      <Checkbox
        {...form.register("consent")}
        id="spaces-consent"
        label={f.consent}
        error={errors.consent?.message}
      />
    </>
  );
}
