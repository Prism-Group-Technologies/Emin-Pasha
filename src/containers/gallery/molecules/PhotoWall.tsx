import { Box } from "@/components/atoms/Box";
import { PhotoTile } from "@/containers/gallery/molecules/PhotoTile";
import type { GalleryItem, TileShape } from "@/containers/gallery/types";

export interface PhotoWallProps {
  items: GalleryItem[];
  onOpen: (index: number) => void;
  openLabel: string;
}

/**
 * Wide photographs span two columns and portraits two rows. `dense` packing
 * back-fills the gaps that leaves, so the wall stays a tight editorial mosaic
 * at every width without a masonry library or any layout JavaScript.
 */
const SPAN: Record<TileShape, object> = {
  wide: { gridColumn: "span 2" },
  portrait: { gridRow: "span 2" },
  landscape: {},
  square: {},
};

/** The photo mosaic. Presentational — the list and the open handler come from the island. */
export function PhotoWall({ items, onOpen, openLabel }: PhotoWallProps) {
  return (
    <Box
      component="ul"
      sx={{
        listStyle: "none",
        m: 0,
        p: 0,
        display: "grid",
        gap: { xs: 2, md: 3 },
        gridTemplateColumns: {
          xs: "repeat(2, minmax(0, 1fr))",
          md: "repeat(3, minmax(0, 1fr))",
          lg: "repeat(4, minmax(0, 1fr))",
        },
        gridAutoRows: { xs: 150, sm: 200, md: 210, lg: 230 },
        gridAutoFlow: "row dense",
      }}
    >
      {items.map((item, index) => (
        <Box component="li" key={item.id} sx={SPAN[item.shape]}>
          <PhotoTile item={item} onOpen={() => onOpen(index)} openLabel={openLabel} />
        </Box>
      ))}
    </Box>
  );
}
