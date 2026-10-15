"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";

/**
 * What the dialog becomes once the request is away.
 *
 * A dialog has to resolve. Leaving a guest looking at the form they just sent,
 * with a line of confirmation under the button, asks them to work out for
 * themselves whether anything happened and what to do next — and the one
 * control they can see is "Send", which is now the wrong thing to press. So
 * the form is replaced outright by the acknowledgement and a single way out.
 *
 * The message is the server's own, passed through: it is the only thing that
 * knows whether the request was delivered or merely accepted while no mail
 * provider is configured, and the copy must never claim the former when it is
 * the latter.
 */
export function RoomReservationSuccess({
  message,
  onClose,
  closeLabel,
}: {
  message: string | null;
  onClose: () => void;
  closeLabel: string;
}) {
  return (
    <Box sx={{ display: "grid", gap: 4, justifyItems: "start", py: 4 }}>
      <Icon name="check-circle" sx={{ color: "primary.main", fontSize: 40 }} aria-hidden />
      <Text role="status" aria-live="polite" variant="body1" sx={{ textWrap: "pretty" }}>
        {message}
      </Text>
      <Button onClick={onClose} size="large">
        {closeLabel}
      </Button>
    </Box>
  );
}
