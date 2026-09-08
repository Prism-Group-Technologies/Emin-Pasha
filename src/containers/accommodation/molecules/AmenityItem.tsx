import { Box } from "@/components/atoms/Box";
import type { IconName } from "@/components/atoms/Icon";
import { IconBadge, type IconBadgeTone } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import { radiusTokens } from "@/theme/tokens";

export interface AmenityItemProps {
  icon: IconName;
  title: string;
  description: string;
  /** Disc tint — defaults to gold; the estate group passes `garden`. */
  tone?: IconBadgeTone;
}

/**
 * One inclusion, as a soft bordered card in an amenities grid: an icon in a
 * tinted disc over a title over one line of detail.
 *
 * Rendered as an `<li>`; list semantics come from the parent `<ul>`. The
 * badge is `aria-hidden` — every item in the list is an inclusion, so
 * announcing the glyph adds nothing.
 */
export function AmenityItem({ icon, title, description, tone = "gold" }: AmenityItemProps) {
  return (
    <Box
      component="li"
      sx={{
        listStyle: "none",
        display: "grid",
        gap: 2,
        alignContent: "start",
        p: { xs: 4, md: 5 },
        border: "1px solid",
        borderColor: "divider",
        borderRadius: `${radiusTokens.lg}px`,
        bgcolor: "background.default",
        transition: "border-color 200ms cubic-bezier(0.16,1,0.3,1)",
        "&:hover": { borderColor: "primary.main" },
      }}
    >
      <IconBadge name={icon} tone={tone} size={44} />
      <Text variant="h4" component="h3">
        {title}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {description}
      </Text>
    </Box>
  );
}
