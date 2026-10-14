"use client";

import { useWatch } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { BOOKING_ENGINE_PARAMS, BOOKING_ENGINE_URL } from "@/config/bookingEngine";
import { roomReservationCopy as copy } from "@/containers/accommodation/copy/reservation";
import { useRoomReservation } from "@/containers/accommodation/hooks/useRoomReservation";
import { RoomGuestFields } from "@/containers/accommodation/molecules/RoomGuestFields";
import { RoomReservationSuccess } from "@/containers/accommodation/molecules/RoomReservationSuccess";
import { RoomStayFields } from "@/containers/accommodation/molecules/RoomStayFields";
import { buildDeepLink } from "@/lib/booking/ycsDeepLink";

export interface RoomReservationFormProps {
  roomId: string;
  onClose: () => void;
  /** Rendered under the submit button — the guest's second path. */
  engineLabel: string;
}

/**
 * The reservation request itself. Presentational: every piece of state and the
 * submission live in `useRoomReservation`.
 *
 * The engine link is built from the dates the guest has actually typed, not
 * from the bare engine URL, so a guest who gives up on waiting for a reply
 * arrives at LetsBook with their search already made rather than starting
 * again. It uses the same verified parameter map as the booking widget's
 * handoff — `BOOKING_ENGINE_PARAMS` names only keys read off a real engine
 * URL, and `buildDeepLink` silently drops anything it cannot name, so this
 * link can never invent a parameter. `rooms` is 1 because this dialog is
 * about one category; the map does not carry it in any case.
 */
export function RoomReservationForm({ roomId, onClose, engineLabel }: RoomReservationFormProps) {
  const { form, onSubmit, result, succeeded, submitting } = useRoomReservation(roomId);
  const [checkIn, checkOut, adults, children] = useWatch({
    control: form.control,
    name: ["checkIn", "checkOut", "adults", "children"],
  });

  if (succeeded) {
    return <RoomReservationSuccess message={result} onClose={onClose} closeLabel="Done" />;
  }

  const engineHref = buildDeepLink(
    BOOKING_ENGINE_URL,
    BOOKING_ENGINE_PARAMS,
    { checkIn, checkOut, adults, children, rooms: 1 },
    {},
  );

  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ display: "grid", gap: 3 }}>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty", mb: 1 }}>
        {copy.lead}
      </Text>

      <RoomGuestFields form={form} />
      <RoomStayFields form={form} />

      <Button type="submit" loading={submitting} size="large" sx={{ mt: 1 }}>
        {submitting ? copy.submitting : copy.submit}
      </Button>

      {/* Deliberately a text link rather than a second button: offering the
          engine as an equal-weight choice turns one clear action into a
          decision, and the request is the path this dialog is for. */}
      <Text variant="body2" color="text.secondary">
        {copy.engine.lead} <Link href={engineHref}>{engineLabel}</Link>
      </Text>

      {/* Reserved height so a validation or failure reply cannot resize the
          dialog under the guest's thumb. */}
      <Text
        role="status"
        aria-live="polite"
        variant="body2"
        color="error.main"
        sx={{ minHeight: 24 }}
      >
        {result}
      </Text>
    </Box>
  );
}
