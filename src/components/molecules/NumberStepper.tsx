"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Icon } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";

export interface NumberStepperProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  id?: string;
}

/**
 * A +/- counter — guests, rooms, etc. The value itself is announced via
 * `aria-live="polite"` on the count so screen readers hear each change
 * without needing to refocus.
 */
export function NumberStepper({
  label,
  value,
  onChange,
  min = 0,
  max = 99,
  id,
}: NumberStepperProps) {
  const canDecrease = value > min;
  const canIncrease = value < max;

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
      <Typography id={id} component="span">
        {label}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <IconButton
          aria-label={`Decrease ${label}`}
          disabled={!canDecrease}
          onClick={() => onChange(value - 1)}
          size="small"
        >
          <Icon name="remove" fontSize="small" />
        </IconButton>
        <Typography aria-live="polite" sx={{ minWidth: 24, textAlign: "center" }}>
          {value}
        </Typography>
        <IconButton
          aria-label={`Increase ${label}`}
          disabled={!canIncrease}
          onClick={() => onChange(value + 1)}
          size="small"
        >
          <Icon name="add" fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  );
}
