import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { FEATURE_TILE_HREFS, FEATURE_TILE_ICONS } from "@/containers/home/constants";
import { featureSection } from "@/containers/home/copy";
import { FeatureTile } from "@/containers/home/molecules/FeatureTile";
import { assets } from "@/content/assets";
import { site } from "@/content/site";
import type { RevealDirection } from "@/theme/motion";

/**
 * Each tile's photograph, keyed by the `content/site.ts` tile id — the same key
 * `FEATURE_TILE_ICONS` and `FEATURE_TILE_HREFS` use. Built once at module load
 * and resolved here in the Server Component.
 */
const tileImages = new Map(
  site.homepage.featureTiles.map((tile) => [
    tile.id,
    assets.find((asset) => asset.id === `home-feature-${tile.id}`),
  ]),
);

/**
 * The six estate tiles, as a uniform three-across grid.
 *
 * This was a collage grid with uneven spans and a 24px stagger on alternate
 * tiles. That composition worked while the tiles were borderless text blocks —
 * the offset read as intent. Once each tile gained a visible card edge the same
 * offsets read as broken alignment instead, and the wide tiles were left
 * holding more area than their one-word headlines could fill.
 *
 * Six items with the same content shape are parallel, not hierarchical, and a
 * grid says parallel. Equal cells, no offsets, CTAs on a shared baseline. Two
 * clean rows of three on desktop, two of two on a tablet, one column on a
 * phone.
 */
export function FeatureTiles({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={featureSection.eyebrow}
      heading={featureSection.heading}
      description={featureSection.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: { xs: 4, md: 5 },
        }}
      >
        {site.homepage.featureTiles.map((tile, index) => (
          <Reveal key={tile.id} index={index} fill>
            <FeatureTile
              ordinal={index + 1}
              icon={FEATURE_TILE_ICONS[tile.id] ?? "arrow-forward"}
              headline={tile.headline}
              supportingLine={tile.supportingLine}
              ctaLabel={tile.ctaLabel}
              href={FEATURE_TILE_HREFS[tile.id] ?? "/"}
              image={tileImages.get(tile.id)}
            />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
