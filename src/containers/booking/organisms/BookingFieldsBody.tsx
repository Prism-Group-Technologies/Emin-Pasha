"use client";

import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import type { useBookingForm } from "@/containers/booking/hooks/useBookingForm";
import { GuestStepper } from "@/containers/booking/molecules/GuestStepper";
import { StayDatesField } from "@/containers/booking/molecules/StayDatesField";
import type { BookingWidgetData } from "@/containers/booking/types";

export interface BookingFieldsBodyProps {
  data: BookingWidgetData;
  booking: ReturnType<typeof useBookingForm>;
  layout: "row" | "column";
  months?: 1 | 2;
  datesAlwaysOpen?: boolean;
  /**
   * Cross-axis alignment of a `row` layout. "end" lines the date field's
   * baseline up with the submit button beside it (hero and in-page widgets);
   * "start" is right when the calendar is permanently open and towers over the
   * guest stepper, as it does in the sticky panel.
   */
  align?: "start" | "end";
}

/**
 * The controls, with no `<form>` element, no submit button and no status line
 * around them.
 *
 * Split out of `BookingFields` for the sticky bar, whose submit button lives
 * in the collapsed row *above* the fields — one form element wrapping both, so
 * the fields could not carry their own. Everything that decides how a control
 * behaves still lives here, which is what keeps the four variants honest: a
 * guest who starts in the hero widget and finishes in the sticky bar meets the
 * same form, not a lookalike.
 */
export function BookingFieldsBody(props: BookingFieldsBodyProps) {
  const { data, booking, layout, months = 2, datesAlwaysOpen, align = "end" } = props;
  const isRow = layout === "row";
  const values = booking.form.getValues();

  return (
    <Stack
      direction={isRow ? { xs: "column", md: "row" } : "column"}
      spacing={4}
      sx={{
        flex: 1,
        minWidth: 0,
        alignItems: isRow ? { md: align === "end" ? "flex-end" : "flex-start" } : "stretch",
      }}
    >
      <StayDatesField
        data={data}
        checkIn={booking.checkIn}
        checkOut={booking.checkOut}
        nights={booking.nights}
        error={booking.errorFor("checkIn") ?? booking.errorFor("checkOut")}
        onSelect={booking.selectDate}
        months={months}
        alwaysOpen={datesAlwaysOpen}
      />

      <Stack spacing={2} sx={{ flexShrink: 0 }}>
        <Text variant="overline" component="p" sx={{ opacity: 0.7 }}>
          {data.copy.fields.guests}
        </Text>
        <GuestStepper
          data={data}
          adults={values.adults}
          childGuests={values.children}
          rooms={values.rooms}
          onChange={booking.setGuests}
        />
      </Stack>
    </Stack>
  );
}
