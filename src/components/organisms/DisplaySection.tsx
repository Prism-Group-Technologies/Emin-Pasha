"use client";

import Stack from "@mui/material/Stack";

import { Badge } from "@/components/atoms/Badge";
import { Chip } from "@/components/atoms/Chip";
import { Divider } from "@/components/atoms/Divider";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { Rule } from "@/components/atoms/Rule";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Spinner } from "@/components/atoms/Spinner";
import { Text } from "@/components/atoms/Text";

const iconSample: IconName[] = ["menu", "close", "search", "phone", "mail", "whatsapp", "event"];

/** Chip, Badge, Skeleton, Spinner, Divider, the signature Rule, and the Icon set. */
export function DisplaySection() {
  return (
    <Stack spacing={2}>
      <Text variant="h2">Chips, badges &amp; indicators</Text>
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
        <Chip label="Default" />
        <Chip label="Deletable" onDelete={() => {}} />
        <Chip label="Disabled" disabled />
        <Badge badgeContent={3} color="primary">
          <Icon name="event" />
        </Badge>
        <Spinner label="Loading room availability" />
      </Stack>
      <Text variant="body2">Skeleton (reserves real dimensions — CLAUDE.md §8)</Text>
      <Skeleton variant="rectangular" width={160} height={100} />
      <Text variant="body2">Divider vs. the signature Rule (Equatorial Line)</Text>
      <Divider />
      <Stack direction="row" spacing={2} alignItems="center">
        <Rule orientation="vertical" length={48} />
        <Text variant="body2">1px gold hairline, `theme.palette.primary.main` only</Text>
      </Stack>
      <Text variant="body2">Icon set (closed, typed name map — no arbitrary icon imports)</Text>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        {iconSample.map((name) => (
          <Icon key={name} name={name} />
        ))}
      </Stack>
    </Stack>
  );
}
