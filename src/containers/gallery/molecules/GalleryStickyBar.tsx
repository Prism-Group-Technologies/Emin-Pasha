"use client";

import { Box } from "@/components/atoms/Box";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { STICKY_BAR_HEIGHT } from "@/components/organisms/Header/constants";
import { COLLECTIONS_ANCHOR_ID } from "@/containers/gallery/anchors";
// Leaf module, not the `copy` barrel, so only the strings this bar needs ship to the client.
import { sections } from "@/containers/gallery/copy/sections";
import { GalleryWhatsAppCta } from "@/containers/gallery/molecules/GalleryWhatsAppCta";
import { useStickyCtaReveal } from "@/containers/wellness/hooks/useStickyCtaReveal";
import { shadowTokens, zIndexTokens } from "@/theme/tokens";

const { sticky } = sections;

/**
 * The page's sticky "plan on WhatsApp" pill, revealed after one screen of
 * scroll (`useStickyCtaReveal`, shared with wellness, offers and spaces).
 *
 * Unlike those desktop-only pills this one also runs on phones and tablets
 * (user decision): below `md` it floats as a compact pill *above* the
 * sitewide `StickyActionBar` rather than competing for the same edge, and the
 * lead line and "browse" link only appear from `lg`, where there is room.
 * `position: fixed`, so it adds nothing to CLS.
 */
export function GalleryStickyBar({
  whatsappHref,
  browseHref,
}: {
  whatsappHref: string;
  browseHref?: string;
}) {
  const visible = useStickyCtaReveal();

  return (
    <Box
      aria-hidden={!visible}
      sx={{
        position: "fixed",
        left: "50%",
        bottom: { xs: STICKY_BAR_HEIGHT + 12, md: 24 },
        zIndex: zIndexTokens.appBar,
        display: "flex",
        alignItems: "center",
        gap: 3,
        px: { xs: 1, lg: 4 },
        py: { xs: 1, lg: 2 },
        maxWidth: "calc(100vw - 32px)",
        borderRadius: 999,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        boxShadow: shadowTokens.lg,
        transition:
          "transform 260ms cubic-bezier(0.16,1,0.3,1), opacity 260ms cubic-bezier(0.16,1,0.3,1)",
        transform: visible ? "translate(-50%, 0)" : "translate(-50%, 160%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        "@media (prefers-reduced-motion: reduce)": { transition: "opacity 260ms linear" },
      }}
    >
      <Text
        variant="body2"
        sx={{ fontWeight: 600, display: { xs: "none", lg: "block" }, whiteSpace: "nowrap" }}
      >
        {sticky.lead}
      </Text>
      <GalleryWhatsAppCta
        href={whatsappHref}
        label={sticky.cta}
        size="small"
        sx={{ whiteSpace: "nowrap" }}
      />
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <Link
          href={browseHref ?? `#${COLLECTIONS_ANCHOR_ID}`}
          variant="body2"
          underline="hover"
          sx={{ whiteSpace: "nowrap" }}
        >
          {sticky.browse}
        </Link>
      </Box>
    </Box>
  );
}
