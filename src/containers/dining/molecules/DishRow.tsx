import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import type { MenuItem } from "@/containers/dining/copy";
import { formatUgx } from "@/utils/currency";

export interface DishRowProps {
  item: MenuItem;
  /**
   * When set, a `signature` dish shows a "Signature" tag that links here — the
   * anchor of its card in the photo strip. Omitted on pages with no strip
   * (the Dining index), where the tag renders as a static marker instead.
   */
  signatureHref?: string;
}

/**
 * One dish: name and description on the left, an indicative price on the
 * right. A `priceUgx` of 0 means "no separate price" (a tasting-menu course)
 * — the price column is simply omitted.
 *
 * A `signature` dish is set apart with a gold spine down its left edge and a
 * "Signature" tag above the name; where `signatureHref` is given, that tag is
 * a link up to the dish's photo. Signature dishes are also sorted to the head
 * of their course by `MenuCourse`, so the marked rows always lead.
 */
export function DishRow({ item, signatureHref }: DishRowProps) {
  const isSignature = Boolean(item.signature);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        alignItems: "baseline",
        justifyContent: "space-between",
        py: 2,
        pl: 2,
        borderLeft: "2px solid",
        borderColor: isSignature ? "primary.main" : "transparent",
      }}
    >
      <Box sx={{ display: "grid", gap: 0.5, minWidth: 0 }}>
        {isSignature && <SignatureTag href={signatureHref} dishName={item.name} />}
        <Text variant="body1" sx={{ fontWeight: 600 }}>
          {item.name}
        </Text>
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {item.description}
        </Text>
      </Box>
      {item.priceUgx > 0 && (
        <Text
          variant="body2"
          sx={{ fontFamily: "var(--font-cartographic)", whiteSpace: "nowrap", flexShrink: 0 }}
        >
          {formatUgx(item.priceUgx)}
        </Text>
      )}
    </Box>
  );
}

const tagSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  width: "fit-content",
  fontFamily: "var(--font-cartographic)",
  fontSize: "0.625rem",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "text.secondary",
} as const;

/**
 * The "Signature" marker above a flagged dish. A link with an up arrow when it
 * has a target in the photo strip; a plain tag otherwise. The word stays in
 * `text.secondary` — gold as body text fails AA on the light ground
 * (DESIGN_DIRECTION.md §B.2) — and the gold reads on the arrow and the spine.
 */
function SignatureTag({ href, dishName }: { href?: string; dishName: string }) {
  if (!href) {
    return (
      <Text component="span" sx={tagSx}>
        Signature
      </Text>
    );
  }

  return (
    <Link
      href={href}
      underline="hover"
      color="inherit"
      aria-label={`${dishName} — jump to its photo`}
      sx={tagSx}
    >
      <Icon name="arrow-upward" aria-hidden sx={{ fontSize: "0.875rem", color: "primary.main" }} />
      Signature
    </Link>
  );
}
