"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { enquiryCopy } from "@/containers/story/copy/enquiry";
import { useStoryEnquiry } from "@/containers/story/hooks/useStoryEnquiry";
import { StoryEnquiryFields } from "@/containers/story/molecules/StoryEnquiryFields";

/**
 * Lead capture in place of a booking engine — there is no online booking on
 * the published site, so the form asks and a person on the reservations desk
 * confirms. Presentational: all state and submission live in
 * `useStoryEnquiry`, and every input lives in `StoryEnquiryFields`.
 *
 * 'use client' justification: react-hook-form state and submission. The
 * result line is `aria-live` with a reserved height, so the message arriving
 * cannot move the form (CLS stays at 0).
 */
export function StoryEnquiryForm() {
  const { form, onSubmit, result, submitting } = useStoryEnquiry();

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      noValidate
      sx={{ display: "grid", gap: 4, maxWidth: 560 }}
    >
      <Text variant="h3" component="h2">
        {enquiryCopy.heading}
      </Text>
      <Text variant="body2" color="text.secondary">
        {enquiryCopy.lead}
      </Text>

      <StoryEnquiryFields form={form} />

      <Button type="submit" loading={submitting} sx={{ justifySelf: "start" }}>
        {submitting ? enquiryCopy.submitting : enquiryCopy.submit}
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
