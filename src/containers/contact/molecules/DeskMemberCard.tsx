import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Chip } from "@/components/atoms/Chip";
import { Icon } from "@/components/atoms/Icon";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { ENQUIRE_ANCHOR_ID } from "@/containers/contact/anchors";
import { type DeskMember, contactAsset } from "@/containers/contact/copy";

/**
 * One member of the desk: a portrait placeholder, name, role, the languages
 * they answer in, one line of what to ask them about, and a quiet CTA back to
 * the form. Same card construction as the spa's `TherapistCard`.
 */
export function DeskMemberCard({ member, ctaPrefix }: { member: DeskMember; ctaPrefix: string }) {
  const asset = contactAsset(member.assetId);

  return (
    // `p` is zeroed per breakpoint: `cardSurface` sets a responsive padding,
    // and its media queries would otherwise win over a plain `p: 0`.
    <Box component="article" sx={[cardSurface(false), { p: { xs: 0, md: 0 }, overflow: "hidden" }]}>
      {asset && (
        <MediaFrame hoverZoom radius="sm" sx={{ borderRadius: 0 }}>
          <AssetImage
            asset={asset}
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </MediaFrame>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: { xs: 4, md: 5 }, flex: 1 }}>
        <Text variant="overline" component="p" sx={{ color: "primary.main" }}>
          {member.role}
        </Text>
        <Text variant="h5" component="h3">
          {member.name}
        </Text>
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {member.bio}
        </Text>
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mt: 1 }}>
          <Icon name="translate" sx={{ fontSize: 18, color: "text.secondary" }} aria-hidden />
          {member.languages.map((language) => (
            <Chip key={language} label={language} size="small" />
          ))}
        </Box>
        <Button
          href={`#${ENQUIRE_ANCHOR_ID}`}
          variant="ghost"
          size="small"
          endIcon={<Icon name="arrow-forward" fontSize="small" />}
          sx={{ mt: "auto", alignSelf: "flex-start" }}
        >
          {ctaPrefix} {member.name.split(" ")[0]}
        </Button>
      </Box>
    </Box>
  );
}
