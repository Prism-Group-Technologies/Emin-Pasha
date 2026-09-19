import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { EventVoice } from "@/containers/events/copy";

/**
 * One planner note: a short heading, the quote as a `blockquote`, then the
 * attribution. Attributions are placeholders (see `copy/voices.ts`) — no
 * real person or organisation is named.
 */
export function EventVoiceCard({ voice }: { voice: EventVoice }) {
  return (
    <Box component="figure" sx={[cardSurface(false), { m: 0, gap: 3 }]}>
      <Text variant="overline" component="p" sx={{ color: "primary.main" }}>
        {voice.heading}
      </Text>
      <Text component="blockquote" variant="body1" sx={{ m: 0, textWrap: "pretty" }}>
        “{voice.quote}”
      </Text>
      <Box component="figcaption" sx={{ mt: "auto" }}>
        <Text variant="body2" sx={{ fontWeight: 600 }}>
          {voice.author}
        </Text>
        {voice.context && (
          <Text variant="caption" component="p" color="text.secondary">
            {voice.context}
          </Text>
        )}
      </Box>
    </Box>
  );
}
