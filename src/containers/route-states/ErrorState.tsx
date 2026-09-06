"use client";

import { Button } from "@/components/atoms/Button";
import { ExternalLink } from "@/components/atoms/ExternalLink";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { identity } from "@/content/identity";
import { shell } from "@/content/shell";
import { telephoneUrl } from "@/lib/directions";

const copy = shell.routeStates.error;

/**
 * Route-level error UI. Every page must have a next action (CLAUDE.md §2) —
 * an error page most of all, so alongside retry it offers the phone number
 * from the approved NAP, which is the one route to a human that cannot also
 * be broken.
 *
 * 'use client' justification: `reset` is a callback handed down from
 * Next.js's `error.tsx` boundary, which is itself a Client Component.
 */
export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <SectionShell eyebrow={copy.eyebrow} heading={copy.heading} headingLevel="h1">
      <Stack spacing={5} sx={{ alignItems: "flex-start", maxWidth: "60ch" }}>
        <Text variant="subtitle1" color="text.secondary">
          {copy.body}
        </Text>
        <Stack direction="row" spacing={5} sx={{ flexWrap: "wrap", alignItems: "center" }}>
          <Button onClick={onRetry}>{copy.retryLabel}</Button>
          {/* `ExternalLink`, not `Button href` — `tel:` is not a route, so it
              must not go through the client-side router. */}
          <ExternalLink href={telephoneUrl} variant="body2">
            {`${shell.stickyBar.call} ${identity.telephone}`}
          </ExternalLink>
        </Stack>
      </Stack>
    </SectionShell>
  );
}
