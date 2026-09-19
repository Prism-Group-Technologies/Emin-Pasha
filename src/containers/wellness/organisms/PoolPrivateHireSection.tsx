import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Reveal } from "@/components/atoms/Reveal";
import { Stack } from "@/components/atoms/Stack";
import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
import { poolEvents, privateHireIncludes } from "@/containers/wellness/copy/poolEvents";
import { poolAsset } from "@/containers/wellness/copy/poolMedia";
import { poolSections } from "@/containers/wellness/copy/poolSections";
import { FactList } from "@/containers/wellness/molecules/FactList";
import { PoolEventCard } from "@/containers/wellness/molecules/PoolEventCard";
import { WhatsAppCta } from "@/containers/wellness/molecules/WhatsAppCta";
import { type RevealDirection, oppositeOf } from "@/theme/motion";

const hero = poolAsset("wellness-pool-private-hire");
const { privateHire } = poolSections;

/**
 * The pool booked as a venue — the exclusive-use inclusions beside a photo,
 * then three packaged occasions (a sundowner, a family celebration, a
 * wedding-weekend brunch). "From" prices are flagged indicative on each card.
 */
export function PoolPrivateHireSection({
  motion = "up",
  variant = "raised",
}: {
  motion?: RevealDirection;
  variant?: SectionVariant;
}) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={privateHire.eyebrow}
      heading={privateHire.heading}
      description={privateHire.description}
      variant={variant}
    >
      <Stack spacing={{ xs: 7, md: 8 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" },
            gap: { xs: 6, md: 8 },
            alignItems: "center",
          }}
        >
          {hero && (
            <Reveal direction={oppositeOf(motion)} media>
              <MediaFrame>
                <AssetImage asset={hero} sizes="(max-width: 900px) 100vw, 50vw" />
              </MediaFrame>
            </Reveal>
          )}
          <Stack spacing={4}>
            <FactList heading="What exclusive hire includes" items={privateHireIncludes} />
            <WhatsAppCta label="Enquire about a date" variant="ghost" />
          </Stack>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            gap: { xs: 5, md: 6 },
            alignItems: "stretch",
          }}
        >
          {poolEvents.map((event, index) => (
            <Reveal key={event.id} index={index} fill>
              <PoolEventCard event={event} asset={poolAsset(event.assetId)} />
            </Reveal>
          ))}
        </Box>
      </Stack>
    </SectionShell>
  );
}
