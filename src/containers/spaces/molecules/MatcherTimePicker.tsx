"use client";

import { Box } from "@/components/atoms/Box";
import { OptionTile } from "@/containers/experiences/transfer/molecules/OptionTile";
import type { MatcherTime } from "@/containers/spaces/copy/matcherTimes";

export interface MatcherTimePickerProps {
  times: MatcherTime[];
  value: string;
  onChange: (id: string) => void;
}

/** The four parts of the day as radio tiles, each with its hour range. */
export function MatcherTimePicker({ times, value, onChange }: MatcherTimePickerProps) {
  return (
    <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
      {times.map((time) => (
        <OptionTile
          key={time.id}
          name="matcher-time"
          value={time.id}
          checked={time.id === value}
          onSelect={() => onChange(time.id)}
          title={time.label}
          hint={time.hint}
          icon={time.icon}
        />
      ))}
    </Box>
  );
}
