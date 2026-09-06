import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { HeroBookingWidget, InlineBookingWidget, getBookingWidgetData } from "@/containers/booking";

/**
 * QA harness for the booking widgets (deleted with the rest of /styleguide in
 * Step 17). A Server Component, which is the point: it calls
 * `getBookingWidgetData()` here and passes the result down, exactly as a real
 * page will — so this also proves the server/client split holds.
 *
 * `StickyBookingBar` and `MobileBookingSheet` are deliberately absent: both
 * are position-fixed overlays driven by scroll and store state, and mounting
 * them here would cover the styleguide rather than demonstrate them.
 */
export function BookingSection() {
  const data = getBookingWidgetData();

  return (
    <Stack spacing={5}>
      <Text variant="h2">Booking</Text>
      <Text variant="body2" color="text.secondary">
        Hero variant (glass panel — shown here on the page background, not over video)
      </Text>
      <HeroBookingWidget data={data} />
      <Text variant="body2" color="text.secondary">
        Inline variant, pre-filled with a room type
      </Text>
      <InlineBookingWidget data={data} roomTypeId="demo-room-type" />
    </Stack>
  );
}
