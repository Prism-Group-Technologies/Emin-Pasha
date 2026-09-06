import { Box } from "@/components/atoms/Box";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { identity } from "@/content/identity";
import type { RoomCategory } from "@/schemas/content/roomCategory";
import { formatUgx } from "@/utils/currency";

/**
 * The four categories side by side. Columns are limited to fields the source
 * actually verifies — name, capacity, rate and who each suits. There is no
 * size, bed or view column, because there is no verified size, bed or view
 * to put in one, and an empty column implies a missing fact rather than an
 * unverified one.
 *
 * A real `<table>` with scoped headers, wrapped in its own horizontal scroll
 * container so the page body never scrolls sideways on mobile.
 */
export function ComparisonTable({ rooms }: { rooms: RoomCategory[] }) {
  return (
    <Box sx={{ overflowX: "auto" }}>
      <Box component="table" sx={{ width: "100%", minWidth: 640, borderCollapse: "collapse" }}>
        <caption style={{ textAlign: "left", paddingBottom: 12 }}>
          <Text component="span" variant="body2" color="text.secondary">
            The four categories compared. All rates in {identity.currency}, per night.
          </Text>
        </caption>
        <Box component="thead">
          <Box component="tr">
            {["Category", "Sleeps", "From", "Suits"].map((heading) => (
              <Box
                key={heading}
                component="th"
                scope="col"
                sx={{
                  textAlign: "left",
                  py: 3,
                  borderBottom: "1px solid",
                  borderColor: "primary.main",
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
          {rooms.map((room) => (
            <Box component="tr" key={room.id}>
              <Box
                component="th"
                scope="row"
                sx={{ textAlign: "left", py: 4, borderBottom: "1px solid", borderColor: "divider" }}
              >
                <Link href={`/accommodation/${room.id}`} variant="body1">
                  {room.name}
                </Link>
              </Box>
              {[room.capacity, formatUgx(room.rateUgx), room.sellTo].map((value) => (
                <Box
                  key={value}
                  component="td"
                  sx={{ py: 4, pr: 4, borderBottom: "1px solid", borderColor: "divider" }}
                >
                  <Text variant="body2" color="text.secondary">
                    {value}
                  </Text>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
