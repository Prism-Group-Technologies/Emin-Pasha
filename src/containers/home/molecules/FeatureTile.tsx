import { Box } from "@/components/atoms/Box";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";

export interface FeatureTileProps {
  ordinal: number;
  icon: IconName;
  headline: string;
  supportingLine: string;
  ctaLabel: string;
  href: string;
}

const headlineSx = {
  fontFamily: "var(--font-display)",
  fontSize: { xs: "1.75rem", md: "1.9375rem" },
  lineHeight: 1.05,
  letterSpacing: "-0.01em",
};

const ctaSx = {
  mt: "auto",
  pt: 4,
  borderTop: "1px solid",
  borderColor: "divider",
  display: "inline-flex",
  alignItems: "center",
  gap: 2,
  transition: "gap 150ms cubic-bezier(0.16,1,0.3,1)",
  "@media (prefers-reduced-motion: reduce)": { transition: "none" },
};

/**
 * One tile of the estate grid: an amenity icon and its ordinal on one row, the
 * headline, the supporting line, and a CTA pinned to the bottom edge.
 *
 * **Uniform, not wide-or-standard.** The previous version let two tiles span
 * extra columns and split internally, which put a single-word headline like
 * "Stay" alone in half of a seven-column card — roughly forty per cent of that
 * tile was void. All six tiles carry the same content shape, so none of them
 * earns more area than the others; a bento only pays when size encodes
 * priority, and here it encoded nothing.
 *
 * Hierarchy therefore comes from the icon rather than from area. The icon is
 * `aria-hidden` — it restates the headline directly beneath it, and announcing
 * "bed" before "Stay" adds nothing for a screen reader.
 *
 * The whole block is one link, not a card with a separate anchor: one tab stop
 * per tile, and the entire surface is the target rather than two words of it.
 */
export function FeatureTile({
  ordinal,
  icon,
  headline,
  supportingLine,
  ctaLabel,
  href,
}: FeatureTileProps) {
  return (
    <Link
      href={href}
      underline="none"
      sx={[
        cardSurface(),
        {
          color: "text.primary",
          gap: 3,
          "&:hover .tile-cta, &:focus-visible .tile-cta": { gap: 3 },
          "&:hover .tile-icon": { transform: "translateY(-2px)" },
        },
      ]}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
        <Icon
          name={icon}
          aria-hidden
          className="tile-icon"
          sx={{
            fontSize: 32,
            color: "primary.main",
            transition: "transform 200ms cubic-bezier(0.16,1,0.3,1)",
            "@media (prefers-reduced-motion: reduce)": { transition: "none" },
          }}
        />
        <Text
          variant="overline"
          component="span"
          sx={{
            fontFamily: "var(--font-cartographic)",
            color: "text.secondary",
            letterSpacing: "0.16em",
          }}
        >
          {`§ ${String(ordinal).padStart(2, "0")}`}
        </Text>
      </Box>

      <Text component="h3" sx={headlineSx}>
        {headline}
      </Text>
      <Text variant="body1" color="text.secondary" sx={{ mb: 5, textWrap: "pretty" }}>
        {supportingLine}
      </Text>

      <Text className="tile-cta" variant="overline" component="span" sx={ctaSx}>
        {ctaLabel}
        <Icon name="arrow-forward" fontSize="small" sx={{ color: "primary.main" }} />
      </Text>
    </Link>
  );
}
