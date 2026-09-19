import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";

export interface HeroCta {
  label: string;
  href: string;
}

/**
 * The hero's CTA row: one primary action and an optional secondary ghost
 * button. The ghost button carries an explicit light border and label colour
 * because it sits on the dark scrim, where the theme's default outline tone
 * would be invisible.
 */
export function HeroActions({ primary, secondary }: { primary?: HeroCta; secondary?: HeroCta }) {
  if (!primary && !secondary) {
    return null;
  }
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
      {primary && (
        <Button href={primary.href} size="large">
          {primary.label}
        </Button>
      )}
      {secondary && (
        <Button
          href={secondary.href}
          variant="ghost"
          size="large"
          sx={{ color: "common.white", borderColor: "rgba(251,250,247,0.6)" }}
        >
          {secondary.label}
        </Button>
      )}
    </Box>
  );
}
