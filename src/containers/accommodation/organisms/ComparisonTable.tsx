import { Box } from "@/components/atoms/Box";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { ROOM_POPULAR_ID } from "@/containers/accommodation/constants";
import { identity } from "@/content/identity";
import type { RoomCategory } from "@/schemas/content/roomCategory";
import { colorTokens, radiusTokens } from "@/theme/tokens";
import { formatUgx } from "@/utils/currency";

const HEADINGS = ["Category", "Sleeps", "From", "Suits"] as const;

const cell = {
  py: 4,
  px: { xs: 4, md: 6 },
  borderBottom: "1px solid",
  borderColor: "divider",
} as const;

function ComparisonRow({ room }: { room: RoomCategory }) {
  const popular = room.id === ROOM_POPULAR_ID;
  return (
    <Box
      component="tr"
      sx={
        popular
          ? {
              // gold.500 at low alpha: a warm tint on the light ground, a warm
              // glow on the dark one — theme-aware where a fixed gold.50 fill
              // would strand light text on a near-white row in dark mode.
              bgcolor: "rgba(196,168,50,0.10)",
              "& th": { boxShadow: `inset 3px 0 0 ${colorTokens.gold[700]}` },
            }
          : undefined
      }
    >
      <Box component="th" scope="row" sx={{ ...cell, textAlign: "left" }}>
        <Link href={`/accommodation/${room.id}`} variant="body1">
          {room.name}
        </Link>
        {popular && (
          <Text variant="body2" sx={{ color: "primary.main", fontWeight: 600 }}>
            Most requested
          </Text>
        )}
      </Box>
      <Box component="td" sx={cell}>
        <Text variant="body2" color="text.secondary">
          {room.capacity}
        </Text>
      </Box>
      <Box component="td" sx={cell}>
        <Text component="span" sx={{ fontFamily: "var(--font-display)", fontSize: "1.125rem" }}>
          {formatUgx(room.rateUgx)}
        </Text>
      </Box>
      <Box component="td" sx={cell}>
        <Text variant="body2" color="text.secondary">
          {room.sellTo}
        </Text>
      </Box>
    </Box>
  );
}

/**
 * The four categories side by side, on `md` and up. Columns are limited to
 * fields the source verifies — an empty "size / bed / view" column would
 * imply a missing fact rather than an unverified one.
 *
 * A real `<table>` with scoped headers, in a rounded clipped shell with its
 * own horizontal scroll so the page body never scrolls sideways. The
 * most-requested row is tinted; the rate column carries the display face.
 */
export function ComparisonTable({ rooms }: { rooms: RoomCategory[] }) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: `${radiusTokens.lg}px`,
        overflow: "hidden",
      }}
    >
      <Box sx={{ overflowX: "auto" }}>
        <Box component="table" sx={{ width: "100%", minWidth: 720, borderCollapse: "collapse" }}>
          <Box component="caption" sx={{ textAlign: "left", px: { xs: 4, md: 6 }, pt: 4 }}>
            <Text component="span" variant="body2" color="text.secondary">
              The four categories compared. All rates in {identity.currency}, per night.
            </Text>
          </Box>
          <Box component="thead">
            <Box component="tr">
              {HEADINGS.map((heading) => (
                <Box
                  key={heading}
                  component="th"
                  scope="col"
                  sx={{
                    textAlign: "left",
                    px: { xs: 4, md: 6 },
                    py: 3,
                    borderBottom: "2px solid",
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
          <Box component="tbody" sx={{ "& tr:nth-of-type(odd)": { bgcolor: "action.hover" } }}>
            {rooms.map((room) => (
              <ComparisonRow key={room.id} room={room} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
