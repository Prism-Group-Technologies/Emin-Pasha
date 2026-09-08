import { Box } from "@/components/atoms/Box";
import { SectionShell } from "@/components/templates/SectionShell";
import { BOOKING_ANCHOR_ID } from "@/containers/accommodation/constants";
import { bookingSection } from "@/containers/accommodation/copy";
import { getBookingWidgetData } from "@/containers/booking";
import { DeferredInlineBookingWidget } from "@/containers/booking/organisms/DeferredBookingWidget";
import type { RevealDirection } from "@/theme/motion";
import { radiusTokens, shadowTokens } from "@/theme/tokens";

/**
 * The page's primary conversion surface, and the target of every "check
 * availability" anchor on it. The widget itself is deferred — react-hook-form
 * plus the field molecules is the largest client cost on this route and none
 * of it is needed to read the page (see `DeferredBookingWidget`). The
 * `SectionShell` reserves its height, so the swap-in moves nothing.
 *
 * The widget sits on a raised, shadowed panel so the surface a visitor is
 * meant to act on is visibly the most substantial thing in its band.
 */
export function BookingSection({ motion = "up" }: { motion?: RevealDirection }) {
  const bookingData = getBookingWidgetData();

  return (
    <SectionShell
      id={BOOKING_ANCHOR_ID}
      motion={motion}
      eyebrow={bookingSection.eyebrow}
      heading={bookingSection.heading}
      description={bookingSection.description}
    >
      <Box
        sx={{
          p: { xs: 4, md: 6 },
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: `${radiusTokens.lg}px`,
          boxShadow: shadowTokens.md,
        }}
      >
        <DeferredInlineBookingWidget data={bookingData} />
      </Box>
    </SectionShell>
  );
}
