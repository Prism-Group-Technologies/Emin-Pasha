"use client";

import { useEffect } from "react";

import { Box } from "@/components/atoms/Box";
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
 *
 * `data-mui-color-scheme="dark"` is the load-bearing attribute here, and it
 * fixes a real contrast bug rather than tuning a preference. The panel is a
 * permanently dark surface whatever the page's scheme is, but `color:
 * common.white` only sets an inherited CSS colour — it cannot reach the
 * *palette lookups* MUI's own components make. In light mode the −/+ buttons
 * resolved `action.active` to `rgba(0,0,0,0.54)` and the night count resolved
 * `text.secondary` to `sand/800`, both near-black on a near-black panel; the
 * disabled steppers were fainter still, which is why "Children −" vanished
 * completely. Scoping the dark scheme to this subtree re-points every one of
 * those lookups at the dark palette, so the controls are legible without any
 * component having to hard-code a colour. The theme sets
 * `colorSchemeSelector: "data-mui-color-scheme"`, which is precisely the hook
 * this relies on (DECISIONS.md D10–D14).
 *
 * No eyebrow and no heading. They cost ~90px of a hero that has one job, and
 * the controls label themselves — CHECK-IN, CHECK-OUT, GUESTS, and a button
 * that says "Check Availability". The heading survives as the form's
 * `aria-label` on a `role="search"` landmark — the correct role for exactly
 * this control, and one that makes the panel jumpable by landmark now that
 * there is no heading to jump to. `aria-label` on a bare `div` would have
 * been inert.
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
      data-mui-color-scheme="dark"
      role="search"
      aria-label={data.copy.heading}
      sx={{
        width: "100%",
        maxWidth: 1280,
        mx: "auto",
        p: { xs: 3, md: 4 },
        color: "common.white",
        bgcolor: "rgba(11,11,10,0.58)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(196,168,50,0.45)",
        borderRadius: 0.5,
      }}
    >
      <BookingFields data={data} booking={booking} layout="row" months={2} collapseGuests />
    </Box>
  );
}
