import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { CheckList } from "@/containers/experiences/transfer/molecules/CheckList";
import { PriceTag } from "@/containers/experiences/transfer/molecules/PriceTag";
import type { SignatureExperience } from "@/containers/spaces/copy/experiences";
import { spacesAsset } from "@/containers/spaces/copy/media";
import { CardBadge } from "@/containers/spaces/molecules/CardBadge";
import { SeedEnquiryButton } from "@/containers/spaces/molecules/SeedEnquiryButton";
import { experienceSeed } from "@/containers/spaces/seeds";

/**
 * One priced signature experience: photo slot with an optional badge, the
 * space and duration, a one-line pitch, three inclusions, the indicative
 * price, and a "book this" hand-off that seeds the reservation form.
 */
export function ExperienceCard({
  experience,
  spaceName,
}: {
  experience: SignatureExperience;
  spaceName: string;
}) {
  const asset = spacesAsset(experience.assetId);

  return (
    <Box
      component="article"
      sx={[
        cardSurface(false),
        {
          // `cardSurface`'s responsive padding beats a bare `p: 0`.
          p: { xs: 0, md: 0 },
          overflow: "hidden",
          height: "100%",
        },
      ]}
    >
      <Box sx={{ position: "relative" }}>
        {asset && (
          <MediaFrame hoverZoom sx={{ borderRadius: 0 }}>
            <AssetImage
              asset={asset}
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </MediaFrame>
        )}
        {experience.badge && <CardBadge label={experience.badge} />}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: { xs: 4, md: 5 }, flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, color: "text.secondary" }}>
          <Icon
            name={experience.icon}
            fontSize="small"
            aria-hidden
            sx={{ color: "primary.main" }}
          />
          <Text variant="overline" component="p" sx={{ color: "inherit" }}>
            {spaceName}
          </Text>
        </Box>
        <Text variant="h5" component="h3">
          {experience.title}
        </Text>
        <Text variant="body2" color="text.secondary">
          {experience.duration}
        </Text>
        <Text variant="body2" sx={{ textWrap: "pretty" }}>
          {experience.summary}
        </Text>
        <CheckList items={experience.includes} />
        <Box
          sx={{
            mt: "auto",
            pt: 3,
            borderTop: "1px solid",
            borderColor: "divider",
            display: "grid",
            gap: 3,
          }}
        >
          <PriceTag amountUsd={experience.priceUsd} unit={experience.unit} />
          <SeedEnquiryButton
            label="Book this experience"
            variant="ghost"
            fullWidth
            seed={experienceSeed(experience)}
          />
        </Box>
      </Box>
    </Box>
  );
}
