"use client";

import type { ReactNode } from "react";

import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import type { FacilityId } from "@/containers/wellness/anchors";
import { useTreatmentFilter } from "@/containers/wellness/hooks/useTreatmentFilter";
import { TreatmentFilter } from "@/containers/wellness/molecules/TreatmentFilter";

export interface TreatmentGridProps {
  /** Server-rendered cards, in the same order as `ids` / `facilities`. */
  children: ReactNode[];
  ids: string[];
  facilities: FacilityId[];
}

/**
 * 'use client' justification: the facility filter is interactive state.
 *
 * Cards arrive as `children` — `TreatmentCard` is a Server Component that
 * resolves placeholder assets, so building it here would pull that (and Zod)
 * into the client bundle, exactly as `dining/organisms/OutletGrid` avoids.
 * Filtering only toggles visibility; no card is built on the client. The
 * result count is announced through `aria-live`.
 */
export function TreatmentGrid({ children, ids, facilities }: TreatmentGridProps) {
  const { filter, setFilter, visible, statusText } = useTreatmentFilter(facilities);

  return (
    <Stack spacing={6}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}
      >
        <TreatmentFilter value={filter} onChange={setFilter} />
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
          gap: { xs: 5, md: 6 },
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
