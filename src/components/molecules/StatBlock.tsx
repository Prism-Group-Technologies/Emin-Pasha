import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface StatBlockProps {
  value: string;
  label: string;
}

/**
 * A single figure + label — e.g. "300ft" / "swimming pool". Value is real,
 * sourced copy only. Deliberately does NOT colour the value gold: `primary.main`
 * (gold/500) is 2.33:1 on light surfaces and `secondary.main` (garden/500) is
 * 2.77:1 on dark surfaces — both fail even the 3:1 large-text AA minimum
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
