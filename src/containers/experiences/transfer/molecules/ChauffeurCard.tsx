import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Chip } from "@/components/atoms/Chip";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { Chauffeur } from "@/containers/experiences/transfer/copy/chauffeurs";
import { transferAsset } from "@/containers/experiences/transfer/copy/media";

/**
 * One chauffeur profile — portrait slot, name, role, years on the road,
 * languages as chips and a single line of character. Placeholder people
 * (see `copy/chauffeurs.ts`); the same construction as the spa's
 * `TherapistCard`.
 */
export function ChauffeurCard({ chauffeur }: { chauffeur: Chauffeur }) {
  const asset = transferAsset(chauffeur.assetId);

  return (
    <Box
      component="article"
      sx={[cardSurface(false), { p: 0, overflow: "hidden", color: "text.primary" }]}
    >
      {asset && (
        <MediaFrame hoverZoom sx={{ borderRadius: 0 }}>
          <AssetImage
            asset={asset}
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          />
        </MediaFrame>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: { xs: 4, md: 5 }, flex: 1 }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 2 }}
        >
          <Text variant="h5" component="h3">
            {chauffeur.name}
          </Text>
          <Text
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: "var(--font-cartographic)" }}
          >
            {chauffeur.years} yrs
          </Text>
        </Box>
        <Text variant="overline" component="p" sx={{ color: "primary.main" }}>
          {chauffeur.role}
        </Text>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
          {chauffeur.languages.map((language) => (
            <Chip key={language} label={language} size="small" />
          ))}
        </Box>
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {chauffeur.bio}
        </Text>
      </Box>
    </Box>
  );
}
