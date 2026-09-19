"use client";

import type { ReactNode } from "react";

import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import type { EventTypeId } from "@/containers/events/anchors";
import { useVenueFilter } from "@/containers/events/hooks/useVenueFilter";
import { VenueFilterPills } from "@/containers/events/molecules/VenueFilterPills";

export interface VenueGridProps {
  /** Server-rendered cards, in the same order as `ids` / `suits`. */
  children: ReactNode[];
  ids: string[];
  suits: EventTypeId[][];
}

/**
 * 'use client' justification: the event-type filter is interactive state.
 *
 * Cards arrive as `children` — `VenueCard` is a Server Component that reads
 * the invented asset layer, so building it here would pull that (and Zod)
 * into the client bundle, exactly as `dining/organisms/OutletGrid` avoids.
 * Filtering only toggles visibility; no card is built on the client. The
 * result count is announced through `aria-live`.
 */
export function VenueGrid({ children, ids, suits }: VenueGridProps) {
  const { filter, setFilter, visible, statusText } = useVenueFilter(suits);

  return (
    <Stack spacing={6}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}
      >
        <VenueFilterPills value={filter} onChange={setFilter} />
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
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: { xs: 4, md: 5 },
          alignItems: "stretch",
        }}
      >
        {children.map((card, index) => (
          <Box key={ids[index]} sx={{ display: visible[index] ? "grid" : "none" }}>
            {card}
          </Box>
        ))}
      </Box>
    </Stack>
  );
}
