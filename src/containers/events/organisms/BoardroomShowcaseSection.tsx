import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Chip } from "@/components/atoms/Chip";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { ENQUIRE_ANCHOR_ID } from "@/containers/events/anchors";
import { boardroomAsset, boardroomSections } from "@/containers/events/copy";
import type { RevealDirection } from "@/theme/motion";

const { showcase } = boardroomSections;
const asset = boardroomAsset("boardroom-showcase");

const HIGHLIGHTS = [
  "Seats 16 · indicative",
  "Fixed table · always set",
  "Interactive display built in",
  "Power & data in the tabletop",
  "Dedicated F&B support team",
  "Secure parking · Nakasero",
];

/**
 * The hook band: the pitch, six headline facts as chips and the primary CTA,
 * beside the establishing shot of the room.
 *
 * Every chip is checkable against the delivered photography or the §7 source —
 * the seat count is the one indicative figure and is labelled as such. This
 * page sells a fixed room, so the chips say what is permanent about it rather
 * than what it can be turned into.
 */
export function BoardroomShowcaseSection({ motion = "up" }: { motion?: RevealDirection }) {
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
