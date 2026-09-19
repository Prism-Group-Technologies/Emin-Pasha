import type { ReactNode } from "react";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { radiusTokens } from "@/theme/tokens";

/**
 * One numbered step of the booking form — a `<fieldset>` whose `<legend>`
 * carries a cartographic step number and the step title, so each group of
 * inputs is named for assistive tech and the long form reads as a short
 * sequence. Purely structural.
 */
export function FormStep({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <Box component="fieldset" sx={{ border: 0, m: 0, p: 0, minWidth: 0, display: "grid", gap: 4 }}>
      <Box component="legend" sx={{ p: 0, mb: 4, display: "flex", alignItems: "center", gap: 3 }}>
        <Box
          component="span"
          aria-hidden
          sx={{
            width: 32,
            height: 32,
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            borderRadius: `${radiusTokens.pill}px`,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            fontFamily: "var(--font-cartographic)",
            fontSize: "0.8125rem",
          }}
        >
          {step}
        </Box>
        <Text variant="h5" component="span">
          {title}
        </Text>
      </Box>
      {children}
    </Box>
  );
}
