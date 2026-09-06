"use client";

import { SelectField } from "@/components/molecules/SelectField";
import { TextInput } from "@/components/molecules/TextInput";
import type { useRfpForm } from "@/containers/events/hooks/useRfpForm";
import { rfpCopy } from "@/content/rfp-copy";

const { fields, eventTypes, errors: errorCopy } = rfpCopy;

export interface RfpStepProps {
  rfp: ReturnType<typeof useRfpForm>;
}

/** Step 1 — what and when. These three gate the mobile stepper. */
export function RfpStepEvent({ rfp }: RfpStepProps) {
  const { register, formState } = rfp.form;
  const { errors } = formState;

  return (
    <>
      <SelectField
        {...register("eventType")}
        id="rfp-event-type"
        label={fields.eventType}
        options={eventTypes}
        error={Boolean(errors.eventType)}
        helperText={errors.eventType ? errorCopy.eventType : undefined}
        fullWidth
      />
      <TextInput
        {...register("startDate")}
        id="rfp-start-date"
        type="date"
        label={fields.startDate}
        slotProps={{ inputLabel: { shrink: true } }}
        error={Boolean(errors.startDate)}
        helperText={errors.startDate ? errorCopy.startDate : undefined}
        fullWidth
      />
      <TextInput
        {...register("endDate")}
        id="rfp-end-date"
        type="date"
        label={fields.endDate}
        slotProps={{ inputLabel: { shrink: true } }}
        fullWidth
      />
      <TextInput
        {...register("guests")}
        id="rfp-guests"
        type="number"
        inputMode="numeric"
        label={fields.guests}
        error={Boolean(errors.guests)}
        helperText={errors.guests ? errorCopy.guests : undefined}
        fullWidth
      />
    </>
  );
}
