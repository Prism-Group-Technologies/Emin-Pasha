"use client";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { Checkbox } from "@/components/molecules/Checkbox";
import { formatUsd } from "@/containers/experiences/transfer/currency";
import type { TransferJourney } from "@/containers/experiences/transfer/hooks/useTransferJourney";

/**
 * The optional extras that apply to the chosen service — VIP meet & assist
 * disappears for hourly hire, for instance — each with its price and how it
 * scales. Toggling feeds the running quote. Presentational.
 */
export function ExtrasPicker({ journey }: { journey: TransferJourney }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
      }}
    >
      {journey.availableAddOns.map((addOn) => (
        <Box
          key={addOn.value}
          sx={{
            p: 3,
            border: "1px solid",
            borderColor: journey.isAddOnSelected(addOn.value) ? "primary.main" : "divider",
            borderRadius: 2,
            bgcolor: "background.default",
          }}
        >
          <Checkbox
            id={`transfer-addon-${addOn.value}`}
            label={`${addOn.label} · ${formatUsd(addOn.priceUsd)}${addOn.perPerson ? " pp" : ""}`}
            checked={journey.isAddOnSelected(addOn.value)}
            onChange={() => journey.toggleAddOn(addOn.value)}
          />
          <Text variant="body2" color="text.secondary" sx={{ pl: 4, textWrap: "pretty" }}>
            {addOn.hint}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
