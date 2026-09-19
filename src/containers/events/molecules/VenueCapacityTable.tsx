import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import {
  LAYOUT_LABELS,
  LAYOUT_ORDER,
  type VenueEntry,
  capacitiesNote,
} from "@/containers/events/copy";

const cellSx = { py: 3, px: 2, borderBottom: "1px solid", borderColor: "divider" } as const;

/**
 * Indicative capacities by layout, rendered from the invented `copy/venues.ts`
 * layer. Every figure is a placeholder (TODO(EMIN-Q12)) — the heading and the
 * note under the table say so — and any venue with partial data shows only the
 * layouts it actually lists, with "—" elsewhere. Scrolls inside its own
 * container below `md` so the page body never scrolls sideways.
 */
export function VenueCapacityTable({ venues }: { venues: VenueEntry[] }) {
  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      <Text variant="overline" component="p" color="text.secondary">
        Indicative maximums — confirmed on proposal
      </Text>

      <Box sx={{ overflowX: "auto" }}>
        <Box component="table" sx={{ width: "100%", minWidth: 640, borderCollapse: "collapse" }}>
          <Box component="thead">
            <Box component="tr">
              {["Venue", ...LAYOUT_ORDER.map((key) => LAYOUT_LABELS[key])].map((heading) => (
                <Box
                  key={heading}
                  component="th"
                  scope="col"
                  sx={{
                    ...cellSx,
                    textAlign: "left",
                    borderBottomColor: "primary.main",
                  }}
                >
                  <Text variant="overline" component="span">
                    {heading}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
          <Box component="tbody">
            {venues.map((venue) => (
              <Box component="tr" key={venue.id}>
                <Box component="th" scope="row" sx={{ ...cellSx, textAlign: "left" }}>
                  <Text variant="body2">{venue.name}</Text>
                </Box>
                {LAYOUT_ORDER.map((key) => (
                  <Box key={key} component="td" sx={cellSx}>
                    <Text variant="body2" color="text.secondary">
                      {venue.capacities[key] ?? "—"}
                    </Text>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Text variant="body2" color="text.secondary" sx={{ maxWidth: "68ch" }}>
        {capacitiesNote}
      </Text>
    </Box>
  );
}
