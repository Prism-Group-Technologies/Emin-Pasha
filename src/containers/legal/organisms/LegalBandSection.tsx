import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
import { LEGAL_REQUEST_PHRASE } from "@/containers/legal/anchors";
import { legalSections } from "@/containers/legal/copy";
import { LegalPointCard } from "@/containers/legal/molecules/LegalPointCard";
import type { LegalBand } from "@/containers/legal/types";
import { whatsappLegalTopicUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";

export interface LegalBandSectionProps {
  band: LegalBand;
  id?: string;
  variant?: SectionVariant;
  motion?: RevealDirection;
}

/** 4 cards sit 2×2 then 4-up; 3 and 6 keep a 3-up rhythm — never a ragged last row. */
function columnsFor(count: number) {
  return count % 3 === 0
    ? { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))" }
    : { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" };
}

/**
 * A grid of plain-English points — used for every page's "at a glance"
 * summary and its highlights band (rights, choices, book-direct perks, on-site
 * access). Points that name a request get a pre-written WhatsApp CTA.
 */
export function LegalBandSection({
  band,
  id,
  variant = "default",
  motion = "up",
}: LegalBandSectionProps) {
  const action = band.cta && (
    <Button href={band.cta.href} variant="ghost" endIcon={<Icon name="arrow-forward" />}>
      {band.cta.label}
    </Button>
  );

  return (
    <SectionShell
      id={id}
      variant={variant}
      motion={motion}
      eyebrow={band.eyebrow}
      heading={band.heading}
      description={band.description}
      action={action}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: columnsFor(band.items.length),
          gap: { xs: 3, md: 4 },
          scrollMarginTop: 120,
        }}
      >
        {band.items.map((point, index) => (
          <LegalPointCard
            key={point.title}
            point={point}
            index={index}
            requestLabel={legalSections.request.cta}
            requestHref={
              point.request && whatsappLegalTopicUrl(LEGAL_REQUEST_PHRASE[point.request])
            }
          />
        ))}
      </Box>
    </SectionShell>
  );
}
