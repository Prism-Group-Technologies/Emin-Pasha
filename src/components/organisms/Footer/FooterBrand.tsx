import { Box } from "@/components/atoms/Box";
import { BrandMark } from "@/components/atoms/BrandMark";
import { Rule } from "@/components/atoms/Rule";
import { Text } from "@/components/atoms/Text";
import type { FooterData } from "@/components/organisms/Footer/footerData";

/**
 * The footer's identity plate: the brand lock-up, a short gold rule and one
 * line of voice.
 *
 * The lock-up used to be a cropped portrait mark with "Emin Pasha" and
 * "Hotel & Spa" re-set beside it as live text, because the old artwork's
 * baked wordmark was unreadable at that size. The delivered lock-up is drawn
 * horizontally and holds up, so it replaces both — which is also why the
 * name now reaches assistive tech through `alt` rather than through the text
 * that is no longer there. `NapBlock` still states the full name as real
 * text in the band below, so the footer has not lost a crawlable name.
 *
 * Deliberately *not* the header's `Logo`. That component is a client
 * boundary (it hands `NextLink` to an MUI element) and animates between an
 * expanded and a condensed state driven by scroll — none of which a static
 * footer plate needs. Reusing it would have pulled a client component and its
 * lock-up hook into a subtree that is otherwise entirely server-rendered.
 *
 * Wider here than in the header (220px against 200px) and not condensing: the
 * footer rail is a ~350px grid track with no nav competing for the row, so
 * the constraint that sets the header's width simply does not apply.
 *
 * The `dark` variant is the terracotta artwork, which is correct on
 * `background.paper` in both colour schemes — it is line art with its own
 * margin and carries enough contrast on `sand.100` and on `ink.900` alike.
 * The reverse file exists for the hero scrim, which the footer never sits on.
 */
export function FooterBrand({ brand }: { brand: FooterData["brand"] }) {
  return (
    <Box>
      <BrandMark
        width={{ xs: 180, md: 220 }}
        sizes="(max-width: 899px) 180px, 220px"
        alt={brand.name}
      />
      <Box sx={{ mt: 5, mb: 4, width: 48 }}>
        <Rule orientation="horizontal" />
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ maxWidth: "34ch" }}>
        {brand.statement}
      </Text>
    </Box>
  );
}
