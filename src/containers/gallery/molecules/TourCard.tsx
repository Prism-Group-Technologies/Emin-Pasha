import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { tourCopy } from "@/containers/gallery/copy/film";
import { GalleryWhatsAppCta } from "@/containers/gallery/molecules/GalleryWhatsAppCta";
import { photoBadgeSx, roundedMediaSx } from "@/containers/gallery/styles";
import type { AssetRef } from "@/schemas/content/assetRef";
import { radiusTokens } from "@/theme/tokens";

export interface TourCardProps {
  copy: typeof tourCopy;
  poster: AssetRef | undefined;
  whatsappHref: string;
}

/**
 * The 360° tour as a light card on the dark band: a panorama preview, the six
 * stops, and — until the tour exists — a live WhatsApp video walkthrough as
 * the call to action. `color: text.primary` stops the band's fixed light text
 * bleeding into the card (the `HireTierCard` fix).
 */
export function TourCard({ copy, poster, whatsappHref }: TourCardProps) {
  return (
    <Box
      component="article"
      sx={[cardSurface(false), { gap: 3, color: "text.primary", p: { xs: 4, md: 5 } }]}
    >
      <Box sx={{ ...roundedMediaSx, borderRadius: `${radiusTokens.md}px` }}>
        {poster && <AssetImage asset={poster} sizes="(max-width: 900px) 100vw, 30vw" />}
        <Box sx={{ ...photoBadgeSx, position: "absolute", left: 12, bottom: 12 }}>
          <Text component="span" variant="caption" sx={{ color: "inherit", fontWeight: 600 }}>
            {copy.eyebrow}
          </Text>
        </Box>
      </Box>
      <Text variant="h4" component="h3">
        {copy.title}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {copy.body}
      </Text>
      <Box
        component="ul"
        aria-label="Tour stops"
        sx={{ listStyle: "none", m: 0, p: 0, display: "flex", flexWrap: "wrap", gap: 1 }}
      >
        {copy.stops.map((stop) => (
          <Box
            component="li"
            key={stop}
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: `${radiusTokens.pill}px`,
              border: "1px solid",
              borderColor: "divider",
              typography: "caption",
            }}
          >
            {stop}
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: "auto", display: "grid", gap: 1.5 }}>
        <GalleryWhatsAppCta href={whatsappHref} label={copy.ctaLabel} fullWidth />
        <Text variant="caption" color="text.secondary">
          {copy.note}
        </Text>
      </Box>
    </Box>
  );
}
