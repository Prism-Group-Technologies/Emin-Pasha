import { Box } from "@/components/atoms/Box";
import { ExternalLink } from "@/components/atoms/ExternalLink";
import { Text } from "@/components/atoms/Text";
import type { ContactChannel } from "@/schemas/content/contactChannel";

/**
 * The approved department inboxes (`content/contact.ts`) as a `<dl>`, for
 * visitors who would rather open their own mail client. Exactly the channels
 * the source lists — no `events@` or `spa@` is invented.
 */
export function DirectInboxList({
  title,
  channels,
}: {
  title: string;
  channels: ContactChannel[];
}) {
  return (
    <Box>
      <Text variant="overline" component="p" color="text.secondary" sx={{ mb: 3 }}>
        {title}
      </Text>
      <Box component="dl" sx={{ m: 0, display: "grid", gap: 3 }}>
        {channels.map((channel) => (
          <Box
            key={channel.id}
            sx={{ pl: 3, borderLeft: "2px solid", borderColor: "primary.main" }}
          >
            <Text component="dt" variant="body2" sx={{ fontWeight: 600 }}>
              {channel.department}
            </Text>
            {/* Purpose and address both sit inside the <dd>: a <dl> child that
                is neither <dt> nor <dd> is invalid markup and fails axe. */}
            <Box component="dd" sx={{ m: 0, display: "grid", gap: 0.5 }}>
              <Text variant="caption" color="text.secondary">
                {channel.purpose}
              </Text>
              <ExternalLink href={`mailto:${channel.email}`} variant="body2">
                {channel.email}
              </ExternalLink>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
