import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { SectionShell } from "@/components/templates/SectionShell";
import { RoomCard } from "@/containers/accommodation/molecules/RoomCard";
import { ComparisonTable } from "@/containers/accommodation/organisms/ComparisonTable";
import { FaqBlock } from "@/containers/accommodation/organisms/FaqBlock";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { RoomGrid } from "@/containers/accommodation/organisms/RoomGrid";
import { getBookingWidgetData } from "@/containers/booking";
import { DeferredInlineBookingWidget } from "@/containers/booking/organisms/DeferredBookingWidget";
import { faqItems } from "@/content/faq";
import { accommodationPageIntro, rooms } from "@/content/rooms";
import { alternatingDirection } from "@/theme/motion";
import { maxGuests } from "@/utils/capacity";

const ROOM_FAQ_IDS = [
  "check-in-check-out-times",
  "breakfast-included",
  "wifi",
  "children-welcome",
  "cancellation-policy",
];
const roomFaqs = faqItems.filter((item) => ROOM_FAQ_IDS.includes(item.id));

/**
 * The Accommodation index. A Server Component; only the guest filter, the
 * booking widget and the FAQ accordion are client islands.
 */
export function AccommodationContainer() {
  const bookingData = getBookingWidgetData();
  const guestCeiling = Math.max(...rooms.map((room) => maxGuests(room.capacity)));

  return (
    <>
      <SectionShell
        motion={alternatingDirection(0)}
        eyebrow="§ ACCOMMODATION"
        heading="Rooms & Suites"
        headingLevel="h1"
      >
        <Stack spacing={5}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Accommodation" }]} />
          <Text variant="subtitle1" sx={{ maxWidth: "68ch" }}>
            {accommodationPageIntro}
          </Text>
        </Stack>
      </SectionShell>

      <SectionShell motion={alternatingDirection(1)}>
        <RoomGrid capacities={rooms.map((room) => room.capacity)} maxGuestsAllowed={guestCeiling}>
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </RoomGrid>
      </SectionShell>

      <SectionShell motion={alternatingDirection(2)} heading="Compare the four" variant="raised">
        <ComparisonTable rooms={rooms} />
      </SectionShell>

      <SectionShell motion={alternatingDirection(3)} heading="Check dates">
        <DeferredInlineBookingWidget data={bookingData} />
      </SectionShell>

      {roomFaqs.length > 0 && (
        <SectionShell motion={alternatingDirection(4)} heading="Good to know" variant="raised">
          <FaqBlock items={roomFaqs} />
        </SectionShell>
      )}

      <SectionShell motion={alternatingDirection(5)} heading="While you are here">
        <RelatedLinks hrefs={["/dining", "/spa", "/offers"]} />
      </SectionShell>
    </>
  );
}
