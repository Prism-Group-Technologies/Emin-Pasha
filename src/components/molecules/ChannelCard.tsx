import { Box } from "@/components/atoms/Box";
import { ExternalLink } from "@/components/atoms/ExternalLink";
import type { IconName } from "@/components/atoms/Icon";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import { radiusTokens } from "@/theme/tokens";

export interface ChannelCardProps {
  icon: IconName;
  /** The channel name — "Call reservations", "Message on WhatsApp". */
  label: string;
  /** The address itself, which is also the link text. */
  value: string;
  href: string;
}

/**
 * One contact channel as a card: a tinted icon badge, the channel name, and
 * the address as the link. `ExternalLink` owns the `tel:` / `mailto:` /
 * `wa.me` hand-off to the OS, and its label is `aria-label`-free here because
 * the visible value already reads correctly.
 */
export function ChannelCard({ icon, label, value, href }: ChannelCardProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        p: 3,
        textAlign: "left",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: `${radiusTokens.lg}px`,
        bgcolor: "background.default",
        transition: "border-color 200ms cubic-bezier(0.16,1,0.3,1)",
        "&:hover": { borderColor: "primary.main" },
      }}
    >
      <IconBadge name={icon} size={44} />
      <Box sx={{ display: "grid", gap: 0.5, minWidth: 0 }}>
        <Text variant="overline" component="p" color="text.secondary">
          {label}
        </Text>
        <ExternalLink href={href}>{value}</ExternalLink>
      </Box>
    </Box>
  );
}
