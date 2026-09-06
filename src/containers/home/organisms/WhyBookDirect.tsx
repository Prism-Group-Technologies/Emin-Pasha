import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { bookDirect } from "@/containers/home/copy";
import { BenefitItem } from "@/containers/home/molecules/BenefitItem";
import { CtaPair } from "@/containers/home/molecules/CtaPair";
import { bookNowCta } from "@/content/navigation";
import { whatsappBookingUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";

/**
 * The book-direct argument, stated rather than assumed.
 *
 * An independent property competes on every search result against listings of
 * itself, and the visitor's default assumption is that the aggregator is
 * cheaper or safer. Left unanswered, that assumption sends the booking — and
 * its commission — elsewhere.
 *
 * Laid out as a centred header over four equal columns rather than the earlier
 * heading-column-plus-grid split, which left a tall empty block on the left
 * once the heading and CTA ran out. The WhatsApp number is a live handoff: it
 * is the channel this market actually answers on.
 */
export function WhyBookDirect({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      eyebrow={bookDirect.eyebrow}
      heading={bookDirect.heading}
      description={bookDirect.description}
      align="center"
      variant="raised"
      topRule
    >
      <Reveal direction={motion}>
        <Box
          component="ul"
          sx={{
            listStyle: "none",
            m: 0,
            p: 0,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(4, minmax(0, 1fr))",
            },
            gap: { xs: 5, md: 6 },
          }}
        >
          {bookDirect.benefits.map((benefit) => (
            <BenefitItem
              key={benefit.title}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </Box>
      </Reveal>

      <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 7, md: 8 } }}>
        <CtaPair
          section="book-direct"
          align="center"
          size="large"
          primary={{ label: bookNowCta.label, href: bookNowCta.href }}
          secondary={{ label: "WhatsApp us", href: whatsappBookingUrl }}
        />
      </Box>
    </SectionShell>
  );
}
