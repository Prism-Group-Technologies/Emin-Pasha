import { Box } from "@/components/atoms/Box";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { ROOM_POPULAR_ID } from "@/containers/accommodation/constants";
import type { RoomCategory } from "@/schemas/content/roomCategory";
import { formatUgx } from "@/utils/currency";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 4,
        py: 2,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Text variant="overline" component="dt" color="text.secondary">
        {label}
      </Text>
      <Text variant="body2" component="dd" sx={{ m: 0, textAlign: "right" }}>
        {value}
      </Text>
    </Box>
  );
}

/**
 * The comparison as a stack of per-room cards, shown below `md` where a
 * four-column table would be an unreadable sideways scroll. Same verified
 * fields as `ComparisonTable`, same "most requested" flag.
 */
export function ComparisonCards({ rooms }: { rooms: RoomCategory[] }) {
  return (
    <Box sx={{ display: "grid", gap: 4 }}>
      {rooms.map((room) => (
        <Box component="article" key={room.id} sx={cardSurface(room.id === ROOM_POPULAR_ID)}>
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 2, mb: 3 }}>
            <Link href={`/accommodation/${room.id}`} variant="h4">
              {room.name}
            </Link>
            {room.id === ROOM_POPULAR_ID && (
              <Text variant="body2" sx={{ color: "primary.main", fontWeight: 600 }}>
                Most requested
              </Text>
            )}
          </Box>
          <Box component="dl" sx={{ m: 0 }}>
            <Row label="Sleeps" value={room.capacity} />
            <Row label="From" value={`${formatUgx(room.rateUgx)} / night`} />
            <Row label="Suits" value={room.sellTo} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
