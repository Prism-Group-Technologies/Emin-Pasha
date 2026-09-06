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
}: BookingFieldsProps) {
  const { copy } = data;
  const isRow = layout === "row";

  return (
    <Box component="form" onSubmit={booking.onSubmit} noValidate>
      <Stack
        direction={isRow ? { xs: "column", md: "row" } : "column"}
        spacing={4}
        sx={{ alignItems: isRow ? { md: "flex-end" } : "stretch" }}
      >
        <BookingFieldsBody
          data={data}
          booking={booking}
          layout={layout}
          months={months}
          datesAlwaysOpen={datesAlwaysOpen}
        />

        <Button type="submit" loading={booking.status === "submitting"} size="large">
          {booking.status === "submitting" ? copy.actions.submitting : copy.actions.submit}
        </Button>
      </Stack>

      <Box sx={{ mt: 3 }}>
        <StayStatus
          data={data}
          status={booking.status}
          message={booking.message}
          fallbackHref={booking.fallbackHref}
        />
      </Box>
    </Box>
  );
}
