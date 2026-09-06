"use client";

import { useEffect, useRef, useState } from "react";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { Drawer } from "@/components/molecules/Drawer";
import { useBookingForm } from "@/containers/booking/hooks/useBookingForm";
import { GuestStepper } from "@/containers/booking/molecules/GuestStepper";
import { StayDatesField } from "@/containers/booking/molecules/StayDatesField";
import { StayStatus } from "@/containers/booking/molecules/StayStatus";
import type { BookingWidgetData } from "@/containers/booking/types";
import { track } from "@/lib/analytics/events";
import { useBookingStore } from "@/stores/bookingStore";

/**
 * Full-screen mobile sheet, one decision per step — dates, then guests, then
 * confirm. Stepping rather than scrolling keeps every tap target large and
 * means the calendar owns the whole screen when it is the guest's turn to
 * pick, which is the only way a month grid works at 360px.
 *
 * Focus trapping, Escape and the body-scroll lock come from the shared
 * `Drawer` molecule (MUI `Modal`) — the same verified defaults the mobile nav
 * relies on.
 */
type Step = "dates" | "guests";

export function MobileBookingSheet({ data }: { data: BookingWidgetData }) {
  const open = useBookingStore((state) => state.sheetOpen);
  const close = useBookingStore((state) => state.closeSheet);
  const booking = useBookingForm({ data });
  const [step, setStep] = useState<Step>("dates");
  const wasOpen = useRef(open);
  const { copy } = data;
  const values = booking.form.getValues();

  // Guarded against a ref rather than fired on every `open` render: an
  // unconditional setState in an effect trips `react-hooks/set-state-in-effect`
  // and does cause a cascading render. This only runs on a real open.
  useEffect(() => {
    if (open && !wasOpen.current) {
      track("booking_widget_opened", { variant: "sheet" });
      setStep("dates");
    }
    wasOpen.current = open;
  }, [open]);

  return (
    <Drawer open={open} onClose={close} anchor="bottom" title={copy.heading}>
      <Box
        component="form"
        onSubmit={booking.onSubmit}
        noValidate
        sx={{ p: 5, display: "grid", gap: 5, minHeight: "70vh", alignContent: "start" }}
      >
        <Text variant="h4" component="h2">
          {copy.heading}
        </Text>

        {step === "dates" ? (
          <StayDatesField
            data={data}
            checkIn={booking.checkIn}
            checkOut={booking.checkOut}
            nights={booking.nights}
            error={booking.errorFor("checkIn") ?? booking.errorFor("checkOut")}
            onSelect={booking.selectDate}
            months={1}
            alwaysOpen
          />
        ) : (
          <GuestStepper
            data={data}
            adults={values.adults}
            childGuests={values.children}
            rooms={values.rooms}
            onChange={booking.setGuests}
          />
        )}

        <StayStatus
          data={data}
          status={booking.status}
          message={booking.message}
          fallbackHref={booking.fallbackHref}
        />

        <Stack direction="row" spacing={3}>
          {step === "guests" && (
            <Button variant="ghost" onClick={() => setStep("dates")} fullWidth>
              {copy.actions.back}
            </Button>
          )}
          {step === "dates" ? (
            <Button
              onClick={() => setStep("guests")}
              disabled={booking.nights < 1}
              fullWidth
              size="large"
            >
              {copy.actions.next}
            </Button>
          ) : (
            <Button type="submit" loading={booking.status === "submitting"} fullWidth size="large">
              {booking.status === "submitting" ? copy.actions.submitting : copy.actions.submit}
            </Button>
          )}
        </Stack>
      </Box>
    </Drawer>
  );
}
