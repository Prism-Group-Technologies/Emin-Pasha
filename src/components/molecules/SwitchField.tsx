"use client";

import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

export interface SwitchFieldProps {
  /** Used to tie the description to the switch via `aria-describedby`. */
  id: string;
  label: ReactNode;
  description?: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

/**
 * A labelled on/off switch with an optional description — the label is part
 * of the click target and the description is announced with the control.
 * Extracted from the consent dialog so the dialog and the /cookie-settings
 * page render one implementation.
 */
export function SwitchField({
  id,
  label,
  description,
  checked,
  disabled,
  onChange,
}: SwitchFieldProps) {
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <Box>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            disabled={disabled}
            inputProps={{ "aria-describedby": descriptionId }}
            onChange={(event) => onChange?.(event.target.checked)}
          />
        }
        label={<Typography variant="subtitle2">{label}</Typography>}
      />
      {description && (
        <Typography id={descriptionId} variant="body2" color="text.secondary">
          {description}
        </Typography>
      )}
    </Box>
  );
}
