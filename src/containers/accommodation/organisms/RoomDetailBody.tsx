import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { roomDescriptions, roomTaglines } from "@/containers/accommodation/copy";
import { RoomBookingCard } from "@/containers/accommodation/molecules/RoomBookingCard";
import { RoomIntro } from "@/containers/accommodation/molecules/RoomIntro";
import { RoomStat } from "@/containers/accommodation/molecules/RoomStat";
import type { RoomCategory } from "@/schemas/content/roomCategory";
import type { RevealDirection } from "@/theme/motion";
import { formatUgx } from "@/utils/currency";

const gridSx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.15fr) minmax(0, 1fr)" },
  gap: { xs: 6, md: 8 },
  alignItems: "start",
} as const;

function SpecStrip({ room }: { room: RoomCategory }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 4,
        py: 4,
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <RoomStat value={room.capacity} label="Sleeps" />
      <RoomStat value={formatUgx(room.rateUgx)} label="From · per night" />
      <RoomStat value="À la carte" label="Breakfast included" />
    </Box>
  );
}

/**
 * The room in prose, beside the card that books it.
 *
 * This band used to carry the whole page: the description, two fact lists and
 * the widget, which made the left column an unbroken wall of ticks and pushed
 * the booking card's sticky travel past anything worth reading. The
 * inclusions and the policies now have bands of their own, so what is left
 * here is the argument for the room — the strapline, the description, the
 * three verified figures, and who the property says it suits.
 *
 * `sellTo` is an approved field that the detail page never showed. It is the
 * one line that distinguishes four categories sharing a rate and a set of
 * inclusions, so it earns its place next to them rather than only in the
 * comparison table.
 */
export function RoomDetailBody({
  room,
  motion = "up",
}: {
  room: RoomCategory;
  motion?: RevealDirection;
}) {
  return (
    <SectionShell motion={motion}>
      <Box sx={gridSx}>
        <Stack spacing={6}>
          <RoomIntro description={roomDescriptions[room.id]} tagline={roomTaglines[room.id]} />
          <SpecStrip room={room} />
          <Box sx={{ display: "grid", gap: 1.5 }}>
            <Text variant="overline" component="h2" color="text.secondary">
              Who it suits
            </Text>
            <Text variant="body1" color="text.secondary" sx={{ textWrap: "pretty" }}>
              {room.sellTo}
            </Text>
          </Box>
        </Stack>

        <RoomBookingCard room={room} />
      </Box>
    </SectionShell>
  );
}
