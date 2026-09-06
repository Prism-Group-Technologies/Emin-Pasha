"use client";

import { Checkbox } from "@/components/molecules/Checkbox";
import { TextInput } from "@/components/molecules/TextInput";
import { Textarea } from "@/components/molecules/Textarea";
import type { useRfpForm } from "@/containers/events/hooks/useRfpForm";
import { rfpCopy } from "@/content/rfp-copy";

const { fields, errors: errorCopy } = rfpCopy;

export interface RfpStepProps {
  rfp: ReturnType<typeof useRfpForm>;
}

/** Step 3 — who to reply to, plus the consent checkbox. */
export function RfpStepContact({ rfp }: RfpStepProps) {
  const { register, formState } = rfp.form;
  const { errors } = formState;

  return (
    <>
      <TextInput
        {...register("name")}
        id="rfp-name"
        label={fields.name}
        autoComplete="name"
        error={Boolean(errors.name)}
        helperText={errors.name ? errorCopy.name : undefined}
        fullWidth
      />
      <TextInput
        {...register("email")}
        id="rfp-email"
        type="email"
        label={fields.email}
        autoComplete="email"
        error={Boolean(errors.email)}
        helperText={errors.email ? errorCopy.email : undefined}
        fullWidth
      />
      <TextInput
        {...register("phone")}
        id="rfp-phone"
        type="tel"
        label={fields.phone}
        autoComplete="tel"
        fullWidth
      />
      <Textarea
        {...register("message")}
        id="rfp-message"
        label={fields.message}
        minRows={3}
        fullWidth
      />
      <Checkbox
        {...register("consent")}
        id="rfp-consent"
        label={fields.consent}
        error={errors.consent ? errorCopy.consent : undefined}
      />
    </>
  );
}
