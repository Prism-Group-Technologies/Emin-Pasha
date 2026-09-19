"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { signatureExperiences } from "@/containers/spaces/copy/experiences";
import { MatchMeter } from "@/containers/spaces/molecules/MatchMeter";
import { MatchRunnerUp } from "@/containers/spaces/molecules/MatchRunnerUp";
import type { SpaceMatch } from "@/containers/spaces/spaceMatcher";
import { radiusTokens, shadowTokens } from "@/theme/tokens";

export interface MatchResultPanelProps {
  ranked: SpaceMatch[];
  names: Record<string, string>;
  suggestedExperienceId?: string;
  onReserve: (match: SpaceMatch) => void;
}

/**
 * The matcher's answer: the best-fitting space with its score and reasons, a
 * suggested signature experience, the "reserve this space" hand-off, and the
 * other two spaces as runners-up. `aria-live` so a screen-reader user hears
 * the new top match as soon as a choice changes it.
 */
export function MatchResultPanel({
  ranked,
  names,
  suggestedExperienceId,
  onReserve,
}: MatchResultPanelProps) {
  const [top, ...rest] = ranked;
  const suggestion = signatureExperiences.find((item) => item.id === suggestedExperienceId);
  if (!top) {
    return null;
  }

  return (
    <Box
      aria-live="polite"
      sx={{
        position: { md: "sticky" },
        top: { md: 96 },
        display: "grid",
        gap: 4,
        p: { xs: 4, md: 5 },
        borderRadius: `${radiusTokens.lg}px`,
        border: "1px solid",
        borderColor: "divider",
        borderTop: "2px solid",
        borderTopColor: "primary.main",
        bgcolor: "background.default",
        boxShadow: shadowTokens.md,
      }}
    >
      <Text variant="overline" component="p" color="text.secondary">
        Your best match
      </Text>
      <Text variant="h3" component="h3">
        {names[top.spaceId]}
      </Text>
      <MatchMeter percent={top.percent} emphasis />
      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 2 }}>
        {top.reasons.map((reason) => (
          <Box component="li" key={reason} sx={{ display: "flex", gap: 2 }}>
            <Icon
              name="check-circle"
              fontSize="small"
              aria-hidden
              sx={{ color: "primary.main", mt: "2px" }}
            />
            <Text variant="body2">{reason}</Text>
          </Box>
        ))}
      </Box>
      {suggestion && (
        <Text variant="body2" color="text.secondary">
          Pairs well with <strong>{suggestion.title}</strong>.
        </Text>
      )}
      <Button
        onClick={() => onReserve(top)}
        endIcon={<Icon name="arrow-forward" fontSize="small" />}
        fullWidth
      >
        Reserve {names[top.spaceId]}
      </Button>
      <Box sx={{ display: "grid", gap: 2, pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
        {rest.map((match) => (
          <MatchRunnerUp
            key={match.spaceId}
            match={match}
            name={names[match.spaceId] ?? ""}
            onReserve={onReserve}
          />
        ))}
      </Box>
    </Box>
  );
}
