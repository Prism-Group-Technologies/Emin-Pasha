import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { shell } from "@/content/shell";

const copy = shell.routeStates.notFound;

/**
 * Route-level 404. The header, footer and its quick-link columns are already
 * around it via `PageShell`, so a visitor who lands here from a stale link
 * has the whole site one click away — the page itself only needs to say what
 * happened and offer the front door.
 */
export function NotFoundState() {
  return (
    <SectionShell eyebrow={copy.eyebrow} heading={copy.heading} headingLevel="h1">
      <Stack spacing={5} sx={{ alignItems: "flex-start", maxWidth: "60ch" }}>
        <Text variant="subtitle1" color="text.secondary">
          {copy.body}
        </Text>
        <Button href="/">{copy.homeLabel}</Button>
      </Stack>
    </SectionShell>
  );
}
