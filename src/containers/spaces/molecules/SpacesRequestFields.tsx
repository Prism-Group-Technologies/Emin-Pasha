"use client";

import type { UseFormReturn } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { SelectField, type SelectOption } from "@/components/molecules/SelectField";
import { TextInput } from "@/components/molecules/TextInput";
import { enquiryCopy, requestTypeOptions, timeOptions } from "@/containers/spaces/copy/enquiry";
import { signatureExperiences } from "@/containers/spaces/copy/experiences";
import { SpacesDateField } from "@/containers/spaces/molecules/SpacesDateField";
import type { SpacesEnquiry } from "@/schemas/spacesEnquiry";

const f = enquiryCopy.fields;
const REQUESTS = requestTypeOptions.map(({ value, label }) => ({ value, label }));
const TIMES = timeOptions.map(({ value, label }) => ({ value, label }));
const EXPERIENCES = [
  { value: "none", label: f.noExperience },
  ...signatureExperiences.map((experience) => ({ value: experience.id, label: experience.title })),
];
const twoUp = { display: "grid", gap: 4, gridTemplateColumns: { sm: "1fr 1fr" } } as const;

export interface SpacesRequestFieldsProps {
  form: UseFormReturn<SpacesEnquiry>;
  /** Built on the server from the approved space names. */
  spaceOptions: SelectOption[];
}

/**
 * The "what and when" half of the reservation form. Selects are controlled
 * through `watch` so a seeded value from the matcher shows immediately.
 */
export function SpacesRequestFields({ form, spaceOptions }: SpacesRequestFieldsProps) {
  const { errors } = form.formState;
  const [requestType, space, experience, time] = form.watch([
    "requestType",
    "space",
    "experience",
    "time",
  ]);

  return (
    <>
      <Box sx={twoUp}>
        <SelectField
          {...form.register("requestType")}
          value={requestType}
          id="spaces-request"
          label={f.requestType}
          options={REQUESTS}
          fullWidth
        />
        <SelectField
          {...form.register("space")}
          value={space}
          id="spaces-space"
          label={f.space}
          options={[{ value: "any", label: f.anySpace }, ...spaceOptions]}
          fullWidth
        />
      </Box>
      <SelectField
        {...form.register("experience")}
        value={experience}
        id="spaces-experience"
        label={f.experience}
        options={EXPERIENCES}
        fullWidth
      />
      <Box sx={{ ...twoUp, gridTemplateColumns: { sm: "0.7fr 1.3fr 1fr" } }}>
        <TextInput
          {...form.register("guests", { valueAsNumber: true })}
          id="spaces-guests"
          type="number"
          label={f.guests}
          error={Boolean(errors.guests)}
          helperText={errors.guests?.message}
          slotProps={{ htmlInput: { min: 1, max: 250, inputMode: "numeric" } }}
          fullWidth
        />
        <SpacesDateField form={form} label={f.date} />
        <SelectField
          {...form.register("time")}
          value={time}
          id="spaces-time"
          label={f.time}
          options={TIMES}
          fullWidth
        />
      </Box>
    </>
  );
}
