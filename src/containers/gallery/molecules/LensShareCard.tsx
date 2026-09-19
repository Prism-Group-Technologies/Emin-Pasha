import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { Icon } from "@/components/atoms/Icon";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";

export interface LensShareCardProps {
  title: string;
  body: string;
  hashtag: string;
  followLabel: string;
  instagramHref: string;
}

/** The action beside the guest wall: the hashtag, the monthly feature incentive and a follow link. */
export function LensShareCard({
  title,
  body,
  hashtag,
  followLabel,
  instagramHref,
}: LensShareCardProps) {
  return (
    <Box component="aside" sx={[cardSurface(), { gap: 3, justifyContent: "center" }]}>
      <IconBadge name="camera" />
      <Text variant="h4" component="h3">
        {title}
      </Text>
      <Text
        component="p"
        sx={{ fontFamily: "var(--font-cartographic)", fontSize: "1rem", color: "text.primary" }}
      >
        {hashtag}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {body}
      </Text>
      <Box>
        <Button
          href={instagramHref}
          variant="ghost"
          startIcon={<Icon name="instagram" />}
          aria-label={`${followLabel}${NEW_TAB_NOTE}`}
        >
          {followLabel}
        </Button>
      </Box>
    </Box>
  );
}
