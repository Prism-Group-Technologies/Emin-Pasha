"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import type { OutletFilterValue } from "@/containers/dining/hooks/useOutletFilter";

const OPTIONS: { value: OutletFilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "restaurant", label: "Restaurants" },
  { value: "bar", label: "Bars" },
  { value: "in-room", label: "In-room" },
];

/**
 * The outlet grid's type filter as a segmented pill row. Presentational — the
 * selected value and the setter come from `useOutletFilter` in the parent
 * island. The live result count is announced by the parent's `aria-live`
 * status text, so this only needs a group label.
 */
export function OutletTypeFilter({
  value,
  onChange,
}: {
  value: OutletFilterValue;
  onChange: (value: OutletFilterValue) => void;
}) {
  return (
    <Box
      role="group"
      aria-label="Filter outlets by type"
      sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
    >
      {OPTIONS.map((option) => {
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
