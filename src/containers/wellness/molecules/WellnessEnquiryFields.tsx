"use client";

import type { UseFormReturn } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { Checkbox } from "@/components/molecules/Checkbox";
import { SelectField } from "@/components/molecules/SelectField";
import { TextInput } from "@/components/molecules/TextInput";
import { Textarea } from "@/components/molecules/Textarea";
import { wellnessCopy } from "@/content/wellness-copy";
import type { WellnessEnquiry, WellnessInterest } from "@/schemas/wellnessEnquiry";

const c = wellnessCopy.enquiry;

const INTEREST_OPTIONS: { value: WellnessInterest; label: string }[] = [
  { value: "any", label: c.options.any },
  { value: "spa", label: c.options.spa },
  { value: "gym", label: c.options.gym },
  { value: "pool", label: c.options.pool },
];

const twoUp = { display: "grid", gap: 4, gridTemplateColumns: { sm: "1fr 1fr" } } as const;

/** Every input on the wellness enquiry form — kept out of the form organism. */
export function WellnessEnquiryFields({ form }: { form: UseFormReturn<WellnessEnquiry> }) {
  const { errors } = form.formState;

  return (
    <>
      <TextInput
        {...form.register("name")}
        id="wellness-name"
        label={c.name}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        autoComplete="name"
        fullWidth
      />
      <Box sx={twoUp}>
        <TextInput
          {...form.register("email")}
          id="wellness-email"
          type="email"
          label={c.email}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          autoComplete="email"
          fullWidth
        />
        <TextInput
          {...form.register("phone")}
          id="wellness-phone"
          type="tel"
          label={c.phone}
          autoComplete="tel"
          fullWidth
        />
      </Box>
      <Box sx={twoUp}>
        <SelectField
          {...form.register("interest")}
          id="wellness-interest"
          label={c.interest}
          options={INTEREST_OPTIONS}
          fullWidth
        />
        <TextInput
          {...form.register("preferredDate")}
          id="wellness-date"
          type="date"
          label={c.preferredDate}
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
        />
      </Box>
      <Textarea
        {...form.register("message")}
        id="wellness-message"
        label={c.message}
        minRows={3}
        fullWidth
      />
      <Checkbox
        {...form.register("consent")}
        id="wellness-consent"
        label={c.consent}
        error={errors.consent?.message}
      />
    </>
  );
}
