import type { ReactNode } from "react";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";

/** One numbered question in the matcher — a `fieldset` so its tiles group for assistive tech. */
export function MatcherStep({
  step,
  legend,
  children,
}: {
  step: number;
  legend: string;
  children: ReactNode;
}) {
  return (
    <Box component="fieldset" sx={{ border: 0, m: 0, p: 0, minWidth: 0, display: "grid", gap: 3 }}>
      <Box component="legend" sx={{ p: 0, mb: 3, display: "flex", alignItems: "baseline", gap: 2 }}>
        <Text
          component="span"
          aria-hidden
          sx={{
            fontFamily: "var(--font-cartographic)",
            color: "primary.main",
            fontSize: "0.8125rem",
          }}
        >
          {String(step).padStart(2, "0")}
        </Text>
        <Text component="span" variant="subtitle1" sx={{ fontWeight: 600 }}>
          {legend}
        </Text>
      </Box>
      {children}
    </Box>
  );
}
