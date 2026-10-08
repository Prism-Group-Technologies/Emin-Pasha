import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface StatBlockProps {
  value: string;
  label: string;
}

/**
 * A single figure + label — e.g. "300ft" / "swimming pool". Value is real,
 * sourced copy only. Deliberately does NOT colour the value with a brand
 * accent: `primary.main` (the brand copper) is 3.64:1 on light surfaces, which
 * clears the 3:1 large-text floor but not the 4.5:1 one a figure at body size
 * would need, and the pairing is not safe at every size this block renders at
 * (verified with `src/utils/contrast.ts`, same method as `/styleguide`).
 * Default `text.primary` is the only pairing safe in both modes.
 */
export function StatBlock({ value, label }: StatBlockProps) {
  return (
    <Stack spacing={0.5} alignItems="center" textAlign="center">
      <Typography variant="h2" component="p">
        {value}
      </Typography>
      <Typography variant="overline" component="p">
        {label}
      </Typography>
    </Stack>
  );
}
