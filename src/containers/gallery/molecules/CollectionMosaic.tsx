import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { fillImageSx } from "@/containers/gallery/styles";
import type { GalleryItem } from "@/containers/gallery/types";
import { radiusTokens } from "@/theme/tokens";

/**
 * Five photographs as a bento: the lead fills the left two-thirds on desktop
 * and the rest tile two-by-two beside it. On a phone, the lead sits above a
 * row of three. Images only — the collection panel carries the words and CTAs.
 */
export function CollectionMosaic({ items }: { items: GalleryItem[] }) {
  const frames = items.slice(0, 5);

  return (
    <Box
      sx={{
        display: "grid",
        gap: { xs: 1.5, md: 2 },
        gridTemplateColumns: {
          xs: "repeat(3, minmax(0, 1fr))",
          md: "2fr repeat(2, minmax(0, 1fr))",
        },
        gridTemplateRows: {
          xs: "220px 96px",
          sm: "300px 140px",
          md: "repeat(2, 200px)",
          lg: "repeat(2, 230px)",
        },
      }}
    >
      {frames.map((item, index) => (
        <Box
          key={item.id}
          sx={{
            ...fillImageSx,
            position: "relative",
            overflow: "hidden",
            borderRadius: `${radiusTokens.md}px`,
            ...(index === 0 && {
              gridColumn: { xs: "1 / -1", md: "1" },
              gridRow: { md: "1 / span 2" },
            }),
            ...(index === 4 && { display: { xs: "none", md: "block" } }),
          }}
        >
          <AssetImage
            asset={item.asset}
            sizes={index === 0 ? "(max-width: 900px) 100vw, 40vw" : "(max-width: 900px) 33vw, 15vw"}
          />
        </Box>
      ))}
    </Box>
  );
}
