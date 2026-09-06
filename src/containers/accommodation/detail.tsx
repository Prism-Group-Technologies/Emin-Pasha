import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { SectionShell } from "@/components/templates/SectionShell";
import { DraftCopyNotice } from "@/containers/accommodation/molecules/DraftCopyNotice";
import { RateBadge } from "@/containers/accommodation/molecules/RateBadge";
import { RoomFactList } from "@/containers/accommodation/molecules/RoomFactList";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { RoomGallery } from "@/containers/accommodation/organisms/RoomGallery";
import { getBookingWidgetData } from "@/containers/booking";
import { DeferredInlineBookingWidget } from "@/containers/booking/organisms/DeferredBookingWidget";
import { childrenAndExtraBeds, extraBedPriceUgx } from "@/content/rooms";
import type { RoomCategory } from "@/schemas/content/roomCategory";
import { alternatingDirection } from "@/theme/motion";

/**
 * One approved category. Renders the verified factual fields only; the
 * descriptive prose is withheld behind `DraftCopyNotice` until §4's
 * `[DRAFT — VERIFY]` text is signed off in DECISIONS.md (TODO(EMIN-Q15)).
 */
export function RoomDetailContainer({ room }: { room: RoomCategory }) {
  const bookingData = getBookingWidgetData();

  return (
    <>
      <SectionShell
        motion={alternatingDirection(0)}
        eyebrow={`§ ${room.name.toUpperCase()}`}
        heading={room.name}
        headingLevel="h1"
      >
        <Stack spacing={5}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Accommodation", href: "/accommodation" },
              { label: room.name },
            ]}
          />
          <RateBadge rateUgx={room.rateUgx} />
          <Text variant="body1" color="text.secondary">
            {room.capacity}
          </Text>
        </Stack>
      </SectionShell>

      <SectionShell motion={alternatingDirection(1)} variant="bleed">
        <RoomGallery roomId={room.id} roomName={room.name} />
      </SectionShell>

      <SectionShell motion={alternatingDirection(2)}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.2fr) minmax(0, 1fr)" },
            gap: { xs: 6, md: 8 },
            alignItems: "start",
          }}
        >
          <Stack spacing={6}>
            {/* Description is unapproved — see DraftCopyNotice. */}
            <DraftCopyNotice roomName={room.name} />

            <RoomFactList title="What is included" items={room.inclusions} />

            <RoomFactList
              title={childrenAndExtraBeds.title}
              items={childrenAndExtraBeds.items}
              footnote={
                extraBedPriceUgx === undefined && (
                  <Text variant="body2" color="text.secondary">
                    TODO(EMIN-Q05): extra-bed pricing is quoted in the source in a currency that is
                    itself unresolved, so no figure is published. Ask us and we will confirm it.
                  </Text>
                )
              }
            />
          </Stack>

          <Box id="book" sx={{ position: { md: "sticky" }, top: { md: 120 } }}>
            <DeferredInlineBookingWidget
              data={bookingData}
              roomTypeId={room.id}
              heading={`Check dates — ${room.name}`}
            />
          </Box>
        </Box>
      </SectionShell>

      <SectionShell
        motion={alternatingDirection(3)}
        heading="Make more of your stay"
        variant="raised"
      >
        <RelatedLinks hrefs={["/spa", "/experiences/airport-transfer", "/dining"]} />
      </SectionShell>
    </>
  );
}
