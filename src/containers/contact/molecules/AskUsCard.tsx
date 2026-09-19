import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { NEW_TAB_NOTE } from "@/components/atoms/ExternalLink";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { radiusTokens } from "@/theme/tokens";

export interface AskUsCardProps {
  heading: string;
  body: string;
  whatsappHref: string;
  whatsappLabel: string;
  enquireHref: string;
  enquireLabel: string;
}

/**
 * The "not answered here?" card beside the FAQ — a gold-washed panel with the
 * two ways to ask, so a visitor who did not find their question has the next
 * step in the same eyeline. The wash is translucent, so it reads on both the
 * light and the dark ground.
 */
export function AskUsCard(props: AskUsCardProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        p: { xs: 4, md: 5 },
        borderRadius: `${radiusTokens.lg}px`,
        border: "1px solid",
        borderColor: "divider",
        borderLeft: "3px solid",
        borderLeftColor: "primary.main",
        bgcolor: "rgba(196,168,50,0.09)",
      }}
    >
      <Icon name="chat" sx={{ color: "primary.main", fontSize: 32 }} aria-hidden />
      <Text variant="h5" component="h3">
        {props.heading}
      </Text>
      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {props.body}
      </Text>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Button
          href={props.whatsappHref}
          startIcon={<Icon name="whatsapp" />}
          aria-label={`${props.whatsappLabel}${NEW_TAB_NOTE}`}
        >
          {props.whatsappLabel}
        </Button>
        <Button href={props.enquireHref} variant="ghost">
          {props.enquireLabel}
        </Button>
      </Box>
    </Box>
  );
}
