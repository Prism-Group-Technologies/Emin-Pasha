"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import type { DayPart } from "@/containers/spaces/copy/day";

const OPTIONS: { value: DayPart; label: string; icon: "light-mode" | "dark-mode" }[] = [
  { value: "day", label: "By day", icon: "light-mode" },
  { value: "evening", label: "By evening", icon: "dark-mode" },
];

/** A two-state day / evening switch as `aria-pressed` toggle buttons. */
export function DayPartToggle({
  value,
  onChange,
}: {
  value: DayPart;
  onChange: (part: DayPart) => void;
}) {
  return (
    <Box
      role="group"
      aria-label="Time of day"
      sx={{
        display: "inline-flex",
        justifySelf: "start",
        gap: 1,
        p: 0.5,
        borderRadius: 999,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {OPTIONS.map((option) => {
        const active = option.value === value;
        return (
          <Button
            key={option.value}
            size="small"
            variant={active ? "primary" : "link"}
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            startIcon={<Icon name={option.icon} fontSize="small" />}
            sx={{ borderRadius: 999, px: 3 }}
          >
            {option.label}
          </Button>
        );
      })}
    </Box>
  );
}
