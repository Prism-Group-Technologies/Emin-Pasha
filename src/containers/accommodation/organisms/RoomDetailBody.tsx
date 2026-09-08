import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { BOOKING_ANCHOR_ID } from "@/containers/accommodation/constants";
import { roomDescriptions, roomTaglines } from "@/containers/accommodation/copy";
import { RoomFactList } from "@/containers/accommodation/molecules/RoomFactList";
import { RoomIntro } from "@/containers/accommodation/molecules/RoomIntro";
import { RoomStat } from "@/containers/accommodation/molecules/RoomStat";
import { getBookingWidgetData } from "@/containers/booking";
import { DeferredInlineBookingWidget } from "@/containers/booking/organisms/DeferredBookingWidget";
import { childrenAndExtraBeds, extraBedPriceUgx } from "@/content/rooms";
import type { RoomCategory } from "@/schemas/content/roomCategory";
import type { RevealDirection } from "@/theme/motion";
import { radiusTokens, shadowTokens } from "@/theme/tokens";
import { formatUgx } from "@/utils/currency";

const gridSx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.2fr) minmax(0, 1fr)" },
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

function ExtraBedNote() {
  if (extraBedPriceUgx !== undefined) {
    return null;
  }
  return (
    <Text variant="body2" color="text.secondary">
      TODO(EMIN-Q05): extra-bed pricing is quoted in the source in a currency that is itself
      unresolved, so no figure is published. Ask us and we will confirm it.
    </Text>
  );
}

/**
 * The room's detail: a verified-spec strip, the description and fact lists on
 * the left, the deferred booking widget sticky on the right in a raised card
 * and carrying the `#book` anchor. The widget is passed this room's
 * `roomTypeId` so a check starts pre-scoped to the category being viewed.
 */
export function RoomDetailBody({
  room,
  motion = "up",
}: {
  room: RoomCategory;
  motion?: RevealDirection;
}) {
  const bookingData = getBookingWidgetData();

  return (
    <SectionShell motion={motion}>
      <Box sx={gridSx}>
        <Stack spacing={6}>
          <RoomIntro description={roomDescriptions[room.id]} tagline={roomTaglines[room.id]} />
          <SpecStrip room={room} />
          <RoomFactList title="What is included" items={room.inclusions} />
          <RoomFactList
            title={childrenAndExtraBeds.title}
            items={childrenAndExtraBeds.items}
            footnote={<ExtraBedNote />}
          />
        </Stack>

        <Box id={BOOKING_ANCHOR_ID} sx={{ position: { md: "sticky" }, top: { md: 120 } }}>
          <Box
            sx={{
              p: { xs: 4, md: 5 },
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: `${radiusTokens.lg}px`,
              boxShadow: shadowTokens.md,
            }}
          >
            <DeferredInlineBookingWidget
              data={bookingData}
              roomTypeId={room.id}
              heading={`Check dates — ${room.name}`}
            />
          </Box>
        </Box>
      </Box>
    </SectionShell>
  );
}
