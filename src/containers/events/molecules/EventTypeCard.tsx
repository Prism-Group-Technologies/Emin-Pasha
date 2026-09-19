import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { EventTypeCard as EventTypeCardData } from "@/containers/events/copy";

/**
 * One occasion as a card: a tinted icon badge, the title, a one-line hook, a
 * checked list of concrete draws, and a CTA pinned to the bottom edge so
 * uneven list lengths sit level across the row.
 */
export function EventTypeCard({ card }: { card: EventTypeCardData }) {
  return (
    <Box component="article" sx={cardSurface()}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <IconBadge name={card.icon} size={44} />
        <Text variant="h3" component="h3">
          {card.title}
        </Text>
      </Box>

      <Text variant="body1" color="text.secondary" sx={{ mb: 4, textWrap: "pretty" }}>
        {card.blurb}
      </Text>

      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 2, mb: 5 }}>
        {card.points.map((point) => (
          <Box key={point} component="li" sx={{ display: "flex", gap: 2 }}>
            <Icon
              name="check-circle"
              aria-hidden
              fontSize="small"
              sx={{ color: "primary.main", mt: "2px", flexShrink: 0 }}
            />
            <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
              {point}
            </Text>
          </Box>
        ))}
      </Box>

      <Button
        href={card.ctaHref}
        variant="ghost"
        sx={{ mt: "auto", alignSelf: "flex-start" }}
        endIcon={<Icon name="arrow-forward" fontSize="small" />}
      >
        {card.ctaLabel}
      </Button>
    </Box>
  );
}
