import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { spacesAsset } from "@/containers/spaces/copy/media";

/**
 * A three-frame mosaic for one space: a wide lead image over two square
 * supporting frames. Each slot holds its real aspect ratio through
 * `AssetImage`, so real photography drops in with no layout shift.
 */
export function SpaceGallery({ assetIds }: { assetIds: readonly [string, string, string] }) {
  const [lead, ...supporting] = assetIds.map((id) => spacesAsset(id));

  return (
    <Box
      sx={{
        display: "grid",
        gap: { xs: 2, md: 3 },
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      }}
    >
      {lead && (
        <MediaFrame hoverZoom sx={{ gridColumn: "1 / -1" }}>
          <AssetImage asset={lead} sizes="(max-width: 900px) 100vw, 50vw" />
        </MediaFrame>
      )}
      {supporting.map(
        (asset) =>
          asset && (
            <MediaFrame key={asset.id} hoverZoom>
              <AssetImage asset={asset} sizes="(max-width: 900px) 50vw, 25vw" />
            </MediaFrame>
          ),
      )}
    </Box>
  );
}
