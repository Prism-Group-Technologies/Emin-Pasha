"use client";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { VisuallyHidden } from "@/components/atoms/VisuallyHidden";
import { bookingFormCopy } from "@/containers/experiences/transfer/copy/bookingForm";
import { vehicles } from "@/containers/experiences/transfer/copy/fleet";
import { formatUsd } from "@/containers/experiences/transfer/currency";
import type { TransferJourney } from "@/containers/experiences/transfer/hooks/useTransferJourney";
import { OptionTile } from "@/containers/experiences/transfer/molecules/OptionTile";

/**
 * Step two: the car. Each tile shows seats and cases, and the per-leg or
 * hourly rate that matches the chosen service, so the price a traveller
 * compares here is the one that lands in the quote. Presentational.
 */
export function VehiclePicker({ journey }: { journey: TransferJourney }) {
  return (
    <Box role="radiogroup" aria-labelledby="transfer-vehicle-label">
      <VisuallyHidden>
        <span id="transfer-vehicle-label">{bookingFormCopy.fields.vehicle}</span>
      </VisuallyHidden>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
        }}
      >
        {vehicles.map((vehicle) => (
          <OptionTile
            key={vehicle.id}
            name="transfer-vehicle"
            value={vehicle.id}
            checked={journey.vehicle === vehicle.id}
            onSelect={() => journey.setVehicle(vehicle.id)}
            title={vehicle.className}
            hint={`${vehicle.seats} seats · ${vehicle.bags} cases`}
            icon="car"
            aside={
              <Text
                variant="body2"
                component="span"
                sx={{ fontFamily: "var(--font-cartographic)", whiteSpace: "nowrap" }}
              >
                {formatUsd(journey.isHourly ? vehicle.hourlyUsd : vehicle.transferUsd)}
                {journey.isHourly ? "/h" : ""}
              </Text>
            }
          />
        ))}
      </Box>
    </Box>
  );
}
