import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { trustItems } from "@/containers/home/copy";
import { TrustItem } from "@/containers/home/molecules/TrustItem";
import type { RevealDirection } from "@/theme/motion";
import { colorTokens } from "@/theme/tokens";

/**
 * The credibility strip, sitting immediately under the hero.
 *
 * It answers the only question a visitor has in their first three seconds —
 * "is this the right kind of place, and is it near what I came for?" — before
 * they have to scroll for it.
 *
 * On the dark band rather than the cream one, so it reads as the base of the
 * hero rather than as the first of many identical pale sections. That also
 * lets the six figures carry gold/300 at 10.46:1, which they cannot do on the
 * light surface, where gold falls to 2.33:1.
 *
 * A plain grid, not a marquee: a moving strip makes a reader wait for the fact
 * they want, and six facts is never long enough for waiting to be worth it.
 */
export function TrustBar({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell variant="contrast" motion={motion}>
      <Reveal direction={motion}>
        <Box
          component="ul"
          sx={{
            listStyle: "none",
            m: 0,
            p: 0,
            display: "grid",
            // Two up on a phone, three on a tablet, all six on desktop — the
            // figures stay legible at every step instead of shrinking to fit.
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(3, minmax(0, 1fr))",
              lg: "repeat(6, minmax(0, 1fr))",
            },
            gap: { xs: 5, md: 6 },
          }}
        >
          {trustItems.map((item) => (
            <Box
              key={item.value + item.label}
              component="li"
              sx={{
                pl: { xs: 4, md: 5 },
                borderLeft: "1px solid",
                borderColor: colorTokens.gold[700],
              }}
            >
              <TrustItem value={item.value} label={item.label} onDark />
            </Box>
          ))}
        </Box>
      </Reveal>
    </SectionShell>
  );
}
