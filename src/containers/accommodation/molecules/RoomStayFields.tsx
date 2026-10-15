"use client";

import { Controller, type UseFormReturn } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { Checkbox } from "@/components/molecules/Checkbox";
import { SelectField } from "@/components/molecules/SelectField";
import { TextInput } from "@/components/molecules/TextInput";
import { Textarea } from "@/components/molecules/Textarea";
import { bookingLimits } from "@/config/booking";
import { roomReservationCopy } from "@/containers/accommodation/copy/reservation";
import type { RoomReservation } from "@/schemas/roomReservation";

const f = roomReservationCopy.fields;
const countOptions = (max: number, from: number) =>
  Array.from({ length: max - from + 1 }, (_, index) => ({
    value: index + from,
    label: String(index + from),
  }));
const ADULTS = countOptions(bookingLimits.maxAdults, 1);
const CHILDREN = countOptions(bookingLimits.maxChildren, 0);
const twoUp = { display: "grid", gap: 3, gridTemplateColumns: { sm: "1fr 1fr" } } as const;

/**
 * A headcount select, bound through `Controller` rather than `register`.
 *
 * This is not a style preference. `SelectField` is MUI's `TextField select`,
 * which is a **controlled** `Select` — it renders whatever its `value` prop
 * says and nothing else. `register` works by writing to a DOM input ref, which
 * a controlled Select never reads, so a registered select renders *blank* even
 * when react-hook-form is holding a perfectly good default. Verified in the
 * browser: the field showed an empty box while the form state said `2`.
 *
 * `Controller` is the binding that actually feeds a controlled component, and
 * the explicit `Number(...)` replaces what `valueAsNumber` would have done —
 * the schema wants a number, and an option value crosses the DOM as a string.
 */
function CountField({
  form,
  name,
  label,
  options,
}: {
  form: UseFormReturn<RoomReservation>;
  name: "adults" | "children";
  label: string;
  options: { value: number; label: string }[];
}) {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <SelectField
          {...field}
          value={field.value ?? ""}
          onChange={(event) => field.onChange(Number(event.target.value))}
          id={`room-reservation-${name}`}
          label={label}
          options={options}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message}
          fullWidth
        />
      )}
    />
  );
}

/**
 * When, how many, and anything else — the second half of the dialog.
 *
 * Native `type="date"` rather than the MUI X picker the booking widget uses,
 * for three reasons that all point the same way inside a dialog: a phone gives
 * a native date input its own OS wheel, which beats any month grid at 390px;
 * the picker's adapter and locale data would be dead weight in a chunk that
 * only loads when someone taps Reserve; and `useRoomReservation` seeds both
 * dates, so the common case is confirming two filled fields rather than
 * opening a calendar at all. The dining reservation form made the same call.
 */
export function RoomStayFields({ form }: { form: UseFormReturn<RoomReservation> }) {
  const { errors } = form.formState;

  return (
    <>
      <Box sx={twoUp}>
        <TextInput
          {...form.register("checkIn")}
          id="room-reservation-check-in"
          type="date"
          label={f.checkIn}
          error={Boolean(errors.checkIn)}
          helperText={errors.checkIn?.message}
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
        />
        <TextInput
          {...form.register("checkOut")}
          id="room-reservation-check-out"
          type="date"
          label={f.checkOut}
          error={Boolean(errors.checkOut)}
          helperText={errors.checkOut?.message}
          slotProps={{ inputLabel: { shrink: true } }}
          fullWidth
        />
      </Box>

      <Box sx={twoUp}>
        <CountField form={form} name="adults" label={f.adults} options={ADULTS} />
        <CountField form={form} name="children" label={f.children} options={CHILDREN} />
      </Box>

      <Textarea
        {...form.register("message")}
        id="room-reservation-message"
        label={f.message}
        minRows={2}
        fullWidth
      />
      <Checkbox
        {...form.register("consent")}
        id="room-reservation-consent"
        label={f.consent}
        error={errors.consent?.message}
      />
    </>
  );
}
