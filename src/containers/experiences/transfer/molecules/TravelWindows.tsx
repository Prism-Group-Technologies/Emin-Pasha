import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import type { TravelWindow } from "@/containers/experiences/transfer/copy/route";
import { radiusTokens } from "@/theme/tokens";

/**
 * Journey time by time of day — three rows, the typical daytime figure
 * highlighted, so a traveller can plan a departure around rush hour rather
 * than around one optimistic number. A definition list: label → time.
 */
export function TravelWindows({ windows }: { windows: TravelWindow[] }) {
  return (
    <Box component="dl" sx={{ m: 0, display: "grid", gap: 2 }}>
      {windows.map((window) => (
        <Box
          key={window.label}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            px: { xs: 3, sm: 4 },
            py: 3,
            borderRadius: `${radiusTokens.md}px`,
            border: "1px solid",
            borderColor: window.typical ? "primary.main" : "divider",
            bgcolor: window.typical ? "action.selected" : "background.default",
          }}
        >
          <Box component="dt" sx={{ minWidth: 0 }}>
            <Text variant="subtitle2" component="span" sx={{ display: "block" }}>
              {window.label}
            </Text>
            <Text variant="body2" component="span" color="text.secondary">
              {window.hours}
            </Text>
          </Box>
          <Box component="dd" sx={{ m: 0, flexShrink: 0 }}>
            <Text component="span" sx={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>
              {window.time}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
