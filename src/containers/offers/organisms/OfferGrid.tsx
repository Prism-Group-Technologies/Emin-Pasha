"use client";

import type { ReactNode } from "react";

import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import type { OfferCategory } from "@/containers/offers/anchors";
import { useOfferFilter } from "@/containers/offers/hooks/useOfferFilter";
import { OfferFilterChips } from "@/containers/offers/molecules/OfferFilterChips";

export interface OfferGridProps {
  /** Server-rendered cards, in the same order as `ids` / `categories`. */
  children: ReactNode[];
  ids: string[];
  categories: OfferCategory[];
  filterLabel: string;
}

/**
 * 'use client' justification: the category filter is interactive state.
 *
 * Cards arrive as `children` — `OfferCard` is a Server Component that
 * resolves `content/assets` slots and formats prices from `content/identity`,
 * so building it here would pull the content layer into the client bundle,
 * exactly as `wellness/organisms/TreatmentGrid` avoids. Filtering only
 * toggles visibility; the result count is announced through `aria-live`.
 */
export function OfferGrid({ children, ids, categories, filterLabel }: OfferGridProps) {
  const { filter, setFilter, options, visible, statusText } = useOfferFilter(categories);

  return (
    <Stack spacing={6}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{ alignItems: { md: "center" }, justifyContent: "space-between" }}
      >
        <OfferFilterChips
          options={options}
          value={filter}
          onChange={setFilter}
          label={filterLabel}
        />
        <Text
          role="status"
          aria-live="polite"
          variant="body2"
          color="text.secondary"
          sx={{ flexShrink: 0 }}
        >
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
