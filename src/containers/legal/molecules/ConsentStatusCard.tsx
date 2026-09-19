"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { fillTemplate } from "@/containers/legal/consentStatus";
import { cookieSettingsCopy } from "@/containers/legal/copy/cookieSettings";

const { panel } = cookieSettingsCopy;

export interface ConsentStatusCardProps {
  decided: boolean;
  savedAt: string | null;
  activeCount: number;
  onAcceptAll: () => void;
  onRejectAll: () => void;
}

/** Where the visitor stands right now, with the two one-tap decisions. */
export function ConsentStatusCard({
  decided,
  savedAt,
  activeCount,
  onAcceptAll,
  onRejectAll,
}: ConsentStatusCardProps) {
  const statusLine =
    decided && savedAt
      ? fillTemplate(panel.statusDecided, { date: savedAt })
      : panel.statusUndecided;

  return (
    <Box
      sx={[
        cardSurface(true),
        {
          gap: 4,
          position: { md: "sticky" },
          top: { md: 150 },
          height: "auto",
          "&:hover": { transform: "none" },
        },
      ]}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <IconBadge name="cookie" size={48} />
        <Box>
          <Text variant="h5" component="h3">
            {panel.statusHeading}
          </Text>
          <Text variant="body2" sx={{ fontWeight: 600, color: "primary.main" }}>
            {fillTemplate(panel.activeCount, { count: activeCount })}
          </Text>
        </Box>
      </Box>
      <Text variant="body2" color="text.secondary">
        {statusLine}
      </Text>
      <Box sx={{ display: "grid", gap: 2 }}>
        <Button onClick={onAcceptAll} fullWidth>
          {panel.acceptAll}
        </Button>
        <Button onClick={onRejectAll} variant="ghost" fullWidth>
          {panel.rejectAll}
        </Button>
      </Box>
    </Box>
  );
}
