import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { giftVouchers, spaSections } from "@/containers/wellness/copy";
import { VoucherCard } from "@/containers/wellness/molecules/VoucherCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * Spa gift vouchers — a second lead type alongside the enquiry form. Three
 * options: one treatment, the half-day retreat (featured), or an open amount.
 * No online checkout; each card routes to WhatsApp or the enquiry form. Runs
 * on the plain band so the tinted featured card reads clearly.
 */
export function GiftVoucherSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={spaSections.vouchers.eyebrow}
      heading={spaSections.vouchers.heading}
      description={spaSections.vouchers.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: 5, md: 6 },
          alignItems: "stretch",
        }}
      >
        {giftVouchers.map((voucher, index) => (
          <Reveal key={voucher.id} index={index} fill>
            <VoucherCard voucher={voucher} />
          </Reveal>
        ))}
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ mt: 6, maxWidth: "72ch" }}>
        Delivered by email the same day or written up at reception. Voucher values are indicative
        and confirmed on purchase; validity and redemption terms are set at that point.
      </Text>
    </SectionShell>
  );
}
