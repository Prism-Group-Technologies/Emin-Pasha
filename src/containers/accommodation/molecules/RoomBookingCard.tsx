import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { BOOKING_ANCHOR_ID } from "@/containers/accommodation/constants";
import { bookingCardCopy } from "@/containers/accommodation/copy";
import { getBookingWidgetData } from "@/containers/booking";
import { DeferredInlineBookingWidget } from "@/containers/booking/organisms/DeferredBookingWidget";
import type { RoomCategory } from "@/schemas/content/roomCategory";
import { radiusTokens, shadowTokens } from "@/theme/tokens";
import { formatUgx } from "@/utils/currency";

/**
 * The conversion surface, as a card that states its price before it asks for
 * anything.
 *
 * The widget alone was a form with a heading — it showed dates and guests but
 * never the rate, so the one number the guest is deciding on lived three
 * hundred pixels up the page and vanished the moment the card went sticky.
 * The rate now travels with it, and the three assurances underneath answer
 * the objections that otherwise send a booker back out to an aggregator to
 * check (see `copy/detail.ts` for what each line is traceable to).
 *
 * Sticky from `md` up, offset clear of the condensed header. Below that it is
 * an ordinary block: the sitewide `StickyBookingBar` takes over on phones,
 * and two competing sticky surfaces on one small screen is one too many.
 */
export function RoomBookingCard({ room }: { room: RoomCategory }) {
  return (
    <Box id={BOOKING_ANCHOR_ID} sx={{ position: { md: "sticky" }, top: { md: 120 } }}>
      <Box
        sx={{
          overflow: "hidden",
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderTop: "2px solid",
          borderTopColor: "primary.main",
          borderRadius: `${radiusTokens.lg}px`,
          boxShadow: shadowTokens.md,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: 1.5,
            px: { xs: 4, md: 5 },
            pt: { xs: 4, md: 5 },
          }}
        >
          <Text
            component="p"
            sx={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", lineHeight: 1.1 }}
          >
            {formatUgx(room.rateUgx)}
          </Text>
          <Text variant="body2" color="text.secondary">
            from · per night
          </Text>
        </Box>

        <Box sx={{ px: { xs: 4, md: 5 }, pb: { xs: 4, md: 5 }, pt: 3 }}>
          <DeferredInlineBookingWidget
            data={getBookingWidgetData()}
            roomTypeId={room.id}
            heading={`Check dates — ${room.name}`}
          />
        </Box>

        <Stack
          component="ul"
          spacing={2}
          sx={{
            listStyle: "none",
            m: 0,
            px: { xs: 4, md: 5 },
            py: 4,
            borderTop: "1px solid",
            borderColor: "divider",
            bgcolor: "background.default",
          }}
        >
          {bookingCardCopy.assurances.map((line) => (
            <Box key={line} component="li" sx={{ display: "flex", gap: 2 }}>
              <Icon
                name="check-circle"
                aria-hidden
                fontSize="small"
                sx={{ color: "primary.main", mt: "2px", flexShrink: 0 }}
              />
              <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
                {line}
              </Text>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
