import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Chip } from "@/components/atoms/Chip";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { ENQUIRE_ANCHOR_ID } from "@/containers/events/anchors";
import { kudaraAsset, kudaraSections } from "@/containers/events/copy";
import type { RevealDirection } from "@/theme/motion";

const { showcase } = kudaraSections;
const asset = kudaraAsset("kudara-banquet");

const HIGHLIGHTS = [
  "Pillar-free · ~24m clear span",
  "Up to 500 theatre · indicative",
  "Built-in stage & in-house AV",
  "Three kitchens · no outside caterer",
  "Ground-floor get-in · secure parking",
  "Rooms, gym & pool on site",
];

/**
 * The hook band for the venue page: the pitch, six headline facts as chips and
 * the primary CTA, beside a placeholder wide shot of the hall in use. Figures
 * are indicative and labelled where they appear.
 */
export function KudaraShowcaseSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell motion={motion} eyebrow={showcase.eyebrow} heading={showcase.heading}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" },
          gap: { xs: 5, md: 8 },
          alignItems: "center",
        }}
      >
        <Stack spacing={4}>
          <Text variant="body1" color="text.secondary" sx={{ textWrap: "pretty" }}>
            {showcase.description}
          </Text>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            {HIGHLIGHTS.map((item) => (
              <Chip key={item} label={item} size="small" />
            ))}
          </Box>
          <Button href={`#${ENQUIRE_ANCHOR_ID}`} size="large" sx={{ alignSelf: "flex-start" }}>
            Request a proposal
          </Button>
        </Stack>

        {asset && (
          <Box sx={{ order: { xs: -1, md: 1 } }}>
            <MediaFrame hoverZoom>
              <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 50vw" />
            </MediaFrame>
          </Box>
        )}
      </Box>
    </SectionShell>
  );
}
