"use client";

import type { UseFormReturn } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { HoneypotField } from "@/components/atoms/HoneypotField";
import { TextInput } from "@/components/molecules/TextInput";
import { roomReservationCopy } from "@/containers/accommodation/copy/reservation";
import type { RoomReservation } from "@/schemas/roomReservation";

const f = roomReservationCopy.fields;
const twoUp = { display: "grid", gap: 3, gridTemplateColumns: { sm: "1fr 1fr" } } as const;

/**
 * Who is asking — the first half of the reservation dialog.
 *
 * Phone sits beside email rather than under it, and is optional: a Kampala
 * reservations desk routinely confirms by WhatsApp or a call, so the field
 * earns its place, but requiring it would cost the leads of everyone who will
 * not hand over a number to a form.
 */
export function RoomGuestFields({ form }: { form: UseFormReturn<RoomReservation> }) {
  const { errors } = form.formState;

  return (
    <>
      <HoneypotField {...form.register("website")} />
      <TextInput
        {...form.register("name")}
        id="room-reservation-name"
        label={f.name}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        autoComplete="name"
        fullWidth
      />
      <Box sx={twoUp}>
        <TextInput
          {...form.register("email")}
          id="room-reservation-email"
          type="email"
          label={f.email}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          autoComplete="email"
          fullWidth
        />
        <TextInput
          {...form.register("phone")}
          id="room-reservation-phone"
          type="tel"
          label={f.phone}
          autoComplete="tel"
          fullWidth
        />
      </Box>
    </>
  );
}
