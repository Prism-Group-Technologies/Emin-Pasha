"use client";

import { useState } from "react";

import Stack from "@mui/material/Stack";

import { Text } from "@/components/atoms/Text";
import { DateRangeField } from "@/components/molecules/DateRangeField";

/** DateRangeField — built from free MUI X components, DECISIONS.md D20. */
export function DateRangeSection() {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  return (
    <Stack spacing={2} sx={{ maxWidth: 480 }}>
      <Text variant="h2">Date range</Text>
      <DateRangeField
        checkIn={checkIn}
        checkOut={checkOut}
        onCheckInChange={setCheckIn}
        onCheckOutChange={setCheckOut}
      />
    </Stack>
  );
}
