"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { MatchMeter } from "@/containers/spaces/molecules/MatchMeter";
import type { SpaceMatch } from "@/containers/spaces/spaceMatcher";

export interface MatchRunnerUpProps {
  match: SpaceMatch;
  name: string;
  onReserve: (match: SpaceMatch) => void;
}

/** A second- or third-placed space: name, compact meter, and its own hand-off when it fits. */
export function MatchRunnerUp({ match, name, onReserve }: MatchRunnerUpProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto",
        gap: 3,
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "grid", gap: 1, minWidth: 0 }}>
        <Text variant="subtitle2" component="p">
          {name}
        </Text>
        <MatchMeter percent={match.percent} />
        {!match.fits && (
          <Text variant="caption" color="text.secondary">
            {match.reasons.at(-1)}
          </Text>
        )}
      </Box>
      {match.fits && (
        <Button variant="link" size="small" onClick={() => onReserve(match)}>
          Reserve
        </Button>
      )}
    </Box>
  );
}
