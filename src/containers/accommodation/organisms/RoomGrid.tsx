"use client";

import type { ReactNode } from "react";

import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { NumberStepper } from "@/components/molecules/NumberStepper";
import { useGuestFilter } from "@/containers/accommodation/hooks/useGuestFilter";
import { maxGuests } from "@/utils/capacity";

export interface RoomGridProps {
  /** Server-rendered cards, in the same order as `capacities`. */
  children: ReactNode[];
  /** Each card's approved capacity string, parsed here to filter. */
  capacities: string[];
  maxGuestsAllowed: number;
}

/**
 * 'use client' justification: the guest filter is interactive state.
 *
 * Cards arrive as `children` rather than being constructed here. `RoomCard`
 * is a Server Component that reads `content/assets` and `content/ctas`;
 * rendering it from inside this client component pulled both — and Zod —
 * into the client bundle, measured at **63 KB gzipped**. Filtering only
 * toggles visibility, so no card is ever built on the client.
 *
 * The result count is announced through `aria-live`: a filter that silently
 * removes cards leaves a screen-reader user with no idea anything happened
 * (CLAUDE.md §10).
 */
export function RoomGrid({ children, capacities, maxGuestsAllowed }: RoomGridProps) {
  const { guests, setGuests } = useGuestFilter();
  const shown = capacities.map((capacity) => maxGuests(capacity) >= guests);
  const visibleCount = shown.filter(Boolean).length;

  return (
    <Stack spacing={6}>
      <Box sx={{ maxWidth: 320 }}>
        <NumberStepper
          label="Guests"
          value={guests}
          min={1}
          max={maxGuestsAllowed}
          onChange={setGuests}
        />
      </Box>
      <Text role="status" aria-live="polite" variant="body2" color="text.secondary">
        {visibleCount === capacities.length
          ? `Showing all ${capacities.length} categories.`
          : `Showing ${visibleCount} of ${capacities.length} categories that sleep ${guests}.`}
      </Text>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: { xs: 6, md: 5 },
          alignItems: "stretch",
        }}
      >
        {children.map((card, index) => (
          <Box key={capacities[index]} sx={{ display: shown[index] ? "block" : "none" }}>
            {card}
          </Box>
        ))}
      </Box>
    </Stack>
  );
}
