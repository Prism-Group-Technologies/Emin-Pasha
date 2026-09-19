"use client";

import type { UseFormReturn } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { contactIntents } from "@/containers/contact/copy/intents";
import { RadioTile } from "@/containers/contact/molecules/RadioTile";
import type { ContactValues } from "@/schemas/contact";

/**
 * Step one: what the enquiry is about, as five tiles. A `fieldset` named by
 * the step heading (`labelledBy`), so a screen reader announces the question
 * before the options. Two columns at every width; the odd fifth tile spans
 * the row, so the grid never ends on a lone half-cell.
 */
export function IntentPicker({
  form,
  labelledBy,
}: {
  form: UseFormReturn<ContactValues>;
  labelledBy: string;
}) {
  const registration = form.register("intent");

  return (
    <Box
      component="fieldset"
      aria-labelledby={labelledBy}
      sx={{
        border: 0,
        m: 0,
        p: 0,
        minWidth: 0,
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 2,
        "& > label:last-of-type:nth-of-type(odd)": { gridColumn: "1 / -1" },
      }}
    >
      {contactIntents.map((intent) => (
        <RadioTile
          key={intent.value}
          registration={registration}
          value={intent.value}
          label={intent.label}
          description={intent.blurb}
          icon={intent.icon}
        />
      ))}
    </Box>
  );
}
