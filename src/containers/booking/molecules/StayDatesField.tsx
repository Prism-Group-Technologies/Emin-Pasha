"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

import { format } from "date-fns";

import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { DISPLAY_DATE_FORMAT } from "@/config/booking";
import { bookingFieldSx } from "@/containers/booking/fieldSx";
import type { BookingWidgetData } from "@/containers/booking/types";

/**
 * MUI X's calendar is the single heaviest dependency in the booking widget,
 * and no guest needs it until they open the date field. Loading it on demand
 * keeps it out of the homepage's first-load bundle — where it was measurably
 * delaying hydration, and with it LCP (which tracked TTI at 4.1s).
 */
const StayDatePicker = dynamic(
  () => import("@/components/organisms/StayDatePicker").then((m) => m.StayDatePicker),
  { ssr: false, loading: () => <Box sx={{ minHeight: 320 }} /> },
);

export interface StayDatesFieldProps {
  data: BookingWidgetData;
  checkIn: Date | null;
  checkOut: Date | null;
  nights: number;
  error?: string;
  onSelect: (date: Date) => void;
  months?: 1 | 2;
  /** Sheet variant keeps the calendar permanently open. */
  alwaysOpen?: boolean;
}

/**
 * The two date buttons plus the calendar they open. Each button is a real
 * `<button>` with `aria-expanded`, so the calendar is reachable by keyboard
 * without a pointer, and the live night count sits beside them rather than
 * only inside the popover.
 */
export function StayDatesField(props: StayDatesFieldProps) {
  const { data, checkIn, checkOut, nights, error, onSelect, months = 2, alwaysOpen } = props;
  const [open, setOpen] = useState(Boolean(alwaysOpen));
  const { copy } = data;

  const nightsLabel = (nights === 1 ? copy.nights.one : copy.nights.many).replace(
    "{count}",
    String(nights),
  );

  const fieldSx = bookingFieldSx(Boolean(error));

  return (
    <Stack spacing={2} sx={{ flex: 1 }}>
      <Stack direction="row" spacing={2}>
        {(
          [
            { key: "in", label: copy.fields.checkIn, value: checkIn },
            { key: "out", label: copy.fields.checkOut, value: checkOut },
          ] as const
        ).map((field) => (
          <Box
            key={field.key}
            component="button"
            type="button"
            aria-expanded={alwaysOpen ? undefined : open}
            onClick={alwaysOpen ? undefined : () => setOpen((current) => !current)}
            sx={fieldSx}
          >
            <Text variant="overline" component="span" sx={{ display: "block", opacity: 0.7 }}>
              {field.label}
            </Text>
            <Text component="span">
              {field.value ? format(field.value, DISPLAY_DATE_FORMAT) : "—"}
            </Text>
          </Box>
        ))}
      </Stack>

      {nights > 0 && (
        <Text variant="body2" color="text.secondary">
          {nightsLabel}
        </Text>
      )}
      {error && (
        <Text variant="body2" color="error.main" role="alert">
          {error}
        </Text>
      )}

      {open && (
        <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 0.5, p: 2 }}>
          <StayDatePicker
            checkIn={checkIn}
            checkOut={checkOut}
            onSelect={onSelect}
            months={months}
          />
        </Box>
      )}
    </Stack>
  );
}
