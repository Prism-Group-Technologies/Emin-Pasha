import { Box } from "@/components/atoms/Box";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import { guaranteeCopy } from "@/containers/offers/copy";
import { ClaimOnWhatsApp } from "@/containers/offers/molecules/ClaimOnWhatsApp";
import { colorTokens, radiusTokens } from "@/theme/tokens";

const { gold } = colorTokens;

/**
 * The price-match promise as a warm, gold-edged panel beside the perks — the
 * one emphatic block in that band. The wash is a translucent gold rather than
 * the opaque `gold.50`, so it tints whichever ground sits beneath it — warm
 * cream in light mode, a soft gold glow in dark — without a scheme switch
 * (an `sx` callback cannot cross into the client `Box` from a Server
 * Component). Text stays on the scheme's own tokens.
 */
export function GuaranteeCard({ whatsappHref }: { whatsappHref: string }) {
  return (
    <Box
      component="aside"
      aria-labelledby="offers-guarantee-heading"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        p: { xs: 5, md: 7 },
        borderRadius: `${radiusTokens.xl}px`,
        border: "1px solid",
        borderColor: gold[500],
        bgcolor: "rgba(196,168,50,0.12)",
      }}
    >
      <IconBadge name="verified" size={56} />
      <Text variant="overline" component="p" sx={{ fontFamily: "var(--font-cartographic)" }}>
        {guaranteeCopy.eyebrow}
      </Text>
      <Text id="offers-guarantee-heading" variant="h3" component="h3" sx={{ textWrap: "balance" }}>
        {guaranteeCopy.heading}
      </Text>
      <Text variant="body1" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {guaranteeCopy.body}
      </Text>
      <Box sx={{ mt: "auto", display: "grid", gap: 2, pt: 2 }}>
        <ClaimOnWhatsApp
          href={whatsappHref}
          label={guaranteeCopy.cta}
          sx={{ justifySelf: "start" }}
        />
        <Text variant="caption" color="text.secondary">
          {guaranteeCopy.footnote}
        </Text>
      </Box>
    </Box>
  );
}
