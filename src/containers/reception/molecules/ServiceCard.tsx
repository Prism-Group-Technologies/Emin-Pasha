import { Box } from "@/components/atoms/Box";
import { Icon } from "@/components/atoms/Icon";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import type { ReceptionService } from "@/containers/reception/types";

/**
 * One service at the desk: the glyph, what it is called, what happens if you
 * ask, and — where there is somewhere to go — the link that gets you there.
 *
 * Unlike `FeatureTile` the whole card is **not** one link, because half the
 * catalogue has no destination: a service you arrange by walking up and asking
 * has nothing to navigate to, and a card-sized click target that goes nowhere
 * is worse than no target at all. The link is therefore an ordinary anchor
 * inside the card, present only on the entries that have one, and the card's
 * hover lift is decoration rather than an affordance.
 *
 * The icon is `aria-hidden`: it restates the title it sits beside.
 */
const footerSx = {
  mt: "auto",
  pt: 4,
  display: "inline-flex",
  alignItems: "center",
  gap: 1.5,
  alignSelf: "flex-start",
  transition: "gap 150ms cubic-bezier(0.16,1,0.3,1)",
  "@media (prefers-reduced-motion: reduce)": { transition: "none" },
};

export function ServiceCard({ service }: { service: ReceptionService }) {
  const { title, description, icon, href, linkLabel } = service;

  return (
    <Box component="li" sx={[cardSurface(), { gap: 2, "&:hover .service-link": { gap: 2.5 } }]}>
      <Icon name={icon} aria-hidden sx={{ fontSize: 30, color: "primary.main", mb: 1 }} />

      <Text component="h3" variant="h6" sx={{ textWrap: "balance" }}>
        {title}
      </Text>

      <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
        {description}
      </Text>

      {href && linkLabel && (
        <Link href={href} underline="none" className="service-link" sx={footerSx}>
          <Text variant="overline" component="span">
            {linkLabel}
          </Text>
          <Icon name="arrow-forward" fontSize="small" aria-hidden />
        </Link>
      )}
    </Box>
  );
}
