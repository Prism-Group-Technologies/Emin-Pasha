"use client";

import type { UseFormReturn } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { Checkbox } from "@/components/molecules/Checkbox";
import { TextInput } from "@/components/molecules/TextInput";
import { Textarea } from "@/components/molecules/Textarea";
import { wellnessCopy } from "@/content/wellness-copy";
import type { PoolPlannerContact } from "@/schemas/poolPlanner";

const c = wellnessCopy.enquiry;
const twoUp = { display: "grid", gap: 4, gridTemplateColumns: { sm: "1fr 1fr" } } as const;

/** The contact block on the pool planner — same inputs and contract as `WellnessEnquiryFields`. */
export function PoolPlannerContactFields({ form }: { form: UseFormReturn<PoolPlannerContact> }) {
  const { errors } = form.formState;

  return (
    <Box sx={{ display: "grid", gap: 4 }}>
      <TextInput
        {...form.register("name")}
        id="pool-name"
        label={c.name}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        autoComplete="name"
        fullWidth
      />
      <Box sx={twoUp}>
        <TextInput
          {...form.register("email")}
          id="pool-email"
          type="email"
          label={c.email}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          autoComplete="email"
          fullWidth
        />
        <TextInput
          {...form.register("phone")}
          id="pool-phone"
          type="tel"
          label={c.phone}
          autoComplete="tel"
          fullWidth
        />
      </Box>
      <TextInput
        {...form.register("preferredDate")}
        id="pool-date"
        type="date"
        label={c.preferredDate}
        slotProps={{ inputLabel: { shrink: true } }}
        fullWidth
      />
      <Textarea
        {...form.register("notes")}
        id="pool-notes"
        label="Anything else we should know (optional)"
        minRows={3}
        fullWidth
      />
      <Checkbox
        {...form.register("consent")}
        id="pool-consent"
        label={c.consent}
        error={errors.consent?.message}
      />
    </Box>
  );
}
