import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { ENQUIRE_ANCHOR_ID } from "@/containers/wellness/anchors";
import type { GiftVoucher } from "@/containers/wellness/copy/vouchers";
import { WhatsAppCta } from "@/containers/wellness/molecules/WhatsAppCta";
import { colorTokens } from "@/theme/tokens";
import { formatUgx } from "@/utils/currency";

/**
 * One gift voucher, styled to feel like a gift rather than a price row: a
 * tinted gift badge, a "who it's for" line, the value in the display face,
 * then the delivery note and the two ways to buy. The featured card takes the
 * warm gold tint and a "Most loved" flag — the same treatment
 * `MembershipTierCard` gives its popular tier.
 */
export function VoucherCard({ voucher }: { voucher: GiftVoucher }) {
  return (
    <Box
      component="article"
      sx={[
        cardSurface(),
        { gap: 3 },
        voucher.featured
          ? { bgcolor: "rgba(196,168,50,0.10)", borderTopColor: colorTokens.gold[700] }
          : {},
      ]}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
        <IconBadge name="gift" size={44} />
        {voucher.featured && (
          <Text variant="overline" component="span" sx={{ color: "primary.main" }}>
            Most loved
          </Text>
        )}
      </Box>

      <Box sx={{ display: "grid", gap: 0.5 }}>
        <Text variant="overline" component="p" color="text.secondary">
          {voucher.forWhom}
        </Text>
        <Text variant="h5" component="h3">
          {voucher.title}
        </Text>
      </Box>

      <Box sx={{ display: "grid", gap: 0.5 }}>
        <Text
          component="p"
          sx={{ fontFamily: "var(--font-display)", fontSize: "2rem", lineHeight: 1.05 }}
        >
          {voucher.priceUgx ? formatUgx(voucher.priceUgx) : voucher.priceNote}
        </Text>
        <Text variant="body2" component="p" color="text.secondary">
          {voucher.priceUgx ? voucher.priceNote : "Any value, redeemable across the spa"}
        </Text>
      </Box>

      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {voucher.blurb}
      </Text>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: "text.secondary" }}>
        <Icon name="mail" aria-hidden fontSize="small" sx={{ color: "primary.main" }} />
        <Text variant="body2" component="span">
          Emailed today, or ready at reception
        </Text>
      </Box>

      <Box
        sx={{
          mt: "auto",
          pt: 3,
          borderTop: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          alignItems: "center",
        }}
      >
        <WhatsAppCta label={voucher.cta} variant={voucher.featured ? "primary" : "ghost"} />
        <Link href={`#${ENQUIRE_ANCHOR_ID}`} variant="body2" underline="hover">
          or enquire by email
        </Link>
      </Box>
    </Box>
  );
}
