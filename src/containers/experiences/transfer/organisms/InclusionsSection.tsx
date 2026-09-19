import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
import { transferInclusions } from "@/containers/experiences/transfer/copy/inclusions";
import { transferAsset } from "@/containers/experiences/transfer/copy/media";
import { transferSections } from "@/containers/experiences/transfer/copy/sections";
import { InclusionTile } from "@/containers/experiences/transfer/molecules/InclusionTile";
import { type RevealDirection, oppositeOf } from "@/theme/motion";

const { inclusions } = transferSections;
const asset = transferAsset("transfer-arrivals-board");

/**
 * "Always included" — the arrivals-hall photo beside eight inclusions in a
 * two-column list. The photo centres against the list from `md`, so
 * leftover height splits above and below rather than pooling on one side.
 */
export function InclusionsSection({
  motion = "up",
  variant = "default",
}: {
  motion?: RevealDirection;
  variant?: SectionVariant;
}) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={inclusions.eyebrow}
      heading={inclusions.heading}
      description={inclusions.description}
      variant={variant}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 0.9fr) minmax(0, 1.1fr)" },
          gap: { xs: 6, md: 8 },
          alignItems: { xs: "start", md: "center" },
        }}
      >
        {asset && (
          <Reveal direction={oppositeOf(motion)} media>
            <MediaFrame>
              <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 40vw" />
            </MediaFrame>
          </Reveal>
        )}
        <Box
          component="ul"
          sx={{
            listStyle: "none",
            m: 0,
            p: 0,
            display: "grid",
            columnGap: 6,
            rowGap: { xs: 4, md: 5 },
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
          }}
        >
          {transferInclusions.map((item) => (
            <InclusionTile key={item.title} item={item} />
          ))}
        </Box>
      </Box>
    </SectionShell>
  );
}
