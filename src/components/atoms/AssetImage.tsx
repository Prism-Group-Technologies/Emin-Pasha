import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Image } from "@/components/atoms/Image";
import { placeholderImageSrc } from "@/config/assets";
import type { AssetRef } from "@/schemas/content/assetRef";
import { colorTokens } from "@/theme/tokens";
import { toZoomImage, zoomAttributes } from "@/utils/imageZoom";

export interface AssetImageProps {
  asset: AssetRef;
  sizes: string;
  priority?: boolean;
  /**
   * `fill` drops the asset's own ratio box and stretches to the nearest
   * positioned ancestor instead — for a mosaic cell whose geometry the grid
   * decides rather than the photograph.
   *
   * The CLS guarantee moves with it: the ancestor must reserve a
   * deterministic height of its own (`roomMosaic` does this by fixing the
   * whole block's aspect ratio up front). Default stays `asset`, so every
   * existing call site is unchanged.
   */
  ratio?: "asset" | "fill";
  /**
   * How the image meets its box. `cover` fills and crops, which is what a
   * photograph wants. `contain` is for artwork cut to its own silhouette,
   * which has no spare margin to crop into — pass it for any asset flagged
   * `cutout`, or the figure itself is what gets trimmed.
   */
  fit?: "cover" | "contain";
  /**
   * Whether clicking the photograph opens the site-wide image modal.
   *
   * **Default true**, which is the point: a visitor who wants a closer look at
   * a room, a dish or the pool should get one wherever they meet it, and
   * opting ~55 render sites in one at a time is how half of them would have
   * been missed. Pass `false` where a click already means something else:
   *
   *   - a photograph that *is* a link or sits inside one — navigation must win,
   *     so those cards carry a `ZoomTrigger` in the corner instead;
   *   - a tile that already opens a lightbox of its own (`PhotoTile`,
   *     `RoomGalleryTile`), which would otherwise open two;
   *   - chrome rather than content — the nav thumbnails, the signature;
   *   - the click-to-load map, where the click loads the map.
   *
   * Hero photographs need no opt-out: they are full-bleed backgrounds behind
   * overlay type and go through `HeroShell`, not this atom.
   */
  zoomable?: boolean;
  /** Overrides the modal's caption. Defaults to the asset's own alt text. */
  zoomCaption?: string;
}

const FRAME = {
  asset: { position: "relative", width: "100%" },
  fill: { position: "absolute", inset: 0 },
} as const;

/**
 * Applied as one spread rather than as per-parameter defaults — the same move
 * `SectionShell` makes, and for the same reason: three default parameters cost
 * three branches against the `complexity` ceiling, and one spread costs none.
 */
const ASSET_DEFAULTS = { priority: false, ratio: "asset", fit: "cover", zoomable: true } as const;

/**
 * Button resets, plus the affordance that says the frame opens.
 *
 * The focus ring is drawn *inside* the box (`outlineOffset: -3px`) because the
 * frame clips its own overflow and most callers nest it inside a `MediaFrame`
 * that clips again — an outline offset outwards is simply invisible there,
 * which is the quiet way a keyboard user loses track of where they are.
 */
const ZOOM_SX = {
  display: "block",
  p: 0,
  border: 0,
  background: "none",
  appearance: "none",
  cursor: "zoom-in",
  "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: "-3px" },
} as const;

const LABEL_SX = {
  fontFamily: "var(--font-cartographic)",
  fontSize: "0.6875rem",
  lineHeight: 1.3,
  color: colorTokens.gold[300],
  wordBreak: "break-word",
} as const;

const LABEL_BAR_SX = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  px: 3,
  py: 2,
  bgcolor: "rgba(8,5,3,0.72)",
  borderBottom: "1px solid",
  borderColor: "primary.main",
} as const;

/**
 * The shooting brief, drawn over the stand-in: the slot's id and the exact
 * dimensions the photograph has to arrive at. `aria-hidden`, because the
 * accessible name is the asset's real `altText` — assistive tech should hear
 * what the finished page will describe, not build scaffolding.
 */
function PlaceholderLabel({ asset }: { asset: AssetRef }) {
  return (
    <Box aria-hidden sx={LABEL_BAR_SX}>
      <Typography sx={LABEL_SX}>
        {`§ ${asset.id.toUpperCase()} — ${asset.width}×${asset.height}`}
      </Typography>
    </Box>
  );
}

/**
 * The attributes that make a frame open the modal, or nothing at all.
 *
 * Split out of the component so the one decision — "is there a photograph
 * here worth enlarging, and is this frame allowed to enlarge it" — is a
 * single expression rather than three more branches inside the renderer.
 */
function zoomProps(asset: AssetRef, zoomable: boolean, caption?: string) {
  const zoom = zoomable ? toZoomImage(asset, caption) : null;
  if (!zoom) {
    return null;
  }
  return {
    component: "button",
    type: "button",
    "aria-label": `Enlarge: ${zoom.caption}`,
    ...zoomAttributes(zoom),
  } as const;
}

/**
 * Renders a content asset.
 *
 * A slot with a photograph assigned in `@/content/photoAssignments` renders
 * it through `next/image`, which resizes and re-encodes per request and uses
 * the bundler's blur placeholder while the bytes arrive. A slot without one
 * still shows the shared stand-in overlaid with its own asset id and required
 * dimensions — the "named, dimension-labelled placeholder" CLAUDE.md §6.6
 * asks for, which doubles as the shooting brief for the hotel.
 *
 * Either way the box holds the asset's declared aspect ratio, not the
 * photograph's, so a reshoot at a different crop cannot move anything on the
 * page (CLS stays at 0).
 *
 * The label is `aria-hidden`: the accessible name is the asset's real
 * `altText`, so assistive tech hears what the finished page will describe,
 * not build scaffolding. Decorative assets get no name at all.
 *
 * **Click to enlarge.** When the slot has a delivered photograph, the frame is
 * a real `<button>` carrying that photograph in data attributes, which the one
 * delegated listener in `useImageZoom` reads back to open the modal. A real
 * button rather than a click handler means Enter, Space, the focus ring and
 * the announcement all come from the platform — and, crucially, this file
 * stays a Server Component, so the sixty-odd cards and sections that render a
 * photograph are not dragged across the client boundary to gain the feature
 * (DECISIONS.md D25). A slot with nothing delivered is never zoomable: there
 * is no photograph behind the stand-in to enlarge.
 */
export function AssetImage(props: AssetImageProps) {
  const { asset, sizes, priority, ratio, fit, zoomable, zoomCaption } = {
    ...ASSET_DEFAULTS,
    ...props,
  };
  const { image } = asset;
  const zoom = zoomProps(asset, zoomable, zoomCaption);

  return (
    <Box
      {...zoom}
      sx={{
        ...FRAME[ratio],
        ...(ratio === "asset" && { aspectRatio: `${asset.width} / ${asset.height}` }),
        overflow: "hidden",
        bgcolor: "action.hover",
        ...(zoom && ZOOM_SX),
      }}
    >
      <Image
        src={image?.src ?? placeholderImageSrc}
        alt={asset.decorative ? "" : asset.altText}
        fill
        sizes={sizes}
        priority={priority}
        blurDataURL={image?.blurDataURL}
        style={{ objectFit: fit }}
      />
      {!image && <PlaceholderLabel asset={asset} />}
    </Box>
  );
}
