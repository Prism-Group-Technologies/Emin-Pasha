"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import {
  VENUE_FILTER_OPTIONS,
  type VenueFilterValue,
} from "@/containers/events/hooks/useVenueFilter";

/**
 * The venue grid's event-type filter as a segmented pill row. Presentational
 * — the selected value and the setter come from `useVenueFilter` in the
 * parent island; the live result count is announced by the parent's
 * `aria-live` status text, so this only needs a group label. Mirrors
 * `dining/molecules/OutletTypeFilter`.
 */
export function VenueFilterPills({
  value,
  onChange,
}: {
  value: VenueFilterValue;
  onChange: (value: VenueFilterValue) => void;
}) {
  return (
    <Box
      role="group"
      aria-label="Filter venues by event type"
      sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
    >
      {VENUE_FILTER_OPTIONS.map((option) => {
        const active = option.value === value;
        return (
          <Button
            key={option.value}
            variant={active ? "primary" : "ghost"}
            size="small"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Button>
        );
      })}
    </Box>
  );
}
