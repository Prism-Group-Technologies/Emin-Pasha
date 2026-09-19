import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { journeyCopy } from "@/containers/story/copy/journey";
import { radiusTokens } from "@/theme/tokens";

export interface JourneyStopProps {
  /** 1-based position, rendered as the cartographic `§ 0N` marker. */
  index: number;
  /** The chapter title — verbatim from `story.timeline`. */
  title: string;
  /** Anchor id of the matching chapter in the full account. */
  anchorId: string;
}

/**
 * One stop on the horizontal "Equatorial Line" journey map: a node on the
 * rule, the verbatim chapter title, and a link straight to that chapter of
 * the preserved pillar article. No history is added here — only the marker
 * and the link.
 */
export function JourneyStop({ index, title, anchorId }: JourneyStopProps) {
  return (
    <Box
      component="li"
      sx={{
        position: "relative",
        pt: 5,
        minWidth: { xs: 200, md: 0 },
        scrollSnapAlign: "start",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: 11,
          height: 11,
          borderRadius: `${radiusTokens.pill}px`,
          bgcolor: "primary.main",
          transform: "translateY(-50%)",
        },
      }}
    >
      <Text
        variant="overline"
        component="p"
        sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary", mb: 1 }}
      >
        {`§ ${String(index).padStart(2, "0")}`}
      </Text>
      <Text variant="h5" component="h3" sx={{ mb: 2, textWrap: "balance" }}>
        {title}
      </Text>
      <Link
        href={`#${anchorId}`}
        variant="body2"
        underline="hover"
        sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}
      >
        {journeyCopy.stopCtaLabel}
        <Icon name="arrow-forward" fontSize="small" aria-hidden />
      </Link>
    </Box>
  );
}
