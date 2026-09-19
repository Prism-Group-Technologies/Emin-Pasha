"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { Alert } from "@/components/molecules/Alert";
import type { SelectOption } from "@/components/molecules/SelectField";
import { enquiryCopy } from "@/containers/spaces/copy/enquiry";
import { useSpacesEnquiry } from "@/containers/spaces/hooks/useSpacesEnquiry";
import { SpacesContactFields } from "@/containers/spaces/molecules/SpacesContactFields";
import { SpacesRequestFields } from "@/containers/spaces/molecules/SpacesRequestFields";

/**
 * The reservation form. Presentational: state, seeding and submission live in
 * `useSpacesEnquiry`; inputs live in the two field molecules.
 *
 * 'use client' justification: react-hook-form state and submission. The
 * result line is `aria-live` with a reserved height, so CLS stays at 0.
 */
export function SpacesEnquiryForm({ spaceOptions }: { spaceOptions: SelectOption[] }) {
  const { form, onSubmit, result, seeded, submitting } = useSpacesEnquiry();

  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ display: "grid", gap: 4 }}>
      <Text variant="h3" component="h3">
        {enquiryCopy.heading}
      </Text>
      <Text variant="body2" color="text.secondary">
        {enquiryCopy.lead}
      </Text>
      {seeded && <Alert severity="info">{enquiryCopy.seededNote}</Alert>}
      <SpacesRequestFields form={form} spaceOptions={spaceOptions} />
      <SpacesContactFields form={form} />
      <Button
        type="submit"
        loading={submitting}
        sx={{ justifySelf: { xs: "stretch", sm: "start" } }}
      >
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
