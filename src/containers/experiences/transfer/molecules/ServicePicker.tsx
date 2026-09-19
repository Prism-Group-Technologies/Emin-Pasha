"use client";

import { Box } from "@/components/atoms/Box";
import { VisuallyHidden } from "@/components/atoms/VisuallyHidden";
import { bookingFormCopy } from "@/containers/experiences/transfer/copy/bookingForm";
import { transferServices } from "@/containers/experiences/transfer/copy/services";
import type { TransferJourney } from "@/containers/experiences/transfer/hooks/useTransferJourney";
import { OptionTile } from "@/containers/experiences/transfer/molecules/OptionTile";

/**
 * Step one: pickup, drop-off, return or hourly hire, as four tiles — 1-up on
 * the narrowest phones, 2-up from `sm`. Presentational; state is
 * `useTransferJourney`.
 */
export function ServicePicker({ journey }: { journey: TransferJourney }) {
  return (
    <Box role="radiogroup" aria-labelledby="transfer-service-label">
      <VisuallyHidden>
        <span id="transfer-service-label">{bookingFormCopy.fields.service}</span>
      </VisuallyHidden>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
        }}
      >
        {transferServices.map((service) => (
          <OptionTile
            key={service.value}
            name="transfer-service"
            value={service.value}
            checked={journey.service === service.value}
            onSelect={() => journey.setService(service.value)}
            title={service.label}
            hint={service.hint}
            icon={service.icon}
          />
        ))}
      </Box>
    </Box>
  );
}
