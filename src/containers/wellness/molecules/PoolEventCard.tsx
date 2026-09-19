import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { ENQUIRE_ANCHOR_ID } from "@/containers/wellness/anchors";
import type { PoolEvent } from "@/containers/wellness/copy/poolEvents";
import { WhatsAppCta } from "@/containers/wellness/molecules/WhatsAppCta";
import type { AssetRef } from "@/schemas/content/assetRef";
import { formatUgx } from "@/utils/currency";

/**
 * One private-hire package: a placeholder hero photo with the guest range
 * pinned over it, the name, a line of copy, a checked list of what the hire
 * covers, an indicative "from" price, and the CTA pair — WhatsApp plus a link
 * into the planner. Built on `cardSurface()` so a row sits level.
 */
export function PoolEventCard({ event, asset }: { event: PoolEvent; asset?: AssetRef }) {
  return (
    <Box component="article" sx={[cardSurface(), { p: 0, overflow: "hidden" }]}>
      {asset && (
        <MediaFrame hoverZoom sx={{ borderRadius: 0 }}>
          <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 33vw" />
        </MediaFrame>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", p: { xs: 4, md: 5 }, flex: 1, gap: 2 }}>
        <Text
          variant="overline"
          component="span"
          sx={{
            alignSelf: "flex-start",
            px: 3,
            py: 1,
            borderRadius: 999,
            border: "1px solid",
            borderColor: "divider",
            color: "text.secondary",
            fontFamily: "var(--font-cartographic)",
          }}
        >
          {event.capacity}
        </Text>

        <Text variant="h3" component="h3">
          {event.name}
        </Text>
        <Text variant="body1" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {event.description}
        </Text>

        <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, mt: 1, display: "grid", gap: 2 }}>
          {event.includes.map((item) => (
            <Box key={item} component="li" sx={{ display: "flex", gap: 2 }}>
              <Icon
                name="check-circle"
                aria-hidden
                fontSize="small"
                sx={{ color: "primary.main", mt: "2px", flexShrink: 0 }}
              />
              <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
                {item}
              </Text>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: "auto", pt: 4, display: "grid", gap: 3 }}>
          <Text component="p" sx={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>
            from {formatUgx(event.fromUgx)}{" "}
            <Text component="span" variant="body2" color="text.secondary">
              {event.priceUnit} · indicative
            </Text>
          </Text>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, alignItems: "center" }}>
            <WhatsAppCta label="Ask about a date" variant="ghost" />
            <Link href={`#${ENQUIRE_ANCHOR_ID}`} variant="body2" underline="hover">
              or plan this event
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
