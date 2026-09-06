import { Box } from "@/components/atoms/Box";
import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";
import { SectionLabel } from "@/components/atoms/SectionLabel";
import type { FooterData } from "@/components/organisms/Footer/footerData";

const PLATFORM_ICON: Record<string, IconName> = {
  facebook: "facebook",
  instagram: "instagram",
  x: "x",
  linkedin: "linkedin",
};

/**
 * Which glyph stands for which platform is a presentational decision, so the
 * map lives here; `footerData` supplies only the platform, its display name
 * and its URL. Platforms with no approved URL never reach this component.
 *
 * Two fixes over the previous version. It uses the `IconButton` atom instead
 * of importing MUI's directly, so the 44×44 target and the new-tab `rel`
 * both come from the one place that owns them. And the accessible name is
 * now the platform's real name — it was interpolating the raw enum value, so
 * screen readers announced "x, link" and "linkedin, link".
 */
export function SocialLinks({ social }: { social: FooterData["social"] }) {
  return (
    <Box>
      <SectionLabel sx={{ mb: 2 }}>{social.title}</SectionLabel>
      <Box sx={{ display: "flex", gap: 1, ml: "-10px" }}>
        {social.links.map((link) => (
          <IconButton
            key={link.platform}
            href={link.url}
            aria-label={`${link.label}${NEW_TAB_NOTE}`}
            sx={{
              color: "text.secondary",
              "&:hover, &:focus-visible": { color: "primary.main" },
            }}
          >
            <Icon name={PLATFORM_ICON[link.platform] ?? "arrow-forward"} fontSize="small" />
          </IconButton>
        ))}
      </Box>
    </Box>
  );
}
