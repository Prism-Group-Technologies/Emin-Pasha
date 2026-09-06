"use client";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import MuiRadio from "@mui/material/Radio";
import MuiRadioGroup, {
  type RadioGroupProps as MuiRadioGroupProps,
} from "@mui/material/RadioGroup";

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps extends Omit<MuiRadioGroupProps, "children"> {
  legend: string;
  options: RadioOption[];
  error?: string;
}

/** A radio group with a visible legend — CLAUDE.md §10 (no unlabelled control groups). */
export function RadioGroup({ legend, options, error, name, ...rest }: RadioGroupProps) {
  return (
    <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
      <FormLabel component="legend" error={Boolean(error)}>
        {legend}
      </FormLabel>
      <MuiRadioGroup name={name} {...rest}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<MuiRadio />}
            label={option.label}
          />
        ))}
      </MuiRadioGroup>
      {error && (
        <FormHelperText error role="alert">
          {error}
        </FormHelperText>
      )}
    </fieldset>
  );
}
