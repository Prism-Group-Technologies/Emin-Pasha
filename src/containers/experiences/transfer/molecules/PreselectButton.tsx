"use client";

import type { MouseEvent } from "react";

import { Button, type ButtonProps } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import {
  BOOKING_ANCHOR_ID,
  BOOKING_PRESELECT_EVENT,
  BOOKING_QUERY,
  bookingHref,
} from "@/containers/experiences/transfer/anchors";

export interface PreselectButtonProps {
  label: string;
  preselect: keyof typeof BOOKING_QUERY;
  value: string;
  variant?: ButtonProps["variant"];
  fullWidth?: boolean;
}

/**
 * A "choose this car" / "book a chauffeur" button that lands on the booking
 * form with the choice already made.
 *
 * Without JavaScript it is a plain link to `?vehicle=…#book`, which the form
 * reads on mount. With it, the click rewrites the query in place (no router
 * round-trip), tells the mounted island to re-read it, and scrolls to the
 * form — honouring reduced motion.
 */
export function PreselectButton({
  label,
  preselect,
  value,
  variant = "primary",
  fullWidth,
}: PreselectButtonProps) {
  const href = bookingHref(preselect, value);

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.history.replaceState(null, "", href);
    window.dispatchEvent(new Event(BOOKING_PRESELECT_EVENT));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById(BOOKING_ANCHOR_ID)
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <Button
      href={href}
      onClick={onClick}
      variant={variant}
      fullWidth={fullWidth}
      endIcon={<Icon name="arrow-forward" fontSize="small" />}
    >
      {label}
    </Button>
  );
}
