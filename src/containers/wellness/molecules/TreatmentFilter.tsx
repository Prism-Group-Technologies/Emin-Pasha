"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import type { TreatmentFilterValue } from "@/containers/wellness/hooks/useTreatmentFilter";

const OPTIONS: { value: TreatmentFilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "spa", label: "Spa" },
  { value: "gym", label: "Gym" },
  { value: "pool", label: "Pool" },
];

/**
 * The treatment strip's facility filter as a segmented pill row.
 * Presentational — the selected value and the setter come from
 * `useTreatmentFilter` in the parent island. The live result count is
 * announced by the parent's `aria-live` status text, so this only needs a
 * group label.
 */
export function TreatmentFilter({
  value,
  onChange,
}: {
  value: TreatmentFilterValue;
  onChange: (value: TreatmentFilterValue) => void;
}) {
  return (
    <Box
      role="group"
      aria-label="Filter treatments by facility"
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
