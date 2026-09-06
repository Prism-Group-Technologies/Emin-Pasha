import { Box } from "@/components/atoms/Box";
import { ExternalLink } from "@/components/atoms/ExternalLink";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import { Text } from "@/components/atoms/Text";
import type { FooterData } from "@/components/organisms/Footer/footerData";
import { quietLinkSx } from "@/theme/linkStyles";

/**
 * Name, address, phone — every value read from `content/identity.ts`, the
 * same object the JSON-LD `Hotel`/`LocalBusiness` node is built from, so the
 * NAP cannot drift between the visible footer and the structured data
 * (CLAUDE.md §9).
 *
 * `<address>` is the correct element, with the browser's default italic
 * removed rather than inherited. Every entry is an `ExternalLink`: the
 * address opens a maps deep link, and `tel:`/`mailto:`/WhatsApp all hand off
 * to the OS, none of which the client router may handle.
 */
export function NapBlock({ nap, name }: { nap: FooterData["nap"]; name: string }) {
  return (
    <Box>
      <SectionLabel id={nap.titleId} sx={{ mb: 2 }}>
        {nap.title}
      </SectionLabel>
      <Box
        component="address"
        aria-labelledby={nap.titleId}
        sx={{ fontStyle: "normal", display: "grid", justifyItems: "start" }}
      >
        <Text variant="body2" sx={{ mb: 1, maxWidth: "32ch" }}>
          {name}
        </Text>
        {nap.items.map((item) => (
          <ExternalLink
            key={item.href}
            href={item.href}
            variant="body2"
            sx={[quietLinkSx, { maxWidth: "34ch" }]}
          >
            {item.label}
          </ExternalLink>
        ))}
      </Box>
    </Box>
  );
}
