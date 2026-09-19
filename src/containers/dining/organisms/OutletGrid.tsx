"use client";

import type { ReactNode } from "react";

import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { useOutletFilter } from "@/containers/dining/hooks/useOutletFilter";
import { OutletTypeFilter } from "@/containers/dining/molecules/OutletTypeFilter";
import type { Outlet } from "@/schemas/content/outlet";

export interface OutletGridProps {
  /** Server-rendered cards, in the same order as `ids` / `types`. */
  children: ReactNode[];
  ids: string[];
  types: Outlet["type"][];
}

/**
 * 'use client' justification: the type filter is interactive state.
 *
 * Cards arrive as `children` — `DiningOutletCard` is a Server Component that
 * reads `content/assets`, so building it here would pull that (and Zod) into
 * the client bundle, exactly as `accommodation/organisms/RoomGrid` avoids.
 * Filtering only toggles visibility; no card is built on the client. The
 * result count is announced through `aria-live`.
 */
export function OutletGrid({ children, ids, types }: OutletGridProps) {
  const { filter, setFilter, visible, statusText } = useOutletFilter(types);

  return (
    <Stack spacing={6}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}
      >
        <OutletTypeFilter value={filter} onChange={setFilter} />
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
