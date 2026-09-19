"use client";

import type { MouseEvent } from "react";

import { Button, type ButtonProps } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { RESERVE_ANCHOR_ID } from "@/containers/spaces/anchors";
import { useSeedEnquiry } from "@/containers/spaces/hooks/useSeedEnquiry";
import type { SpacesEnquirySeed } from "@/stores/spacesEnquiryStore";

export interface SeedEnquiryButtonProps {
  label: string;
  seed: SpacesEnquirySeed;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  fullWidth?: boolean;
}

/**
 * A "reserve this" control that lands on the reservation form with the choice
 * already made. Without JavaScript it is a plain link to `#reserve`; with it,
 * the click seeds the form through the store and scrolls there.
 */
export function SeedEnquiryButton({
  label,
  seed,
  variant = "primary",
  size,
  fullWidth,
}: SeedEnquiryButtonProps) {
  const reserve = useSeedEnquiry();

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    reserve(seed);
  };

  return (
    <Button
      href={`#${RESERVE_ANCHOR_ID}`}
      onClick={onClick}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      endIcon={<Icon name="arrow-forward" fontSize="small" />}
    >
      {label}
    </Button>
  );
}
