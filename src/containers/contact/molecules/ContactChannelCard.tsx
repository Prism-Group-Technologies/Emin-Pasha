import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { AvailabilityDot } from "@/containers/contact/molecules/AvailabilityDot";

export interface ContactChannelCardProps {
  icon: IconName;
  title: string;
  pitch: string;
  /** The real number / address, from `content/identity.ts` via the section. */
  value: string;
  href: string;
  availability: string;
  reply: string;
  cta: string;
  live: boolean;
  /** The one channel the page most wants chosen gets the filled button. */
  featured?: boolean;
}

/**
 * One way to reach the hotel, sold rather than listed: what the channel is
 * best for, when it is answered, how fast, the actual address, and a single
 * full-width action. `live` channels carry a pulsing availability dot.
 */
export function ContactChannelCard(props: ContactChannelCardProps) {
  const { icon, title, pitch, value, href, availability, reply, cta, live, featured } = props;
  const external = href.startsWith("http");

  return (
    <Box component="article" sx={[cardSurface(Boolean(featured)), { gap: 3 }]}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
        <IconBadge name={icon} size={48} />
        <Text
          variant="caption"
          component="p"
          sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary" }}
        >
          <AvailabilityDot live={live} />
          {availability}
        </Text>
      </Box>

      <Text variant="h5" component="h3">
        {title}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {pitch}
      </Text>

      <Box sx={{ mt: "auto", pt: 2, display: "grid", gap: 1 }}>
        <Text variant="body1" sx={{ fontWeight: 600, overflowWrap: "anywhere" }}>
          {value}
        </Text>
        <Text
          variant="caption"
          color="text.secondary"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Icon name="schedule" sx={{ fontSize: 16 }} aria-hidden />
          {reply}
        </Text>
      </Box>

      <Button
        href={href}
        variant={featured ? "primary" : "ghost"}
        fullWidth
        startIcon={<Icon name={icon} />}
        aria-label={external ? `${cta}${NEW_TAB_NOTE}` : undefined}
      >
        {cta}
      </Button>
    </Box>
  );
}
