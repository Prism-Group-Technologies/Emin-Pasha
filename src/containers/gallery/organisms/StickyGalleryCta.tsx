import { GalleryStickyBar } from "@/containers/gallery/molecules/GalleryStickyBar";
import { whatsappGalleryUrl } from "@/lib/directions";

/**
 * The page-scoped sticky bar's server half: resolves `whatsappGalleryUrl` and
 * hands it to the client bar as a plain string (DECISIONS.md D25).
 */
export function StickyGalleryCta({ browseHref }: { browseHref?: string }) {
  return <GalleryStickyBar whatsappHref={whatsappGalleryUrl} browseHref={browseHref} />;
}
