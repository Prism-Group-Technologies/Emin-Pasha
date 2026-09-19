import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Reveal } from "@/components/atoms/Reveal";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { poolAsset } from "@/containers/wellness/copy/poolMedia";
import { poolSections } from "@/containers/wellness/copy/poolSections";
import { PoolSafetyCard } from "@/containers/wellness/molecules/PoolSafetyCard";
import { WhatsAppCta } from "@/containers/wellness/molecules/WhatsAppCta";
import { type RevealDirection, oppositeOf } from "@/theme/motion";

const asset = poolAsset("wellness-pool-gardens");
const { experience } = poolSections;

/**
 * "A swim, or a whole afternoon" — the pool's one-line pitch and a garden
 * photo beside the safety notice, kept prominent rather than buried. Replaces
 * the old inline overview; the container stays pure composition.
 */
export function PoolExperienceSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={experience.eyebrow}
      heading={experience.heading}
      description={experience.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.05fr) minmax(0, 1fr)" },
          gap: { xs: 6, md: 8 },
          alignItems: "start",
        }}
      >
        <Stack spacing={4}>
          {asset && (
            <Reveal direction={oppositeOf(motion)} media>
              <MediaFrame>
                <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 50vw" />
              </MediaFrame>
            </Reveal>
          )}
          <Text
            variant="body1"
            color="text.secondary"
            sx={{ textWrap: "pretty", maxWidth: "52ch" }}
          >
            Come for a proper set of lengths before the pool opens, or a lounger, a book and the
            poolside gardens for the day. Non-resident swimmers are welcome on a day pass, and the
            whole poolside books for a private party.
          </Text>
          <WhatsAppCta label="Book a swim" variant="ghost" />
        </Stack>

        <PoolSafetyCard />
      </Box>
    </SectionShell>
  );
}
