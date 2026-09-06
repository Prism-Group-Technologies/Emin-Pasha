"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { useRfpForm } from "@/containers/events/hooks/useRfpForm";
import { RfpFields } from "@/containers/events/organisms/RfpFields";
import { identity } from "@/content/identity";
import { rfpCopy } from "@/content/rfp-copy";
import { DESKTOP_QUERY, useMediaBreakpoint } from "@/hooks/useMediaBreakpoint";
import { telephoneUrl } from "@/lib/directions";

const { actions, steps, success } = rfpCopy;

/**
 * The RFP form. Multi-step below `md`, a single column above it — the same
 * fields and the same validation either way (`RfpFields` owns both).
 *
 * 'use client' justification: form state, step state and submission.
 * Success replaces the form rather than sitting under it, so nobody submits
 * twice; it carries the phone number because no response-time SLA is
 * confirmed (TODO(EMIN-Q10)) and a tight date needs a person, not a promise.
 */
export function RfpForm() {
  const rfp = useRfpForm();
  const isDesktop = useMediaBreakpoint(DESKTOP_QUERY);
  const lastStep = rfp.step === steps.length - 1;

  if (rfp.status === "sent") {
    return (
      <Stack
        role="status"
        aria-live="polite"
        spacing={3}
        sx={{ p: 5, border: "1px solid", borderColor: "primary.main" }}
      >
        <Text variant="h3" component="h2">
          {success.heading}
        </Text>
        <Text variant="body1" color="text.secondary">
          {rfp.message ?? success.body}
        </Text>
        <Text variant="body2" color="text.secondary">
          {success.sla}
        </Text>
        <Button href={telephoneUrl} variant="ghost" sx={{ alignSelf: "flex-start" }}>
          {identity.telephone}
        </Button>
      </Stack>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={rfp.onSubmit}
      onBlur={rfp.persist}
      noValidate
      sx={{ display: "grid", gap: 5, maxWidth: 640 }}
    >
      <Stack spacing={2}>
        <Text variant="h3" component="h2">
          {rfpCopy.heading}
        </Text>
        <Text variant="body2" color="text.secondary">
          {rfpCopy.lead}
        </Text>
      </Stack>

      <RfpFields rfp={rfp} step={isDesktop ? null : rfp.step} />

      <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap" }}>
        {!isDesktop && rfp.step > 0 && (
          <Button variant="ghost" onClick={rfp.back}>
            {actions.back}
          </Button>
        )}
        {!isDesktop && !lastStep ? (
          <Button onClick={rfp.next}>{actions.next}</Button>
        ) : (
          <Button type="submit" loading={rfp.status === "submitting"} size="large">
            {rfp.status === "submitting" ? actions.submitting : actions.submit}
          </Button>
        )}
      </Stack>

      <Text
        role="status"
        aria-live="polite"
        variant="body2"
        color="error.main"
        sx={{ minHeight: 40 }}
      >
        {rfp.status === "error" ? rfp.message : null}
      </Text>
    </Box>
  );
}
