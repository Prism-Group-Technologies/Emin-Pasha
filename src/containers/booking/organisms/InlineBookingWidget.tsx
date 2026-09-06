"use client";

import { useEffect } from "react";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { useBookingForm } from "@/containers/booking/hooks/useBookingForm";
import { useBookingWidgetVisibility } from "@/containers/booking/hooks/useBookingWidgetVisibility";
import { useReseedFromStore } from "@/containers/booking/hooks/useReseedFromStore";
import { BookingFields } from "@/containers/booking/organisms/BookingFields";
import type { BookingWidgetData } from "@/containers/booking/types";
import { track } from "@/lib/analytics/events";

export interface InlineBookingWidgetProps {
  data: BookingWidgetData;
  /**
   * Pre-selects the room the guest is already reading about — maps to the
   * vendor's `roomtypeunkid` on the RoomList request type, and to whichever
   * deep-link parameter carries it once that URL is confirmed (Q49).
   */
  roomTypeId?: string;
  heading?: string;
}

/**
 * The in-page variant for room, offers and landing pages. Stacked rather than
 * horizontal because it sits inside a content column, not across the viewport.
 *
 * Pre-filling `roomTypeId` is the point of this variant: a guest reading the
 * Garden Suite page should not have to find it again in a room list after the
 * handoff.
 */
export function InlineBookingWidget({ data, roomTypeId, heading }: InlineBookingWidgetProps) {
  const booking = useBookingForm({ data, roomTypeId });
  // The sticky bar now runs on every route, so this widget reports itself the
  // same way the hero one does: while a guest can see the full form in the
  // page, the bar stays out of the way rather than offering a second copy of
  // it two inches above.
  const { ref, visible } = useBookingWidgetVisibility();
  useReseedFromStore(booking.form, visible);

  useEffect(() => {
    track("booking_widget_opened", { variant: "inline", roomTypeId });
  }, [roomTypeId]);

  return (
    <Box
      ref={ref}
      sx={{
        p: { xs: 4, md: 5 },
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "primary.main",
        borderRadius: 0.5,
      }}
    >
      <Text
        variant="overline"
        component="p"
        sx={{ fontFamily: "var(--font-cartographic)", mb: 1, color: "text.secondary" }}
      >
        {data.copy.eyebrow}
      </Text>
      <Text variant="h4" component="h2" sx={{ mb: 4 }}>
        {heading ?? data.copy.heading}
      </Text>
      <BookingFields data={data} booking={booking} layout="column" months={1} />
    </Box>
  );
}
