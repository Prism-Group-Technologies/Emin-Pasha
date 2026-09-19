"use client";

import type { UseFormReturn } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { HoneypotField } from "@/components/atoms/HoneypotField";
import { Checkbox } from "@/components/molecules/Checkbox";
import { SelectField } from "@/components/molecules/SelectField";
import { TextInput } from "@/components/molecules/TextInput";
import { Textarea } from "@/components/molecules/Textarea";
import { enquiryCopy, storyFocusOptions } from "@/containers/story/copy/enquiry";
import type { StoryEnquiry } from "@/schemas/storyEnquiry";

const f = enquiryCopy.fields;
const FOCUS_OPTIONS = storyFocusOptions.map((o) => ({ value: o.value, label: o.label }));
const twoUp = { display: "grid", gap: 4, gridTemplateColumns: { sm: "1fr 1fr" } } as const;

/** Every input on the "Stay in the story" enquiry form — kept out of the form organism. */
export function StoryEnquiryFields({ form }: { form: UseFormReturn<StoryEnquiry> }) {
  const { errors } = form.formState;

  return (
    <>
      <HoneypotField {...form.register("website")} />
      <TextInput
        {...form.register("name")}
        id="story-name"
        label={f.name}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        autoComplete="name"
        fullWidth
      />
      <Box sx={twoUp}>
        <TextInput
          {...form.register("email")}
          id="story-email"
          type="email"
          label={f.email}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          autoComplete="email"
          fullWidth
        />
        <TextInput
          {...form.register("phone")}
          id="story-phone"
          type="tel"
          label={f.phone}
          autoComplete="tel"
          fullWidth
        />
      </Box>
      <Box sx={twoUp}>
        <SelectField
          {...form.register("focus")}
          id="story-focus"
          label={f.focus}
          options={FOCUS_OPTIONS}
          fullWidth
        />
        <TextInput
          {...form.register("preferredDate")}
          id="story-date"
          label={f.preferredDate}
          placeholder="e.g. a weekend in March"
          fullWidth
        />
      </Box>
      <Textarea
        {...form.register("message")}
        id="story-message"
        label={f.message}
        minRows={3}
        fullWidth
      />
      <Checkbox
        {...form.register("consent")}
        id="story-consent"
        label={f.consent}
        error={errors.consent?.message}
      />
    </>
  );
}
