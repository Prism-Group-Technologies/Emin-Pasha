import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Chip } from "@/components/atoms/Chip";
import { Icon } from "@/components/atoms/Icon";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { ENQUIRE_ANCHOR_ID } from "@/containers/wellness/anchors";
import { spaAsset } from "@/containers/wellness/copy/spaMedia";
import type { Therapist } from "@/containers/wellness/copy/therapists";

/**
 * One therapist: a portrait placeholder, the name, the role in the
 * cartographic face, specialism chips, one line of bio, and a ghost CTA that
 * drops the guest on the enquiry form to ask for them by name.
 */
export function TherapistCard({ therapist }: { therapist: Therapist }) {
  const asset = spaAsset(therapist.assetId);

  return (
    <Box component="article" sx={[cardSurface(), { p: 0, overflow: "hidden" }]}>
      {asset && (
        <MediaFrame hoverZoom sx={{ borderRadius: 0 }}>
          <AssetImage
            asset={asset}
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
          />
        </MediaFrame>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: { xs: 4, md: 5 }, flex: 1 }}>
        <Text variant="h5" component="h3">
          {therapist.name}
        </Text>
        <Text variant="overline" component="p" sx={{ color: "primary.main" }}>
          {therapist.role}
        </Text>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 1 }}>
          {therapist.specialisms.map((specialism) => (
            <Chip key={specialism} label={specialism} size="small" />
          ))}
        </Box>

        <Text variant="body2" color="text.secondary" sx={{ mt: 1, textWrap: "pretty" }}>
          {therapist.bio}
        </Text>

        <Button
          href={`#${ENQUIRE_ANCHOR_ID}`}
          variant="ghost"
          size="small"
          sx={{ mt: "auto", alignSelf: "flex-start" }}
          endIcon={<Icon name="arrow-forward" fontSize="small" />}
        >
          Request {therapist.name.split(" ")[0]}
        </Button>
      </Box>
    </Box>
  );
}
