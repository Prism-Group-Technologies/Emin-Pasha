import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { QuoteCard } from "@/containers/accommodation/molecules/QuoteCard";
import { galleryImage } from "@/containers/gallery/catalogue";
import { lensCopy, lensTiles, lensVoices } from "@/containers/gallery/copy/lens";
import { sections } from "@/containers/gallery/copy/sections";
import { LensShareCard } from "@/containers/gallery/molecules/LensShareCard";
import { LensTileCard } from "@/containers/gallery/molecules/LensTileCard";
import { identity } from "@/content/identity";
import type { RevealDirection } from "@/theme/motion";

/**
 * Social proof in two rows: the #EminPashaMoments wall beside the share card,
 * then three guest notes about booking from the photographs. Every handle and
 * quote is a labelled placeholder.
 */
export function GuestLensSection({ motion = "up" }: { motion?: RevealDirection }) {
  const { lens } = sections;

  return (
    <SectionShell
      variant="raised"
      motion={motion}
      eyebrow={lens.eyebrow}
      heading={lens.heading}
      description={lens.description}
    >
      <Box
        sx={{
          display: "grid",
          gap: { xs: 4, md: 5 },
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 2.2fr) minmax(0, 1fr)" },
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gap: { xs: 2, md: 3 },
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(4, minmax(0, 1fr))",
            },
          }}
        >
          {lensTiles.map((tile, index) => (
            <Reveal key={tile.id} index={index} media fill>
              <LensTileCard tile={tile} asset={galleryImage(tile.assetId)} />
            </Reveal>
          ))}
        </Box>
        <LensShareCard
          title={lensCopy.shareTitle}
          body={lensCopy.shareBody}
          hashtag={lens.heading}
          followLabel={lensCopy.followLabel}
          instagramHref={identity.social.instagram}
        />
      </Box>
      <Box
        sx={{
          mt: { xs: 6, md: 8 },
          display: "grid",
          gap: { xs: 4, md: 5 },
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
        }}
      >
        {lensVoices.map((voice, index) => (
          <Reveal key={voice.id} index={index} fill>
            <QuoteCard
              heading={voice.heading}
              quote={voice.quote}
              author={voice.author}
              location={voice.location}
              stayDate={voice.date}
              featured={index === 0}
            />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
