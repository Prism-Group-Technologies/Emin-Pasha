import { Box } from "@/components/atoms/Box";
import { SectionShell } from "@/components/templates/SectionShell";
import { ENQUIRE_ANCHOR_ID } from "@/containers/contact/anchors";
import { contactFaq, sections } from "@/containers/contact/copy";
import { AskUsCard } from "@/containers/contact/molecules/AskUsCard";
import { FaqAccordion } from "@/containers/contact/molecules/FaqAccordion";
import { whatsappUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";

/**
 * Pre-contact questions — reply times, booking direct, check-in, transfers,
 * visiting without staying — with an "ask us" card beside them. A Server
 * Component: only the accordion is a client leaf, and the WhatsApp URL is
 * resolved here so `lib/directions` never enters the client bundle.
 */
export function ContactFaqSection({ motion = "up" }: { motion?: RevealDirection }) {
  const { faq, sticky } = sections;

  return (
    <SectionShell
      motion={motion}
      eyebrow={faq.eyebrow}
      heading={faq.heading}
      description={faq.description}
      bodyMotion={motion}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.7fr) minmax(0, 1fr)" },
          gap: { xs: 5, md: 8 },
          alignItems: "start",
        }}
      >
        <FaqAccordion items={contactFaq} />
        <Box sx={{ position: { md: "sticky" }, top: { md: 96 } }}>
          <AskUsCard
            heading={faq.askHeading}
            body={faq.askBody}
            whatsappHref={whatsappUrl}
            whatsappLabel={sticky.whatsapp}
            enquireHref={`#${ENQUIRE_ANCHOR_ID}`}
            enquireLabel={faq.askEnquire}
          />
        </Box>
      </Box>
    </SectionShell>
  );
}
