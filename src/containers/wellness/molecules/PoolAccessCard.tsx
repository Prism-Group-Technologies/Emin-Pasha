import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { ENQUIRE_ANCHOR_ID } from "@/containers/wellness/anchors";
import type { PoolAccessOption } from "@/containers/wellness/copy/poolAccess";
import { WhatsAppCta } from "@/containers/wellness/molecules/WhatsAppCta";
import { formatUgx } from "@/utils/currency";

/**
 * One way to use the pool as a card: a tinted icon badge, a "who it's for"
 * pill, the name, a line of copy, a checked list of what the rate covers, and
 * an indicative price pinned to a hairline footer above the WhatsApp CTA and
 * a link into the planner. Built on the shared `cardSurface()` so a mixed
 * grid still reads as a grid.
 */
export function PoolAccessCard({ option }: { option: PoolAccessOption }) {
  return (
    <Box component="article" sx={[cardSurface(), { gap: 3 }]}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
        <IconBadge name={option.icon} size={44} />
        <Text
          component="span"
          variant="overline"
          sx={{
            px: 3,
            py: 1,
            borderRadius: 999,
            border: "1px solid",
            borderColor: "divider",
            color: "text.secondary",
            fontFamily: "var(--font-cartographic)",
          }}
        >
          {option.forWhom}
        </Text>
      </Box>

      <Text variant="h4" component="h3">
        {option.name}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {option.description}
      </Text>

      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 2 }}>
        {option.includes.map((item) => (
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

      <Box
        sx={{
          mt: "auto",
          pt: 3,
          borderTop: "1px solid",
          borderColor: "divider",
          display: "grid",
          gap: 3,
        }}
      >
        <Text component="p" sx={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>
          {formatUgx(option.priceUgx)}{" "}
          <Text component="span" variant="body2" color="text.secondary">
            {option.priceUnit} · indicative
          </Text>
        </Text>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, alignItems: "center" }}>
          <WhatsAppCta label="Book on WhatsApp" variant="ghost" />
          <Link href={`#${ENQUIRE_ANCHOR_ID}`} variant="body2" underline="hover">
            or plan it in detail
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
