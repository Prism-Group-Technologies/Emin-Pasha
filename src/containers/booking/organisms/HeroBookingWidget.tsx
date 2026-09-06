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

/**
 * The horizontal glass panel that sits over the hero video.
 *
 * The "glass" is a `backdrop-filter` over a translucent `ink/900`, not over
 * nothing: the panel has to stay legible against an unknown video frame, and
 * a purely transparent blur cannot guarantee that (the same constraint
 * recorded for the header in DECISIONS.md D26). Text is `sand/50` on that
 * darkened base, which holds well past AA.
 */
export function HeroBookingWidget({ data }: { data: BookingWidgetData }) {
  const booking = useBookingForm({ data });
  // Reports its own position so `StickyBookingBar` can take over the instant
  // this scrolls away — the two are never on screen at the same time — and
  // picks the guest's search back up if they scroll to it after editing in the
  // bar, so the two never disagree about the dates.
  const { ref, visible } = useBookingWidgetVisibility();
  useReseedFromStore(booking.form, visible);

  useEffect(() => {
    track("booking_widget_opened", { variant: "hero" });
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        width: "100%",
        maxWidth: 1280,
        mx: "auto",
        p: { xs: 4, md: 5 },
        color: "common.white",
        bgcolor: "rgba(11,11,10,0.58)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(196,168,50,0.45)",
        borderRadius: 0.5,
      }}
    >
      <Text
        variant="overline"
        component="p"
        sx={{ fontFamily: "var(--font-cartographic)", mb: 1, opacity: 0.85 }}
      >
        {data.copy.eyebrow}
      </Text>
      <Text variant="h4" component="h2" sx={{ mb: 4 }}>
        {data.copy.heading}
      </Text>
      <BookingFields data={data} booking={booking} layout="row" months={2} />
    </Box>
  );
}
