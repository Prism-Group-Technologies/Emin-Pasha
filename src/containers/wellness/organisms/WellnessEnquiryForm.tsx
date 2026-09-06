"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { Checkbox } from "@/components/molecules/Checkbox";
import { SelectField } from "@/components/molecules/SelectField";
import { TextInput } from "@/components/molecules/TextInput";
import { Textarea } from "@/components/molecules/Textarea";
import { useWellnessEnquiry } from "@/containers/wellness/hooks/useWellnessEnquiry";
import { wellnessCopy } from "@/content/wellness-copy";
import type { WellnessInterest } from "@/schemas/wellnessEnquiry";

const copy = wellnessCopy.enquiry;

const OPTIONS: { value: WellnessInterest; label: string }[] = [
  { value: "spa", label: copy.options.spa },
  { value: "gym", label: copy.options.gym },
  { value: "pool", label: copy.options.pool },
];

/**
 * Lead capture in place of a price list. There is no treatment menu, no
 * membership tier and no day-pass rate in the source, and inventing any of
 * them is forbidden (§0.7) — so the page asks rather than guesses.
 *
 * 'use client' justification: react-hook-form state and submission.
 * The result line is `aria-live` with a reserved height, so the message
 * arriving cannot move the form (CLAUDE.md §10, and CLS stays at 0).
 */
export function WellnessEnquiryForm({ interest }: { interest: WellnessInterest }) {
  const { form, onSubmit, result, submitting } = useWellnessEnquiry(interest);
  const { errors } = form.formState;

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      noValidate
      sx={{ display: "grid", gap: 4, maxWidth: 560 }}
    >
      <Text variant="h3" component="h2">
        {copy.heading}
      </Text>
      <Text variant="body2" color="text.secondary">
        {copy.lead}
      </Text>
      <TextInput
        {...form.register("name")}
        id="wellness-name"
        label={copy.name}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        autoComplete="name"
        fullWidth
      />
      <TextInput
        {...form.register("email")}
        id="wellness-email"
        type="email"
        label={copy.email}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        autoComplete="email"
        fullWidth
      />
      <SelectField
        {...form.register("interest")}
        id="wellness-interest"
        label={copy.interest}
        options={OPTIONS}
        fullWidth
      />
      <Textarea
        {...form.register("message")}
        id="wellness-message"
        label={copy.message}
        minRows={3}
        fullWidth
      />
      <Checkbox
        {...form.register("consent")}
        id="wellness-consent"
        label={copy.consent}
        error={errors.consent?.message}
      />
      <Button type="submit" loading={submitting} sx={{ justifySelf: "start" }}>
        {submitting ? copy.submitting : copy.submit}
      </Button>
      <Text
        role="status"
        aria-live="polite"
        variant="body2"
        color="text.secondary"
        sx={{ minHeight: 40 }}
      >
        {result}
      </Text>
    </Box>
  );
}
