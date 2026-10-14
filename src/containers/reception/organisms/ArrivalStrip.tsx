import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { contrastMutedSx } from "@/components/templates/sectionShellStyles";
import { receptionAsset, receptionSections } from "@/containers/reception/copy";
import { DeskStatRail } from "@/containers/reception/molecules/DeskStatRail";
import { type RevealDirection, oppositeOf } from "@/theme/motion";
import { radiusTokens } from "@/theme/tokens";

/** The three surfaces this strip speaks on, each with its own argument. */
export type ArrivalStripVariant = "arrival" | "transfer" | "story";

export interface ArrivalStripProps {
  variant?: ArrivalStripVariant;
  motion?: RevealDirection;
  /** Overrides the variant's default frame. */
  assetId?: string;
  /** `false` renders on the page's own ground instead of the dark band. */
  contrast?: boolean;
  /** Defaults to `arrival`, which makes the strip a deep-link target on every
   * page that mounts it. Unique per page, because a page mounts it once. */
  id?: string;
}

/**
 * The compact reception strip — one photograph, the arrival facts, one exit.
 *
 * One component for three placements rather than three near-identical
 * organisms. What changes between an accommodation page, the transfer funnel
 * and the story page is the paragraph and the frame, and both are data; the
 * geometry, the stat rail and the CTA are the same every time. Three copies of
 * this file would have drifted apart by the second edit.
 *
 * It defaults to the dark `contrast` band because every page that mounts it
 * mounts it between two light sections, and the band is what stops a long
 * funnel reading as one undifferentiated column. Pages that already sit beside
 * a dark section pass `contrast={false}`.
 */
const DEFAULT_ASSETS: Record<ArrivalStripVariant, string> = {
  arrival: "reception-desk-staff",
  transfer: "reception-lobby-sofa",
  story: "reception-waiting-chairs",
};

export function ArrivalStrip({
  variant = "arrival",
  motion = "up",
  assetId,
  contrast = true,
  id = "arrival",
}: ArrivalStripProps) {
  const copy = receptionSections[variant];
  const asset = receptionAsset(assetId ?? DEFAULT_ASSETS[variant]);

  return (
    <SectionShell motion={motion} id={id} variant={contrast ? "contrast" : "default"}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 0.9fr) minmax(0, 1fr)" },
          gap: { xs: 6, md: 8 },
          alignItems: "center",
        }}
      >
        <Reveal direction={motion} media>
          <Box sx={{ overflow: "hidden", borderRadius: `${radiusTokens.lg}px` }}>
            <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 44vw" />
          </Box>
        </Reveal>

        <Reveal index={1} direction={oppositeOf(motion)}>
          <Stack spacing={3.5}>
            <Text variant="overline" component="p" sx={contrast ? contrastMutedSx : undefined}>
              {copy.eyebrow}
            </Text>
            <Text
              variant="h3"
              component="h2"
              sx={{ fontFamily: "var(--font-display)", textWrap: "balance" }}
            >
              {copy.heading}
            </Text>
            <Text
              variant="body1"
              sx={[
                { textWrap: "pretty" },
                contrast ? contrastMutedSx : { color: "text.secondary" },
              ]}
            >
              {copy.lede}
            </Text>

            <DeskStatRail onDark={contrast} />

            <Box sx={{ pt: 1 }}>
              {/*
                On the dark band the CTA is an outlined button in white, not
                the maroon `secondary` fill: maroon on near-black is the one
                combination on this ground that loses its edge, and an outline
                in `common.white` is what `FaqClosingSection` and the other
                contrast bands already use. Off the band it reverts to the
                ordinary ghost button and inherits the palette.
              */}
              <Button
                href="/contact"
                variant="ghost"
                sx={
                  contrast
                    ? { color: "common.white", borderColor: "rgba(250,248,246,0.6)" }
                    : undefined
                }
              >
                Ask the desk
              </Button>
            </Box>
          </Stack>
        </Reveal>
      </Box>
    </SectionShell>
  );
}
