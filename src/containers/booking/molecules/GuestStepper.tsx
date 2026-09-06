"use client";

import { Stack } from "@/components/atoms/Stack";
import { NumberStepper } from "@/components/molecules/NumberStepper";
import type { BookingWidgetData } from "@/containers/booking/types";

export interface GuestStepperProps {
  data: BookingWidgetData;
  adults: number;
  /** Named `childGuests`, not `children` — that name belongs to JSX. */
  childGuests: number;
  rooms: number;
  onChange: (field: "adults" | "children" | "rooms", value: number) => void;
}

/**
 * Adults / children / rooms. Presentational — every bound comes from
 * `data.limits` rather than being written here, so the day the YCS-configured
 * occupancy limits arrive (TODO(EMIN-Q71)) this file does not change.
 */
export function GuestStepper({ data, adults, childGuests, rooms, onChange }: GuestStepperProps) {
  const { copy, limits } = data;

  return (
    <Stack spacing={3} sx={{ minWidth: 240 }}>
      <NumberStepper
        label={copy.fields.adults}
        value={adults}
        min={1}
        max={limits.maxAdults}
        onChange={(value) => onChange("adults", value)}
      />
      <NumberStepper
        label={copy.fields.children}
        value={childGuests}
        min={0}
        max={limits.maxChildren}
        onChange={(value) => onChange("children", value)}
      />
      <NumberStepper
        label={copy.fields.rooms}
        value={rooms}
        min={1}
        max={limits.maxRooms}
        onChange={(value) => onChange("rooms", value)}
      />
    </Stack>
  );
}
