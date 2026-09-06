"use client";

import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { useCtaTracking } from "@/containers/home/hooks/useCtaTracking";

export interface CtaTarget {
  label: string;
  href: string;
}

export interface CtaPairProps {
  primary: CtaTarget;
  secondary?: CtaTarget;
  /** Reported with every click, so events are attributable to a section. */
  section: string;
  align?: "start" | "center";
  size?: "medium" | "large";
}

/**
 * A primary + optional secondary CTA, wired to the homepage's click tracking.
 *
 * It exists because the same pair was about to be retyped in six organisms,
 * and each one would have had to remember the `onClick` — a tracked CTA you
 * have to remember to track is one that eventually ships untracked.
 *
 * Stacks full-width on mobile: side-by-side buttons below ~380px produce two
 * cramped targets instead of one comfortable one, and this is the page's
 * primary conversion control on the device most of the traffic arrives on.
 */
export function CtaPair({
  primary,
  secondary,
  section,
  align = "start",
  size = "medium",
}: CtaPairProps) {
  const { onCtaClick } = useCtaTracking(section);

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={3}
      sx={{
        alignItems: { xs: "stretch", sm: "center" },
        justifyContent: align === "center" ? "center" : "flex-start",
        width: "100%",
      }}
    >
      <Button
        href={primary.href}
        size={size}
        onClick={() => onCtaClick(primary.label, primary.href)}
      >
        {primary.label}
      </Button>
      {secondary && (
        <Button
          href={secondary.href}
          variant="ghost"
          size={size}
          onClick={() => onCtaClick(secondary.label, secondary.href)}
        >
          {secondary.label}
        </Button>
      )}
    </Stack>
  );
}
