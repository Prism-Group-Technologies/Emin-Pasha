"use client";

import type { UseFormReturn } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { HoneypotField } from "@/components/atoms/HoneypotField";
import { TextInput } from "@/components/molecules/TextInput";
import { formCopy } from "@/containers/contact/copy/form";
import type { ContactValues } from "@/schemas/contact";

const f = formCopy.fields;
const twoUp = {
  display: "grid",
  gap: 3,
  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
} as const;

/**
 * Who is writing: name, email, phone and country, plus the honeypot. The
 * phone label switches to required the moment the visitor asks for a call or
 * WhatsApp reply (`phoneRequired`, derived in `useContactEnquiry`), so the
 * requirement is visible before the schema has to enforce it.
 */
export function ContactIdentityFields({
  form,
  phoneRequired,
}: {
  form: UseFormReturn<ContactValues>;
  phoneRequired: boolean;
}) {
  const { errors } = form.formState;

  return (
    <>
      <HoneypotField {...form.register("website")} />
      <Box sx={twoUp}>
        <TextInput
          {...form.register("name")}
          id="contact-name"
          label={f.name}
          autoComplete="name"
          required
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          fullWidth
        />
        <TextInput
          {...form.register("email")}
          id="contact-email"
          type="email"
          label={f.email}
          autoComplete="email"
          required
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          fullWidth
        />
      </Box>
      <Box sx={twoUp}>
        <TextInput
          {...form.register("phone")}
          id="contact-phone"
          type="tel"
          label={phoneRequired ? f.phone : f.phoneOptional}
          autoComplete="tel"
          required={phoneRequired}
          error={Boolean(errors.phone)}
          helperText={errors.phone?.message}
          fullWidth
        />
        <TextInput
          {...form.register("country")}
          id="contact-country"
          label={f.country}
          autoComplete="country-name"
          fullWidth
        />
      </Box>
    </>
  );
}
