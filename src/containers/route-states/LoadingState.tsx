import { Spinner } from "@/components/atoms/Spinner";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { shell } from "@/content/shell";

const copy = shell.routeStates.loading;

/**
 * Route-level loading UI. Occupies the same `SectionShell` rhythm as real
 * page content so the swap from skeleton to page does not jolt the layout.
 */
export function LoadingState() {
  return (
    <SectionShell eyebrow={copy.eyebrow} heading={copy.heading} headingLevel="h1">
      <Stack spacing={5} sx={{ alignItems: "flex-start" }}>
        <Text variant="subtitle1" color="text.secondary">
          {copy.body}
        </Text>
        <Spinner />
      </Stack>
    </SectionShell>
  );
}
