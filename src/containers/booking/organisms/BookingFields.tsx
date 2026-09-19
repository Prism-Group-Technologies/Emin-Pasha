"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import type { useBookingForm } from "@/containers/booking/hooks/useBookingForm";
import { StayStatus } from "@/containers/booking/molecules/StayStatus";
import { BookingFieldsBody } from "@/containers/booking/organisms/BookingFieldsBody";
import type { BookingWidgetData } from "@/containers/booking/types";

export interface BookingFieldsProps {
  data: BookingWidgetData;
  booking: ReturnType<typeof useBookingForm>;
  layout: "row" | "column";
  months?: 1 | 2;
  datesAlwaysOpen?: boolean;
  /** See `BookingFieldsBody` — collapses the guest steppers into a popover. */
  collapseGuests?: boolean;
}

/**
 * Form element, fields, submit and status — the shape the hero and in-page
 * widgets want. The sticky bar composes `BookingFieldsBody` directly instead,
 * because its submit button sits above the fields rather than after them.
 */
export function BookingFields({
  data,
  booking,
  layout,
  months = 2,
  datesAlwaysOpen,
  collapseGuests,
}: BookingFieldsProps) {
  const { copy } = data;
  const isRow = layout === "row";

  return (
    <Box component="form" onSubmit={booking.onSubmit} noValidate>
      <Stack
        direction={isRow ? { xs: "column", md: "row" } : "column"}
        spacing={collapseGuests ? 2 : 4}
        sx={{ alignItems: isRow ? { md: collapseGuests ? "flex-start" : "flex-end" } : "stretch" }}
      >
        <BookingFieldsBody
          data={data}
          booking={booking}
          layout={layout}
          months={months}
          datesAlwaysOpen={datesAlwaysOpen}
          collapseGuests={collapseGuests}
          align={collapseGuests ? "start" : "end"}
        />

        <Button
          type="submit"
          loading={booking.status === "submitting"}
          size="large"
          sx={collapseGuests ? { flexShrink: 0, minHeight: 56, px: 5 } : undefined}
        >
          {booking.status === "submitting" ? copy.actions.submitting : copy.actions.submit}
        </Button>
      </Stack>

      <Box sx={{ mt: collapseGuests ? 0 : 3 }}>
        <StayStatus
          data={data}
          status={booking.status}
          message={booking.message}
          fallbackHref={booking.fallbackHref}
          dense={collapseGuests}
        />
      </Box>
    </Box>
  );
}
