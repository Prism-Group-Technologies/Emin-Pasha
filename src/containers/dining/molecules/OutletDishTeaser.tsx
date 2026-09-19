import { Box } from "@/components/atoms/Box";
import { Link } from "@/components/atoms/Link";
import { Text } from "@/components/atoms/Text";
import { MENUS_ANCHOR_ID } from "@/containers/dining/anchors";
import type { SignatureDish } from "@/containers/dining/menuView";
import { formatUgx } from "@/utils/currency";

/** How many dishes the intro band previews before handing off to `#menus`. */
const TEASER_LIMIT = 2;

export interface OutletDishTeaserProps {
  /** The outlet's signature dishes — already resolved by `getOutletMenuView`. */
  dishes: readonly SignatureDish[];
}

/**
 * A two-dish taste of the sample menu, inside the intro band.
 *
 * The full menu already has its own section further down the page, but the
 * intro band is where a visitor decides whether to keep reading — naming two
 * dishes there converts far better than a link alone, and it is the one block
 * that gives the thinner outlets something concrete to show. Prices carry the
 * same "sample, seasonal" caveat the menu section spells out in full.
 *
 * Renders nothing when the sample menu marks no signature dishes, so the
 * column still lays out.
 */
export function OutletDishTeaser({ dishes }: OutletDishTeaserProps) {
  const shown = dishes.slice(0, TEASER_LIMIT);
  if (shown.length === 0) {
    return null;
  }

  return (
    <Box>
      <Text
        variant="overline"
        component="p"
        sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary", mb: 3 }}
      >
        § A TASTE OF THE MENU
      </Text>
      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 3 }}>
        {shown.map((dish) => (
          <Box
            key={dish.name}
            component="li"
            sx={{ pt: 3, borderTop: "1px solid", borderColor: "divider", display: "grid", gap: 1 }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Text variant="h4" component="h3">
                {dish.name}
              </Text>
              {dish.priceUgx > 0 && (
                <Text
                  variant="body2"
                  sx={{ fontFamily: "var(--font-cartographic)", whiteSpace: "nowrap" }}
                >
                  {formatUgx(dish.priceUgx)}
                </Text>
              )}
            </Box>
            <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
              {dish.description}
            </Text>
          </Box>
        ))}
      </Box>
      <Link href={`#${MENUS_ANCHOR_ID}`} variant="body2" sx={{ display: "inline-block", mt: 3 }}>
        See the full sample menu
      </Link>
    </Box>
  );
}
