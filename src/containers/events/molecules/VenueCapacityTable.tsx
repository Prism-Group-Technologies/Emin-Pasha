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
 * note under the table say so.
 *
 * Columns are derived from the venues actually passed in rather than from the
 * full `LAYOUT_ORDER`. The hub passes all four venues and still gets every
 * column; a single-venue page gets only the layouts that venue offers. Without
 * this, The Boardroom — a fixed table with exactly one seating plan — rendered
 * as one figure beside six em dashes, which reads as missing data rather than
 * as a room that seats one way by design.
 *
 * Scrolls inside its own container below `md` so the page body never scrolls
 * sideways.
 */
export function VenueCapacityTable({ venues }: { venues: VenueEntry[] }) {
  const columns = LAYOUT_ORDER.filter((key) =>
    venues.some((venue) => venue.capacities[key] !== undefined),
  );

  if (columns.length === 0) {
    return null;
  }

  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      <Text variant="overline" component="p" color="text.secondary">
        Indicative maximums — confirmed on proposal
      </Text>

      <Box sx={{ overflowX: "auto" }}>
        <Box
          component="table"
          sx={{
            width: "100%",
            minWidth: columns.length > 2 ? 640 : 320,
            borderCollapse: "collapse",
          }}
        >
          <Box component="thead">
            <Box component="tr">
              {["Venue", ...columns.map((key) => LAYOUT_LABELS[key])].map((heading) => (
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
                {columns.map((key) => (
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
