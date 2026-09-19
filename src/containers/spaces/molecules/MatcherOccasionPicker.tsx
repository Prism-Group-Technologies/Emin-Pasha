"use client";

import { Box } from "@/components/atoms/Box";
import { OptionTile } from "@/containers/experiences/transfer/molecules/OptionTile";
import type { MatcherOccasion } from "@/containers/spaces/copy/matcher";

export interface MatcherOccasionPickerProps {
  occasions: MatcherOccasion[];
  value: string;
  onChange: (id: string) => void;
}

/**
 * The eight occasions as card-sized radios (the shared `OptionTile`), two
 * across on a phone and four on desktop. Presentational — the choice lives
 * in `useSpaceMatcher`.
 */
export function MatcherOccasionPicker({ occasions, value, onChange }: MatcherOccasionPickerProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" },
      }}
    >
      {occasions.map((occasion) => (
        <OptionTile
          key={occasion.id}
          name="matcher-occasion"
          value={occasion.id}
          checked={occasion.id === value}
          onSelect={() => onChange(occasion.id)}
          title={occasion.label}
          icon={occasion.icon}
        />
      ))}
    </Box>
  );
}
