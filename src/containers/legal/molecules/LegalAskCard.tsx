import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { legalSections } from "@/containers/legal/copy/sections";
import { ClaimOnWhatsApp } from "@/containers/offers/molecules/ClaimOnWhatsApp";

const { aside } = legalSections;

export interface LegalAskCardProps {
  whatsappHref: string;
  telephoneHref: string;
}

/** The aside's "ask a person" card — WhatsApp first, the desk phone second. */
export function LegalAskCard({ whatsappHref, telephoneHref }: LegalAskCardProps) {
  return (
    <Box
      component="aside"
      aria-labelledby="legal-ask-heading"
      sx={[cardSurface(true), { p: { xs: 4, md: 5 }, gap: 3, "&:hover": { transform: "none" } }]}
    >
      <Text id="legal-ask-heading" variant="h5" component="h2">
        {aside.heading}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {aside.body}
      </Text>
      <ClaimOnWhatsApp href={whatsappHref} label={aside.whatsapp} fullWidth />
      <Button href={telephoneHref} variant="ghost" fullWidth startIcon={<Icon name="phone" />}>
        {aside.call}
      </Button>
    </Box>
  );
}
