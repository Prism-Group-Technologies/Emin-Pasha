"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { useWellnessEnquiry } from "@/containers/wellness/hooks/useWellnessEnquiry";
import { WellnessEnquiryFields } from "@/containers/wellness/molecules/WellnessEnquiryFields";
import { wellnessCopy } from "@/content/wellness-copy";
import type { WellnessInterest } from "@/schemas/wellnessEnquiry";

const copy = wellnessCopy.enquiry;

/**
 * Lead capture in place of a booking engine — there is no online wellness
 * booking on the published site, so the form asks and a person confirms.
 * Presentational: all state and submission live in `useWellnessEnquiry`, and
 * every input lives in `WellnessEnquiryFields`.
 *
 * 'use client' justification: react-hook-form state and submission. The
 * result line is `aria-live` with a reserved height, so the message arriving
 * cannot move the form (CLS stays at 0).
 */
export function WellnessEnquiryForm({ interest }: { interest: WellnessInterest }) {
  const { form, onSubmit, result, submitting } = useWellnessEnquiry(interest);

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

      <WellnessEnquiryFields form={form} />

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
