"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import type { OfferFilterOption, OfferFilterValue } from "@/containers/offers/hooks/useOfferFilter";

export interface OfferFilterChipsProps {
  options: OfferFilterOption[];
  value: OfferFilterValue;
  onChange: (value: OfferFilterValue) => void;
  label: string;
}

/**
 * The category filter as a row of pill toggles, each with its offer count.
 * Presentational — options, selection and setter come from `useOfferFilter`
 * in the parent island, which also announces the result count. On a phone the
 * row scrolls sideways instead of wrapping into a tall block above the grid.
 */
export function OfferFilterChips({ options, value, onChange, label }: OfferFilterChipsProps) {
  return (
    <Box
      role="group"
      aria-label={label}
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: { xs: "nowrap", md: "wrap" },
        overflowX: { xs: "auto", md: "visible" },
        mx: { xs: -2, sm: 0 },
        px: { xs: 2, sm: 0 },
        pb: { xs: 1, md: 0 },
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Button
            key={option.value}
            variant={active ? "primary" : "ghost"}
            size="small"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            sx={{ flexShrink: 0, borderRadius: 999, whiteSpace: "nowrap" }}
          >
            {`${option.label} · ${option.count}`}
          </Button>
        );
      })}
    </Box>
  );
}
