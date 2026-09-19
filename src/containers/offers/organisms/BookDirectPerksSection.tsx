import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { bookDirectPerks, sections } from "@/containers/offers/copy";
import { GuaranteeCard } from "@/containers/offers/molecules/GuaranteeCard";
import { PerkItem } from "@/containers/offers/molecules/PerkItem";
import { whatsappOffersUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";

const { perks } = sections;

/**
 * Why claim direct: six perks added to every offer, beside the price-match
 * promise. The perks sit two-up in a list on a shared hairline; the guarantee
 * panel takes the right rail on desktop and follows the list on a phone.
 */
export function BookDirectPerksSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={perks.eyebrow}
      heading={perks.heading}
      description={perks.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.6fr 1fr" },
          gap: { xs: 7, md: 8 },
          alignItems: "stretch",
        }}
      >
        <Box
          component="ul"
          sx={{
            listStyle: "none",
            m: 0,
            p: 0,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
            columnGap: 6,
            rowGap: 5,
            alignContent: "start",
          }}
        >
          {bookDirectPerks.map((perk) => (
            <PerkItem key={perk.title} perk={perk} />
          ))}
        </Box>
        <Reveal direction={motion} index={1} fill>
          <GuaranteeCard whatsappHref={whatsappOffersUrl} />
        </Reveal>
      </Box>
    </SectionShell>
  );
}
