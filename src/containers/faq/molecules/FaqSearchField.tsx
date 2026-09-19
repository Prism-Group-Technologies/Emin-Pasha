"use client";

import { Icon } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";
import { TextInput } from "@/components/molecules/TextInput";

export interface FaqSearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  clearLabel: string;
}

/**
 * The explorer's search box — a rounded field with a search glyph and a clear
 * button once there is text. Presentational: the value and setter come from
 * `useFaqExplorer`. The browser's own search-cancel control is hidden so there
 * is only ever one "clear" affordance.
 */
export function FaqSearchField({
  value,
  onChange,
  label,
  placeholder,
  clearLabel,
}: FaqSearchFieldProps) {
  const clear = value ? (
    <IconButton aria-label={clearLabel} onClick={() => onChange("")} size="small" edge="end">
      <Icon name="close" fontSize="small" />
    </IconButton>
  ) : null;

  return (
    <TextInput
      type="search"
      fullWidth
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <Icon name="search" aria-hidden sx={{ mr: 1.5, color: "text.secondary" }} />
          ),
          endAdornment: clear,
        },
        htmlInput: { enterKeyHint: "search", autoComplete: "off" },
      }}
      sx={{
        "& .MuiOutlinedInput-root": { borderRadius: 999, bgcolor: "background.default", px: 2.5 },
        "& input::-webkit-search-cancel-button": { display: "none" },
      }}
    />
  );
}
