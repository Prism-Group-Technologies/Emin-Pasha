"use client";

import { Checkbox } from "@/components/molecules/Checkbox";
import { SelectField } from "@/components/molecules/SelectField";
import { TextInput } from "@/components/molecules/TextInput";
import { Textarea } from "@/components/molecules/Textarea";
import type { useRfpForm } from "@/containers/events/hooks/useRfpForm";
import { rfpCopy } from "@/content/rfp-copy";

const { fields, budgetBands } = rfpCopy;

export interface RfpStepProps {
  rfp: ReturnType<typeof useRfpForm>;
}

/** Step 2 — everything optional. Nothing here blocks progress. */
export function RfpStepNeeds({ rfp }: RfpStepProps) {
  const { register } = rfp.form;

  return (
    <>
      <Checkbox
        {...register("accommodation")}
        id="rfp-accommodation"
        label={fields.accommodation}
      />
      <Textarea
        {...register("catering")}
        id="rfp-catering"
        label={fields.catering}
        minRows={2}
        fullWidth
      />
      <SelectField
        {...register("budget")}
        id="rfp-budget"
        label={fields.budget}
        options={budgetBands}
        fullWidth
      />
      <TextInput {...register("company")} id="rfp-company" label={fields.company} fullWidth />
    </>
  );
}
