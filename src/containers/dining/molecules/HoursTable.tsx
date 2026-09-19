import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { OutletHours } from "@/containers/dining/copy";

/**
 * One outlet's sample service times as a titled definition list — the label
 * and time on one row, stacked comfortably on narrow viewports. Built on the
 * shared card surface so a row of these lines up.
 */
export function HoursTable({ hours }: { hours: OutletHours }) {
  return (
    <Box component="article" sx={cardSurface(false)}>
      <Text variant="h4" component="h3" sx={{ mb: 3 }}>
        {hours.label}
      </Text>
      <Box component="dl" sx={{ m: 0, display: "grid", gap: 2 }}>
        {hours.rows.map((row) => (
          <Box
            key={`${row.label}-${row.time}`}
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "space-between",
              borderTop: "1px solid",
              borderColor: "divider",
              pt: 2,
            }}
          >
            <Box component="dt" sx={{ color: "text.secondary" }}>
              {row.label}
            </Box>
            <Box
              component="dd"
              sx={{ m: 0, fontFamily: "var(--font-cartographic)", textAlign: "right" }}
            >
              {row.time}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
