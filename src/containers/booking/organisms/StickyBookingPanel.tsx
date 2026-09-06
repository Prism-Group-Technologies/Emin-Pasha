"use client";

import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";
import type { useBookingForm } from "@/containers/booking/hooks/useBookingForm";
import { BookingFieldsBody } from "@/containers/booking/organisms/BookingFieldsBody";
import type { BookingWidgetData } from "@/containers/booking/types";
import { easingTokens, motionTokens, shadowTokens } from "@/theme/tokens";

export interface StickyBookingPanelProps {
  id: string;
  data: BookingWidgetData;
  booking: ReturnType<typeof useBookingForm>;
  onClose: () => void;
}

/**
 * The editable half of the sticky bar, revealed only when a guest asks for it.
 *
 * `position: absolute` under the bar rather than in its flow — that is what
 * keeps the bar itself 60px tall at rest. And the `maxHeight` + `overflowY`
 * are not defensive padding: the calendar renders in flow inside
 * `StayDatesField`, so on a short laptop viewport an unbounded panel ran off
 * the bottom of the screen with no way to reach the last row of dates.
 */
export function StickyBookingPanel({ id, data, booking, onClose }: StickyBookingPanelProps) {
  return (
    <Box
      id={id}
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        maxHeight: "calc(100svh - 160px)",
        overflowY: "auto",
        overscrollBehavior: "contain",
        px: { md: 5, lg: 6 },
        pt: 4,
        pb: 5,
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
        boxShadow: shadowTokens.modal,
        animation: `stickyPanelIn ${motionTokens.navFade}ms ${easingTokens.emin}`,
        "@keyframes stickyPanelIn": {
          from: { opacity: 0, transform: "translateY(-8px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "@media (prefers-reduced-motion: reduce)": { animation: "none" },
      }}
    >
      <IconButton
        aria-label={data.copy.summary.collapse}
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <Icon name="close" fontSize="small" />
      </IconButton>

      <BookingFieldsBody
        data={data}
        booking={booking}
        layout="row"
        months={2}
        align="start"
        datesAlwaysOpen
      />
    </Box>
  );
}
