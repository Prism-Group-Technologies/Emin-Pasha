import { Box } from "@/components/atoms/Box";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { LegalPoint } from "@/containers/legal/types";
import { ClaimOnWhatsApp } from "@/containers/offers/molecules/ClaimOnWhatsApp";

export interface LegalPointCardProps {
  point: LegalPoint;
  index: number;
  /** A resolved `wa.me` URL when the point is an actionable request. */
  requestHref?: string;
  requestLabel: string;
}

/**
 * One card in a summary or highlights grid: icon, title, a plain-English line
 * and — for data-rights and assistance cards — a WhatsApp request CTA whose
 * message is pre-written from the closed request list.
 */
export function LegalPointCard({ point, index, requestHref, requestLabel }: LegalPointCardProps) {
  return (
    <Reveal index={index} fill>
      <Box component="article" sx={[cardSurface(false), { gap: 3 }]}>
        <IconBadge name={point.icon} size={44} />
        <Text variant="h4" component="h3" sx={{ textWrap: "balance" }}>
          {point.title}
        </Text>
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {point.body}
        </Text>
        {requestHref && (
          <Box sx={{ mt: "auto", pt: 2 }}>
            <ClaimOnWhatsApp
              href={requestHref}
              label={requestLabel}
              offerTitle={point.title}
              variant="ghost"
              size="small"
            />
          </Box>
        )}
      </Box>
    </Reveal>
  );
}
