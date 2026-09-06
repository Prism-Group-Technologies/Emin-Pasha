import Stack from "@mui/material/Stack";
import type { Variant } from "@mui/material/styles/createTypography";

import { Text } from "@/components/atoms/Text";

const variants: { variant: Variant; sample: string }[] = [
  { variant: "h1", sample: "A collage of history, culture and nature" },
  { variant: "h2", sample: "In the heart of Nakasero" },
  { variant: "h3", sample: "Kampala's boutique landmark" },
  { variant: "h4", sample: "Four ways to stay" },
  { variant: "h5", sample: "The Equatorial Gardens" },
  { variant: "h6", sample: "Book Your Stay" },
  { variant: "subtitle1", sample: "Rates from UGX 250,000 per night." },
  { variant: "subtitle2", sample: "Reserve directly for the best available rate." },
  { variant: "body1", sample: "Every room and suite comes with fast unlimited fibre." },
  { variant: "body2", sample: "Children stay free while using existing bedding." },
  { variant: "button", sample: "Check Availability" },
  { variant: "caption", sample: "Stayed March 2026" },
  { variant: "overline", sample: "§ History" },
];

/** Every MUI typography variant, sampled with real approved copy — DESIGN_DIRECTION.md §B.3. */
export function TypeScaleSection() {
  return (
    <Stack spacing={2}>
      <Text variant="h2">Type scale</Text>
      {variants.map(({ variant, sample }) => (
        <Stack key={variant} direction="row" spacing={2} alignItems="baseline">
          <Text variant="body2" sx={{ width: 96, flexShrink: 0, opacity: 0.6 }}>
            {variant}
          </Text>
          <Text variant={variant}>{sample}</Text>
        </Stack>
      ))}
    </Stack>
  );
}
