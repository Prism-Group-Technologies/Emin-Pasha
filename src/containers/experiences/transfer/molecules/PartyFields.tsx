"use client";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { Alert } from "@/components/molecules/Alert";
import { NumberStepper } from "@/components/molecules/NumberStepper";
import { bookingFormCopy } from "@/containers/experiences/transfer/copy/bookingForm";
import { TRANSFER_PRICING } from "@/containers/experiences/transfer/copy/services";
import type { TransferJourney } from "@/containers/experiences/transfer/hooks/useTransferJourney";

const f = bookingFormCopy.fields;

/**
 * Passengers, cases and nights. The capacity check sits right under the
 * steppers that trigger it, so "4 passengers won't fit the saloon" appears
 * the moment it becomes true, next to the fix. Nights is what unlocks the
 * complimentary fare, and its hint says so. Presentational.
 */
export function PartyFields({ journey }: { journey: TransferJourney }) {
  const warning = journey.quote.capacityWarning;

  return (
    <Box sx={{ display: "grid", gap: 4 }}>
      <Box
        sx={{
          display: "grid",
          gap: 4,
          maxWidth: 420,
        }}
      >
        <NumberStepper
          id="transfer-passengers"
          label={f.passengers}
          value={journey.passengers}
          onChange={journey.setPassengers}
          min={1}
          max={TRANSFER_PRICING.maxPassengers}
        />
        <NumberStepper
          id="transfer-bags"
          label={f.bags}
          value={journey.bags}
          onChange={journey.setBags}
          min={0}
          max={TRANSFER_PRICING.maxBags}
        />
        <NumberStepper
          id="transfer-nights"
          label={f.nights}
          value={journey.nights}
          onChange={journey.setNights}
          min={0}
          max={TRANSFER_PRICING.maxNights}
        />
      </Box>
      <Text variant="body2" color={journey.quote.complimentary ? "success.main" : "text.secondary"}>
        {f.nightsHint}
      </Text>
      <Box aria-live="polite">
        {warning && (
          <Alert severity="warning" variant="outlined">
            {warning}
          </Alert>
        )}
      </Box>
    </Box>
  );
}
