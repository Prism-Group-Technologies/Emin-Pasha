"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { reservationCopy } from "@/containers/dining/copy/reservation";
import { useDiningReservation } from "@/containers/dining/hooks/useDiningReservation";
import { ReservationContactFields } from "@/containers/dining/molecules/ReservationContactFields";
import { ReservationVisitFields } from "@/containers/dining/molecules/ReservationVisitFields";
import type { ReservationOutlet } from "@/schemas/diningReservation";

const copy = reservationCopy;

/**
 * The table-reservation enquiry form. Presentational — all state and
 * submission live in `useDiningReservation`, and every input lives in
 * `ReservationFields`. Same shape as `wellness/organisms/WellnessEnquiryForm`:
 * an `aria-live` result line with reserved height so the reply cannot shift
 * the form (CLS stays 0).
 *
 * 'use client' justification: form state and submission.
 */
export function DiningReservationForm({ outlet = "any" }: { outlet?: ReservationOutlet }) {
  const { form, onSubmit, result, submitting } = useDiningReservation(outlet);

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

      <ReservationContactFields form={form} />
      <ReservationVisitFields form={form} />

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
