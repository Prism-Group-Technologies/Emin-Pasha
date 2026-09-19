import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { spaSections, turkishBathRitual } from "@/containers/wellness/copy";
import { spaAsset } from "@/containers/wellness/copy/spaMedia";
import { JourneyStepCard } from "@/containers/wellness/molecules/JourneyStepCard";
import { type RevealDirection, oppositeOf } from "@/theme/motion";

const asset = spaAsset("spa-ritual-hammam");

/**
 * The Turkish bath as a six-step ritual beside a photograph of the marble —
 * the flagship treatment given the room it earns. Same two-column
 * construction as `JourneySection`, and it reuses `JourneyStepCard` so the
 * step numbering reads identically.
 *
 * It runs on the dark `contrast` band — the flagship deserves the one
 * emphatic ground on the site, and it sets the Turkish-bath section clearly
 * apart from the raised "What we offer" and "Signature treatments" bands
 * either side of it. The step tiles stay light, so they read as a menu laid
 * on black.
 */
export function SignatureRitualSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={spaSections.ritual.eyebrow}
      heading={spaSections.ritual.heading}
      description={spaSections.ritual.description}
      variant="contrast"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.1fr) minmax(0, 1fr)" },
          gap: { xs: 6, md: 8 },
          // The photograph is wider than it is tall, so centring it in the row
          // keeps the leftover space split above and below it rather than
          // pooling as one empty block beside the lower step cards.
          alignItems: { xs: "start", md: "center" },
        }}
      >
        {asset && (
          <Box sx={{ order: { xs: 2, md: 2 }, position: { md: "sticky" }, top: { md: 120 } }}>
            <Reveal direction={oppositeOf(motion)} media>
              <MediaFrame>
                <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 45vw" />
              </MediaFrame>
            </Reveal>
          </Box>
        )}

        <Box
          sx={{
            order: { xs: 1, md: 1 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
            gap: { xs: 4, md: 5 },
            alignItems: "stretch",
          }}
        >
          {turkishBathRitual.map((step, index) => (
            <Reveal key={step.step} index={index} fill>
              <JourneyStepCard step={step} />
            </Reveal>
          ))}
        </Box>
      </Box>
    </SectionShell>
  );
}
