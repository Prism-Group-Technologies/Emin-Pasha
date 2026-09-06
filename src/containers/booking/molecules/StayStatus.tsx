"use client";

import { Link } from "@/components/atoms/Link";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import type { BookingStatus } from "@/containers/booking/hooks/useBookingForm";
import type { BookingWidgetData } from "@/containers/booking/types";
import type { BookingCopy } from "@/schemas/content/booking";

/**
 * An explicit message always wins; otherwise the two in-flight states speak
 * for themselves. Hoisted out of the component so the branch count stays
 * inside the project's complexity budget (eslint `complexity: 10`).
 */
function statusText(status: BookingStatus, message: string | null, copy: BookingCopy) {
  if (message) {
    return message;
  }
  if (status === "submitting") {
    return copy.states.loading;
  }
  if (status === "handoff") {
    return copy.states.handoff;
  }
  return null;
}

export interface StayStatusProps {
  data: BookingWidgetData;
  status: BookingStatus;
  message: string | null;
  fallbackHref: string | null;
  /**
   * Collapses the reserved height to nothing until there is something to say.
   * The sticky bar is ~60px tall by design; a permanently reserved 24px status
   * line inside it is a 40% tax on a bar that is idle almost all of the time.
   */
  dense?: boolean;
}

/**
 * The one place the widget speaks back — idle, loading, handoff, empty and
 * error all render through here so no variant can invent its own wording.
 *
 * `role="status"` + `aria-live="polite"` (CLAUDE.md §10, "aria-live for async
 * form results"). It is always in the DOM with a reserved minimum height, so
 * a message arriving cannot push the form around; and it is polite rather
 * than assertive because none of these interrupt anything the guest is doing.
 */
export function StayStatus({ data, status, message, fallbackHref, dense }: StayStatusProps) {
  const { copy } = data;
  const text = statusText(status, message, copy);
  const hasContent = Boolean(text ?? fallbackHref);

  return (
    <Stack
      role="status"
      aria-live="polite"
      spacing={2}
      sx={{ minHeight: dense ? 0 : 24, mt: dense && hasContent ? 2 : 0 }}
    >
      {text && (
        <Text variant="body2" color={status === "error" ? "error.main" : "text.secondary"}>
          {text}
        </Text>
      )}
      {fallbackHref && (
        <Link href={fallbackHref} variant="body2">
          {copy.enquiryFallback.action}
        </Link>
      )}
    </Stack>
  );
}
