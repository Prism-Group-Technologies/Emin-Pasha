"use client";

import type { ReactNode } from "react";

import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { NumberStepper } from "@/components/molecules/NumberStepper";
import { useRoomFilter } from "@/containers/accommodation/hooks/useRoomFilter";
import { radiusTokens } from "@/theme/tokens";

export interface RoomGridProps {
  /** Server-rendered cards, in the same order as `capacities`. */
  children: ReactNode[];
  /** Each card's approved capacity string, parsed by the hook to filter. */
  capacities: string[];
}

/**
 * 'use client' justification: the guest filter is interactive state.
 *
 * Cards arrive as `children` rather than being constructed here. `RoomCard`
 * is a Server Component that reads `content/assets` and `content/ctas`;
 * building it inside this client component pulled both — and Zod — into the
 * client bundle (measured at 63 KB gzipped). Filtering only toggles
 * visibility, so no card is ever built on the client.
 *
 * All derivation — the stepper ceiling, per-card visibility, the count
 * string — lives in `useRoomFilter`. The count is announced through
 * `aria-live` so a screen-reader user hears the grid change.
 */
export function RoomGrid({ children, capacities }: RoomGridProps) {
  const { guests, setGuests, guestCeiling, visible, statusText } = useRoomFilter(capacities);

  return (
    <Stack spacing={6}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 3, sm: 5 }}
        sx={{
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          p: { xs: 3, sm: 4 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: `${radiusTokens.lg}px`,
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ minWidth: { sm: 260 } }}>
          <NumberStepper
            label="Guests"
            value={guests}
            min={1}
            max={guestCeiling}
            onChange={setGuests}
          />
        </Box>
        <Text role="status" aria-live="polite" variant="body2" color="text.secondary">
          {statusText}
        </Text>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: { xs: 5, md: 4 },
          alignItems: "stretch",
        }}
      >
        {children.map((card, index) => (
          <Box key={capacities[index]} sx={{ display: visible[index] ? "grid" : "none" }}>
            {card}
          </Box>
        ))}
      </Box>
    </Stack>
  );
}
