"use client";

import { type UseFormReturn, useWatch } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { TextInput } from "@/components/molecules/TextInput";
import { Textarea } from "@/components/molecules/Textarea";
import { formCopy } from "@/containers/contact/copy/form";
import { intentById } from "@/containers/contact/copy/intents";
import { ControlledDateField } from "@/containers/contact/molecules/ControlledDateField";
import { fromIsoDate } from "@/containers/contact/utils/isoDate";
import type { ContactIntent, ContactValues } from "@/schemas/contact";

const f = formCopy.fields;

/**
 * The fields that change with the chosen intent: an arrival/departure pair
 * for a stay, one date for an event, table or treatment, nothing for
 * "Something else" — plus the headcount and a message whose label asks the
 * question that intent actually needs answering. Every label and switch comes
 * from `copy/intents.ts`, so adding an intent is a data change, not a JSX one.
 */
export function IntentDetailFields({
  form,
  intent,
}: {
  form: UseFormReturn<ContactValues>;
  intent: ContactIntent;
}) {
  const config = intentById(intent);
  const arrival = fromIsoDate(useWatch({ control: form.control, name: "arrival" })) ?? undefined;
  const { errors } = form.formState;

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "1fr",
            sm: config.dates === "range" ? "1fr 1fr" : "minmax(0, 1.4fr) minmax(0, 1fr)",
          },
          "&:empty": { display: "none" },
        }}
      >
        {config.dates === "range" && (
          <>
            <ControlledDateField form={form} name="arrival" label={f.arrival} />
            <ControlledDateField
              form={form}
              name="departure"
              label={f.departure}
              minDate={arrival}
            />
          </>
        )}
        {config.dates === "single" && (
          <ControlledDateField form={form} name="eventDate" label={config.dateLabel ?? ""} />
        )}
        {config.guestsLabel && (
          <TextInput
            {...form.register("guests")}
            id="contact-guests"
            type="number"
            label={config.guestsLabel}
            slotProps={{ htmlInput: { min: 1, max: 2000, inputMode: "numeric" } }}
            error={Boolean(errors.guests)}
            helperText={errors.guests?.message}
            fullWidth
          />
        )}
      </Box>

      <Textarea
        {...form.register("message")}
        id="contact-message"
        label={config.messageLabel}
        minRows={3}
        error={Boolean(errors.message)}
        helperText={errors.message?.message}
        fullWidth
      />
    </>
  );
}
