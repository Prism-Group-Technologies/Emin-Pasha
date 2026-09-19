import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { ENQUIRE_ANCHOR_ID } from "@/containers/wellness/anchors";
import type { SeasonalOffer } from "@/containers/wellness/copy/seasonal";
import { WhatsAppCta } from "@/containers/wellness/molecules/WhatsAppCta";
import { colorTokens } from "@/theme/tokens";
import { formatUgx } from "@/utils/currency";

/**
 * One limited seasonal treatment: a warm "why now" pill, the title, one line
 * of copy, an indicative price or note, then the WhatsApp CTA and a link to
 * the enquiry form. Built on the shared `cardSurface()` so a row of them sits
 * level; the pill uses the same theme-aware `rgba` on gold the membership
 * card's "Most popular" flag does.
 */
export function SeasonalOfferCard({ offer }: { offer: SeasonalOffer }) {
  return (
    <Box component="article" sx={[cardSurface(), { gap: 3 }]}>
      <Text
        component="span"
        variant="overline"
        sx={{
          alignSelf: "flex-start",
          px: 3,
          py: 1,
          borderRadius: 999,
          bgcolor: "rgba(196,168,50,0.12)",
          color: colorTokens.gold[800],
          fontFamily: "var(--font-cartographic)",
        }}
      >
        {offer.badge}
      </Text>

      <Text variant="h4" component="h3">
        {offer.title}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {offer.description}
      </Text>

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
        <Box
          sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 2 }}
        >
          <Text component="span" sx={{ fontFamily: "var(--font-display)", fontSize: "1.375rem" }}>
            {offer.priceUgx ? formatUgx(offer.priceUgx) : offer.priceNote}
          </Text>
          <Text variant="body2" component="span" color="text.secondary">
            {offer.priceUgx ? offer.priceNote : ""}
          </Text>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: "text.secondary" }}>
          <Icon name="event" aria-hidden fontSize="small" sx={{ color: "primary.main" }} />
          <Text variant="body2" component="span">
            {offer.endsNote}
          </Text>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, alignItems: "center" }}>
          <WhatsAppCta label="Book this treatment" variant="ghost" />
          <Link href={`#${ENQUIRE_ANCHOR_ID}`} variant="body2" underline="hover">
            or ask the wellness desk
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
