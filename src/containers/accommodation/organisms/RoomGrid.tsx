"use client";

import type { ReactNode } from "react";

import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { NumberStepper } from "@/components/molecules/NumberStepper";
import { useRoomFilter } from "@/containers/accommodation/hooks/useRoomFilter";
import { radiusTokens } from "@/theme/tokens";

export interface RoomGridProps {
  /** Server-rendered cards, in the same order as `rooms`. */
  children: ReactNode[];
  /**
   * Each card's category id and approved capacity string, in card order. The
   * capacity is what the hook parses to filter; the id is the React key.
   * Capacity alone cannot key the list — two categories may sleep the same
   * party size, and a duplicate key lets React drop a card on re-render.
   */
  rooms: { id: string; capacity: string }[];
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
export function RoomGrid({ children, rooms }: RoomGridProps) {
  const { guests, setGuests, guestCeiling, visible, statusText } = useRoomFilter(
    rooms.map((room) => room.capacity),
  );

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
        {rooms.map((room, index) => (
          <Box key={room.id} sx={{ display: visible[index] ? "grid" : "none" }}>
            {children[index]}
          </Box>
        ))}
      </Box>
    </Stack>
  );
}
