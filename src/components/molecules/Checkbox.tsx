"use client";

import { forwardRef } from "react";

import MuiCheckbox, { type CheckboxProps as MuiCheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

export interface CheckboxProps extends MuiCheckboxProps {
  label: string;
  error?: string;
}

/**
 * A labelled checkbox — the label is part of the click/tap target.
 *
 * `ref` forwards to the underlying `<input type="checkbox">` via `inputRef`,
 * not to the ButtonBase root: react-hook-form's `register()` reads `.checked`
 * off the ref it is given, and a root-element ref would leave the field
 * permanently reading as undefined. Same contract as `TextInput`.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, error, id, ...rest },
  ref,
) {
  return (
    <div>
      <FormControlLabel
        control={<MuiCheckbox inputRef={ref} id={id} {...rest} />}
        label={label}
        sx={{
          "& .MuiFormControlLabel-label": {
            fontSize: "0.8rem",
          },
        }}
      />
      {error && (
        <FormHelperText error role="alert">
          {error}
        </FormHelperText>
      )}
    </div>
  );
});
